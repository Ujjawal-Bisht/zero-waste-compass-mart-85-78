
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeliveryLocationProps {
  address: string;
  onViewMap: (address: string) => void;
}

const DeliveryLocation: React.FC<DeliveryLocationProps> = ({
  address,
  onViewMap
}) => {
  return (
    <div className="pt-2">
      <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 flex items-start space-x-3">
        <MapPin className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-indigo-700">Delivery Location</h4>
          <p className="text-xs text-indigo-600 mt-1">{address}</p>
          <motion.div 
            className="mt-2"
            whileHover={{ scale: 1.02 }}
          >
            <Button 
              size="sm" 
              variant="outline" 
              className="text-xs h-7 border-indigo-200 text-indigo-700 hover:bg-indigo-100"
              onClick={(e) => {
                e.stopPropagation();
                onViewMap(address);
              }}
            >
              View on Map
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryLocation;
