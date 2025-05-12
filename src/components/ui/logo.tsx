
import React from 'react';
import { cn } from '@/lib/utils';
import { Leaf } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  className, 
  showText = true,
  animated = true
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div 
        className={cn(
          "rounded-full zwm-gradient flex items-center justify-center text-white font-bold relative overflow-hidden",
          sizeClasses[size],
          animated && "hover-scale"
        )}
      >
        <Leaf 
          className={cn("text-white", animated && "animate-float")} 
          size={size === 'sm' ? 16 : size === 'md' ? 20 : 24}
        />
        {animated && (
          <div className="absolute inset-0 bg-white/20 shimmer"></div>
        )}
      </div>
      {showText && (
        <span className={cn(
          "font-bold font-heading text-white",
          textSizeClasses[size],
          animated && "gradient-text"
        )}>
          Zero Waste Mart
        </span>
      )}
    </div>
  );
};

export default Logo;
