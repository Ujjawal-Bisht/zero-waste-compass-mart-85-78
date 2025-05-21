
import React from 'react';
import { Separator } from '@/components/ui/separator';
import TwoFactorSetup from '@/components/auth/two-factor/TwoFactorSetup';
import PasswordChangeForm from './PasswordChangeForm';

const SecuritySection: React.FC = () => {
  return (
    <>
      <PasswordChangeForm />
      
      <Separator className="my-6" />
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
        <TwoFactorSetup />
      </div>
    </>
  );
};

export default SecuritySection;
