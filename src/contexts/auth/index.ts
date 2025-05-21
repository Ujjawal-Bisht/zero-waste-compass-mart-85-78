
export { AuthProvider } from './auth-context';
export { useAuth } from './use-auth';
export type { AuthContextType } from './auth-types';

// Mock implementation of 2FA functions that can be used until real implementation is added
export const mockTwoFactorFunctions = {
  setupTwoFactor: async () => {
    // Simulate API call to generate QR code and secret
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/ZeroWasteMart:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=ZeroWasteMart",
      secret: "JBSWY3DPEHPK3PXP"
    };
  },
  
  verifyTwoFactor: async (code: string) => {
    // Simulate API verification
    await new Promise(resolve => setTimeout(resolve, 800));
    // Simple validation: code must be 6 digits
    return code.length === 6 && /^\d+$/.test(code);
  },
  
  disableTwoFactor: async () => {
    // Simulate API call to disable 2FA
    await new Promise(resolve => setTimeout(resolve, 800));
    return true;
  }
};
