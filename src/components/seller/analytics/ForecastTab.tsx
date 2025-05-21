
import React from 'react';
import { motion } from 'framer-motion';
import { inventoryForecastData } from './mockData';
import InventoryForecastChart from './charts/InventoryForecastChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle, Database } from 'lucide-react';

const ForecastTab: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Low Inventory Alert */}
      <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-xl text-amber-700 dark:text-amber-400">Inventory Alert</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-amber-700 dark:text-amber-400">Your inventory for 3 product categories is projected to fall below the reorder threshold within the next 60 days.</p>
        </CardContent>
      </Card>

      {/* Inventory Forecast Chart */}
      <InventoryForecastChart data={inventoryForecastData} />

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            <span>Inventory by Category</span>
          </CardTitle>
          <CardDescription>Breakdown of current inventory levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">Electronics</h4>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current: 320 units</span>
                <span className="font-medium">70% of optimal</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Clothing</h4>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current: 210 units</span>
                <span className="font-medium">45% of optimal</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Home Appliances</h4>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current: 180 units</span>
                <span className="font-medium">85% of optimal</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Accessories</h4>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current: 45 units</span>
                <span className="font-medium text-red-500">15% - Reorder now!</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ForecastTab;
