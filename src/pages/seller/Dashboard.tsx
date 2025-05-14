
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import UserWelcome from '@/components/seller/dashboard/UserWelcome';
import StatCard from '@/components/seller/dashboard/StatCard';
import ItemCategoriesCard from '@/components/seller/dashboard/ItemCategoriesCard';
import PerformanceCard from '@/components/seller/dashboard/PerformanceCard';
import OrdersCard from '@/components/seller/dashboard/OrdersCard';
import { generateSellerStats, generateCategoryStats } from '@/components/seller/dashboard/dashboardHelpers';

const SellerDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Welcome toast when dashboard loads
    toast({
      title: "Welcome to your dashboard!",
      description: "View your latest seller statistics and performance metrics."
    });
    
    // We no longer need the loaded state since animations are handled by individual components
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
      } 
    }
  };

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
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard 
            key={index}
            index={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            description={stat.description}
          />
        ))}
      </div>

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

export default SellerDashboard;
