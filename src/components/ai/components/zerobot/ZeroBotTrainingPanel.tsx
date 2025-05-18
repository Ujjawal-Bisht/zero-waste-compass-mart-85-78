
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ZeroBotTrainingPanelProps {
  setTrainingMode: (mode: boolean) => void;
}

const ZeroBotTrainingPanel: React.FC<ZeroBotTrainingPanelProps> = ({
  setTrainingMode
}) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="border-t border-gray-100 bg-indigo-50 overflow-hidden"
    >
      <div className="p-3 space-y-2">
        <div className="text-center">
          <h3 className="font-medium text-indigo-700">Training Mode Deprecated</h3>
          <p className="text-sm text-gray-600 mb-2">
            The training feature has been removed in this version.
            For customizations, please contact support.
          </p>
        </div>
        <div className="flex justify-center">
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setTrainingMode(false)}
          >
            Close
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ZeroBotTrainingPanel;
