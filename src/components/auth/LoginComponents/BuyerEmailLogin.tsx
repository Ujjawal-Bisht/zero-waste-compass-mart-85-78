
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { emailFormSchema, EmailFormValues } from '@/components/auth/schemas/emailLoginSchema';

interface BuyerEmailLoginProps {
  onSubmit: (values: EmailFormValues) => Promise<void>;
  onGoogleLogin: () => Promise<void>;
  isLoading: boolean;
  captchaValue: string | null;
  onCaptchaChange: (value: string | null) => void;
}

const BuyerEmailLogin: React.FC<BuyerEmailLoginProps> = ({
  onSubmit,
  onGoogleLogin,
  isLoading,
  captchaValue,
  onCaptchaChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          
          {/* Redesigned elegant reCAPTCHA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center my-3"
          >
            <div className="captcha-container w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-sm bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-blue-100 p-3 transform hover:shadow-md transition-all duration-300 ease-in-out">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-center">
                  <div className="compact-captcha scale-95 origin-center">
                    <ReCAPTCHA
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // This is a test key
                      onChange={onCaptchaChange}
                      size="normal"
                      theme="light"
                    />
                  </div>
                </div>
                <motion.div 
                  className="absolute inset-0 bg-blue-400 opacity-5 rounded-lg"
                  animate={{ 
                    opacity: [0.05, 0.1, 0.05],
                    scale: [1, 1.01, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              className="w-full zwm-gradient hover:opacity-90 transition-opacity h-11 text-lg font-medium"
              disabled={isLoading || !captchaValue}
            >
              {isLoading ? 'Signing In...' : 'Sign In as Buyer'}
            </Button>
          </motion.div>
        </form>
      </Form>
    </>
  );
};

export default BuyerEmailLogin;
