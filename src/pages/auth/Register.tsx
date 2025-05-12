import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import MobileOtpVerification from '@/components/auth/MobileOtpVerification';
import { Mail, Smartphone, User, Lock, UserPlus } from 'lucide-react';

// Base schema for common fields
const baseUserSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  confirmPassword: z.string(),
});

// Schema with password validation for regular users
const userSchema = baseUserSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Schema for sellers with additional fields
const sellerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  confirmPassword: z.string(),
  businessName: z.string().min(2, { message: 'Business name is required' }),
  businessType: z.enum(['retailer', 'distributor', 'manufacturer', 'individual'], {
    required_error: 'Please select a business type',
  }),
  isSeller: z.boolean().default(true),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Register: React.FC = () => {
  const { register: registerUser, googleLogin, phoneLogin } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [accountType, setAccountType] = useState('buyer'); // 'buyer' or 'seller'
  const [registrationMethod, setRegistrationMethod] = useState<'email' | 'phone'>('email');
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const buyerForm = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const sellerForm = useForm<z.infer<typeof sellerSchema>>({
    resolver: zodResolver(sellerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      businessName: '',
      businessType: 'retailer',
      isSeller: true,
    },
  });

  const onCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const onSubmitBuyer = async (values: z.infer<typeof userSchema>) => {
    if (!captchaValue) {
      toast.error('Please verify that you are not a robot');
      return;
    }

    try {
      setIsLoading(true);
      await registerUser(values.email, values.password, values.name);
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
      await registerUser(
        values.email, 
        values.password, 
        values.name, 
        {
          businessName: values.businessName,
          businessType: values.businessType,
          isSeller: values.isSeller,
        }
      );
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
      await googleLogin();
      toast.success('Successfully signed in with Google!');
      navigate('/dashboard');
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
      phoneLogin(phoneNumber);
      toast.success('Account created successfully with phone verification!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Phone registration error:', error);
      toast.error('Failed to create account with phone. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-2"
          >
            <div className="flex justify-center">
              <motion.div whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}>
                <div className="h-16 w-16 rounded-full zwm-gradient flex items-center justify-center text-white font-bold text-2xl mb-2">ZW</div>
              </motion.div>
            </div>
            <CardTitle className="text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">
              Join Zero Waste Mart to buy and sell surplus goods
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <Tabs value={accountType} onValueChange={setAccountType} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buyer" className="flex items-center justify-center gap-2">
                <User size={16} /> Buyer Account
              </TabsTrigger>
              <TabsTrigger value="seller" className="flex items-center justify-center gap-2">
                <UserPlus size={16} /> Seller Account
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="buyer" className="animate-fade-in">
              <Tabs value={registrationMethod} onValueChange={(v) => setRegistrationMethod(v as 'email' | 'phone')} className="mb-4">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail size={16} /> Email
                  </TabsTrigger>
                  <TabsTrigger value="phone" className="flex items-center gap-2">
                    <Smartphone size={16} /> Phone
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="email">
                  <Form {...buyerForm}>
                    <form onSubmit={buyerForm.handleSubmit(onSubmitBuyer)} className="space-y-4">
                      <FormField
                        control={buyerForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <User size={16} className="text-gray-400" />
                                </div>
                                <Input placeholder="John Doe" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={buyerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <Mail size={16} className="text-gray-400" />
                                </div>
                                <Input placeholder="you@example.com" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={buyerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <Lock size={16} className="text-gray-400" />
                                </div>
                                <Input type="password" placeholder="******" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={buyerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <Lock size={16} className="text-gray-400" />
                                </div>
                                <Input type="password" placeholder="******" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="flex justify-center"
                      >
                        <ReCAPTCHA
                          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // This is a test key
                          onChange={onCaptchaChange}
                        />
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          className="w-full zwm-gradient hover:opacity-90 transition-opacity"
                          disabled={isLoading || !captchaValue}
                        >
                          {isLoading ? 'Creating Account...' : 'Sign Up as Buyer'}
                        </Button>
                      </motion.div>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="phone">
                  <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                      <p className="text-sm text-yellow-800">
                        By registering with your phone number, you'll be able to securely sign in 
                        without a password in the future.
                      </p>
                    </div>
                    
                    <MobileOtpVerification
                      onVerificationComplete={handlePhoneRegistration}
                      onCancel={() => setRegistrationMethod('email')}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>
            
            <TabsContent value="seller" className="animate-fade-in">
              <Form {...sellerForm}>
                <form onSubmit={sellerForm.handleSubmit(onSubmitSeller)} className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-md mb-4">
                    <h3 className="font-medium text-blue-800">Seller Account Benefits</h3>
                    <ul className="mt-2 text-sm text-blue-700 list-disc pl-5 space-y-1">
                      <li>List your surplus goods and products</li>
                      <li>Reach customers interested in sustainable shopping</li>
                      <li>Reduce waste and increase revenue</li>
                      <li>Track sales and analytics</li>
                    </ul>
                  </div>
                
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={sellerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={sellerForm.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Business Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={sellerForm.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select business type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="retailer">Retailer</SelectItem>
                            <SelectItem value="distributor">Distributor</SelectItem>
                            <SelectItem value="manufacturer">Manufacturer</SelectItem>
                            <SelectItem value="individual">Individual Seller</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          This helps us customize your selling experience
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={sellerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Email</FormLabel>
                        <FormControl>
                          <Input placeholder="business@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={sellerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="******" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={sellerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="******" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex justify-center"
                  >
                    <ReCAPTCHA
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // This is a test key
                      onChange={onCaptchaChange}
                    />
                  </motion.div>
                  
                  <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
                    <p>By registering as a seller, you'll need to verify your business after sign-up.</p>
                  </div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full zwm-gradient hover:opacity-90 transition-opacity"
                      disabled={isLoading || !captchaValue}
                    >
                      {isLoading ? 'Creating Account...' : 'Register as Seller'}
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <motion.div 
              className="mt-6"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
                disabled={isLoading || !captchaValue}
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
            </motion.div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <motion.p 
            className="text-sm text-gray-600"
            whileHover={{ scale: 1.05 }}
          >
            Already have an account?{' '}
            <Link to="/login" className="text-zwm-primary hover:underline">
              Sign in
            </Link>
          </motion.p>
        </CardFooter>
      </Card>
      
      <motion.div 
        className="mt-4 text-center text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        By signing up, you agree to our{' '}
        <Link to="#" className="text-zwm-primary hover:underline">Terms of Service</Link>{' '}
        and{' '}
        <Link to="#" className="text-zwm-primary hover:underline">Privacy Policy</Link>
      </motion.div>
    </motion.div>
  );
};

export default Register;
