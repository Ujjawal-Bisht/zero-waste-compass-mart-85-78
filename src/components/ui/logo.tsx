
import React from 'react';
import { cn } from '@/lib/utils';
import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  animated?: boolean;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  className, 
  showText = true,
  animated = true,
  onClick
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const leafIconSize = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  };
  
  return (
    <motion.div 
      className={cn("flex items-center gap-2", className)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className={cn(
          "rounded-full zwm-gradient flex items-center justify-center text-white font-bold relative overflow-hidden",
          sizeClasses[size],
          animated && "hover-scale"
        )}
        initial={{ rotate: 0 }}
        animate={animated ? { 
          rotate: [0, 5, 0, -5, 0],
          scale: [1, 1.05, 1, 1.05, 1]
        } : {}}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          repeatType: "loop",
          ease: "easeInOut"
        }}
      >
        <Leaf 
          className={cn("text-white", animated && "animate-float")} 
          size={leafIconSize[size]}
        />
        {animated && (
          <>
            <div className="absolute inset-0 bg-white/20 shimmer"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-pulse-slow"></div>
          </>
        )}
      </motion.div>
      {showText && (
        <motion.span 
          className={cn(
            "font-bold font-heading",
            textSizeClasses[size],
            animated ? "text-white drop-shadow-md" : "text-white"
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Zero Waste Mart
        </motion.span>
      )}
    </motion.div>
  );
};

export default Logo;
