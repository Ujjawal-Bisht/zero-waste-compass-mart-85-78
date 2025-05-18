
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';
import { useAuth } from '@/contexts/auth';
import { IndianRupee, TrendingUp, TrendingDown, CalendarCheck, Calendar } from 'lucide-react';
import { format, subMonths, startOfYear } from 'date-fns';

// Mock data for statistics
const revenueData = [
  { month: 'Jan', revenue: 450000, profit: 120000 },
  { month: 'Feb', revenue: 520000, profit: 150000 },
  { month: 'Mar', revenue: 610000, profit: 180000 },
  { month: 'Apr', revenue: 580000, profit: 160000 },
  { month: 'May', revenue: 700000, profit: 210000 },
  { month: 'Jun', revenue: 820000, profit: 240000 },
];

// Daily revenue data for the last 30 days
const generateDailyRevenueData = () => {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const date = subMonths(new Date(), 0);
    date.setDate(date.getDate() - i);
    data.push({
      date: format(date, 'dd MMM'),
      revenue: Math.floor(Math.random() * 30000) + 5000,
    });
  }
  return data;
};

const dailyRevenueData = generateDailyRevenueData();

// Yearly revenue data
const yearlyRevenueData = [
  { year: '2023', revenue: 8500000, profit: 2500000 },
  { year: '2024', revenue: 10200000, profit: 3100000, projected: true },
];

const StatisticsTab: React.FC = () => {
  const { currentUser } = useAuth();
  const todayCollection = 28500;
  const yearToDateRevenue = 4580000;
  const lastYearRevenue = 3750000;
  const yearOverYearGrowth = ((yearToDateRevenue - lastYearRevenue) / lastYearRevenue) * 100;
  const isGrowthPositive = yearOverYearGrowth > 0;
  
  const startYear = startOfYear(new Date());
  const currentDate = new Date();
  const yearProgress = ((currentDate.getTime() - startYear.getTime()) / 
    (365 * 24 * 60 * 60 * 1000)) * 100;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Today's Collection and Yearly Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg font-semibold">
              <CalendarCheck className="mr-2 h-5 w-5 text-zwm-primary" />
              Today's Collection
            </CardTitle>
            <CardDescription>Revenue collected today</CardDescription>
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
                {todayCollection.toLocaleString('en-IN')}
              </span>
              <span className="ml-2 text-sm text-muted-foreground">
                as of {format(new Date(), 'h:mm a')}
              </span>
            </motion.div>
            
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Today vs. Yesterday</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-500">+12.4%</span>
                <span className="ml-2 text-xs text-muted-foreground">↑ ₹3,150</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
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
      </div>

      {/* Monthly Revenue & Profit Chart */}
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Monthly Revenue & Profit</CardTitle>
          <CardDescription>Performance overview for the last 6 months</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis
                  tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`}
                />
                <Tooltip
                  formatter={(value) => [`₹${(Number(value)/1000).toLocaleString('en-IN')}K`]}
                  labelFormatter={(label) => `${label} 2024`}
                />
                <Bar dataKey="revenue" fill="#8b5cf6" name="Revenue" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" fill="#10b981" name="Profit" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Daily Revenue Trend */}
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Daily Revenue Trend</CardTitle>
          <CardDescription>30-day revenue performance</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dailyRevenueData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis
                  tickFormatter={(value) => `₹${(value/1000).toFixed(0)}K`}
                />
                <Tooltip
                  formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`]}
                  labelFormatter={(label) => `${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', r: 4 }}
                  activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }}
                  name="Daily Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Annual Performance Comparison */}
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Annual Performance</CardTitle>
          <CardDescription>Yearly revenue and profit comparison</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={yearlyRevenueData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" />
                <YAxis
                  tickFormatter={(value) => `₹${(value/1000000).toFixed(1)}M`}
                />
                <Tooltip
                  formatter={(value, name, props) => {
                    const formatted = `₹${(Number(value)/1000000).toFixed(2)}M`;
                    const item = yearlyRevenueData.find(d => d.year === props.payload.year);
                    return [formatted + (item?.projected ? ' (Projected)' : ''), name];
                  }}
                />
                <Bar dataKey="revenue" fill="#8b5cf6" name="Revenue" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" fill="#10b981" name="Profit" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatisticsTab;
