
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
      // Improved Google login simulation with real-like account selection
      console.log("Initiating Google login...");
      
      // Simulate Google OAuth flow with a clear account selection UI
      let selectedAccount = await new Promise<string | null>((resolve) => {
        // Create the overlay for the modal
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.right = '0';
        overlay.style.bottom = '0';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '9999';

        // Create modal container
        const modal = document.createElement('div');
        modal.style.width = '380px';
        modal.style.maxWidth = '90%';
        modal.style.backgroundColor = 'white';
        modal.style.borderRadius = '8px';
        modal.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
        modal.style.overflow = 'hidden';
        modal.style.fontFamily = 'Arial, sans-serif';

        // Modal header
        const header = document.createElement('div');
        header.style.padding = '24px';
        header.style.textAlign = 'center';
        header.style.borderBottom = '1px solid #e0e0e0';

        const logo = document.createElement('div');
        logo.innerHTML = `
          <svg viewBox="0 0 24 24" width="40" height="40" style="margin: 0 auto;">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
          </svg>
        `;
        header.appendChild(logo);

        const title = document.createElement('h2');
        title.textContent = 'Choose an account';
        title.style.margin = '16px 0 8px';
        title.style.fontSize = '18px';
        title.style.fontWeight = '500';
        title.style.color = '#202124';
        header.appendChild(title);

        const subtitle = document.createElement('p');
        subtitle.textContent = 'to continue to Zero Waste Mart';
        subtitle.style.margin = '0';
        subtitle.style.fontSize = '14px';
        subtitle.style.color = '#5f6368';
        header.appendChild(subtitle);

        // Modal body - account options
        const body = document.createElement('div');
        body.style.padding = '8px 0';

        // Real account options
        const accounts = [
          { email: 'your.actual@gmail.com', name: 'Your Name', photo: 'https://randomuser.me/api/portraits/women/68.jpg' },
          { email: 'your.work@company.com', name: 'Work Account', photo: 'https://randomuser.me/api/portraits/men/43.jpg' },
          { email: 'use.different@account.com', name: 'Use another account', photo: '' }
        ];

        accounts.forEach((account, index) => {
          const accountOption = document.createElement('div');
          accountOption.style.padding = '12px 24px';
          accountOption.style.display = 'flex';
          accountOption.style.alignItems = 'center';
          accountOption.style.cursor = 'pointer';
          accountOption.style.transition = 'background-color 0.2s';
          
          accountOption.addEventListener('mouseover', () => {
            accountOption.style.backgroundColor = '#f5f5f5';
          });
          
          accountOption.addEventListener('mouseout', () => {
            accountOption.style.backgroundColor = 'transparent';
          });
          
          accountOption.addEventListener('click', () => {
            // Close the modal and resolve with the selected account
            document.body.removeChild(overlay);
            if (index === accounts.length - 1) {
              // "Use another account" option
              resolve(null);
            } else {
              resolve(account.email);
            }
          });
          
          if (account.photo) {
            const photo = document.createElement('img');
            photo.src = account.photo;
            photo.style.width = '36px';
            photo.style.height = '36px';
            photo.style.borderRadius = '50%';
            photo.style.marginRight = '16px';
            accountOption.appendChild(photo);
          } else {
            // Icon for "Use another account"
            const icon = document.createElement('div');
            icon.style.width = '36px';
            icon.style.height = '36px';
            icon.style.borderRadius = '50%';
            icon.style.backgroundColor = '#f5f5f5';
            icon.style.display = 'flex';
            icon.style.alignItems = 'center';
            icon.style.justifyContent = 'center';
            icon.style.marginRight = '16px';
            icon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="#5f6368" d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>';
            accountOption.appendChild(icon);
          }
          
          const accountDetails = document.createElement('div');
          
          const accountEmail = document.createElement('div');
          accountEmail.textContent = account.email;
          accountEmail.style.fontSize = '14px';
          accountEmail.style.fontWeight = '500';
          accountEmail.style.color = '#202124';
          accountDetails.appendChild(accountEmail);
          
          if (account.name && index !== accounts.length - 1) {
            const accountName = document.createElement('div');
            accountName.textContent = account.name;
            accountName.style.fontSize = '12px';
            accountName.style.color = '#5f6368';
            accountDetails.appendChild(accountName);
          }
          
          accountOption.appendChild(accountDetails);
          body.appendChild(accountOption);
        });

        // Modal footer
        const footer = document.createElement('div');
        footer.style.padding = '16px 24px';
        footer.style.borderTop = '1px solid #e0e0e0';
        footer.style.display = 'flex';
        footer.style.justifyContent = 'space-between';
        footer.style.fontSize = '14px';

        const privacyLink = document.createElement('a');
        privacyLink.textContent = 'Privacy Policy';
        privacyLink.style.color = '#1a73e8';
        privacyLink.style.textDecoration = 'none';
        privacyLink.style.cursor = 'pointer';
        privacyLink.addEventListener('click', (e) => {
          e.preventDefault();
          window.open('https://policies.google.com/privacy', '_blank');
        });
        footer.appendChild(privacyLink);

        const termsLink = document.createElement('a');
        termsLink.textContent = 'Terms of Service';
        termsLink.style.color = '#1a73e8';
        termsLink.style.textDecoration = 'none';
        termsLink.style.cursor = 'pointer';
        termsLink.addEventListener('click', (e) => {
          e.preventDefault();
          window.open('https://policies.google.com/terms', '_blank');
        });
        footer.appendChild(termsLink);

        // Assemble modal
        modal.appendChild(header);
        modal.appendChild(body);
        modal.appendChild(footer);
        overlay.appendChild(modal);

        // Close when clicking outside
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) {
            document.body.removeChild(overlay);
            resolve(null);
          }
        });

        document.body.appendChild(overlay);
      });

      // If user cancels or chooses "Use another account"
      if (!selectedAccount) {
        toast.info("Google sign-in was cancelled");
        throw new Error("Google sign-in cancelled");
      }
      
      // Simulate OAuth verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a user based on the selected account
      const mockUser = {
        id: "google_" + Math.random().toString(36).substring(2, 9),
        email: selectedAccount,
        displayName: selectedAccount.split('@')[0].replace(/\./g, ' '),
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
