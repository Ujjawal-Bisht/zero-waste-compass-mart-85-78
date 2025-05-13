
import React from 'react';
import { Lock } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';

interface SecuritySectionProps {
  form: UseFormReturn<any>;
  isSeller?: boolean;
}

const SecuritySection: React.FC<SecuritySectionProps> = ({ form, isSeller = false }) => {
  return (
    <div className="space-y-4 pt-4 border-t border-gray-200">
      <h3 className="text-lg font-medium">Security</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
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
          control={form.control}
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
      </div>
      
      <FormField
        control={form.control}
        name="acceptTerms"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-gray-50">
            <FormControl>
              <Checkbox 
                checked={field.value} 
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                I accept the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                {isSeller ? ', ' : ' and '}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                {isSeller && (
                  <>, and <a href="#" className="text-blue-600 hover:underline">Seller Agreement</a></>
                )}
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      
      {isSeller && (
        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
          <p>By registering as a seller, you'll need to verify your business after sign-up.</p>
        </div>
      )}
    </div>
  );
};

export default SecuritySection;
