import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'sonner';
import { authService } from '@/services/auth-service';
import { userService } from '@/services/user-service';
import { User } from '@/types/user';

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<User>; // Update this return type
  phoneLogin: (phoneNumber: string) => Promise<{ verificationId: string }>;
  verifyOtp: (verificationId: string, otp: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
  isSeller: () => boolean;
  verifySellerAccount: (businessDocuments: File[]) => Promise<boolean>;
}

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
      return user; // Return the user for component handling
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
      const verificationResult = await authService.phoneLogin(phoneNumber);
      toast.success("OTP sent to your phone number!");
      return verificationResult;
    } catch (error) {
      console.error("Phone login error:", error);
      toast.error("Failed to send OTP");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (verificationId: string, otp: string) => {
    try {
      setLoading(true);
      const success = await authService.verifyOtp(verificationId, otp);
      if (success) {
        const user = await userService.getCurrentUser();
        setCurrentUser(user);
        toast.success("Phone number verified successfully!");
        return true;
      } else {
        toast.error("Invalid OTP");
        return false;
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("Failed to verify OTP");
      return false;
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
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = () => {
    return currentUser?.role === 'admin';
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
        return true;
      } else {
        toast.error("Failed to submit seller account verification request");
        return false;
      }
    } catch (error) {
      console.error("Seller account verification error:", error);
      toast.error("Failed to submit seller account verification request");
      return false;
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
    verifyOtp,
    logout,
    isAdmin,
    isSeller,
    verifySellerAccount,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
