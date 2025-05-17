
import React from 'react';
import { Button } from '@/components/ui/button';
import { Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface EmptyOrdersStateProps {
  selectedTab: 'all' | 'active' | 'completed';
}

export const EmptyOrdersState: React.FC<EmptyOrdersStateProps> = ({ selectedTab }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Truck className="h-12 w-12 text-gray-300 mb-4 animate-bounce" />
        <h3 className="text-lg font-medium">No orders found</h3>
        <p className="text-muted-foreground">
          {selectedTab === 'all' 
            ? "You haven't placed any orders yet." 
            : selectedTab === 'active' 
              ? "You don't have any active orders." 
              : "You don't have any completed orders."}
        </p>
        <Button 
          onClick={() => navigate('/marketplace')} 
          className="mt-4 buyer-button-gradient"
        >
          Browse Marketplace
        </Button>
      </motion.div>
    </div>
  );
};
