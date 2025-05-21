
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';
import BusinessInfoForm from './profile/BusinessInfoForm';
import SecuritySection from './profile/SecuritySection';

const ProfileFormTab: React.FC = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="shadow-pop hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>Manage your business details</CardDescription>
          </CardHeader>
          <CardContent>
            <BusinessInfoForm />
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="shadow-pop hover:shadow-lg transition-all duration-300 mt-6">
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent>
            <SecuritySection />
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default ProfileFormTab;
