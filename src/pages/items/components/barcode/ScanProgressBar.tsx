
import React from 'react';
import { motion } from 'framer-motion';

interface ScanProgressBarProps {
  progress: number;
}

const ScanProgressBar: React.FC<ScanProgressBarProps> = ({ progress }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 px-4 pb-2 z-10">
      <div className="scan-progress-container">
        <motion.div
          className="scan-progress-bar"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
        />
      </div>
    </div>
  );
};

export default ScanProgressBar;
