
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
          <div className="cursor-pointer" onClick={goToHome}>
            <Logo size="sm" showText={true} animated={true} />
          </div>
          <div className="flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="pl-10 w-full bg-gray-50 border-gray-100" 
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center lg:hidden">
          <div className="cursor-pointer" onClick={goToHome}>
            <Logo size="sm" showText={false} animated={true} />
          </div>
          <div className="flex-1 max-w-md ml-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="pl-10 w-full bg-gray-50 border-gray-100" 
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 md:space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={goToHome}
            className={`hidden md:flex items-center gap-2 hover:bg-gray-100 transition-colors home-button ${isSellerPortal ? 'seller-home-button' : 'buyer-home-button'} button-bounce`}
          >
            <Home className="h-4 w-4 home-button-icon rotate-on-hover" /> 
            <span className="relative">Home</span>
          </Button>
          
          <motion.div
            whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <NotificationCenter />
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => navigate('/items/add')} 
              className={currentUser?.isSeller ? "seller-button-gradient" : "buyer-button-gradient"}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Item
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex items-center cursor-pointer"
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
