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
    <div className="flex items-center justify-center min-h-screen relative px-4">
      {/* Enhanced animated background with more elements and animations - similar to Login page */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 2 }}
        >
          {/* Original floating elements with new animations */}
          <motion.div 
            className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-r from-blue-300 to-indigo-300 blur-3xl opacity-20 glow-pulse"
            animate={{
              y: [0, 30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div 
            className="absolute -bottom-32 -right-16 w-64 h-64 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-3xl opacity-20 spiral-float"
            animate={{
              y: [0, -40, 0],
              x: [0, -30, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2,
            }}
          />
          <motion.div 
            className="absolute top-1/3 -left-32 w-72 h-72 rounded-full bg-gradient-to-r from-green-300 to-emerald-400 blur-3xl opacity-10 color-shift"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1,
            }}
          />
          
          {/* Additional enhanced animated elements */}
          <motion.div 
            className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 blur-3xl opacity-10 radiance"
            animate={{
              scale: [1, 1.1, 0.9, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 3,
            }}
          />
          <motion.div 
            className="absolute top-1/4 right-1/3 w-32 h-32 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 blur-3xl opacity-15 particle-float"
            animate={{
              y: [0, -20, 20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 5,
            }}
          />
          
          {/* New animated elements */}
          <motion.div 
            className="absolute top-1/2 right-20 w-28 h-28 rounded-full bg-gradient-to-r from-pink-300 to-rose-400 blur-3xl opacity-20 orbit"
            animate={{
              x: [0, 30, 0, -30, 0],
              y: [0, 30, 0, -30, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 left-20 w-36 h-36 rounded-full bg-gradient-to-r from-yellow-200 to-yellow-400 blur-3xl opacity-10 blur-breathe"
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          
          {/* Additional NEW animated elements */}
          <motion.div 
            className="absolute top-1/4 left-1/3 w-44 h-44 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-500 blur-3xl opacity-10 spiral-float"
            animate={{
              rotate: [0, 180, 360],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 7,
            }}
          />
          
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 blur-3xl opacity-10 radiance"
            animate={{
              y: [0, -40, 20, 0],
              x: [0, 30, -20, 0],
              rotate: [0, 20, -10, 0],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          
          <motion.div 
            className="absolute top-10 right-1/3 w-24 h-24 rounded-full bg-gradient-to-r from-red-300 to-orange-300 blur-3xl opacity-15 glow-pulse"
            animate={{
              y: [0, 15, -15, 0],
              x: [0, -10, 10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "mirror",
              delay: 2,
            }}
          />
          
          <motion.div 
            className="absolute top-2/3 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-purple-300 to-indigo-500 blur-3xl opacity-10 pulse-glow"
            animate={{
              scale: [1, 1.2, 0.9, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-blue-400/10 to-indigo-400/10 blur-3xl gradient-shift"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          
          <motion.div 
            className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-r from-emerald-300 to-teal-400 blur-3xl opacity-10"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 20, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          
          <motion.div 
            className="absolute top-20 left-20 w-4 h-4 rounded-full bg-white opacity-20"
            animate={{
              y: [0, -100],
              opacity: [0.2, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
          
          {/* Animated comets */}
          {[...Array(5)].map((_, i) => (
            <motion.div 
              key={`comet-${i}`}
              className="absolute w-2 h-2 rounded-full bg-white opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() > 0.5 ? 200 : -200],
                y: [0, Math.random() > 0.5 ? 200 : -200],
                opacity: [0.2, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeOut",
              }}
            />
          ))}
          
          {/* Wave effect elements */}
          <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
            {[...Array(5)].map((_, index) => (
              <motion.div
                key={`wave-${index}`}
                className={`absolute h-6 w-full bg-gradient-to-r from-blue-300/10 via-indigo-300/10 to-purple-300/10 rounded-full wave wave-group-${index + 1}`}
                style={{
                  bottom: `${index * 8}px`,
                  opacity: 0.1 - index * 0.01,
                  filter: `blur(${8 + index * 2}px)`,
                }}
              />
            ))}
          </div>
          
          {/* Particle system */}
          {[...Array(20)].map((_, index) => (
            <motion.div
              key={`particle-${index}`}
              className="absolute rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                opacity: Math.random() * 0.3,
              }}
              animate={{
                y: [0, Math.random() * -100],
                x: [0, (Math.random() - 0.5) * 50],
                opacity: [Math.random() * 0.3, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
          
          {/* Background radial gradient overlay */}
          <motion.div
            className="absolute w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2 }}
          >
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-100/5 to-transparent gradient-shift" />
          </motion.div>
          
          {/* Star field background */}
          {[...Array(30)].map((_, index) => (
            <motion.div
              key={`star-${index}`}
              className="absolute bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 1 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Wrap the original motion.div content in a regular div for clarity */}
      <div className="w-full z-10">
        {/* This container preserves the original content's structure */}
        <motion.div 
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}>
              <div className="h-16 w-16 rounded-full zwm-gradient flex items-center justify-center text-white font-bold text-2xl mb-2">ZW</div>
            </motion.div>
          </motion.div>
          
          <Card className="border-0 shadow-xl overflow-hidden bg-white rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 z-0"></div>
            <CardHeader className="relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center mb-2"
              >
                <CardTitle className="text-2xl font-bold mb-2">Create an Account</CardTitle>
                <motion.div 
                  className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"
                  animate={{
                    width: ["0%", "100%", "50%"],
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "easeInOut",
                  }}
                />
                <CardDescription className="text-center mt-2">
                  Join Zero Waste Mart to buy and sell surplus goods
                </CardDescription>
              </motion.div>
            </CardHeader>
            
            <CardContent className="relative z-10">
              {/* Keep all the existing form content as is */}
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
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92
