
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Key, Shield } from 'lucide-react';
import SecurityForm from '@/pages/profile/SecurityForm';
import TwoFactorSetup from '@/components/auth/two-factor/TwoFactorSetup';

const SecuritySection: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>("password");

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6 profile-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Security Settings</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
          <SecurityForm />
        </TabsContent>
        
        <TabsContent value="2fa" className="space-y-4">
          <div className="rounded-lg">
            <TwoFactorSetup />
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default SecuritySection;
