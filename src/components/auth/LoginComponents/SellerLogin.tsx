
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

interface SellerLoginProps {
  onSubmit: (values: EmailFormValues) => Promise<void>;
  isLoading: boolean;
  captchaValue: string | null;
  onCaptchaChange: (value: string | null) => void;
}

const SellerLogin: React.FC<SellerLoginProps> = ({
  onSubmit,
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
    </>
  );
};

export default SellerLogin;
