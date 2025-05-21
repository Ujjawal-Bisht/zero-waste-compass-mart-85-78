
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { exportToCSV, exportToPDF } from '@/utils/analyticsExportUtils';

interface ExportAnalyticsButtonProps {
  data: any;
  type: 'statistics' | 'forecast';
}

const ExportAnalyticsButton: React.FC<ExportAnalyticsButtonProps> = ({ data, type }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'pdf' | 'csv') => {
    setIsExporting(true);
    
    try {
      if (format === 'pdf') {
        await exportToPDF(data, type);
        toast.success('Analytics exported as PDF');
      } else {
        await exportToCSV(data, type);
        toast.success('Analytics exported as CSV');
      }
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export analytics data');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline"
          className="group flex items-center gap-2 hover:bg-purple-50 dark:hover:bg-purple-950/30"
        >
          <Download size={16} className="text-gray-500 group-hover:text-purple-600 transition-all" />
          <span className="group-hover:text-purple-600 transition-all">Export</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div className="space-y-1">
          <motion.div 
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-start gap-2 text-left"
              onClick={() => handleExport('pdf')}
              disabled={isExporting}
            >
              <FileText size={16} className="text-red-500" />
              <span>Export as PDF</span>
            </Button>
          </motion.div>
          <motion.div 
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-start gap-2 text-left"
              onClick={() => handleExport('csv')}
              disabled={isExporting}
            >
              <FileSpreadsheet size={16} className="text-green-600" />
              <span>Export as CSV</span>
            </Button>
          </motion.div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ExportAnalyticsButton;
