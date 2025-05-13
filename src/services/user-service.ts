
import { User } from "@/types";
import { authService } from "./auth-service";

export const userService = {
  getCurrentUser: async (): Promise<User | null> => {
    try {
      // Check localStorage for existing user
      const storedUser = localStorage.getItem("zwm_user");
      if (storedUser) {
        return JSON.parse(storedUser);
      }
      return null;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },

  updateProfile: async (data: Partial<User>): Promise<User | null> => {
    try {
      // Get current user
      const currentUser = await userService.getCurrentUser();
      
      if (currentUser) {
        // Update user data
        const updatedUser = {
          ...currentUser,
          ...data
        };
        
        // Store updated user
        localStorage.setItem("zwm_user", JSON.stringify(updatedUser));
        console.log("Profile updated successfully:", updatedUser);
        return updatedUser;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },

  verifySellerAccount: async (businessDocuments: File[]): Promise<boolean> => {
    try {
      // Mock verification process
      console.log("Processing seller verification documents:", businessDocuments.length, "files submitted");
      
      // Simulate verification delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Get current user
      const currentUser = await userService.getCurrentUser();
      
      if (currentUser) {
        // Update user to show verification in progress
        const updatedUser = {
          ...currentUser,
          verificationStatus: "pending"
        };
        
        localStorage.setItem("zwm_user", JSON.stringify(updatedUser));
        
        // For demo purposes, we'll simulate success
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error verifying seller account:", error);
      throw error;
    }
  }
};
