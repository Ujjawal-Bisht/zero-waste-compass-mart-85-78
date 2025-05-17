
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import SellerMenuBar from '@/components/seller/SellerMenuBar';

interface SellerButtonsProps {
  isSellerPortal: boolean;
}

const SellerButtons: React.FC<SellerButtonsProps> = ({ isSellerPortal }) => {
  const navigate = useNavigate();
  
  if (!isSellerPortal) return null;
  
  return (
    <>
      <motion.div
        className="navbar-item"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <SellerMenuBar />
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="navbar-item"
      >
        <Button 
          onClick={() => navigate('/items/add')} 
          className="seller-button-gradient button-pulse-glow"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Item
        </Button>
      </motion.div>
    </>
  );
};

export default SellerButtons;
