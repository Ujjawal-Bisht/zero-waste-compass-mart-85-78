
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { userSchema } from '../schemas/registerSchema';

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
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <PersonalInfoSection form={form} />
        <AddressSection form={form} />
        <SecuritySection form={form} />
        <CaptchaAndSubmit 
          isLoading={isLoading}
          setCaptchaValue={setCaptchaValue}
          captchaValue={captchaValue}
        />
      </form>
    </Form>
  );
};

export default BuyerForm;
