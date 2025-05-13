
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
      console.error("Login error:", error);
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

  phoneLogin: async (phoneNumber: string): Promise<{ verificationId: string }> => {
    try {
      // Simulate phone login verification process
      console.log(`Sending OTP to ${phoneNumber}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return a mock verification ID
      return { 
        verificationId: "mock_verification_" + Math.random().toString(36).substring(2, 10)
      };
    } catch (error) {
      console.error("Phone login error:", error);
      throw error;
    }
  },

  verifyOtp: async (verificationId: string, otp: string): Promise<boolean> => {
    try {
      // Simple mock verification - any 6 digit OTP is valid
      console.log(`Verifying OTP for verification ID: ${verificationId}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const isValid = otp.length === 6 && /^\d+$/.test(otp);
      return isValid;
    } catch (error) {
      console.error("OTP verification error:", error);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      // Simulate logout
      await new Promise(resolve => setTimeout(resolve, 300));
      localStorage.removeItem("zwm_user");
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  resetPassword: async (email: string): Promise<void> => {
    try {
      // Simulate password reset process
      console.log(`Password reset email sent to ${email}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  }
};
