
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/auth';
import MiniCart from '../cart/MiniCart';
import UserMenu from './UserMenu';
import NotificationsPopover from './NotificationsPopover';

interface TopNavbarProps {
  onMenuClick?: () => void;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-sm z-20 sticky top-0 border-b border-gray-100"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {onMenuClick && (
              <Button variant="ghost" size="icon" onClick={onMenuClick} className="mr-2 lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/')}
            >
              <img src="/placeholder.svg" alt="Logo" className="h-8 w-8" />
              <span className="ml-2 font-semibold text-gray-800">ZeroWaste Market</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <MiniCart />
            <NotificationsPopover />
            <UserMenu />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default TopNavbar;
