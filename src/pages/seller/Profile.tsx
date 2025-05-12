
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Store, LineChart, Package, Shield } from 'lucide-react';
import VerificationForm from '@/components/seller/VerificationForm';
import ProfileFormTab from '@/components/seller/ProfileFormTab';
import StatisticsTab from '@/components/seller/StatisticsTab';
import RecentItemsTab from '@/components/seller/RecentItemsTab';

const SellerProfile: React.FC = () => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      <div>
        <h2 className="text-3xl font-bold tracking-tight gradient-text bg-gradient-to-r from-zwm-primary via-zwm-secondary to-zwm-accent">Seller Profile</h2>
        <p className="text-muted-foreground">
          Manage your business settings and verification status
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-4 mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <Store size={16} /> Profile
          </TabsTrigger>
          <TabsTrigger value="statistics" className="flex items-center gap-2">
            <LineChart size={16} /> Statistics
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Package size={16} /> Recent Items
          </TabsTrigger>
          <TabsTrigger value="verification" className="flex items-center gap-2">
            <Shield size={16} /> Verification
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <ProfileFormTab />
        </TabsContent>
        
        <TabsContent value="statistics">
          <StatisticsTab />
        </TabsContent>
        
        <TabsContent value="recent">
          <RecentItemsTab />
        </TabsContent>
        
        <TabsContent value="verification">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <VerificationForm />
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default SellerProfile;
