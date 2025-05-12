
import React, { createContext, useState, useEffect } from "react";
import { User } from "@/types";
import { AuthContextType } from "./auth-types";
import { authService } from "./auth-service";
import { toast } from "sonner";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const user = await authService.login(email, password);
      setCurrentUser(user);
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error("Failed to log in");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      setLoading(true);
      const user = await authService.googleLogin();
      setCurrentUser(user);
      toast.success("Logged in with Google successfully!");
    } catch (error) {
      toast.error("Failed to log in with Google");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const phoneLogin = async (phoneNumber: string) => {
    try {
      setLoading(true);
      const user = await authService.phoneLogin(phoneNumber);
      setCurrentUser(user);
      toast.success("Logged in with phone successfully!");
    } catch (error) {
      toast.error("Failed to log in with phone");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string, 
    password: string, 
    name: string, 
    businessDetails?: { 
      businessName?: string, 
      businessType?: 'retailer' | 'distributor' | 'manufacturer' | 'individual',
      isSeller?: boolean 
    }
  ) => {
    try {
      setLoading(true);
      const user = await authService.register(email, password, name, businessDetails);
      setCurrentUser(user);
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Failed to create account");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setCurrentUser(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to log out");
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await authService.resetPassword(email);
      toast.success("Password reset email sent!");
    } catch (error) {
      toast.error("Failed to send password reset email");
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      const updatedUser = await authService.updateProfile(currentUser, data);
      if (updatedUser) {
        setCurrentUser(updatedUser);
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error("Failed to update profile");
      throw error;
    }
  };

  const verifySellerAccount = async (businessDocuments: File[]) => {
    try {
      setLoading(true);
      const updatedUser = await authService.verifySellerAccount(currentUser, businessDocuments);
      if (updatedUser) {
        setCurrentUser(updatedUser);
        toast.success("Your seller account has been verified!");
      }
    } catch (error) {
      toast.error("Failed to verify seller account");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check for stored user on app load
    const storedUser = authService.getSavedUser();
    if (storedUser) {
      setCurrentUser(storedUser);
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    loading,
    login,
    googleLogin,
    phoneLogin,
    logout,
    register,
    resetPassword,
    updateProfile,
    verifySellerAccount
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
