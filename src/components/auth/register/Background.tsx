
import React from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 2 }}
      >
        {/* Enhanced original floating elements with more intense animations */}
        <motion.div 
          className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-r from-blue-300 to-indigo-300 blur-3xl opacity-20 glow-pulse"
          animate={{
            y: [0, 40, -20, 30, 0],
            x: [0, 30, -20, 10, 0],
            scale: [1, 1.1, 0.9, 1.2, 1],
            rotate: [0, 10, -10, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        <motion.div 
          className="absolute -bottom-32 -right-16 w-64 h-64 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-3xl opacity-20 spiral-float"
          animate={{
            y: [0, -50, 20, -30, 0],
            x: [0, -40, 20, -10, 0],
            scale: [1, 1.2, 0.8, 1.1, 1],
            rotate: [0, -20, 40, -10, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 2,
          }}
        />
        <motion.div 
          className="absolute top-1/3 -left-32 w-72 h-72 rounded-full bg-gradient-to-r from-green-300 to-emerald-400 blur-3xl opacity-10 color-shift"
          animate={{
            scale: [1, 1.3, 0.9, 1.2, 1],
            rotate: [0, 30, -20, 10, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
        
        {/* Additional enhanced animated elements */}
        <motion.div 
          className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 blur-3xl opacity-15 radiance"
          animate={{
            scale: [1, 1.3, 0.8, 1.2, 1],
            rotate: [0, 15, -15, 20, 0],
            opacity: [0.1, 0.2, 0.15, 0.25, 0.1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 3,
          }}
        />
        <motion.div 
          className="absolute top-1/4 right-1/3 w-32 h-32 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 blur-3xl opacity-20 particle-float"
          animate={{
            y: [0, -30, 20, -10, 0],
            rotate: [0, 20, -20, 10, 0],
            scale: [1, 1.2, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 5,
          }}
        />
        
        {/* New enhanced animated elements */}
        <motion.div 
          className="absolute top-1/2 right-20 w-28 h-28 rounded-full bg-gradient-to-r from-pink-300 to-rose-400 blur-3xl opacity-25 orbit"
          animate={{
            x: [0, 40, 0, -40, 0],
            y: [0, 40, 0, -40, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
            opacity: [0.15, 0.25, 0.15, 0.2, 0.15],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-20 w-36 h-36 rounded-full bg-gradient-to-r from-yellow-200 to-yellow-400 blur-3xl opacity-15 blur-breathe"
          animate={{
            scale: [1, 1.4, 0.8, 1.2, 1],
            opacity: [0.1, 0.2, 0.15, 0.25, 0.1],
            filter: ["blur(40px)", "blur(60px)", "blur(50px)", "blur(70px)", "blur(40px)"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        
        {/* Additional animated elements with more intensity */}
        <motion.div 
          className="absolute top-1/4 left-1/3 w-44 h-44 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-500 blur-3xl opacity-15 spiral-float"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 0.7, 1.2, 1],
            filter: ["blur(50px)", "blur(70px)", "blur(60px)", "blur(80px)", "blur(50px)"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 7,
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 blur-3xl opacity-15 radiance"
          animate={{
            y: [0, -50, 30, -20, 0],
            x: [0, 40, -30, 20, 0],
            rotate: [0, 30, -20, 10, 0],
            scale: [1, 1.2, 0.8, 1.1, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />

        {/* New animated cosmic elements */}
        <motion.div 
          className="absolute top-10 right-1/3 w-60 h-60 rounded-full bg-gradient-to-r from-green-400 to-blue-300 blur-3xl opacity-20 cosmic-spiral"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 0.8, 1.2, 1],
            opacity: [0.1, 0.2, 0.15, 0.25, 0.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />

        <motion.div 
          className="absolute bottom-40 right-10 w-52 h-52 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 blur-3xl opacity-20 quantum-pulse"
          animate={{
            scale: [1, 1.3, 0.8, 1.25, 1],
            opacity: [0.1, 0.25, 0.1, 0.2, 0.1],
            filter: ["blur(50px)", "blur(70px)", "blur(60px)", "blur(80px)", "blur(50px)"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />

        <motion.div 
          className="absolute top-40 left-10 w-48 h-48 rounded-full bg-gradient-to-r from-teal-300 to-cyan-400 blur-3xl opacity-20 nebula-drift"
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 40, 10, 0],
            rotate: [0, 180, 0, 360, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        
        {/* Background radial gradient overlay with animation */}
        <motion.div
          className="absolute w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-radial from-transparent via-blue-100/10 to-transparent gradient-shift"
            animate={{
              opacity: [0.2, 0.4, 0.3, 0.5, 0.2],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        </motion.div>
        
        {/* Enhanced star field background with more stars */}
        {[...Array(80)].map((_, index) => (
          <motion.div
            key={`star-${index}`}
            className="absolute bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Background;
