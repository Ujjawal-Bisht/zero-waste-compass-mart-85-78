
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

export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  useEffect(() => {
    // Set up the auth state change listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      setSession(currentSession);
      
      if (currentSession?.user) {
        const user: User = {
          id: currentSession.user.id,
          email: currentSession.user.email || '',
          displayName: currentSession.user.user_metadata.full_name || '',
          photoURL: currentSession.user.user_metadata.avatar_url || null,
          isAdmin: false, // Default, will be updated from profile
          isSeller: false, // Default, will be updated from profile
          businessName: currentSession.user.user_metadata.business_name,
          businessType: currentSession.user.user_metadata.business_type,
          trustScore: currentSession.user.user_metadata.trust_score,
          verified: currentSession.user.user_metadata.verified,
        };
        setCurrentUser(user);
        
        // Fetch additional profile data without blocking
        setTimeout(() => {
          fetchUserProfile(currentSession.user.id);
          checkTwoFactorStatus(currentSession.user.id);
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
        const user: User = {
          id: currentSession.user.id,
          email: currentSession.user.email || '',
          displayName: currentSession.user.user_metadata.full_name || '',
          photoURL: currentSession.user.user_metadata.avatar_url || null,
          isAdmin: false, // Default, will be updated from profile
          isSeller: false, // Default, will be updated from profile
          businessName: currentSession.user.user_metadata.business_name,
          businessType: currentSession.user.user_metadata.business_type,
          trustScore: currentSession.user.user_metadata.trust_score,
          verified: currentSession.user.user_metadata.verified,
        };
        setCurrentUser(user);
        
        // Fetch additional profile data
        fetchUserProfile(currentSession.user.id);
        checkTwoFactorStatus(currentSession.user.id);
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
          displayName: data.full_name || currentUser.displayName,
          photoURL: data.avatar_url || currentUser.photoURL,
          isSeller: data.is_seller || false,
        };
        setCurrentUser(updatedUser);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  // Check if 2FA is enabled for the user
  const checkTwoFactorStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('two_factor_auth')
        .select('is_enabled')
        .eq('user_id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows returned" error
        console.error('Error checking 2FA status:', error);
        return;
      }

      setIsTwoFactorEnabled(data?.is_enabled || false);
    } catch (error) {
      console.error("Failed to check 2FA status:", error);
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
      
      const { error } = await supabase.auth.signInWithOAuth({ 
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          // Store account type in user metadata
          data: { is_seller: accountType === 'seller' }
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
          full_name: data.displayName,
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

  // New 2FA Methods
  const setupTwoFactor = async (): Promise<{ qrCode: string }> => {
    try {
      setLoading(true);
      
      if (!currentUser) throw new Error("No authenticated user");
      
      // In a real implementation, this would call a Supabase edge function to generate a TOTP secret
      // For this example, we'll simulate the API response
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/ZeroWasteMart:${currentUser.email}?secret=JBSWY3DPEHPK3PXP&issuer=ZeroWasteMart`;
      
      // Store 2FA setup in database
      const { error } = await supabase
        .from('two_factor_auth')
        .upsert({
          user_id: currentUser.id,
          secret: 'JBSWY3DPEHPK3PXP', // In a real app, this would be securely stored
          is_enabled: false, // Not enabled until verified
          created_at: new Date().toISOString()
        });
        
      if (error) throw error;
      
      return { qrCode: qrCodeUrl };
    } catch (error: any) {
      console.error("2FA setup error:", error);
      toast.error(error.message || "Failed to set up two-factor authentication");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyTwoFactor = async (token: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      if (!currentUser) throw new Error("No authenticated user");
      
      // In a real implementation, this would verify the token against the user's secret
      // For this example, we'll simulate verification (allow any 6-digit code)
      const isValid = /^\d{6}$/.test(token);
      
      if (isValid) {
        // Update 2FA status in database
        const { error } = await supabase
          .from('two_factor_auth')
          .update({ is_enabled: true })
          .eq('user_id', currentUser.id);
          
        if (error) throw error;
        
        setIsTwoFactorEnabled(true);
        toast.success("Two-factor authentication enabled successfully!");
      } else {
        toast.error("Invalid verification code. Please try again.");
      }
      
      return isValid;
    } catch (error: any) {
      console.error("2FA verification error:", error);
      toast.error(error.message || "Failed to verify two-factor authentication");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const disableTwoFactor = async (): Promise<void> => {
    try {
      setLoading(true);
      
      if (!currentUser) throw new Error("No authenticated user");
      
      // Update 2FA status in database
      const { error } = await supabase
        .from('two_factor_auth')
        .update({ is_enabled: false })
        .eq('user_id', currentUser.id);
        
      if (error) throw error;
      
      setIsTwoFactorEnabled(false);
      toast.success("Two-factor authentication disabled successfully!");
    } catch (error: any) {
      console.error("Disable 2FA error:", error);
      toast.error(error.message || "Failed to disable two-factor authentication");
      throw error;
    } finally {
      setLoading(false);
    }
  };

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
    setupTwoFactor,
    verifyTwoFactor,
    disableTwoFactor,
    isTwoFactorEnabled,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the AuthContext (for use-auth.ts)
export { AuthContext };
