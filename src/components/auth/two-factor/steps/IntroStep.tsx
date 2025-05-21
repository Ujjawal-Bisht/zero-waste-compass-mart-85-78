
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Lock, ShieldCheck } from 'lucide-react';

interface IntroStepProps {
  isTwoFactorEnabled: boolean;
  isLoading: boolean;
  onSetup: () => Promise<void>;
  onDisable: () => Promise<void>;
}

const IntroStep: React.FC<IntroStepProps> = ({
  isTwoFactorEnabled,
  isLoading,
  onSetup,
  onDisable
}) => {
  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 p-4 border border-blue-100">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 p-2 rounded-full">
            <Lock className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-900">
              {isTwoFactorEnabled 
                ? 'Two-factor authentication is enabled' 
                : 'Secure your account with 2FA'}
            </h3>
            <p className="text-sm text-blue-700 mt-1">
              {isTwoFactorEnabled
                ? 'Your account is protected with an additional layer of security.'
                : 'Add an extra layer of security to your account by requiring a verification code in addition to your password.'}
            </p>
          </div>
        </div>
      </div>

      {isTwoFactorEnabled ? (
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full p-3 flex items-center justify-between rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
          onClick={onDisable}
          disabled={isLoading}
        >
          <div className="flex items-center">
            <div className="bg-red-100 p-2 rounded-full mr-3">
              <ShieldCheck className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-medium">Disable Two-Factor Authentication</h3>
              <p className="text-xs text-gray-500">Remove the additional security layer</p>
            </div>
          </div>
          {isLoading && (
            <div className="animate-spin h-5 w-5 border-2 border-red-500 border-t-transparent rounded-full" />
          )}
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full p-3 flex items-center justify-between rounded-lg border border-green-200 hover:bg-green-50 transition-colors"
          onClick={onSetup}
          disabled={isLoading}
        >
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <ShieldCheck className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-medium">Enable Two-Factor Authentication</h3>
              <p className="text-xs text-gray-500">Add an additional security layer</p>
            </div>
          </div>
          {isLoading && (
            <div className="animate-spin h-5 w-5 border-2 border-green-500 border-t-transparent rounded-full" />
          )}
        </motion.button>
      )}

      <div className="pt-4">
        <h4 className="font-medium text-sm mb-2">How it works</h4>
        <ol className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="bg-gray-100 h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium mr-2 mt-0.5">1</span>
            <span>Set up 2FA using an authenticator app like Google Authenticator</span>
          </li>
          <li className="flex items-start">
            <span className="bg-gray-100 h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium mr-2 mt-0.5">2</span>
            <span>Scan the provided QR code with your app</span>
          </li>
          <li className="flex items-start">
            <span className="bg-gray-100 h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium mr-2 mt-0.5">3</span>
            <span>Enter the 6-digit code from your app to verify setup</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default IntroStep;
