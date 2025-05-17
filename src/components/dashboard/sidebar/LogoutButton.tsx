
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  onLogout: () => Promise<void>;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  return (
    <motion.div
      whileHover={{ x: 5, backgroundColor: "rgba(239, 68, 68, 0.2)" }}
      whileTap={{ scale: 0.95 }}
    >
      <Button 
        className="w-full justify-start text-white hover:bg-white hover:bg-opacity-10 logout-button" 
        variant="ghost" 
        onClick={onLogout}
      >
        <motion.div
          whileHover={{ rotate: 10 }}
          className="mr-2 flex items-center"
        >
          <LogOut className="h-4 w-4 transition-transform duration-300" />
        </motion.div>
        Logout
      </Button>
    </motion.div>
  );
};
