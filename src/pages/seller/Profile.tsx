
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileFormTab from '@/components/seller/ProfileFormTab';
import StatisticsTab from '@/components/seller/StatisticsTab';
import RecentItemsTab from '@/components/seller/RecentItemsTab';
import { motion } from 'framer-motion';
import '@/styles/animations/seller.css';

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState('profile');

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="p-4 md:p-6 space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 
        className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
        variants={itemVariants}
      >
        Seller Profile
      </motion.h1>

      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-lg overflow-hidden profile-card">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Manage Your Profile
            </h2>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs 
              defaultValue="profile" 
              value={selectedTab}
              onValueChange={handleTabChange} 
              className="w-full"
            >
              <TabsList className="w-full bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 grid grid-cols-3 rounded-none">
                <TabsTrigger value="profile" className="profile-tab">Profile</TabsTrigger>
                <TabsTrigger value="statistics" className="profile-tab">Statistics</TabsTrigger>
                <TabsTrigger value="recent" className="profile-tab">Recent Items</TabsTrigger>
              </TabsList>
              
              <AnimatedTabContent value="profile" currentTab={selectedTab}>
                <ProfileFormTab />
              </AnimatedTabContent>
              
              <AnimatedTabContent value="statistics" currentTab={selectedTab}>
                <StatisticsTab />
              </AnimatedTabContent>
              
              <AnimatedTabContent value="recent" currentTab={selectedTab}>
                <RecentItemsTab />
              </AnimatedTabContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

// AnimatedTabContent component for smooth tab transitions
const AnimatedTabContent = ({ value, currentTab, children }: { value: string, currentTab: string, children: React.ReactNode }) => {
  return (
    <TabsContent value={value} className="m-0 p-0">
      {value === currentTab && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 py-4 profile-animate-in"
        >
          {children}
        </motion.div>
      )}
    </TabsContent>
  );
};

export default Profile;
