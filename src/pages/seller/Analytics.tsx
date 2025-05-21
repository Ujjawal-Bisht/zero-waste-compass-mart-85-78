
import React from 'react';
import { motion } from 'framer-motion';
import StatisticsTab from '@/components/seller/StatisticsTab';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const Analytics = () => {
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
        Seller Analytics
      </motion.h1>

      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-lg overflow-hidden profile-card">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Performance Analytics
            </h2>
          </CardHeader>
          <CardContent className="p-4">
            <StatisticsTab />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;
