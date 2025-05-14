
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ChatBotButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatBotButton: React.FC<ChatBotButtonProps> = ({ onClick, isOpen }) => {
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
      </Button>
    </motion.div>
  );
};

export default ChatBotButton;
