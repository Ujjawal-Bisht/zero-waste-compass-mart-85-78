
import React from 'react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Trash } from 'lucide-react';
import { motion } from 'framer-motion';

interface DeleteMenuItemProps {
  onClick: () => void;
}

const DeleteMenuItem: React.FC<DeleteMenuItemProps> = ({ onClick }) => {
  return (
    <motion.div 
      whileHover={{ x: 5, backgroundColor: "rgba(254, 202, 202, 0.8)" }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <DropdownMenuItem 
        onClick={onClick}
        className="flex items-center cursor-pointer text-red-600 action-delete"
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </DropdownMenuItem>
    </motion.div>
  );
};

export default DeleteMenuItem;
