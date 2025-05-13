
import React from 'react';
import { motion } from 'framer-motion';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Store } from 'lucide-react';

interface AccountTypeTabsProps {
  accountType: 'buyer' | 'seller';
}

const AccountTypeTabs: React.FC<AccountTypeTabsProps> = ({ accountType }) => {
  // Animation variants for the tab buttons
  const tabButtonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <TabsList className="grid w-full grid-cols-2">
      <motion.div 
        whileHover="hover" 
        whileTap="tap"
        variants={tabButtonVariants}
        className="w-full"
      >
        <TabsTrigger 
          value="buyer" 
          className="flex items-center gap-2 py-3 w-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white transition-all duration-300 hover:bg-blue-50"
        >
          <User size={16} /> 
          <span className="text-base">
            Buyer
          </span>
        </TabsTrigger>
      </motion.div>
      <motion.div 
        whileHover="hover" 
        whileTap="tap"
        variants={tabButtonVariants}
        className="w-full"
      >
        <TabsTrigger 
          value="seller" 
          className="flex items-center gap-2 py-3 w-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white transition-all duration-300 hover:bg-amber-50"
        >
          <Store size={16} />
          <span className="text-base">
            Seller
          </span>
        </TabsTrigger>
      </motion.div>
    </TabsList>
  );
};

export default AccountTypeTabs;
