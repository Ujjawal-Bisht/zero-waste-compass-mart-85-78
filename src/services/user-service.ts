
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

  updateSocialMedia: async (socialMedia: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  }): Promise<User | null> => {
    try {
      const currentUser = await userService.getCurrentUser();
      
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          socialMedia: {
            ...currentUser.socialMedia,
            ...socialMedia
          }
        };
        
        localStorage.setItem("zwm_user", JSON.stringify(updatedUser));
        console.log("Social media updated successfully:", updatedUser);
        return updatedUser;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating social media:", error);
      throw error;
    }
  },

  updateNotificationPreferences: async (preferences: {
    email?: boolean;
    push?: boolean;
    sms?: boolean;
    marketingEmails?: boolean;
  }): Promise<User | null> => {
    try {
      const currentUser = await userService.getCurrentUser();
      
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          notificationPreferences: {
            ...currentUser.notificationPreferences,
            ...preferences
          }
        };
        
        localStorage.setItem("zwm_user", JSON.stringify(updatedUser));
        console.log("Notification preferences updated successfully:", updatedUser);
        return updatedUser;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating notification preferences:", error);
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
