
import React from 'react';
import { motion } from 'framer-motion';
import { Package, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Order } from '@/types';
import { Progress } from '@/components/ui/progress';
import TrackingDetails from './TrackingDetails';

interface TrackingCardProps {
  order: Order;
  expandedOrderId: string | null;
  formatDate: (date: string) => string;
  onTrackOrder: (id: string) => void;
  onToggleExpand: (id: string) => void;
  onViewMap: (address: string) => void;
  onDownloadInvoice: (order: Order) => void;
}

const TrackingCard: React.FC<TrackingCardProps> = ({
  order,
  expandedOrderId,
  formatDate,
  onTrackOrder,
  onToggleExpand,
  onViewMap,
  onDownloadInvoice
}) => {
  return (
    <motion.div 
      key={`shipping-${order.id}`} 
      className="border-b last:border-b-0"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 cursor-pointer" onClick={() => onToggleExpand(order.id)}>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-indigo-100 rounded-full"
            >
              <Package className="h-5 w-5 text-indigo-600" />
            </motion.div>
            <div>
              <h3 className="font-medium">Order #{order.id.split('-')[1]}</h3>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <span>Shipped on {formatDate(order.updatedAt)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-3 md:mt-0">
            <Badge className={`bg-indigo-100 text-indigo-800 hover:bg-indigo-200`}>
              {order.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Badge>
            <div className="flex space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTrackOrder(order.id);
                  }} 
                  className="transition-all bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-md hover:shadow-lg"
                >
                  Track Package
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      <TrackingDetails 
        order={order}
        isExpanded={expandedOrderId === order.id}
        formatDate={formatDate}
        onViewMap={onViewMap}
        onDownloadInvoice={onDownloadInvoice}
      />
    </motion.div>
  );
};

export default TrackingCard;
