
import React, { useState } from 'react';
import { Smartphone, Check, Key } from 'lucide-react';
import CardBox from '../components/CardBox';

interface OptionsTabContentProps {
  method: "app" | "sms";
  setMethod: (method: "app" | "sms") => void;
  onProceed: () => void;
}

const OptionsTabContent: React.FC<OptionsTabContentProps> = ({ 
  method, 
  setMethod,
  onProceed
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleMethodSelect = (selectedMethod: "app" | "sms") => {
    setMethod(selectedMethod);
  };

  // Function to simulate the process of setting up 2FA
  const handleProceed = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onProceed();
    } catch (error) {
      console.error('Error setting up 2FA:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-6">
        Choose your preferred method for two-factor authentication:
      </div>

      <CardBox
        icon={Key}
        title="Authenticator App"
        desc="Use an app like Google Authenticator or Authy to generate verification codes"
        onClick={() => handleMethodSelect("app")}
        active={method === "app"}
      >
        {method === "app" && (
          <div className="mt-3 flex items-center text-xs text-green-600">
            <Check className="mr-1 h-3.5 w-3.5" />
            <span>Selected</span>
          </div>
        )}
      </CardBox>

      <CardBox
        icon={Smartphone}
        title="SMS Verification"
        desc="Receive a verification code via SMS to your registered mobile number"
        onClick={() => handleMethodSelect("sms")}
        active={method === "sms"}
      >
        {method === "sms" && (
          <div className="mt-3 flex items-center text-xs text-green-600">
            <Check className="mr-1 h-3.5 w-3.5" />
            <span>Selected</span>
          </div>
        )}
      </CardBox>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleProceed}
          disabled={isLoading}
          className="px-4 py-2 rounded-md border border-blue-500 bg-blue-50 text-blue-700 
          hover:bg-blue-100 transition-colors font-medium focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:ring-opacity-50"
        >
          {isLoading ? (
            <>
              <span className="inline-block mr-2 animate-spin">⏳</span> 
              Setting up...
            </>
          ) : (
            'Continue'
          )}
        </button>
      </div>
    </div>
  );
};

export default OptionsTabContent;
