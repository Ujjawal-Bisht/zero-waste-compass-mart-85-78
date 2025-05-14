
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search, Plus, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import NotificationCenter from '@/components/NotificationCenter';
import { Logo } from '@/components/ui/logo';
import SellerMenuBar from '@/components/seller/SellerMenuBar';

const DashboardHeader: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const goToHome = () => {
    navigate('/');
  };

  const isSellerPortal = currentUser?.isSeller;

  return (
    <header className="bg-white shadow-sm z-10 sticky top-0 border-b border-gray-100">
      <motion.div 
        className="flex justify-between items-center px-4 md:px-6 py-3"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hidden lg:flex items-center space-x-6">
          <motion.div 
            className="cursor-pointer navbar-item" 
            onClick={goToHome}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Logo size="sm" showText={true} animated={true} />
          </motion.div>
          <div className="flex-1 max-w-md navbar-item">
            <div className="relative w-full search-bar-focus rounded-md overflow-hidden">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground search-icon-animated" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="pl-10 w-full bg-gray-50 border-gray-100 transition-all duration-300 focus:ring-2 focus:ring-offset-0 focus:ring-blue-400 focus:border-blue-400" 
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center lg:hidden">
          <motion.div 
            className="cursor-pointer navbar-item" 
            onClick={goToHome}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Logo size="sm" showText={false} animated={true} />
          </motion.div>
          <div className="flex-1 max-w-md ml-4 navbar-item">
            <div className="relative w-full search-bar-focus rounded-md overflow-hidden">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground search-icon-animated" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="pl-10 w-full bg-gray-50 border-gray-100 transition-all duration-300 focus:ring-2 focus:ring-offset-0 focus:ring-blue-400 focus:border-blue-400" 
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Only show if user is a seller */}
          {isSellerPortal && (
            <motion.div
              className="navbar-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SellerMenuBar />
            </motion.div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={goToHome}
            className={`hidden md:flex items-center gap-2 hover:bg-gray-100 transition-colors home-button home-button-3d ${isSellerPortal ? 'seller-home-button seller-button-3d' : 'buyer-home-button buyer-button-3d'} button-bounce button-shimmer`}
          >
            <Home className="h-4 w-4 home-button-icon" /> 
            <span className="relative">Home</span>
          </Button>
          
          <motion.div
            whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="navbar-item notification-bell"
          >
            <NotificationCenter />
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="navbar-item"
          >
            <Button 
              onClick={() => navigate('/items/add')} 
              className={currentUser?.isSeller ? "seller-button-gradient button-pulse-glow" : "buyer-button-gradient button-pulse-glow"}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Item
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex items-center cursor-pointer navbar-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/profile')}
          >
            <Avatar className={`border-2 ${currentUser?.isSeller ? 'border-amber-300 hover:border-amber-400' : 'border-blue-300 hover:border-blue-400'} hover:shadow-lg transition-all duration-300`}>
              <AvatarImage src={currentUser?.photoURL || undefined} />
              <AvatarFallback className={`${currentUser?.isSeller ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'} font-medium`}>
                {getInitials(currentUser?.displayName)}
              </AvatarFallback>
            </Avatar>
            <div className="ml-2 hidden md:block">
              <p className="text-sm font-medium">{currentUser?.displayName || 'User'}</p>
              {currentUser?.isSeller && (
                <p className="text-xs text-amber-600">
                  {currentUser?.verified ? '✓ Verified Seller' : 'Seller'}
                </p>
              )}
              {!currentUser?.isSeller && (
                <p className="text-xs text-blue-600">
                  Buyer
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
};

export default DashboardHeader;
