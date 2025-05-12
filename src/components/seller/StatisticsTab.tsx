
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';

// Mock data for statistics
const revenueData = [
  { month: 'Jan', revenue: 4500, profit: 1200 },
  { month: 'Feb', revenue: 5200, profit: 1500 },
  { month: 'Mar', revenue: 6100, profit: 1800 },
  { month: 'Apr', revenue: 5800, profit: 1600 },
  { month: 'May', revenue: 7000, profit: 2100 },
  { month: 'Jun', revenue: 8200, profit: 2400 },
];

const StatisticsTab: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-pop hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle>Revenue & Profit Statistics</CardTitle>
          <CardDescription>Performance overview for your business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-1">Last Month Revenue</h3>
              <p className="text-3xl font-bold text-zwm-primary">$8,200</p>
              <p className="text-sm text-muted-foreground">+14.7% from previous month</p>
            </div>
            <div className="p-4 bg-muted rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-1">Last Month Profit</h3>
              <p className="text-3xl font-bold text-green-500">$2,400</p>
              <p className="text-sm text-muted-foreground">+12.5% from previous month</p>
            </div>
          </div>

          <div className="mt-8 h-80">
            <h3 className="text-lg font-semibold mb-4">6-Month Performance</h3>
            <div className="h-full w-full">
              <div className="grid grid-cols-6 h-64 gap-1 relative">
                {revenueData.map((item, index) => (
                  <div key={index} className="flex flex-col justify-end items-center gap-1">
                    <div className="w-full flex justify-center items-end gap-1 h-full">
                      <div 
                        className="w-5 bg-zwm-primary rounded-t-sm" 
                        style={{ height: `${(item.revenue / 10000) * 100}%` }}
                        title={`Revenue: $${item.revenue}`}
                      />
                      <div 
                        className="w-5 bg-green-500 rounded-t-sm" 
                        style={{ height: `${(item.profit / 10000) * 100}%` }}
                        title={`Profit: $${item.profit}`}
                      />
                    </div>
                    <span className="text-xs">{item.month}</span>
                  </div>
                ))}
                
                {/* Y-axis label */}
                <div className="absolute -left-6 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
                  <span>$10K</span>
                  <span>$7.5K</span>
                  <span>$5K</span>
                  <span>$2.5K</span>
                  <span>$0</span>
                </div>
              </div>
              
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-zwm-primary rounded-full"></div>
                  <span className="text-sm">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Profit</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatisticsTab;
