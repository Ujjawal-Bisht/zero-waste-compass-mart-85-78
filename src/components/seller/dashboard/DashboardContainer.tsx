
import React from 'react';
import { motion } from 'framer-motion';
import UserWelcome from './UserWelcome';
import StatCards from './StatCards';
import ItemCategoriesCard from './ItemCategoriesCard';
import PerformanceCard from './PerformanceCard';
import OrdersCard from './OrdersCard';
import { generateSellerStats, generateCategoryStats } from './dashboardHelpers';
import { useAuth } from '@/contexts/auth';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
    } 
  }
};

const DashboardContainer: React.FC = () => {
  const { currentUser } = useAuth();
  
  const stats = generateSellerStats(currentUser);
  const categoryStats = generateCategoryStats();

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <UserWelcome currentUser={currentUser} />
      
      <StatCards stats={stats} />

      <div className="grid gap-4 md:grid-cols-2">
        <ItemCategoriesCard stats={categoryStats} />
        <PerformanceCard 
          trustScore={currentUser?.trustScore || 0}
          verified={currentUser?.verified || false}
        />
      </div>
      
      <OrdersCard />
    </motion.div>
  );
};

export default DashboardContainer;
