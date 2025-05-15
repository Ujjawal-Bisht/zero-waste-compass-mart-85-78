
import React from 'react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';
import { MenuItemProps } from './types';

const MenuItem: React.FC<MenuItemProps> = ({ onClick, icon, label, className }) => {
  const itemAnimation = {
    whileHover: { x: 5, backgroundColor: "rgba(243, 244, 246, 0.8)" },
    transition: { type: "spring", stiffness: 300, damping: 10 }
  };

  return (
    <motion.div {...itemAnimation}>
      <DropdownMenuItem 
        onClick={onClick}
        className={`flex items-center cursor-pointer ${className || ''}`}
      >
        {icon}
        {label}
      </DropdownMenuItem>
    </motion.div>
  );
};

export default MenuItem;
