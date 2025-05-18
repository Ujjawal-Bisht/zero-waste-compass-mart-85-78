
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/logo';
import SearchBar from './SearchBar';

interface LogoSectionProps {
  isMobile?: boolean;
}

const LogoSection: React.FC<LogoSectionProps> = ({ isMobile = false }) => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  if (isMobile) {
    return (
      <div className="flex items-center w-full gap-3 lg:hidden">
        <motion.div 
          className="cursor-pointer navbar-item flex-shrink-0" 
          onClick={goToHome}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Logo size="sm" showText={false} animated={true} />
        </motion.div>
        <SearchBar />
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center gap-6">
      <motion.div 
        className="cursor-pointer navbar-item flex-shrink-0" 
        onClick={goToHome}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Logo size="sm" showText={true} animated={true} />
      </motion.div>
      <SearchBar />
    </div>
  );
};

export default LogoSection;
