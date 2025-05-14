
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { User } from '@/types';

interface UserWelcomeProps {
  currentUser: User | null;
}

const UserWelcome: React.FC<UserWelcomeProps> = ({ currentUser }) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-between"
    >
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {currentUser?.businessName || currentUser?.displayName}
        </h2>
        <p className="text-muted-foreground">
          Manage your products, orders and seller profile from here.
        </p>
      </div>
      {currentUser?.verified && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="verified-badge bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
        >
          <CheckCircle2 className="h-4 w-4 mr-1" />
          Verified Seller
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserWelcome;
