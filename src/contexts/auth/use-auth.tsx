
import { useContext } from 'react';
import { AuthContext } from './auth-context';
import { mockTwoFactorFunctions } from './index';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  // Enhance the auth context with 2FA functions
  return {
    ...context,
    setupTwoFactor: mockTwoFactorFunctions.setupTwoFactor,
    verifyTwoFactor: mockTwoFactorFunctions.verifyTwoFactor,
    disableTwoFactor: mockTwoFactorFunctions.disableTwoFactor,
    isTwoFactorEnabled: false // This would come from the user object in a real implementation
  };
};
