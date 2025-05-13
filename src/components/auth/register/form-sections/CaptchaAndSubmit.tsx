
import React from 'react';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button } from '@/components/ui/button';

interface CaptchaAndSubmitProps {
  isLoading: boolean;
  setCaptchaValue: (value: string | null) => void;
  captchaValue: string | null;
  isSeller?: boolean;
}

const CaptchaAndSubmit: React.FC<CaptchaAndSubmitProps> = ({
  isLoading,
  setCaptchaValue,
  captchaValue,
  isSeller = false
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex justify-center"
      >
        <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // This is a test key
          onChange={setCaptchaValue}
        />
      </motion.div>
      
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          className={`w-full ${isSeller ? 'zwm-gradient-hover' : 'zwm-gradient hover:opacity-90'} transition-opacity`}
          disabled={isLoading || !captchaValue}
        >
          {isLoading ? 'Creating Account...' : isSeller ? 'Register as Seller' : 'Sign Up as Buyer'}
        </Button>
      </motion.div>
    </>
  );
};

export default CaptchaAndSubmit;
