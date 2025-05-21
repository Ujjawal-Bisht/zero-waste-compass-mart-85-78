
import { format, subMonths, startOfYear } from 'date-fns';

// Mock data for statistics
export const revenueData = [
  { month: 'Jan', revenue: 450000, profit: 120000 },
  { month: 'Feb', revenue: 520000, profit: 150000 },
  { month: 'Mar', revenue: 610000, profit: 180000 },
  { month: 'Apr', revenue: 580000, profit: 160000 },
  { month: 'May', revenue: 700000, profit: 210000 },
  { month: 'Jun', revenue: 820000, profit: 240000 },
];

// Daily revenue data for the last 30 days
export const generateDailyRevenueData = () => {
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

export const dailyRevenueData = generateDailyRevenueData();

// Yearly revenue data
export const yearlyRevenueData = [
  { year: '2023', revenue: 8500000, profit: 2500000 },
  { year: '2024', revenue: 10200000, profit: 3100000, projected: true },
];

// Inventory forecast data for the next 6 months
export const inventoryForecastData = [
  { month: 'Jul', currentStock: 450, projectedStock: 380, reorderPoint: 200 },
  { month: 'Aug', currentStock: 380, projectedStock: 310, reorderPoint: 200 },
  { month: 'Sep', currentStock: 310, projectedStock: 240, reorderPoint: 200 },
  { month: 'Oct', currentStock: 240, projectedStock: 170, reorderPoint: 200 },
  { month: 'Nov', currentStock: 350, projectedStock: 280, reorderPoint: 200 },
  { month: 'Dec', currentStock: 280, projectedStock: 210, reorderPoint: 200 },
];

export const todayCollection = 28500;
export const yearToDateRevenue = 4580000;
export const lastYearRevenue = 3750000;
export const yearOverYearGrowth = ((yearToDateRevenue - lastYearRevenue) / lastYearRevenue) * 100;
export const isGrowthPositive = yearOverYearGrowth > 0;

export const getYearProgress = () => {
  const startYear = startOfYear(new Date());
  const currentDate = new Date();
  return ((currentDate.getTime() - startYear.getTime()) / 
    (365 * 24 * 60 * 60 * 1000)) * 100;
};
