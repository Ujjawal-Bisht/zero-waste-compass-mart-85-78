
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const isMobile = useIsMobile();

  const handleGetStarted = () => {
    if (currentUser) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <section className="bg-gradient-to-r from-zwm-primary to-zwm-secondary py-16 md:py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -right-20 top-20 w-64 h-64 rounded-full bg-white opacity-10"
          animate={{ 
            y: [0, -20, 0], 
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute left-10 bottom-10 w-40 h-40 rounded-full bg-white opacity-5"
          animate={{ 
            y: [0, 20, 0], 
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Logo size={isMobile ? "lg" : "xl"} showText={true} />
        </motion.div>
        <motion.h2 
          className="mt-6 md:mt-8 text-2xl md:text-4xl font-bold font-heading text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Join Zero Waste Mart Today
        </motion.h2>
        <motion.p 
          className="mt-3 md:mt-4 text-lg md:text-xl text-white opacity-90 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Start sharing, reducing waste, and making a difference in your community.
        </motion.p>
        <motion.div 
          className="mt-8 md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Button
            onClick={handleGetStarted}
            className="bg-white text-zwm-primary hover:bg-gray-100 text-base md:text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
