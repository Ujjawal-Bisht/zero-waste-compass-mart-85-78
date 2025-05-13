
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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

  // Stars animation variants
  const starVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 }
  };

  return (
    <section className="bg-gradient-to-r from-zwm-primary to-zwm-secondary py-16 md:py-24 relative overflow-hidden gradient-shift">
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -right-20 top-20 w-64 h-64 rounded-full bg-white opacity-10 glow-pulse"
          animate={{ 
            y: [0, -20, 0], 
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute left-10 bottom-10 w-40 h-40 rounded-full bg-white opacity-5 radiance"
          animate={{ 
            y: [0, 20, 0], 
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        />
        
        {/* Floating stars */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div 
              key={i}
              className="absolute"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.5, 1, 0.5], 
                scale: [0.8, 1, 0.8],
                x: `calc(${Math.random() * 100}vw)`,
                y: `calc(${Math.random() * 100}%)`
              }}
              transition={{ 
                duration: 3 + Math.random() * 6,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.7
              }}
            >
              <Star 
                className="text-white/30" 
                size={10 + Math.random() * 15} 
                fill="white" 
                fillOpacity={0.5}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Animated backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zwm-secondary/20 spiral-float"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="relative inline-block">
            <Logo size={isMobile ? "lg" : "xl"} showText={true} />
            
            {/* Animated star burst around logo */}
            <div className="absolute inset-0 -m-2">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 w-1 h-6 bg-white/30 origin-bottom rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: [0, 0.8, 0] }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 4
                  }}
                  style={{ transform: `rotate(${angle}deg) translateY(-20px)` }}
                />
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.h2 
          className="mt-6 md:mt-8 text-2xl md:text-4xl font-bold font-heading text-white text-shadow-md"
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
          {/* Enhanced Get Started button with special effects */}
          <div className="relative inline-block">
            {/* Pulsing rings */}
            <div className="absolute inset-0 -m-3 rounded-full bg-white/10 animate-ping-slow"></div>
            <div className="absolute inset-0 -m-1 rounded-full bg-white/30 pulse-glow"></div>
            
            {/* Enhanced button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleGetStarted}
                className="bg-white text-zwm-primary hover:bg-gray-100 text-base md:text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group button-hover"
              >
                <span className="relative z-10 group-hover:text-zwm-secondary transition-colors">Get Started</span>
                <span className="flex items-center ml-2 relative z-10">
                  <Sparkles className="h-5 w-5 mr-1 text-amber-500 sparkle" />
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </motion.div>
            
            {/* Floating star decorations */}
            <motion.div
              className="absolute -top-4 -right-2"
              variants={starVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 1, duration: 0.5 }}
            >
              <Star className="h-5 w-5 text-amber-300 twinkle" fill="currentColor" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-2 -left-4"
              variants={starVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <Star className="h-4 w-4 text-amber-300 twinkle-delay-3" fill="currentColor" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
