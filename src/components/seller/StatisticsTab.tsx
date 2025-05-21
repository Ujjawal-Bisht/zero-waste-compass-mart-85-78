
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MonthlyRevenueChart, DailyRevenueChart, AnnualPerformanceChart } from '@/components/seller/analytics';
import TodayCollectionCard from '@/components/seller/analytics/cards/TodayCollectionCard';
import YearlyRevenueCard from '@/components/seller/analytics/cards/YearlyRevenueCard';
import { motion } from 'framer-motion';

// Mock data for the statistics
const mockData = {
  todayCollection: 12500,
  yearToDateRevenue: 945000,
  yearOverYearGrowth: 15.2,
  isGrowthPositive: true,
  yearProgress: 42, // 42% of the year completed
  revenueData: [
    { name: 'Jan', revenue: 65000, profit: 23000 },
    { name: 'Feb', revenue: 72000, profit: 28000 },
    { name: 'Mar', revenue: 85000, profit: 32000 },
    { name: 'Apr', revenue: 78000, profit: 30000 },
    { name: 'May', revenue: 92000, profit: 36000 },
    { name: 'Jun', revenue: 98000, profit: 42000 },
  ],
  dailyRevenueData: [
    { day: 'Mon', revenue: 12500 },
    { day: 'Tue', revenue: 14200 },
    { day: 'Wed', revenue: 15800 },
    { day: 'Thu', revenue: 13200 },
    { day: 'Fri', revenue: 16500 },
    { day: 'Sat', revenue: 18000 },
    { day: 'Sun', revenue: 11000 },
  ],
  yearlyRevenueData: [
    { year: '2022', q1: 180000, q2: 210000, q3: 240000, q4: 270000 },
    { year: '2023', q1: 195000, q2: 230000, q3: 250000, q4: 290000 },
    { year: '2024', q1: 220000, q2: 250000, q3: 0, q4: 0 }, // Current year (Q3 and Q4 not available yet)
  ]
};

const StatisticsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TodayCollectionCard todayCollection={mockData.todayCollection} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <YearlyRevenueCard 
            yearToDateRevenue={mockData.yearToDateRevenue}
            yearOverYearGrowth={mockData.yearOverYearGrowth}
            isGrowthPositive={mockData.isGrowthPositive}
            yearProgress={mockData.yearProgress}
          />
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
                  <MonthlyRevenueChart data={mockData.revenueData} />
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
                  <DailyRevenueChart data={mockData.dailyRevenueData} />
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
                  <AnnualPerformanceChart data={mockData.yearlyRevenueData} />
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
