
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';

interface ZeroBotFloatingButtonProps {
  onClick: () => void;
}

const ZeroBotFloatingButton: React.FC<ZeroBotFloatingButtonProps> = ({ onClick }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, type: 'spring' }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        onClick={onClick}
        className="rounded-full h-14 w-14 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg"
        size="icon"
      >
        <Bot className="h-6 w-6" />
      </Button>
    </motion.div>
  );
};

export default ZeroBotFloatingButton;
