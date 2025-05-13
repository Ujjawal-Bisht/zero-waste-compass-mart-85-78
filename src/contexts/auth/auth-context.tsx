
import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { authService } from '@/services/auth-service';
import { userService } from '@/services/user-service';
import { User } from '@/types';
import { AuthContextType } from './auth-types';

// Create the context with undefined as initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const user = await userService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Failed to load user:", error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const user = await authService.login(email, password);
      setCurrentUser(user);
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to log in");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      setLoading(true);
      console.log("Starting Google authentication flow...");
      const user = await authService.googleLogin();
      setCurrentUser(user);
      toast.success("Logged in with Google successfully!");
      return user;
    } catch (error) {
      console.error("Google authentication error:", error);
      toast.error("Failed to log in with Google");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const phoneLogin = async (phoneNumber: string) => {
    try {
      setLoading(true);
      const result = await authService.phoneLogin(phoneNumber);
      toast.success("OTP sent to your phone number!");
      return result;
    } catch (error) {
      console.error("Phone login error:", error);
      toast.error("Failed to send OTP");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setCurrentUser(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, businessDetails?: { 
    businessName?: string, 
    businessType?: 'retailer' | 'distributor' | 'manufacturer' | 'individual',
    isSeller?: boolean 
  }) => {
    try {
      setLoading(true);
      // This should use authService.register, but we're simulating here
      const mockUser = {
        id: "user456",
        email,
        displayName: name,
        photoURL: null,
        isAdmin: false,
        isSeller: businessDetails?.isSeller || false,
        businessName: businessDetails?.businessName,
        businessType: businessDetails?.businessType,
        trustScore: businessDetails?.isSeller ? 0 : undefined,
        verified: false,
      };
      
      setCurrentUser(mockUser);
      localStorage.setItem("zwm_user", JSON.stringify(mockUser));
      toast.success("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to register");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      await authService.resetPassword(email);
      toast.success("Password reset instructions sent to your email!");
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("Failed to send password reset email");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setLoading(true);
      const updatedUser = await userService.updateProfile(data);
      if (updatedUser) {
        setCurrentUser(updatedUser);
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("Failed to update profile");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = () => {
    return currentUser?.isAdmin === true;
  };

  const isSeller = () => {
    return currentUser?.isSeller === true;
  };

  const verifySellerAccount = async (businessDocuments: File[]) => {
    try {
      setLoading(true);
      const success = await userService.verifySellerAccount(businessDocuments);
      if (success) {
        const user = await userService.getCurrentUser();
        setCurrentUser(user);
        toast.success("Seller account verification request submitted successfully!");
      } else {
        toast.error("Failed to submit seller account verification request");
      }
    } catch (error) {
      console.error("Seller account verification error:", error);
      toast.error("Failed to submit seller account verification request");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    currentUser,
    loading,
    login,
    googleLogin,
    phoneLogin,
    logout,
    register,
    resetPassword,
    updateProfile,
    verifySellerAccount,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the AuthContext (for use-auth.ts)
export { AuthContext };
