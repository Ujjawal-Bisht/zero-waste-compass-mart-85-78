
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Logo from '@/components/ui/logo';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection: React.FC = () => {
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
    <section className="relative">
      <div className="bg-gradient-to-r from-zwm-primary to-zwm-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 relative z-10">
          <div className="md:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center md:justify-start"
            >
              <Logo size={isMobile ? "lg" : "xl"} showText={true} animated={true} />
            </motion.div>
            <motion.h1 
              className="mt-6 text-3xl md:text-4xl lg:text-6xl font-bold font-heading text-white leading-tight text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Reduce Waste, <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 neon-glow">Share Value</span>
            </motion.h1>
            <motion.p 
              className="mt-6 text-lg md:text-xl text-white opacity-90 max-w-2xl text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Join the community fighting food waste and promoting sustainability. Share, donate, or sell your excess items.
            </motion.p>

            {/* Enhanced Get Started Button with animations */}
            <motion.div 
              className="mt-10 flex justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="relative">
                {/* Animated rings around the button */}
                <div className="absolute inset-0 -m-4 rounded-full bg-white/10 animate-ping-slow"></div>
                <div className="absolute inset-0 -m-2 rounded-full bg-white/20 animate-pulse-slow"></div>
                
                {/* The actual button with enhanced animations */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10"
                >
                  <Button
                    onClick={handleGetStarted}
                    className="button-hover gradient-shift bg-white text-zwm-primary hover:bg-gray-100 text-lg px-6 py-5 md:px-8 md:py-6 shadow-lg rounded-full group ripple-effect"
                  >
                    <span className="mr-2">Get Started</span>
                    <span className="inline-flex items-center">
                      <Sparkles className="h-5 w-5 mr-1 text-amber-500 shimmer" />
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </motion.div>
                
                {/* Sparkle elements around button */}
                <div className="absolute -top-4 -right-2 h-6 w-6 rounded-full bg-amber-300/80 sparkle twinkle-delay-1"></div>
                <div className="absolute -bottom-3 -left-4 h-5 w-5 rounded-full bg-amber-300/80 sparkle twinkle-delay-3"></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Abstract Shapes with more animations - REMOVED WHITE CIRCLE */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <motion.div 
            className="absolute right-20 bottom-10 w-40 md:w-64 h-40 md:h-64 rounded-full bg-white opacity-10 cosmic-pulse"
            animate={{ 
              y: [0, 20, 0], 
              scale: [1, 1.05, 1],
              rotate: [0, -3, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          ></motion.div>
          <motion.div 
            className="absolute left-20 top-40 w-48 md:w-72 h-48 md:h-72 rounded-full bg-white opacity-10 radiance"
            animate={{ 
              y: [0, -15, 0], 
              scale: [1, 1.08, 1],
              rotate: [0, 3, 0]
            }}
            transition={{ duration: 9, repeat: Infinity, repeatType: "reverse", delay: 2 }}
          ></motion.div>
          
          {/* New floating elements */}
          <div className="absolute left-1/3 bottom-1/4">
            <div className="w-3 h-3 bg-white rounded-full twinkle twinkle-delay-2"></div>
          </div>
          <div className="absolute left-1/2 top-1/3">
            <div className="w-2 h-2 bg-white rounded-full twinkle twinkle-delay-4"></div>
          </div>
          <div className="absolute right-1/4 top-1/4">
            <div className="w-4 h-4 bg-white rounded-full twinkle twinkle-delay-5"></div>
          </div>
          
          {/* Comet animation */}
          <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
            <div className="absolute w-8 h-8 bg-gradient-to-r from-white to-transparent rounded-full blur-sm comet-trail"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
