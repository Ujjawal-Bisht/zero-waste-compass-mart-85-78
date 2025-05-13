import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store, User, Mail, Smartphone, Github } from 'lucide-react';
import ReturnToHomeButton from './LoginComponents/ReturnToHomeButton';
import { userSchema, sellerSchema } from './schemas/registerSchema';

// Import the components we've extracted
import BuyerForm from './register/BuyerForm';
import SellerForm from './register/SellerForm';
import SocialLogin from './register/SocialLogin';
import PhoneRegisterTab from './register/PhoneRegisterTab';
import GoogleLoginSection from './LoginComponents/GoogleLoginSection';
import LoginLink from './register/LoginLink';
import { motion } from 'framer-motion';

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

  // Animation variants for the tab buttons
  const tabButtonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
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
            <motion.div 
              whileHover="hover" 
              whileTap="tap"
              variants={tabButtonVariants}
              className="w-full"
            >
              <TabsTrigger 
                value="buyer" 
                className="flex items-center gap-2 py-3 w-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white transition-all duration-300 hover:bg-blue-50"
              >
                <User size={16} /> 
                <span className="text-base">
                  Buyer
                </span>
              </TabsTrigger>
            </motion.div>
            <motion.div 
              whileHover="hover" 
              whileTap="tap"
              variants={tabButtonVariants}
              className="w-full"
            >
              <TabsTrigger 
                value="seller" 
                className="flex items-center gap-2 py-3 w-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white transition-all duration-300 hover:bg-amber-50"
              >
                <Store size={16} />
                <span className="text-base">
                  Seller
                </span>
              </TabsTrigger>
            </motion.div>
          </TabsList>
          
          <TabsContent value="buyer" className="mt-4 tab-transition">
            <Tabs value={registrationMethod} onValueChange={(v) => setRegistrationMethod(v as 'email' | 'phone' | 'google')} className="mb-4">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <motion.div whileHover="hover" whileTap="tap" variants={tabButtonVariants} className="w-full">
                  <TabsTrigger 
                    value="email" 
                    className="flex items-center gap-2 w-full transition-all duration-300 hover:bg-blue-50"
                  >
                    <Mail size={16} /> Email
                  </TabsTrigger>
                </motion.div>
                <motion.div whileHover="hover" whileTap="tap" variants={tabButtonVariants} className="w-full">
                  <TabsTrigger 
                    value="phone" 
                    className="flex items-center gap-2 w-full transition-all duration-300 hover:bg-blue-50"
                  >
                    <Smartphone size={16} /> Phone
                  </TabsTrigger>
                </motion.div>
                <motion.div whileHover="hover" whileTap="tap" variants={tabButtonVariants} className="w-full">
                  <TabsTrigger 
                    value="google" 
                    className="flex items-center gap-2 w-full transition-all duration-300 hover:bg-blue-50"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg> Google
                  </TabsTrigger>
                </motion.div>
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
                <motion.div whileHover="hover" whileTap="tap" variants={tabButtonVariants} className="w-full">
                  <TabsTrigger 
                    value="email" 
                    className="flex items-center gap-2 w-full transition-all duration-300 hover:bg-amber-50"
                  >
                    <Mail size={16} /> Email
                  </TabsTrigger>
                </motion.div>
                <motion.div whileHover="hover" whileTap="tap" variants={tabButtonVariants} className="w-full">
                  <TabsTrigger 
                    value="phone" 
                    className="flex items-center gap-2 w-full transition-all duration-300 hover:bg-amber-50"
                  >
                    <Smartphone size={16} /> Phone
                  </TabsTrigger>
                </motion.div>
                <motion.div whileHover="hover" whileTap="tap" variants={tabButtonVariants} className="w-full">
                  <TabsTrigger 
                    value="google" 
                    className="flex items-center gap-2 w-full transition-all duration-300 hover:bg-amber-50"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg> Google
                  </TabsTrigger>
                </motion.div>
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
      </motion.div>
      
      <LoginLink />
      
      {/* Return to home button */}
      <ReturnToHomeButton />
    </>
  );
};

export default RegisterForm;
