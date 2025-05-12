
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import { Eye, EyeOff, Mail, Lock, Smartphone, ShoppingBag, Store } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MobileOtpVerification from '@/components/auth/MobileOtpVerification';

const emailFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

const accountTypeOptions = ["buyer", "seller"] as const;

const Login: React.FC = () => {
  const { login, googleLogin, phoneLogin } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [accountType, setAccountType] = useState<'buyer' | 'seller'>('buyer');

  const form = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const onSubmit = async (values: z.infer<typeof emailFormSchema>) => {
    if (!captchaValue) {
      toast.error('Please verify that you are not a robot');
      return;
    }

    try {
      setIsLoading(true);
      // Add account type to email for mock service to determine account type
      const emailWithType = accountType === 'seller' 
        ? `seller_${values.email}` 
        : values.email;
        
      await login(emailWithType, values.password);
      toast.success(`Successfully signed in as ${accountType}!`);
      navigate(accountType === 'seller' ? '/seller/dashboard' : '/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to sign in. Please check your credentials.');
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

  const handlePhoneLogin = async (phoneNumber: string) => {
    try {
      setIsLoading(true);
      await phoneLogin(phoneNumber);
      navigate('/dashboard');
    } catch (error) {
      console.error('Phone login error:', error);
      toast.error('Failed to sign in with phone number.');
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
      <Card className="border-0 shadow-xl overflow-hidden bg-white rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-zwm-primary/5 to-zwm-secondary/5 z-0"></div>
        
        <CardHeader className="relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-2"
          >
            <CardTitle className="text-2xl font-bold mb-2">Welcome Back</CardTitle>
            <div className="h-1 w-12 bg-gradient-to-r from-zwm-primary to-zwm-secondary mx-auto rounded-full"></div>
          </motion.div>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <Tabs value={accountType} onValueChange={(value) => setAccountType(value as 'buyer' | 'seller')} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buyer" className="flex items-center gap-2">
                <ShoppingBag size={16} /> Buyer
              </TabsTrigger>
              <TabsTrigger value="seller" className="flex items-center gap-2">
                <Store size={16} /> Seller
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="buyer">
              <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as 'email' | 'phone')} className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail size={16} /> Email
                  </TabsTrigger>
                  <TabsTrigger value="phone" className="flex items-center gap-2">
                    <Smartphone size={16} /> Phone
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="email">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Email</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                  </div>
                                  <Input 
                                    placeholder="you@example.com" 
                                    className="pl-10" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Password</FormLabel>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                              </div>
                              <Input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="******" 
                                className="pl-10 pr-10" 
                                {...field} 
                              />
                              <div 
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-700" />
                                ) : (
                                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-700" />
                                )}
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="remember"
                            className="h-4 w-4 text-zwm-primary focus:ring-zwm-primary border-gray-300 rounded"
                          />
                          <Label
                            htmlFor="remember"
                            className="ml-2 block text-sm text-gray-700"
                          >
                            Remember me
                          </Label>
                        </div>
                        <div className="text-sm">
                          <Link to="#" className="text-zwm-primary hover:text-zwm-secondary">
                            Forgot your password?
                          </Link>
                        </div>
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
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          className="w-full zwm-gradient hover:opacity-90 transition-opacity h-12 text-lg font-medium"
                          disabled={isLoading || !captchaValue}
                        >
                          {isLoading ? 'Signing In...' : 'Sign In as Buyer'}
                        </Button>
                      </motion.div>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="phone">
                  <MobileOtpVerification 
                    onVerificationComplete={handlePhoneLogin}
                    onCancel={() => setLoginMethod('email')}
                  />
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
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-2 h-12 text-gray-700 hover:bg-gray-50"
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
                    Sign in with Google
                  </Button>
                </motion.div>
              </div>
            </TabsContent>
            
            <TabsContent value="seller">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Business Email</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                              </div>
                              <Input 
                                placeholder="business@example.com" 
                                className="pl-10" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Password</FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="******" 
                            className="pl-10 pr-10" 
                            {...field} 
                          />
                          <div 
                            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-700" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-700" />
                            )}
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember-seller"
                        className="h-4 w-4 text-zwm-primary focus:ring-zwm-primary border-gray-300 rounded"
                      />
                      <Label
                        htmlFor="remember-seller"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Remember me
                      </Label>
                    </div>
                    <div className="text-sm">
                      <Link to="#" className="text-zwm-primary hover:text-zwm-secondary">
                        Forgot your password?
                      </Link>
                    </div>
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
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-zwm-secondary hover:bg-zwm-secondary/90 text-white transition-opacity h-12 text-lg font-medium"
                      disabled={isLoading || !captchaValue}
                    >
                      {isLoading ? 'Signing In...' : 'Sign In as Seller'}
                    </Button>
                  </motion.div>
                </form>
              </Form>

              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600">
                  Not registered as a seller?{' '}
                  <Link to="/register" className="text-zwm-secondary hover:text-zwm-secondary/80 font-medium">
                    Register your business
                  </Link>
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-center relative z-10">
          <motion.p 
            className="text-sm text-gray-600"
            whileHover={{ scale: 1.05 }}
          >
            Don't have an account?{' '}
            <Link to="/register" className="text-zwm-primary hover:text-zwm-secondary font-medium">
              Sign up
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
        By signing in, you agree to our{' '}
        <Link to="#" className="text-zwm-primary hover:text-zwm-secondary">Terms of Service</Link>{' '}
        and{' '}
        <Link to="#" className="text-zwm-primary hover:text-zwm-secondary">Privacy Policy</Link>
      </motion.div>
    </motion.div>
  );
};

export default Login;
