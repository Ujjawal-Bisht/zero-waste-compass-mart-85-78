
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface OrderActionButtonsProps {
  status: string;
  onCancel: () => void;
  onTrack: () => void;
}

export const OrderActionButtons: React.FC<OrderActionButtonsProps> = ({ 
  status, 
  onCancel, 
  onTrack 
}) => {
  return (
    <div className="flex justify-end space-x-2">
      {['pending', 'processing'].includes(status) && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="outline" 
            size="sm"
            onClick={onCancel}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            Cancel
          </Button>
        </motion.div>
      )}
      {['processing', 'shipped'].includes(status) && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="outline" 
            size="sm"
            onClick={onTrack}
            className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
          >
            Track
          </Button>
        </motion.div>
      )}
    </div>
  );
};
