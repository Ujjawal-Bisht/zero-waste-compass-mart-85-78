
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ChatBotButtonProps {
  onClick: () => void;
  isOpen: boolean;
  hasUnread?: boolean;
}

const ChatBotButton: React.FC<ChatBotButtonProps> = ({ onClick, isOpen, hasUnread = false }) => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Button
        onClick={onClick}
        className={`rounded-full h-14 w-14 p-0 zwm-gradient shadow-lg hover:shadow-xl pulse-glow float-button ${isOpen ? 'hidden' : ''}`}
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
        
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
