
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressTracker from './ProgressTracker';
import TrackingTimeline from './TrackingTimeline';
import DeliveryLocation from './DeliveryLocation';
import OrderActions from './OrderActions';
import { Order } from '@/types';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

interface TrackingDetailsProps {
  order: Order;
  isExpanded: boolean;
  formatDate: (date: string) => string;
  onViewMap: (address: string) => void;
  onDownloadInvoice: (order: Order) => void;
}

const TrackingDetails: React.FC<TrackingDetailsProps> = ({
  order,
  isExpanded,
  formatDate,
  onViewMap,
  onDownloadInvoice
}) => {
  if (!isExpanded) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="px-4 pb-4"
    >
      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <ProgressTracker 
          status={order.status} 
          updatedAt={order.updatedAt} 
        />
        
        <TrackingTimeline 
          status={order.status} 
          createdAt={order.createdAt} 
          updatedAt={order.updatedAt} 
          formatDate={formatDate} 
        />
        
        <DeliveryLocation 
          address="123 Main Street, Apt 4B, City Name, State, 123456" 
          onViewMap={onViewMap} 
        />
        
        <div className="flex justify-end">
          {(order.status === 'out-for-delivery' || order.status === 'delivered') && (
            <motion.div className="mr-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDownloadInvoice(order);
                }} 
                variant="outline"
                className="flex items-center text-indigo-700 border-indigo-200 hover:bg-indigo-50"
              >
                <FileDown className="h-4 w-4 mr-1" />
                Invoice
              </Button>
            </motion.div>
          )}
          <OrderActions 
            orderId={order.id}
            onDownloadInvoice={() => onDownloadInvoice(order)}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TrackingDetails;
