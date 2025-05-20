
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NavItemType } from './types';

interface NavItemProps {
  item: NavItemType;
  index: number;
  isActive: (path: string) => boolean;
  onItemClick?: () => void;
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({ 
    opacity: 1, 
    x: 0,
    transition: { 
      delay: i * 0.1,
      duration: 0.5
    }
  }),
  hover: { 
    x: 5,
    transition: { duration: 0.2 }
  }
};

const NavItem: React.FC<NavItemProps> = ({ item, index, isActive, onItemClick }) => {
  const baseClass = "flex items-center w-full px-3 py-2.5 text-sm rounded-md transition-all duration-200";
  const activeClass = "bg-gradient-to-r from-zwm-primary/15 to-zwm-secondary/15 text-zwm-primary font-medium";
  const inactiveClass = "text-gray-100 hover:bg-white/10";
  
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={itemVariants}
    >
      <Link
        to={item.path}
        className={cn(
          baseClass,
          isActive(item.path) ? activeClass : inactiveClass,
          item.highlight && !isActive(item.path) && "border border-dashed border-white/20"
        )}
        onClick={onItemClick}
      >
        <span className="mr-3">{item.icon}</span>
        <span className="relative">
          {item.label}
          {item.highlight && !isActive(item.path) && (
            <span className="absolute top-0 -right-6 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
          )}
        </span>
      </Link>
    </motion.div>
  );
};

export default NavItem;
