
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { User } from "@/types";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  phoneLogin: (phoneNumber: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string, businessDetails?: { 
    businessName?: string, 
    businessType?: 'retailer' | 'distributor' | 'manufacturer' | 'individual',
    isSeller?: boolean 
  }) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  verifySellerAccount: (businessDocuments: File[]) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // This would be replaced with Firebase Auth logic
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate login for now
      const mockUser = {
        id: "user123",
        email,
        displayName: "Demo User",
        photoURL: null,
        isAdmin: email.includes("admin"),
        isSeller: email.includes("seller"),
        businessName: email.includes("seller") ? "Demo Business" : undefined,
        businessType: email.includes("seller") ? "retailer" as const : undefined,
        trustScore: email.includes("seller") ? 4.5 : undefined,
        verified: email.includes("seller") ? true : false,
      };
      
      localStorage.setItem("zwm_user", JSON.stringify(mockUser));
      setCurrentUser(mockUser);
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
      // Simulate Google login
      const mockUser = {
        id: "google123",
        email: "user@gmail.com",
        displayName: "Google User",
        photoURL: "https://via.placeholder.com/150",
        isAdmin: false,
        isSeller: false,
        trustScore: undefined,
        verified: false,
      };
      
      localStorage.setItem("zwm_user", JSON.stringify(mockUser));
      setCurrentUser(mockUser);
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
      // Simulate phone login
      const mockUser = {
        id: "phone123",
        email: null,
        phoneNumber: phoneNumber,
        displayName: "Mobile User",
        photoURL: null,
        isAdmin: false,
        isSeller: false,
        trustScore: undefined,
        verified: true,  // Phone numbers are considered verified since they received OTP
      };
      
      localStorage.setItem("zwm_user", JSON.stringify(mockUser));
      setCurrentUser(mockUser);
      toast.success("Logged in with phone successfully!");
    } catch (error) {
      toast.error("Failed to log in with phone");
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
      // Simulate registration
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
      
      localStorage.setItem("zwm_user", JSON.stringify(mockUser));
      setCurrentUser(mockUser);
      toast.success("Account created successfully!");
      
      if (businessDetails?.isSeller) {
        toast.info("Your seller account is pending verification. You'll be notified once approved.");
      }
    } catch (error) {
      toast.error("Failed to create account");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Simulate logout
      localStorage.removeItem("zwm_user");
      setCurrentUser(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to log out");
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // Simulate password reset
      toast.success("Password reset email sent!");
    } catch (error) {
      toast.error("Failed to send password reset email");
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      // Simulate profile update
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          ...data
        };
        localStorage.setItem("zwm_user", JSON.stringify(updatedUser));
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
      // Simulate document verification process
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing time
      
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          verified: true,
          trustScore: 3.0 // Initial trust score
        };
        localStorage.setItem("zwm_user", JSON.stringify(updatedUser));
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
    const storedUser = localStorage.getItem("zwm_user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
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
