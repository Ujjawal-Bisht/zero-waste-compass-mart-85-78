
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store, User, Mail, Smartphone, BrandGoogle } from 'lucide-react';
import ReturnToHomeButton from './LoginComponents/ReturnToHomeButton';
import { userSchema, sellerSchema } from './schemas/registerSchema';

// Import the components we've extracted
import BuyerForm from './register/BuyerForm';
import SellerForm from './register/SellerForm';
import SocialLogin from './register/SocialLogin';
import PhoneRegisterTab from './register/PhoneRegisterTab';
import GoogleLoginSection from './LoginComponents/GoogleLoginSection';
import LoginLink from './register/LoginLink';

interface RegisterFormProps {
  onAccountTypeChange?: (type: 'buyer' | 'seller') => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onAccountTypeChange }) => {
  const { register: registerUser, googleLogin, phoneLogin } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [accountType, setAccountType] = useState<'buyer' | 'seller'>('buyer');
  const [registrationMethod, setRegistrationMethod] = useState<'email' | 'phone' | 'google'>('email');
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  // Notify parent component when account type changes
  useEffect(() => {
    if (onAccountTypeChange) {
      onAccountTypeChange(accountType);
    }
  }, [accountType, onAccountTypeChange]);

  const onSubmitBuyer = async (values: z.infer<typeof userSchema>) => {
    if (!captchaValue) {
      toast.error('Please verify that you are not a robot');
      return;
    }

    try {
      setIsLoading(true);
      // Create enhanced user object with additional fields
      const extraUserDetails = {
        phoneNumber: values.phone,
        address: values.address,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
        country: values.country,
        dob: values.dob,
        // This fixed the type error by adding isSeller flag
        isSeller: false
      };
      
      await registerUser(values.email, values.password, values.name, extraUserDetails);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitSeller = async (values: z.infer<typeof sellerSchema>) => {
    if (!captchaValue) {
      toast.error('Please verify that you are not a robot');
      return;
    }

    try {
      setIsLoading(true);
      // Create enhanced seller object with additional fields
      const sellerDetails = {
        businessName: values.businessName,
        businessType: values.businessType,
        isSeller: values.isSeller,
        phoneNumber: values.phone,
        address: values.address || values.businessAddress,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
        country: values.country,
        taxId: values.taxId,
        website: values.website,
      };
      
      await registerUser(values.email, values.password, values.name, sellerDetails);
      toast.success('Seller account created successfully!');
      navigate('/seller/profile'); // Redirect to seller verification page
    } catch (error) {
      console.error('Seller registration error:', error);
      toast.error('Failed to create seller account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!captchaValue) {
      toast.error('Please verify that you are not a robot');
      return;
    }
    
    try {
      setIsLoading(true);
      // Pass account type to googleLogin
      await googleLogin(accountType);
      toast.success('Successfully signed in with Google!');
      navigate(accountType === 'seller' ? '/seller/dashboard' : '/dashboard');
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to sign in with Google.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneRegistration = (phoneNumber: string) => {
    try {
      setIsLoading(true);
      // Pass account type to phoneLogin
      phoneLogin(phoneNumber, accountType);
      toast.success('Account created successfully with phone verification!');
      navigate(accountType === 'seller' ? '/seller/dashboard' : '/dashboard');
    } catch (error) {
      console.error('Phone registration error:', error);
      toast.error('Failed to create account with phone. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Tabs 
        value={accountType} 
        onValueChange={(value) => {
          setAccountType(value as 'buyer' | 'seller');
          // Reset captcha when switching account types
          setCaptchaValue(null);
        }} 
        className="mb-6"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger 
            value="buyer" 
            className="flex items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white transition-all duration-300 hover:bg-blue-50"
          >
            <User size={16} /> 
            <span className="text-base">
              Buyer
            </span>
          </TabsTrigger>
          <TabsTrigger 
            value="seller" 
            className="flex items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white transition-all duration-300 hover:bg-amber-50"
          >
            <Store size={16} />
            <span className="text-base">
              Seller
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="buyer" className="mt-4 tab-transition">
          <Tabs value={registrationMethod} onValueChange={(v) => setRegistrationMethod(v as 'email' | 'phone' | 'google')} className="mb-4">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger 
                value="email" 
                className="flex items-center gap-2 transition-all duration-300 hover:bg-blue-50"
              >
                <Mail size={16} /> Email
              </TabsTrigger>
              <TabsTrigger 
                value="phone" 
                className="flex items-center gap-2 transition-all duration-300 hover:bg-blue-50"
              >
                <Smartphone size={16} /> Phone
              </TabsTrigger>
              <TabsTrigger 
                value="google" 
                className="flex items-center gap-2 transition-all duration-300 hover:bg-blue-50"
              >
                <BrandGoogle size={16} /> Google
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="animate-fade-in">
              <BuyerForm
                onSubmit={onSubmitBuyer}
                isLoading={isLoading}
                setCaptchaValue={setCaptchaValue}
                captchaValue={captchaValue}
              />
            </TabsContent>
            
            <TabsContent value="phone" className="animate-fade-in">
              <PhoneRegisterTab
                onVerificationComplete={handlePhoneRegistration}
                onCancel={() => setRegistrationMethod('email')}
              />
            </TabsContent>

            <TabsContent value="google" className="animate-fade-in">
              <GoogleLoginSection 
                handleGoogleLogin={handleGoogleLogin}
                isLoading={isLoading}
                accountType="buyer"
              />
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="seller" className="mt-4 tab-transition">
          <Tabs value={registrationMethod} onValueChange={(v) => setRegistrationMethod(v as 'email' | 'phone' | 'google')} className="mb-4">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger 
                value="email" 
                className="flex items-center gap-2 transition-all duration-300 hover:bg-amber-50"
              >
                <Mail size={16} /> Email
              </TabsTrigger>
              <TabsTrigger 
                value="phone" 
                className="flex items-center gap-2 transition-all duration-300 hover:bg-amber-50"
              >
                <Smartphone size={16} /> Phone
              </TabsTrigger>
              <TabsTrigger 
                value="google" 
                className="flex items-center gap-2 transition-all duration-300 hover:bg-amber-50"
              >
                <BrandGoogle size={16} /> Google
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="animate-fade-in">
              <SellerForm
                onSubmit={onSubmitSeller}
                isLoading={isLoading}
                setCaptchaValue={setCaptchaValue}
                captchaValue={captchaValue}
              />
            </TabsContent>
            
            <TabsContent value="phone" className="animate-fade-in">
              <PhoneRegisterTab
                onVerificationComplete={handlePhoneRegistration}
                onCancel={() => setRegistrationMethod('email')}
              />
            </TabsContent>

            <TabsContent value="google" className="animate-fade-in">
              <GoogleLoginSection 
                handleGoogleLogin={handleGoogleLogin}
                isLoading={isLoading}
                accountType="seller"
              />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
      
      <LoginLink />
      
      {/* Return to home button */}
      <ReturnToHomeButton />
    </>
  );
};

export default RegisterForm;
