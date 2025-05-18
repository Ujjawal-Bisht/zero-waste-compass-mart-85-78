
import React from 'react';
import { Bot, MessagesSquare, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ZeroBotButtonProps {
  onClick: () => void;
  hasUnreadMessages: boolean;
  sellerMode: boolean;
}

const ZeroBotButton: React.FC<ZeroBotButtonProps> = ({ 
  onClick, 
  hasUnreadMessages,
  sellerMode 
}) => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <Button
        onClick={onClick}
        className={`rounded-full h-14 w-14 relative ${
          sellerMode 
            ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700' 
            : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700'
        } shadow-lg`}
        size="icon"
      >
        <Bot className="h-6 w-6" />
        
        {/* Animated ring when bot has new messages */}
        {hasUnreadMessages && (
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-white"
            initial={{ scale: 1 }}
            animate={{ scale: 1.15, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        
        {/* Notification badge */}
        {hasUnreadMessages && (
          <motion.div
            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            1
          </motion.div>
        )}
        
        {/* Mode indicator badge */}
        <motion.div
          className="absolute -bottom-1 -right-1 bg-white shadow-md text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
        >
          {sellerMode ? (
            <ShoppingCart className="h-3 w-3 text-amber-500" />
          ) : (
            <MessagesSquare className="h-3 w-3 text-emerald-500" />
          )}
        </motion.div>
      </Button>
    </motion.div>
  );
};

export default ZeroBotButton;
