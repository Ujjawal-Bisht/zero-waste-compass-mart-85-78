
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TwoFactorSetup from '@/components/auth/two-factor/TwoFactorSetup';
import PasswordChangeForm from './PasswordChangeForm';
import { motion } from 'framer-motion';
import { Key, Smartphone, Shield } from 'lucide-react';

const SecuritySection: React.FC = () => {
  const [securityTab, setSecurityTab] = useState<string>("password");

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Tabs value={securityTab} onValueChange={setSecurityTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="password" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              Password
            </TabsTrigger>
            <TabsTrigger value="2fa" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Two-Factor Auth
            </TabsTrigger>
          </TabsList>

          <TabsContent value="password" className="space-y-4">
            <PasswordChangeForm />
          </TabsContent>
          
          <TabsContent value="2fa" className="space-y-4">
            <div className="rounded-lg border p-4 bg-card">
              <h3 className="text-lg font-semibold mb-2">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Enhance your account security with two-factor authentication using an authenticator app
              </p>
              <TwoFactorSetup />
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </>
  );
};

export default SecuritySection;
