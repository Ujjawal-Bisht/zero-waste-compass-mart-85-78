
import { User } from "@/types";
import { Session } from "@supabase/supabase-js";

export interface AuthContextType {
  currentUser: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: (accountType: 'buyer' | 'seller') => Promise<void>;
  phoneLogin: (phoneNumber: string, accountType: 'buyer' | 'seller') => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string, businessDetails?: {
    businessName?: string;
    businessType?: 'retailer' | 'distributor' | 'manufacturer' | 'individual';
    isSeller?: boolean;
  }) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  verifySellerAccount: (businessDocuments: File[]) => Promise<void>;
  // 2FA methods
  setupTwoFactor: () => Promise<{ qrCode: string; secret: string }>;
  verifyTwoFactor: (token: string) => Promise<boolean>;
  disableTwoFactor: () => Promise<void>;
  isTwoFactorEnabled: boolean;
}
