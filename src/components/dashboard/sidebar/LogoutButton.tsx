
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

interface LogoutButtonProps {
  className?: string;
  onLogout?: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ className, onLogout }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      if (onLogout) {
        onLogout();
      }
      toast.success('Successfully logged out');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Failed to log out. Please try again.');
    }
  };

  return (
    <motion.div
      className={`${className} rounded-md overflow-hidden`}
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 1 }}
      whileHover={{ 
        scale: 1.04,
        rotate: -2,
        boxShadow: "0 0 18px 2px rgba(239,68,68,0.25)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.97, rotate: 0 }}
    >
      <Button 
        className="w-full justify-start text-white group hover:bg-transparent transition-all duration-300"
        variant="ghost"
        onClick={handleLogout}
      >
        <motion.div
          className="mr-2 flex items-center"
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 15, transition: { duration: 0.3 } }}
        >
          <LogOut className="h-4 w-4 animate-pulse text-rose-500 transition-transform duration-300" />
        </motion.div>
        <span className="group-hover:translate-x-1 transition-transform duration-200">
          Logout
        </span>
      </Button>
    </motion.div>
  );
};

export default LogoutButton;
