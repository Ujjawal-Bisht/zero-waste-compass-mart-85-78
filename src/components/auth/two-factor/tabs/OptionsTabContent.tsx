
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Key, Smartphone } from 'lucide-react';

interface OptionsTabContentProps {
  method: 'app' | 'sms';
  onMethodSelect: (method: 'app' | 'sms') => void;
  onProceed: () => void;
}

const OptionsTabContent: React.FC<OptionsTabContentProps> = ({ 
  method, 
  onMethodSelect,
  onProceed 
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Choose Verification Method</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          className={`p-4 border rounded-lg cursor-pointer ${
            method === 'app' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onMethodSelect('app')}
        >
          <div className="flex items-start">
            <div className={`p-2 rounded-full ${
              method === 'app' ? 'bg-blue-500' : 'bg-gray-200'
            }`}>
              <Key className={`h-5 w-5 ${method === 'app' ? 'text-white' : 'text-gray-500'}`} />
            </div>
            <div className="ml-3">
              <h4 className="font-medium">Authenticator App</h4>
              <p className="text-sm text-gray-500 mt-1">
                Use Google Authenticator, Authy, or any other authenticator app to generate codes
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`p-4 border rounded-lg cursor-pointer ${
            method === 'sms' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onMethodSelect('sms')}
        >
          <div className="flex items-start">
            <div className={`p-2 rounded-full ${
              method === 'sms' ? 'bg-blue-500' : 'bg-gray-200'
            }`}>
              <Smartphone className={`h-5 w-5 ${method === 'sms' ? 'text-white' : 'text-gray-500'}`} />
            </div>
            <div className="ml-3">
              <h4 className="font-medium">SMS Verification</h4>
              <p className="text-sm text-gray-500 mt-1">
                Receive verification codes via text message on your phone
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-end mt-6">
        <Button 
          onClick={onProceed}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Continue with {method === 'app' ? 'Authenticator App' : 'SMS Verification'}
        </Button>
      </div>
    </div>
  );
};

export default OptionsTabContent;
