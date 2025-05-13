
import React from 'react';
import { motion } from 'framer-motion';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Smartphone } from 'lucide-react';

interface RegistrationMethodTabsProps {
  accountType: 'buyer' | 'seller';
}

const RegistrationMethodTabs: React.FC<RegistrationMethodTabsProps> = ({ accountType }) => {
  // Animation variants for the tab buttons
  const tabButtonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const bgHoverClass = accountType === 'buyer' ? 'hover:bg-blue-50' : 'hover:bg-amber-50';

  return (
    <TabsList className="grid w-full grid-cols-3 mb-4">
      <motion.div whileHover="hover" whileTap="tap" variants={tabButtonVariants} className="w-full">
        <TabsTrigger 
          value="email" 
          className={`flex items-center gap-2 w-full transition-all duration-300 ${bgHoverClass}`}
        >
          <Mail size={16} /> Email
        </TabsTrigger>
      </motion.div>
      <motion.div whileHover="hover" whileTap="tap" variants={tabButtonVariants} className="w-full">
        <TabsTrigger 
          value="phone" 
          className={`flex items-center gap-2 w-full transition-all duration-300 ${bgHoverClass}`}
        >
          <Smartphone size={16} /> Phone
        </TabsTrigger>
      </motion.div>
      <motion.div whileHover="hover" whileTap="tap" variants={tabButtonVariants} className="w-full">
        <TabsTrigger 
          value="google" 
          className={`flex items-center gap-2 w-full transition-all duration-300 ${bgHoverClass}`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg> Google
        </TabsTrigger>
      </motion.div>
    </TabsList>
  );
};

export default RegistrationMethodTabs;
