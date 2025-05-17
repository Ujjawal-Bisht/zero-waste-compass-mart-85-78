
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, LogOut, Settings, UserCircle, ShoppingBag, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

const UserMenu: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = () => {
    // In a real app, we would call auth.signOut() here
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    // Navigate to login page
    navigate('/login');
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <motion.button 
          className="relative flex items-center focus:outline-none rounded-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Avatar className={`h-9 w-9 border-2 ${currentUser?.isSeller ? 'border-amber-300 hover:border-amber-400' : 'border-blue-300 hover:border-blue-400'} hover:shadow-lg transition-all duration-300`}>
            <AvatarImage src={currentUser?.photoURL || undefined} />
            <AvatarFallback className={`${currentUser?.isSeller ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'} font-medium`}>
              {getInitials(currentUser?.displayName)}
            </AvatarFallback>
          </Avatar>
        </motion.button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56 mt-1 bg-white border border-gray-100 shadow-lg rounded-lg p-1">
        <DropdownMenuLabel className="flex items-center px-3 py-2">
          <div className="flex-grow">
            <p className="font-medium">{currentUser?.displayName || 'User'}</p>
            <p className="text-xs text-gray-500 truncate">{currentUser?.email || 'user@example.com'}</p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="flex items-center cursor-pointer px-3 py-2 hover:bg-gray-50" 
          onClick={() => { navigate('/profile'); setOpen(false); }}
        >
          <UserCircle className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="flex items-center cursor-pointer px-3 py-2 hover:bg-gray-50" 
          onClick={() => { navigate('/orders'); setOpen(false); }}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          <span>Orders</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="flex items-center cursor-pointer px-3 py-2 hover:bg-gray-50" 
          onClick={() => { navigate('/wishlist'); setOpen(false); }}
        >
          <Heart className="mr-2 h-4 w-4" />
          <span>Wishlist</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="flex items-center cursor-pointer px-3 py-2 hover:bg-gray-50" 
          onClick={() => { navigate('/settings'); setOpen(false); }}
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="flex items-center cursor-pointer px-3 py-2 hover:bg-rose-50 text-rose-600" 
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
