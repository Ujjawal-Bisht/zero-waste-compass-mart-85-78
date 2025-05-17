
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CartHeaderProps {
  cartItemCount: number;
}

const CartHeader: React.FC<CartHeaderProps> = ({ cartItemCount }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 flex items-center justify-between"
    >
      <div>
        <Button 
          variant="ghost" 
          className="flex items-center text-gray-600 mb-2"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Shopping Cart</h1>
      </div>
      <div className="text-sm text-gray-500 flex items-center">
        <span className="hidden md:inline">Your cart has </span>
        <span className="font-semibold mx-1">{cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}</span>
      </div>
    </motion.div>
  );
};

export default CartHeader;
