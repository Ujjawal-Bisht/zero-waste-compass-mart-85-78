
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface SettingsPanelProps {
  showSettings: boolean;
  sellerMode: boolean;
  onClose: () => void;
  clearChat: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  showSettings,
  sellerMode,
  onClose,
  clearChat
}) => {
  if (!showSettings) return null;
  
  return (
    <motion.div
      className="absolute inset-0 bg-white z-10 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className={`p-3 flex justify-between items-center ${
        sellerMode ? 'bg-amber-500' : 'bg-emerald-500'
      } text-white`}>
        <h3 className="font-medium">Settings</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 rounded-full text-white/80 hover:text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X size={16} />
        </Button>
      </div>
      
      <div className="p-3 flex-1 space-y-4">
        <Button 
          variant="outline" 
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={clearChat}
        >
          Clear conversation
        </Button>
      </div>
    </motion.div>
  );
};

export default SettingsPanel;
