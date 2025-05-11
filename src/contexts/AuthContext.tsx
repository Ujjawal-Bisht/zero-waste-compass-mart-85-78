
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  isAdmin: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
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

  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      // Simulate registration
      const mockUser = {
        id: "user456",
        email,
        displayName: name,
        photoURL: null,
        isAdmin: false,
      };
      
      localStorage.setItem("zwm_user", JSON.stringify(mockUser));
      setCurrentUser(mockUser);
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
    logout,
    register,
    resetPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
