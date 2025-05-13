
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

interface CaptchaAndSubmitProps {
  isLoading: boolean;
  setCaptchaValue: (value: string | null) => void;
  captchaValue: string | null;
  isSeller?: boolean;
  formErrors?: boolean;
}

const CaptchaAndSubmit: React.FC<CaptchaAndSubmitProps> = ({
  isLoading,
  setCaptchaValue,
  captchaValue,
  isSeller = false,
  formErrors = false,
}) => {
  return (
    <div className="space-y-6 pt-4">
      {/* Form validation error message */}
      {formErrors && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Please correct the errors in the form before submitting
          </AlertDescription>
        </Alert>
      )}
      
      {/* Captcha */}
      <div className="flex justify-center">
        <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // This is Google's test key
          onChange={(value) => setCaptchaValue(value)}
        />
      </div>
      
      {!captchaValue && (
        <div className="text-center text-sm text-orange-600">
          Please verify that you're not a robot
        </div>
      )}
      
      {/* Submit button */}
      <div className="flex justify-center">
        <Button 
          type="submit" 
          disabled={isLoading || !captchaValue}
          className={`w-full max-w-md ${isSeller ? 'bg-amber-600 hover:bg-amber-700' : ''}`}
        >
          {isLoading ? (
            <>
              <span className="animate-spin mr-2">◌</span>
              {isSeller ? "Creating Seller Account..." : "Creating Account..."}
            </>
          ) : (
            <>{isSeller ? "Create Seller Account" : "Create Account"}</>
          )}
        </Button>
      </div>
      
      <div className="text-center text-xs text-gray-500">
        By registering, you're agreeing to our Terms of Service and Privacy Policy
      </div>
    </div>
  );
};

export default CaptchaAndSubmit;
