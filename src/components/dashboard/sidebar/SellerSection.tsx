
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Store, Package, ShoppingCart, User } from 'lucide-react';

interface SellerSectionProps {
  onClose?: () => void;
}

export const SellerSection: React.FC<SellerSectionProps> = ({ onClose }) => {
  const handleClick = () => {
    if (onClose) onClose();
  };
  
  const itemVariants = {
    initial: { opacity: 0, x: -5 },
    animate: { opacity: 1, x: 0 },
    hover: { x: 5, backgroundColor: "rgba(255, 255, 255, 0.1)" }
  };

  return (
    <div className="mb-4">
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-white">
        Seller Options
      </h2>
      <div className="space-y-1">
        <motion.div
          variants={itemVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          transition={{ duration: 0.2 }}
        >
          <Link
            to="/seller/dashboard"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:bg-opacity-10"
            onClick={handleClick}
          >
            <Store className="h-4 w-4" />
            <span>Seller Dashboard</span>
          </Link>
        </motion.div>
        <motion.div
          variants={itemVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          transition={{ duration: 0.2, delay: 0.05 }}
        >
          <Link
            to="/seller/products"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:bg-opacity-10"
            onClick={handleClick}
          >
            <Package className="h-4 w-4" />
            <span>Products</span>
          </Link>
        </motion.div>
        <motion.div
          variants={itemVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <Link
            to="/seller/orders"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:bg-opacity-10"
            onClick={handleClick}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Orders</span>
          </Link>
        </motion.div>
        <motion.div
          variants={itemVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          transition={{ duration: 0.2, delay: 0.15 }}
        >
          <Link
            to="/seller/profile"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white hover:bg-opacity-10"
            onClick={handleClick}
          >
            <User className="h-4 w-4" />
            <span>Seller Profile</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
