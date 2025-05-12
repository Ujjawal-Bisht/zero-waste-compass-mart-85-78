
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import NotificationCenter from '@/components/NotificationCenter';

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

  return (
    <header className="bg-white shadow-sm z-10 sticky top-0">
      <motion.div 
        className="flex justify-between items-center px-6 py-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="pl-10 w-full" 
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
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
              className="zwm-gradient-hover shadow-pop"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Item
            </Button>
          </motion.div>
          
          <motion.div 
            className="ml-2 flex items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/profile')}
          >
            <Avatar className="border-2 border-zwm-primary/20 hover:border-zwm-primary hover:shadow-lg transition-all duration-300">
              <AvatarImage src={currentUser?.photoURL || undefined} />
              <AvatarFallback className="bg-zwm-primary/10 text-zwm-primary font-medium">{getInitials(currentUser?.displayName)}</AvatarFallback>
            </Avatar>
            <div className="ml-2 hidden md:block">
              <p className="text-sm font-medium">{currentUser?.displayName || 'User'}</p>
              {currentUser?.isSeller && (
                <p className="text-xs text-muted-foreground">
                  {currentUser?.verified ? 'Verified Seller' : 'Seller'}
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
