
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

interface LogoutButtonProps {
  className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ className }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Failed to log out. Please try again.');
    }
  };

  return (
    <motion.div
      whileHover={{ x: 5, backgroundColor: "rgba(239, 68, 68, 0.2)" }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      <Button 
        className="w-full justify-start text-white hover:bg-white hover:bg-opacity-10 logout-button" 
        variant="ghost" 
        onClick={handleLogout}
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

export default LogoutButton;
