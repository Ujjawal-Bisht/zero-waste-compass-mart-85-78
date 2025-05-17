
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart, PackageOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmptyCart: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col items-center justify-center h-64 border border-dashed rounded-lg p-6"
    >
      <PackageOpen className="h-16 w-16 text-gray-300 mb-4" />
      <h2 className="text-xl font-medium text-gray-600 mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-4 text-center">
        Looks like you haven't added any items to your cart yet.
      </p>
      <Button 
        variant="default" 
        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        onClick={() => navigate('/marketplace')}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Browse Marketplace
      </Button>
    </motion.div>
  );
};

export default EmptyCart;
