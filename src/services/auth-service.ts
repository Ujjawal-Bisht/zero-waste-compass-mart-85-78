
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

  googleLogin: async (accountType: 'buyer' | 'seller' = 'buyer'): Promise<User> => {
    try {
      // Improved Google login simulation with account selection dialog
      console.log("Initiating Google login as", accountType);
      
      // Show a simulated account selection dialog
      await new Promise(resolve => {
        // Create and show a Google-like account selection dialog
        const modalOverlay = document.createElement('div');
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = '0';
        modalOverlay.style.left = '0';
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.backgroundColor = 'rgba(0,0,0,0.6)';
        modalOverlay.style.display = 'flex';
        modalOverlay.style.alignItems = 'center';
        modalOverlay.style.justifyContent = 'center';
        modalOverlay.style.zIndex = '9999';
        
        const modalContent = document.createElement('div');
        modalContent.style.width = '350px';
        modalContent.style.backgroundColor = 'white';
        modalContent.style.borderRadius = '8px';
        modalContent.style.padding = '24px';
        modalContent.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        
        modalContent.innerHTML = `
          <div style="text-align: center; margin-bottom: 20px;">
            <svg viewBox="0 0 24 24" width="50px" height="50px" style="margin: 0 auto;">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
            </svg>
            <h3 style="margin: 16px 0; font-size: 18px; color: #202124;">Choose an account</h3>
            <p style="color: #5f6368; font-size: 14px;">to continue to Zero Waste Mart</p>
          </div>
          <div style="cursor: pointer; padding: 12px; border-radius: 4px; display: flex; align-items: center; margin-bottom: 12px; border: 1px solid #dadce0;" id="account1">
            <img src="https://randomuser.me/api/portraits/lego/1.jpg" style="width: 36px; height: 36px; border-radius: 50%; margin-right: 12px;">
            <div>
              <div style="font-size: 14px; color: #202124;">user123@gmail.com</div>
              <div style="font-size: 12px; color: #5f6368;">Google Account</div>
            </div>
          </div>
          <div style="cursor: pointer; padding: 12px; border-radius: 4px; display: flex; align-items: center; border: 1px solid #dadce0;" id="account2">
            <img src="https://randomuser.me/api/portraits/lego/2.jpg" style="width: 36px; height: 36px; border-radius: 50%; margin-right: 12px;">
            <div>
              <div style="font-size: 14px; color: #202124;">business@gmail.com</div>
              <div style="font-size: 12px; color: #5f6368;">Business Account</div>
            </div>
          </div>
        `;
        
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
        
        // Handle account selection
        const account1 = modalContent.querySelector('#account1');
        const account2 = modalContent.querySelector('#account2');
        
        account1?.addEventListener('click', () => {
          document.body.removeChild(modalOverlay);
          resolve(null);
        });
        
        account2?.addEventListener('click', () => {
          document.body.removeChild(modalOverlay);
          resolve(null);
        });
        
        // Let user close by clicking outside
        modalOverlay.addEventListener('click', (e) => {
          if (e.target === modalOverlay) {
            document.body.removeChild(modalOverlay);
            resolve(null);
          }
        });
      });
      
      // Simulate slight delay for authentication
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a more realistic mock Google user based on accountType
      const mockUser = {
        id: "google_" + Math.random().toString(36).substring(2, 9),
        email: "user" + Math.floor(Math.random() * 1000) + "@gmail.com",
        displayName: "Google User",
        photoURL: "https://randomuser.me/api/portraits/lego/1.jpg", // Use a random avatar
        isAdmin: false,
        isSeller: accountType === 'seller', // Set isSeller based on accountType
        businessName: accountType === 'seller' ? "Google Business" : undefined,
        businessType: accountType === 'seller' ? "retailer" as const : undefined,
        trustScore: accountType === 'seller' ? 3.5 : undefined,
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

  phoneLogin: async (phoneNumber: string, accountType: 'buyer' | 'seller' = 'buyer'): Promise<{ verificationId: string }> => {
    try {
      // Simulate phone login verification process
      console.log(`Sending OTP to ${phoneNumber} for ${accountType} account`);
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
