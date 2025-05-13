
import React from 'react';
import { motion } from 'framer-motion';
import FloatingElements from './background/FloatingElements';
import AdditionalElements from './background/AdditionalElements';
import NewAnimatedElements from './background/NewAnimatedElements';
import IntenseAnimations from './background/IntenseAnimations';
import CosmicElements from './background/CosmicElements';
import RadialGradient from './background/RadialGradient';
import Starfield from './background/Starfield';

const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 2 }}
      >
        {/* Core floating elements */}
        <FloatingElements />
        
        {/* Additional enhanced elements */}
        <AdditionalElements />
        
        {/* New animated elements */}
        <NewAnimatedElements />
        
        {/* More intense animations */}
        <IntenseAnimations />
        
        {/* Cosmic elements */}
        <CosmicElements />
        
        {/* Background radial gradient overlay with animation */}
        <RadialGradient />
        
        {/* Enhanced star field background */}
        <Starfield />
      </motion.div>
    </div>
  );
};

export default Background;
