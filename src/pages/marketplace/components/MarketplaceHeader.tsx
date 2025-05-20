
import React from 'react';
import { motion } from 'framer-motion';
import { Filter, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MarketplaceHeaderProps {
  showExpiryAlerts: boolean;
  toggleExpiryAlerts: () => void;
}

const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({ 
  showExpiryAlerts, 
  toggleExpiryAlerts 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center mb-8"
    >
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Marketplace</h1>
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleExpiryAlerts}
            className={`flex items-center gap-2 ${showExpiryAlerts ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-gray-100'}`}
          >
            <AlertTriangle className={`h-4 w-4 ${showExpiryAlerts ? 'text-amber-500' : ''}`} /> 
            {showExpiryAlerts ? "Expiry Alerts: ON" : "Expiry Alerts: OFF"}
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="outline" size="sm" className="filter-button">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MarketplaceHeader;
