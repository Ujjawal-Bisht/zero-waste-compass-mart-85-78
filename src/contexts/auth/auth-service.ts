import { User } from "@/types";
import { toast } from "sonner";

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    try {
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
      return mockUser;
    } catch (error) {
      throw error;
    }
  },

  googleLogin: async (): Promise<User> => {
    try {
      // Improved Google login simulation
      console.log("Initiating Google login...");
      
      // Simulate Google OAuth flow with a slight delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create a more realistic mock Google user
      const mockUser = {
        id: "google_" + Math.random().toString(36).substring(2, 9),
        email: "user" + Math.floor(Math.random() * 1000) + "@gmail.com",
        displayName: "Google User",
        photoURL: "https://randomuser.me/api/portraits/lego/1.jpg", // Use a random avatar
        isAdmin: false,
        isSeller: false,
        trustScore: undefined,
        verified: true, // Google accounts are considered verified
      };
      
      console.log("Google login successful:", mockUser);
      localStorage.setItem("zwm_user", JSON.stringify(mockUser));
      return mockUser;
    } catch (error) {
      console.error("Google login failed:", error);
      throw error;
    }
  },

  phoneLogin: async (phoneNumber: string): Promise<User> => {
    try {
      // Simulate phone login
      const mockUser = {
        id: "phone123",
        email: null,
        phoneNumber: phoneNumber,
        displayName: `User ${phoneNumber.slice(-4)}`,
        photoURL: null,
        isAdmin: false,
        isSeller: false,
        trustScore: undefined,
        verified: true,  // Phone numbers are considered verified since they received OTP
      };
      
      localStorage.setItem("zwm_user", JSON.stringify(mockUser));
      return mockUser;
    } catch (error) {
      throw error;
    }
  },

  register: async (
    email: string, 
    password: string, 
    name: string, 
    businessDetails?: { 
      businessName?: string, 
      businessType?: 'retailer' | 'distributor' | 'manufacturer' | 'individual',
      isSeller?: boolean 
    }
  ): Promise<User> => {
    try {
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
      
      if (businessDetails?.isSeller) {
        toast.info("Your seller account is pending verification. You'll be notified once approved.");
      }
      
      return mockUser;
    } catch (error) {
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      // Simulate logout
      localStorage.removeItem("zwm_user");
    } catch (error) {
      throw error;
    }
  },

  resetPassword: async (email: string): Promise<void> => {
    try {
      // Simulate password reset
      // This is just a mock, no actual implementation
      return;
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (currentUser: User | null, data: Partial<User>): Promise<User | null> => {
    try {
      // Simulate profile update
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          ...data
        };
        localStorage.setItem("zwm_user", JSON.stringify(updatedUser));
        return updatedUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  },

  verifySellerAccount: async (currentUser: User | null, businessDocuments: File[]): Promise<User | null> => {
    try {
      // Simulate document verification process
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing time
      
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          verified: true,
          trustScore: 3.0 // Initial trust score
        };
        localStorage.setItem("zwm_user", JSON.stringify(updatedUser));
        return updatedUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  },

  getSavedUser: (): User | null => {
    const storedUser = localStorage.getItem("zwm_user");
    return storedUser ? JSON.parse(storedUser) : null;
  }
};
