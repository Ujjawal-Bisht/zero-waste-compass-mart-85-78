
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

interface OrderActionsProps {
  orderId: string;
  onDownloadInvoice: () => void;
}

const OrderActions: React.FC<OrderActionsProps> = ({
  orderId,
  onDownloadInvoice
}) => {
  return (
    <div className="flex justify-end">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex items-center text-indigo-600"
          onClick={(e) => {
            e.stopPropagation();
            window.open(`mailto:support@example.com?subject=Question about order ${orderId}`);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M7 9l5 3.5L17 9"/><path d="M2 7v10c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg>
          Contact Support
        </Button>
      </motion.div>
    </div>
  );
};

export default OrderActions;
