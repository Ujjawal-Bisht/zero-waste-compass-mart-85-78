
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth';
import { 
  todayCollection,
  yearToDateRevenue,
  yearOverYearGrowth,
  isGrowthPositive,
  getYearProgress,
  revenueData,
  dailyRevenueData,
  yearlyRevenueData
} from './mockData';
import TodayCollectionCard from './cards/TodayCollectionCard';
import YearlyRevenueCard from './cards/YearlyRevenueCard';
import MonthlyRevenueChart from './charts/MonthlyRevenueChart';
import DailyRevenueChart from './charts/DailyRevenueChart';
import AnnualPerformanceChart from './charts/AnnualPerformanceChart';

const StatisticsTab: React.FC = () => {
  const { currentUser } = useAuth();
  const yearProgress = getYearProgress();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Today's Collection and Yearly Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TodayCollectionCard todayCollection={todayCollection} />
        <YearlyRevenueCard 
          yearToDateRevenue={yearToDateRevenue}
          yearOverYearGrowth={yearOverYearGrowth}
          isGrowthPositive={isGrowthPositive}
          yearProgress={yearProgress}
        />
      </div>

      {/* Monthly Revenue & Profit Chart */}
      <MonthlyRevenueChart data={revenueData} />

      {/* Daily Revenue Trend */}
      <DailyRevenueChart data={dailyRevenueData} />
      
      {/* Annual Performance Comparison */}
      <AnnualPerformanceChart data={yearlyRevenueData} />
    </motion.div>
  );
};

export default StatisticsTab;
