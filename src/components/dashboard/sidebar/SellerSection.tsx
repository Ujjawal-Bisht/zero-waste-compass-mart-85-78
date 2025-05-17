
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Store, Package, ShoppingCart, ShieldCheck } from 'lucide-react';

interface SellerSectionProps {
  isSeller: boolean;
  onClose?: () => void;
}

export const SellerSection: React.FC<SellerSectionProps> = ({ isSeller, onClose }) => {
  const location = useLocation();

  if (!isSeller) {
    return null;
  }

  return (
    <>
      <div className="mt-6 mb-2 px-4">
        <h3 className="text-sm font-medium text-gray-300 border-b border-gray-600 pb-1">
          Seller Options
        </h3>
      </div>
      <div className="space-y-1">
        <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant={location.pathname === '/seller/dashboard' ? "secondary" : "ghost"}
            className={`w-full justify-start ${
              location.pathname === '/seller/dashboard' 
                ? 'bg-white bg-opacity-20 text-white' 
                : 'text-gray-200 hover:bg-white hover:bg-opacity-10'
            } transition-all duration-300 sidebar-menu-item`}
            onClick={onClose}
            asChild
          >
            <Link to="/seller/dashboard">
              <Store className="mr-2 h-4 w-4" />
              Seller Dashboard
            </Link>
          </Button>
        </motion.div>
        <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant={location.pathname === '/seller/products' ? "secondary" : "ghost"}
            className={`w-full justify-start ${
              location.pathname === '/seller/products' 
                ? 'bg-white bg-opacity-20 text-white' 
                : 'text-gray-200 hover:bg-white hover:bg-opacity-10'
            } transition-all duration-300 sidebar-menu-item`}
            onClick={onClose}
            asChild
          >
            <Link to="/seller/products">
              <Package className="mr-2 h-4 w-4" />
              Products
            </Link>
          </Button>
        </motion.div>
        <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant={location.pathname === '/seller/orders' ? "secondary" : "ghost"}
            className={`w-full justify-start ${
              location.pathname === '/seller/orders' 
                ? 'bg-white bg-opacity-20 text-white' 
                : 'text-gray-200 hover:bg-white hover:bg-opacity-10'
            } transition-all duration-300 sidebar-menu-item`}
            onClick={onClose}
            asChild
          >
            <Link to="/seller/orders">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Orders
            </Link>
          </Button>
        </motion.div>
        <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant={location.pathname === '/seller/profile' ? "secondary" : "ghost"}
            className={`w-full justify-start ${
              location.pathname === '/seller/profile' 
                ? 'bg-white bg-opacity-20 text-white' 
                : 'text-gray-200 hover:bg-white hover:bg-opacity-10'
            } transition-all duration-300 sidebar-menu-item`}
            onClick={onClose}
            asChild
          >
            <Link to="/seller/profile">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Seller Profile
            </Link>
          </Button>
        </motion.div>
      </div>
    </>
  );
};
