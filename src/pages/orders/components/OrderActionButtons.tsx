
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Truck, X, FileDown } from 'lucide-react';
import { generateInvoice } from '@/utils/exportUtils';
import { Order } from '@/types';
import { useToast } from '@/components/ui/use-toast';

interface OrderActionButtonsProps {
  status: Order['status'];
  order?: Order;
  onCancel: () => void;
  onTrack: () => void;
}

export const OrderActionButtons: React.FC<OrderActionButtonsProps> = ({ 
  status, 
  order,
  onCancel, 
  onTrack 
}) => {
  const { toast } = useToast();

  const handleDownloadInvoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!order) return;
    
    if (status === 'out-for-delivery' || status === 'delivered') {
      generateInvoice(order);
      toast({
        title: "Invoice Downloaded",
        description: `Invoice for order #${order.id.split('-')[1]} has been downloaded.`,
      });
    } else {
      toast({
        title: "Invoice Not Available",
        description: "Invoices are only available for orders that are out for delivery or delivered.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex space-x-2 justify-end">
      {/* Show Download Invoice button only for out-for-delivery or delivered orders */}
      {(status === 'out-for-delivery' || status === 'delivered') && order && (
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="sm"
            variant="outline"
            className="flex items-center text-indigo-700 border-indigo-200 hover:bg-indigo-50"
            onClick={handleDownloadInvoice}
          >
            <FileDown className="h-4 w-4 mr-1" />
            Invoice
          </Button>
        </motion.div>
      )}
      
      {/* Show Track button for shipped and out-for-delivery orders */}
      {(status === 'shipped' || status === 'out-for-delivery') && (
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="sm"
            className="flex items-center bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
            onClick={(e) => { 
              e.stopPropagation();
              onTrack();
            }}
          >
            <Truck className="h-4 w-4 mr-1" />
            Track
          </Button>
        </motion.div>
      )}
      
      {/* Show Cancel button for orders that can be canceled */}
      {['pending', 'processing'].includes(status) && (
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="sm"
            variant="outline"
            className="flex items-center text-red-600 border-red-200 hover:bg-red-50"
            onClick={(e) => { 
              e.stopPropagation();
              onCancel();
            }}
          >
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
        </motion.div>
      )}
    </div>
  );
};
