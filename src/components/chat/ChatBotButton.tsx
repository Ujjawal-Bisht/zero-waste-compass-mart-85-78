
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ChatBotButtonProps {
  onClick: () => void;
  isOpen: boolean;
  hasUnread?: boolean;
  isMobile?: boolean;
}

const ChatBotButton: React.FC<ChatBotButtonProps> = ({ 
  onClick, 
  isOpen, 
  hasUnread = false,
  isMobile = false
}) => {
  // Mobile-optimized styles
  const buttonClasses = isMobile
    ? 'rounded-full h-12 w-12 p-0 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg hover:shadow-xl touch-optimized'
    : 'rounded-full h-14 w-14 p-0 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg hover:shadow-xl';
    
  const positionClasses = isMobile
    ? 'fixed bottom-4 right-4 z-40'
    : 'fixed bottom-6 right-6 z-40';

  return (
    <motion.div
      className={positionClasses}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Button
        onClick={onClick}
        className={`${buttonClasses} ${isOpen ? 'hidden' : ''}`}
        aria-label="Open chat"
      >
        <MessageCircle size={isMobile ? 20 : 24} />
        
        {/* Unread message indicator */}
        {hasUnread && (
          <motion.div 
            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            1
          </motion.div>
        )}
      </Button>
    </motion.div>
  );
};

export default ChatBotButton;
