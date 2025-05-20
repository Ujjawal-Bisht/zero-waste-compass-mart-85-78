import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { User } from '@/types';
import { AuthContextType } from './auth-types';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

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
          fetchUserProfile(currentSession.user.id);
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
        fetchUserProfile(currentSession.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data && currentUser) {
        const updatedUser: User = {
          ...currentUser,
          displayName: data.display_name || currentUser.displayName,
          photoURL: data.avatar_url || currentUser.photoURL,
          isSeller: data.is_seller || currentUser.isSeller || false,
          isAdmin: data.is_admin || currentUser.isAdmin || false
        };
        setCurrentUser(updatedUser);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      toast.success("Logged in successfully!");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Failed to log in");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (accountType: 'buyer' | 'seller' = 'buyer'): Promise<void> => {
    try {
      setLoading(true);
      console.log(`Starting Google authentication flow as ${accountType}...`);
      
      const { data, error } = await supabase.auth.signInWithOAuth({ 
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
            is_seller: accountType === 'seller' ? 'true' : 'false'
          }
        },
      });
      
      if (error) throw error;
    } catch (error: any) {
      console.error("Google authentication error:", error);
      toast.error(error.message || "Failed to log in with Google");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const phoneLogin = async (phoneNumber: string, accountType: 'buyer' | 'seller' = 'buyer'): Promise<void> => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithOtp({ 
        phone: phoneNumber,
        options: {
          data: { is_seller: accountType === 'seller' }
        }
      });
      
      if (error) throw error;
      
      toast.success("OTP sent to your phone number!");
    } catch (error: any) {
      console.error("Phone login error:", error);
      toast.error(error.message || "Failed to send OTP");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setCurrentUser(null);
      toast.success("Logged out successfully!");
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error(error.message || "Failed to log out");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, businessDetails?: { 
    businessName?: string, 
    businessType?: 'retailer' | 'distributor' | 'manufacturer' | 'individual',
    isSeller?: boolean 
  }): Promise<void> => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            is_seller: businessDetails?.isSeller || false,
            business_name: businessDetails?.businessName,
            business_type: businessDetails?.businessType,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
      
      // If isSeller is true, update the profile
      if (businessDetails?.isSeller && data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ is_seller: true })
          .eq('id', data.user.id);
          
        if (profileError) {
          console.error("Error updating profile:", profileError);
        }
        
        // Create a seller profile if needed
        if (businessDetails.businessName && businessDetails.businessType) {
          const { error: sellerProfileError } = await supabase
            .from('seller_profiles')
            .insert({
              id: data.user.id,
              business_name: businessDetails.businessName,
              business_type: businessDetails.businessType,
            });
            
          if (sellerProfileError) {
            console.error("Error creating seller profile:", sellerProfileError);
          }
        }
      }
      
      toast.success("Registration successful! Please check your email for verification.");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Failed to register");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      
      if (error) throw error;
      
      toast.success("Password reset instructions sent to your email!");
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error.message || "Failed to send password reset email");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    try {
      setLoading(true);
      
      if (!currentUser) throw new Error("No authenticated user");
      
      // Update user metadata if needed
      if (data.displayName || data.photoURL) {
        const { error: authError } = await supabase.auth.updateUser({
          data: {
            full_name: data.displayName,
            avatar_url: data.photoURL,
          }
        });
        
        if (authError) throw authError;
      }
      
      // Update profile in the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          display_name: data.displayName,
          avatar_url: data.photoURL,
          is_seller: data.isSeller,
        })
        .eq('id', currentUser.id);
        
      if (profileError) throw profileError;
      
      // Fetch the updated profile
      const updatedUser = {
        ...currentUser,
        ...data
      };
      
      setCurrentUser(updatedUser);
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("Update profile error:", error);
      toast.error(error.message || "Failed to update profile");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifySellerAccount = async (businessDocuments: File[]): Promise<void> => {
    try {
      setLoading(true);
      
      if (!currentUser) throw new Error("No authenticated user");
      
      // Upload documents to storage (in a real implementation)
      console.log("Processing seller verification documents:", businessDocuments.length, "files submitted");
      
      // Update seller profile verification status
      const { error } = await supabase
        .from('seller_profiles')
        .update({ 
          verified: false // Set to pending in a real implementation
        })
        .eq('id', currentUser.id);
        
      if (error) throw error;
      
      toast.success("Seller account verification request submitted successfully!");
    } catch (error: any) {
      console.error("Seller account verification error:", error);
      toast.error(error.message || "Failed to submit seller account verification request");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Two-factor authentication is removed for now since the table doesn't exist
  // These methods will be reintroduced when you create the two_factor_auth table

  const contextValue: AuthContextType = {
    currentUser,
    session,
    loading,
    login,
    googleLogin,
    phoneLogin,
    logout,
    register,
    resetPassword,
    updateProfile,
    verifySellerAccount,
    isTwoFactorEnabled: false, // Default to false
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
