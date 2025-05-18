
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, ShieldCheck, KeyRound, EyeOff, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const passwordSchema = z.object({
  currentPassword: z.string().min(6, {
    message: 'Current password must be at least 6 characters.',
  }),
  newPassword: z.string().min(6, {
    message: 'New password must be at least 6 characters.',
  }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const SecurityForm: React.FC = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onChangePassword = async (data: z.infer<typeof passwordSchema>) => {
    try {
      setIsChangingPassword(true);
      // Simulate password change
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password changed successfully');
      passwordForm.reset();
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.5
      } 
    })
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-3 pb-4">
        <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center">
          <ShieldCheck className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Security Settings</h3>
          <p className="text-muted-foreground text-sm">Manage your password and security preferences</p>
        </div>
      </div>

      <Form {...passwordForm}>
        <form onSubmit={passwordForm.handleSubmit(onChangePassword)} className="space-y-6">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={formItemVariants}
          >
            <FormField
              control={passwordForm.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type={showCurrentPassword ? "text" : "password"} 
                        {...field} 
                        className="pl-10 pr-10 border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
          
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={formItemVariants}
          >
            <FormField
              control={passwordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type={showNewPassword ? "text" : "password"} 
                        {...field} 
                        className="pl-10 pr-10 border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
          
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={formItemVariants}
          >
            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type={showConfirmPassword ? "text" : "password"} 
                        {...field} 
                        className="pl-10 pr-10 border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
          
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={formItemVariants}
            className="pt-2"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transition-all duration-300 w-full md:w-auto"
                disabled={isChangingPassword}
              >
                {isChangingPassword ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  'Change Password'
                )}
              </Button>
            </motion.div>
          </motion.div>
        </form>
      </Form>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="rounded-lg bg-blue-50 p-4 border border-blue-100"
      >
        <h4 className="text-sm font-medium text-blue-800 mb-2">Password Tips</h4>
        <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
          <li>Use a mix of letters, numbers, and symbols</li>
          <li>Make it at least 8 characters long</li>
          <li>Avoid using easily guessable information</li>
          <li>Don't reuse passwords across multiple sites</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default SecurityForm;
