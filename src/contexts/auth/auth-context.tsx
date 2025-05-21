import React, { createContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { AuthContextType } from './auth-types';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { authActions } from './actions/authActions';
import { useUserProfile } from './hooks/useUserProfile';

// Create the context with undefined as initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

// Renamed from AuthContextProvider to AuthProvider for consistency with imports
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const { fetchUserProfile } = useUserProfile();

  useEffect(() => {
    // Set up the auth state change listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      setSession(currentSession);
      
      if (currentSession?.user) {
        // Check if user is a seller directly from metadata
        const isSeller = currentSession.user.user_metadata?.is_seller === true;
        
        const user: User = {
          id: currentSession.user.id,
          email: currentSession.user.email || '',
          displayName: currentSession.user.user_metadata?.full_name || '',
          photoURL: currentSession.user.user_metadata?.avatar_url || null,
          isAdmin: false, // Default, will be updated from profile
          isSeller: isSeller, // Set directly from metadata first
          businessName: currentSession.user.user_metadata?.business_name,
          businessType: currentSession.user.user_metadata?.business_type,
          trustScore: currentSession.user.user_metadata?.trust_score,
          verified: currentSession.user.user_metadata?.verified,
        };
        setCurrentUser(user);
        
        // Fetch additional profile data without blocking
        setTimeout(() => {
          handleFetchUserProfile(currentSession.user.id);
        }, 0);
      } else {
        setCurrentUser(null);
        setIsTwoFactorEnabled(false);
      }
    });

    // Then check for an existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);

      if (currentSession?.user) {
        // Check if user is a seller directly from metadata
        const isSeller = currentSession.user.user_metadata?.is_seller === true;
        
        const user: User = {
          id: currentSession.user.id,
          email: currentSession.user.email || '',
          displayName: currentSession.user.user_metadata?.full_name || '',
          photoURL: currentSession.user.user_metadata?.avatar_url || null,
          isAdmin: false, // Default, will be updated from profile
          isSeller: isSeller, // Set directly from metadata first
          businessName: currentSession.user.user_metadata?.business_name,
          businessType: currentSession.user.user_metadata?.business_type,
          trustScore: currentSession.user.user_metadata?.trust_score,
          verified: currentSession.user.user_metadata?.verified,
        };
        setCurrentUser(user);
        
        // Fetch additional profile data
        handleFetchUserProfile(currentSession.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleFetchUserProfile = async (userId: string) => {
    try {
      const updatedUser = await fetchUserProfile(userId, currentUser);
      if (updatedUser) {
        setCurrentUser(updatedUser);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  // Wrapped auth actions with error handling
  const handleLogin = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      await authActions.login(email, password);
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Failed to log in");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (accountType: 'buyer' | 'seller' = 'buyer'): Promise<void> => {
    try {
      setLoading(true);
      await authActions.googleLogin(accountType);
    } catch (error: any) {
      console.error("Google authentication error:", error);
      toast.error(error.message || "Failed to log in with Google");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneLogin = async (phoneNumber: string, accountType: 'buyer' | 'seller' = 'buyer'): Promise<void> => {
    try {
      setLoading(true);
      await authActions.phoneLogin(phoneNumber, accountType);
    } catch (error: any) {
      console.error("Phone login error:", error);
      toast.error(error.message || "Failed to send OTP");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      setLoading(true);
      await authActions.logout();
      setCurrentUser(null);
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error(error.message || "Failed to log out");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string, name: string, businessDetails?: { 
    businessName?: string, 
    businessType?: 'retailer' | 'distributor' | 'manufacturer' | 'individual',
    isSeller?: boolean 
  }): Promise<void> => {
    try {
      setLoading(true);
      await authActions.register(email, password, name, businessDetails);
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Failed to register");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (email: string): Promise<void> => {
    try {
      setLoading(true);
      await authActions.resetPassword(email);
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error.message || "Failed to send password reset email");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (data: Partial<User>): Promise<void> => {
    try {
      setLoading(true);
      const updatedUser = await authActions.updateProfile(currentUser, data);
      if (updatedUser) {
        setCurrentUser(updatedUser);
      }
    } catch (error: any) {
      console.error("Update profile error:", error);
      toast.error(error.message || "Failed to update profile");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySellerAccount = async (businessDocuments: File[]): Promise<void> => {
    try {
      setLoading(true);
      await authActions.verifySellerAccount(currentUser, businessDocuments);
    } catch (error: any) {
      console.error("Seller account verification error:", error);
      toast.error(error.message || "Failed to submit seller account verification request");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    currentUser,
    session,
    loading,
    login: handleLogin,
    googleLogin: handleGoogleLogin,
    phoneLogin: handlePhoneLogin,
    logout: handleLogout,
    register: handleRegister,
    resetPassword: handleResetPassword,
    updateProfile: handleUpdateProfile,
    verifySellerAccount: handleVerifySellerAccount,
    isTwoFactorEnabled,
    setupTwoFactor: async () => ({ qrCode: '' }), // Placeholder
    verifyTwoFactor: async () => false, // Placeholder
    disableTwoFactor: async () => {}, // Placeholder
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the AuthContext (for use-auth.ts)
export { AuthContext };
