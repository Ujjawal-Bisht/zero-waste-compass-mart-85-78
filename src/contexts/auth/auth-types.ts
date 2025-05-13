
import { User } from "@/types";

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<User>;
  phoneLogin: (phoneNumber: string) => Promise<{ verificationId: string }>;
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
