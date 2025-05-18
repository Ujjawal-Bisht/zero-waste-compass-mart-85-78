
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import PersonalInfoForm from '@/pages/profile/PersonalInfoForm';
import SecurityForm from '@/pages/profile/SecurityForm';
import NotificationPreferences from '@/pages/profile/NotificationPreferences';
import SocialMediaConnections from '@/pages/profile/SocialMediaConnections';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth';
import TwoFactorSetup from '@/components/auth/two-factor/TwoFactorSetup';

const Profile: React.FC = () => {
  const { loading } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-12 w-12 border-4 border-zwm-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl py-8 px-4 sm:px-6">
      <div className="mb-8">
        <motion.h1 
          className="text-3xl font-bold" 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Profile Settings
        </motion.h1>
        <motion.p 
          className="text-muted-foreground mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Manage your account settings and preferences
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-background/70 backdrop-blur-sm w-full border overflow-x-auto no-scrollbar justify-start rounded-lg p-1">
            <TabsTrigger value="personal" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-md">
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 rounded-md">
              Security & 2FA
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 rounded-md">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="connections" className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700 rounded-md">
              Connections
            </TabsTrigger>
          </TabsList>

          <TabsContent 
            value="personal" 
            className="space-y-6"
          >
            <motion.div
              variants={tabVariants}
              initial="hidden"
              animate="visible"
            >
              <Card>
                <CardContent className="pt-6">
                  <PersonalInfoForm />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent 
            value="security" 
            className="space-y-6"
          >
            <motion.div
              variants={tabVariants}
              initial="hidden"
              animate="visible"
            >
              <Card>
                <CardContent className="pt-6">
                  <SecurityForm />
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              variants={tabVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <TwoFactorSetup />
            </motion.div>
          </TabsContent>

          <TabsContent 
            value="notifications" 
            className="space-y-6"
          >
            <motion.div
              variants={tabVariants}
              initial="hidden"
              animate="visible"
            >
              <Card>
                <CardContent className="pt-6">
                  <NotificationPreferences />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent 
            value="connections" 
            className="space-y-6"
          >
            <motion.div
              variants={tabVariants}
              initial="hidden"
              animate="visible"
            >
              <Card>
                <CardContent className="pt-6">
                  <SocialMediaConnections />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Profile;
