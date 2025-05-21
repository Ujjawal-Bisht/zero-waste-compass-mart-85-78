
import { revenueData, dailyRevenueData, yearlyRevenueData, inventoryForecastData } from '@/components/seller/analytics/mockData';
import { format } from 'date-fns';

// Helper function to generate a filename with date
const generateFilename = (type: string, format: string): string => {
  const date = format(new Date(), 'yyyy-MM-dd');
  return `seller-analytics-${type}-${date}.${format}`;
};

export const exportToCSV = async (data: any, type: 'statistics' | 'forecast'): Promise<boolean> => {
  try {
    let csvContent = '';
    let filename = '';
    
    if (type === 'statistics') {
      // Monthly revenue data
      const monthlyHeaders = ['Month', 'Revenue', 'Profit'];
      const monthlyRows = revenueData.map(item => [
        item.month,
        item.revenue.toString(),
        item.profit.toString()
      ]);
      
      csvContent = [
        monthlyHeaders.join(','),
        ...monthlyRows.map(row => row.join(','))
      ].join('\n');
      
      filename = generateFilename('monthly-revenue', 'csv');
    } else {
      // Inventory forecast data
      const forecastHeaders = ['Month', 'Current Stock', 'Projected Stock', 'Reorder Point'];
      const forecastRows = inventoryForecastData.map(item => [
        item.month,
        item.currentStock.toString(),
        item.projectedStock.toString(),
        item.reorderPoint.toString()
      ]);
      
      csvContent = [
        forecastHeaders.join(','),
        ...forecastRows.map(row => row.join(','))
      ].join('\n');
      
      filename = generateFilename('inventory-forecast', 'csv');
    }
    
    // In a real environment, this would create and download a file
    // For this demo, we'll simulate the download
    console.log(`Downloading ${filename} with content:`, csvContent);
    
    // Mock download functionality - in a real app this would trigger a download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    if (typeof window !== 'undefined') {
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    return true;
  } catch (error) {
    console.error('Error creating CSV export:', error);
    return false;
  }
};

export const exportToPDF = async (data: any, type: 'statistics' | 'forecast'): Promise<boolean> => {
  try {
    // In a real app, this would use a library like jspdf or pdfmake
    // to generate a PDF file from the data
    const filename = generateFilename(type === 'statistics' ? 'revenue-statistics' : 'inventory-forecast', 'pdf');
    
    // For demo purposes, we'll just log what would happen
    console.log(`Creating PDF export for ${type} data...`);
    console.log(`File would be named: ${filename}`);
    
    if (type === 'statistics') {
      console.log('PDF would contain:');
      console.log('- Monthly revenue chart');
      console.log('- Daily revenue trends');
      console.log('- Year-over-year comparisons');
    } else {
      console.log('PDF would contain:');
      console.log('- Inventory forecast chart');
      console.log('- Product category breakdown');
      console.log('- Reorder recommendations');
    }
    
    // Simulate a delay as if generating the PDF
    await new Promise(resolve => setTimeout(resolve, 800));
    
    console.log(`PDF "${filename}" would be downloaded now.`);
    
    return true;
  } catch (error) {
    console.error('Error creating PDF export:', error);
    return false;
  }
};
