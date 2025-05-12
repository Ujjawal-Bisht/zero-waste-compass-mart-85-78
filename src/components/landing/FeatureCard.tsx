
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
  iconBgColor: string;
  animationType?: 'rotate' | 'scale' | 'vertical';
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  buttonText,
  buttonAction,
  iconBgColor,
  animationType = 'rotate',
}) => {
  let hoverAnimation = {};
  
  // Set animation based on type
  switch (animationType) {
    case 'rotate':
      hoverAnimation = { rotate: [0, 10, -10, 0], transition: { duration: 0.5 } };
      break;
    case 'scale':
      hoverAnimation = { scale: [1, 1.2, 1], transition: { duration: 0.5 } };
      break;
    case 'vertical':
      hoverAnimation = { y: [0, -5, 0], transition: { duration: 0.5, repeat: 1 } };
      break;
    default:
      hoverAnimation = { rotate: [0, 10, -10, 0], transition: { duration: 0.5 } };
  }

  return (
    <motion.div 
      className="zwm-card p-8 text-center flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
    >
      <motion.div 
        className={`h-20 w-20 rounded-full ${iconBgColor} flex items-center justify-center mb-6`}
        whileHover={hoverAnimation}
      >
        <Icon className="h-10 w-10" />
      </motion.div>
      <h3 className="mt-2 text-2xl font-medium font-heading text-gray-900">{title}</h3>
      <p className="mt-3 text-gray-600 max-w-md">
        {description}
      </p>
      <Button variant="outline" className="mt-6" onClick={buttonAction}>
        {buttonText}
      </Button>
    </motion.div>
  );
};

export default FeatureCard;
