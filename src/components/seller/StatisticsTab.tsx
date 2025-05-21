
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MonthlyRevenueChart, DailyRevenueChart, AnnualPerformanceChart } from '@/components/seller/analytics';
import TodayCollectionCard from '@/components/seller/analytics/cards/TodayCollectionCard';
import YearlyRevenueCard from '@/components/seller/analytics/cards/YearlyRevenueCard';
import { motion } from 'framer-motion';

const StatisticsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TodayCollectionCard />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <YearlyRevenueCard />
        </motion.div>
      </div>
      
      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 w-full">
          <TabsTrigger value="monthly" className="flex-1">Monthly Revenue</TabsTrigger>
          <TabsTrigger value="daily" className="flex-1">Daily Breakdown</TabsTrigger>
          <TabsTrigger value="yearly" className="flex-1">Yearly Comparison</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthly" className="p-0 border-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <MonthlyRevenueChart />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="daily" className="p-0 border-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Daily Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <DailyRevenueChart />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="yearly" className="p-0 border-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Year-over-Year Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <AnnualPerformanceChart />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatisticsTab;
