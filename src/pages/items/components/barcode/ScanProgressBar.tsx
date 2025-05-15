
import React from 'react';
import { motion } from 'framer-motion';

interface ScanProgressBarProps {
  progress: number;
  showPercentage?: boolean;
  indeterminate?: boolean;
  status?: 'idle' | 'scanning' | 'success' | 'error';
}

const ScanProgressBar: React.FC<ScanProgressBarProps> = ({ 
  progress, 
  showPercentage = false, 
  indeterminate = false,
  status = 'idle'
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-rose-500';
      default:
        return '';
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 px-4 pb-2 z-10">
      <div className={`scan-progress-container ${indeterminate ? 'scan-progress-indeterminate' : ''}`}>
        <motion.div
          className={`scan-progress-bar ${getStatusColor()}`}
          initial={{ width: '0%' }}
          animate={{ width: indeterminate ? '100%' : `${progress}%` }}
          transition={{ 
            type: indeterminate ? "tween" : "spring", 
            stiffness: 60, 
            damping: 20 
          }}
        />
      </div>
      
      {showPercentage && !indeterminate && (
        <motion.div 
          className="scan-progress-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {progress.toFixed(0)}%
        </motion.div>
      )}
    </div>
  );
};

export default ScanProgressBar;
