
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

interface EmailLoginProps {
  onSubmit: (values: EmailFormValues) => Promise<void>;
  isLoading: boolean;
  captchaValue: string | null;
  onCaptchaChange: (value: string | null) => void;
  submitButtonText: string;
  accountType: 'buyer' | 'seller';
  onGoogleLogin?: () => Promise<void>;
}

const SharedEmailLogin: React.FC<EmailLoginProps> = ({
  onSubmit,
  isLoading,
  captchaValue,
  onCaptchaChange,
  submitButtonText,
  accountType,
  onGoogleLogin,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const ringColor = accountType === 'buyer' ? 'ring-blue-300' : 'ring-amber-300';
  const gradientColors = accountType === 'buyer' 
    ? 'from-blue-50 via-white to-indigo-50 border-blue-100'
    : 'from-amber-50 via-white to-orange-50 border-amber-100';
  
  const buttonClass = accountType === 'buyer'
    ? 'w-full zwm-gradient hover:opacity-90 transition-all duration-300 h-11 text-lg font-medium'
    : 'w-full bg-zwm-secondary hover:bg-zwm-secondary/90 text-white transition-all duration-300 h-12 text-lg font-medium';

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">{accountType === 'buyer' ? 'Email' : 'Business Email'}</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <motion.div
                            whileHover={{ rotate: [0, -10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            <Mail className="h-5 w-5 text-gray-400" />
                          </motion.div>
                        </div>
                        <Input 
                          placeholder={accountType === 'buyer' ? "you@example.com" : "business@example.com"} 
                          className={`pl-10 input-animated-border transition-all duration-300 focus:ring-2 ${ringColor}`}
                          {...field} 
                        />
                      </div>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Password</FormLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Lock className="h-5 w-5 text-gray-400" />
                      </motion.div>
                    </div>
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="******" 
                      className={`pl-10 pr-10 input-animated-border transition-all duration-300 focus:ring-2 ${ringColor}`} 
                      {...field} 
                    />
                    <motion.div 
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-700" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-700" />
                      )}
                    </motion.div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`remember-${accountType}`}
                className="h-4 w-4 text-zwm-primary focus:ring-zwm-primary border-gray-300 rounded"
              />
              <Label
                htmlFor={`remember-${accountType}`}
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex justify-center my-4"
          >
            <div className={`captcha-container w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-sm bg-gradient-to-br ${gradientColors} p-2`}>
              <motion.div
                className="relative flex justify-center"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // This is a test key
                  onChange={onCaptchaChange}
                />
                <motion.div 
                  className={`absolute inset-0 bg-${accountType === 'buyer' ? 'blue' : 'amber'}-400 opacity-0 rounded-lg pointer-events-none`}
                  animate={{ 
                    opacity: [0, 0.05, 0],
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Button
              type="submit"
              className={buttonClass}
              disabled={isLoading || !captchaValue}
            >
              {isLoading ? 'Signing In...' : submitButtonText}
            </Button>
          </motion.div>
        </form>
      </Form>
      
      {accountType === 'seller' && (
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Not registered as a seller?{' '}
            <Link to="/register" className="text-zwm-secondary hover:text-zwm-secondary/80 font-medium">
              Register your business
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default SharedEmailLogin;
