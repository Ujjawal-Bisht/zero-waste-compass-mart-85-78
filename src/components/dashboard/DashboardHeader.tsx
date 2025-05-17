
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/auth';
import LogoSection from './header/LogoSection';
import NavButtons from './header/NavButtons';
import SellerButtons from './header/SellerButtons';
import NotificationsPopover from '../layouts/NotificationsPopover';
import MiniCart from '../cart/MiniCart';
import UserMenu from '../layouts/UserMenu';

const DashboardHeader: React.FC = () => {
  const { currentUser } = useAuth();
  const isSellerPortal = currentUser?.isSeller;

  return (
    <header className="bg-white shadow-sm z-10 sticky top-0 border-b border-gray-100">
      <motion.div 
        className="flex justify-between items-center px-4 md:px-6 py-3"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Desktop Logo and Search */}
        <LogoSection />
        
        {/* Mobile Logo and Search */}
        <LogoSection isMobile={true} />
        
        {/* Right side navigation */}
        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Seller specific buttons */}
          <SellerButtons isSellerPortal={Boolean(isSellerPortal)} />
          
          {/* Navigation buttons */}
          <NavButtons isSellerPortal={Boolean(isSellerPortal)} />
          
          {/* Mini Cart */}
          <MiniCart />
          
          {/* Notification bell */}
          <NotificationsPopover />
          
          {/* User menu */}
          <UserMenu />
        </div>
      </motion.div>
    </header>
  );
};

export default DashboardHeader;
