
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/logo';

interface SidebarLogoProps {
  onClose?: () => void;
}

export const SidebarLogo: React.FC<SidebarLogoProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    if (onClose) {
      onClose();
    }
  };

  return (
    <motion.div 
      className="mb-8 pl-2 flex items-center"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <Logo className="cursor-pointer hover-scale" onClick={handleLogoClick} />
    </motion.div>
  );
};
