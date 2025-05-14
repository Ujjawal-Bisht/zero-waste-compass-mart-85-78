
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText?: string;
  buttonAction?: () => void;
  iconBgColor?: string;
  animationType?: 'rotate' | 'scale' | 'vertical';
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  buttonText = "Learn More",
  buttonAction = () => {},
  iconBgColor = "bg-blue-50",
  animationType = 'scale',
  delay = 0
}) => {
  // Define animation variants based on the type
  const getIconAnimation = () => {
    switch (animationType) {
      case 'rotate':
        return {
          animate: {
            rotate: [0, 10, 0, -10, 0],
            transition: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }
        };
      case 'scale':
        return {
          animate: {
            scale: [1, 1.2, 1],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }
        };
      case 'vertical':
        return {
          animate: {
            y: [0, -7, 0],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }
        };
      default:
        return {
          animate: {}
        };
    }
  };

  const iconAnimation = getIconAnimation();

  // Get proper button color based on title
  const getButtonClasses = () => {
    if (title.includes('Upload') || title.includes('Add Item')) {
      return 'bg-indigo-600 hover:bg-indigo-700 text-white';
    } else if (title.includes('Connect')) {
      return 'bg-purple-600 hover:bg-purple-700 text-white';
    } else if (title.includes('Packaged') || title.includes('Manage Food')) {
      return 'bg-green-600 hover:bg-green-700 text-white';
    } else if (title.includes('Medicines') || title.includes('Pharmacy')) {
      return 'bg-blue-600 hover:bg-blue-700 text-white';
    } else {
      return 'bg-zwm-primary hover:bg-zwm-primary/90 text-white';
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 md:p-8 overflow-hidden spotlight-effect"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ translateY: -5 }}
    >
      <div className="relative z-10">
        <motion.div
          className={`h-16 w-16 ${iconBgColor} rounded-lg flex items-center justify-center mb-6`}
          {...iconAnimation}
        >
          <Icon className={`h-8 w-8 ${
            title.includes('Upload') ? 'text-indigo-600' :
            title.includes('Connect') ? 'text-purple-600' :
            title.includes('Packaged') ? 'text-green-600' :
            'text-blue-600'
          }`} />
        </motion.div>

        <motion.h3
          className="mt-2 text-xl font-medium font-heading text-gray-900"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="mt-3 text-gray-600"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {description}
        </motion.p>

        {buttonText && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={buttonAction}
              className={`${getButtonClasses()} shadow-md font-medium px-6 py-2 h-auto`}
            >
              {buttonText}
            </Button>
          </motion.div>
        )}
      </div>

      {/* Decorative elements specific to each card */}
      {title.includes('Upload') && (
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-100 rounded-full opacity-20 blur-md slow-spin"></div>
      )}
      
      {title.includes('Connect') && (
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-100 rounded-full opacity-20 blur-md message-pop"></div>
      )}
      
      {title.includes('Packaged') && (
        <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-green-100 rounded-full opacity-20 blur-md package-float"></div>
      )}
      
      {title.includes('Medicines') && (
        <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-100 rounded-full opacity-20 blur-md pill-float"></div>
      )}
    </motion.div>
  );
};

export default FeatureCard;
