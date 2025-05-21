
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, TrendingDown, Calendar } from 'lucide-react';

interface YearlyRevenueCardProps {
  yearToDateRevenue: number;
  yearOverYearGrowth: number;
  isGrowthPositive: boolean;
  yearProgress: number;
}

const YearlyRevenueCard: React.FC<YearlyRevenueCardProps> = ({ 
  yearToDateRevenue, 
  yearOverYearGrowth, 
  isGrowthPositive, 
  yearProgress 
}) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-semibold">
          <Calendar className="mr-2 h-5 w-5 text-zwm-primary" />
          Yearly Revenue
        </CardTitle>
        <CardDescription>Performance for {new Date().getFullYear()}</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-baseline"
        >
          <span className="text-3xl font-extrabold text-zwm-primary flex items-center">
            <IndianRupee className="h-6 w-6" />
            {(yearToDateRevenue / 100000).toFixed(1)}L
          </span>
          <span className="ml-2 text-sm text-muted-foreground">
            YTD ({yearProgress.toFixed(0)}% of year)
          </span>
        </motion.div>
        
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">Year-over-Year Growth</p>
          <div className="flex items-center mt-1">
            {isGrowthPositive ? (
              <>
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-500">+{yearOverYearGrowth.toFixed(1)}%</span>
              </>
            ) : (
              <>
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm font-medium text-red-500">{yearOverYearGrowth.toFixed(1)}%</span>
              </>
            )}
            <span className="ml-2 text-xs text-muted-foreground">vs last year</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default YearlyRevenueCard;
