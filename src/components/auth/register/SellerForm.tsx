
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { sellerSchema } from '../schemas/registerSchema';

// Import refactored sections
import SellerBenefits from './form-sections/SellerBenefits';
import PersonalInfoSection from './form-sections/PersonalInfoSection';
import BusinessInfoSection from './form-sections/BusinessInfoSection';
import AddressSection from './form-sections/AddressSection';
import SecuritySection from './form-sections/SecuritySection';
import CaptchaAndSubmit from './form-sections/CaptchaAndSubmit';

interface SellerFormProps {
  onSubmit: (values: z.infer<typeof sellerSchema>) => void;
  isLoading: boolean;
  setCaptchaValue: (value: string | null) => void;
  captchaValue: string | null;
}

const SellerForm: React.FC<SellerFormProps> = ({ 
  onSubmit,
  isLoading,
  setCaptchaValue,
  captchaValue
}) => {
  const form = useForm<z.infer<typeof sellerSchema>>({
    resolver: zodResolver(sellerSchema),
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
      businessName: '',
      businessType: 'retailer',
      businessAddress: '',
      taxId: '',
      website: '',
      acceptTerms: false,
      isSeller: true,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <SellerBenefits />
        <PersonalInfoSection form={form} isSeller={true} />
        <BusinessInfoSection form={form} />
        <AddressSection form={form} isSeller={true} isBusiness={true} />
        <SecuritySection form={form} isSeller={true} />
        <CaptchaAndSubmit 
          isLoading={isLoading}
          setCaptchaValue={setCaptchaValue}
          captchaValue={captchaValue}
          isSeller={true}
        />
      </form>
    </Form>
  );
};

export default SellerForm;
