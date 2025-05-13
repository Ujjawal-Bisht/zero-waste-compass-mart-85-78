
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { userSchema } from '../schemas/registerSchema';
import { toast } from 'sonner';

// Import refactored sections
import PersonalInfoSection from './form-sections/PersonalInfoSection';
import AddressSection from './form-sections/AddressSection';
import SecuritySection from './form-sections/SecuritySection';
import CaptchaAndSubmit from './form-sections/CaptchaAndSubmit';

interface BuyerFormProps {
  onSubmit: (values: z.infer<typeof userSchema>) => void;
  isLoading: boolean;
  setCaptchaValue: (value: string | null) => void;
  captchaValue: string | null;
}

const BuyerForm: React.FC<BuyerFormProps> = ({ 
  onSubmit,
  isLoading,
  setCaptchaValue,
  captchaValue
}) => {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      dob: '',
      acceptTerms: false,
    },
    mode: 'onBlur', // Validate on blur for better user experience
  });

  const handleFormSubmit = (values: z.infer<typeof userSchema>) => {
    if (!captchaValue) {
      toast.error('Please verify that you are not a robot');
      return;
    }
    
    try {
      onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <PersonalInfoSection form={form} />
        <AddressSection form={form} />
        <SecuritySection form={form} />
        <CaptchaAndSubmit 
          isLoading={isLoading}
          setCaptchaValue={setCaptchaValue}
          captchaValue={captchaValue}
          formErrors={Object.keys(form.formState.errors).length > 0}
        />
      </form>
    </Form>
  );
};

export default BuyerForm;
