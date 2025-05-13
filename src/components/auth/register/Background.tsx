
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
        {/* Original floating elements with animations */}
        <motion.div 
          className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-r from-blue-300 to-indigo-300 blur-3xl opacity-20 glow-pulse"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute -bottom-32 -right-16 w-64 h-64 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-3xl opacity-20 spiral-float"
          animate={{
            y: [0, -40, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
        />
        <motion.div 
          className="absolute top-1/3 -left-32 w-72 h-72 rounded-full bg-gradient-to-r from-green-300 to-emerald-400 blur-3xl opacity-10 color-shift"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
        
        {/* Additional enhanced animated elements */}
        <motion.div 
          className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-amber-300 to-orange-400 blur-3xl opacity-10 radiance"
          animate={{
            scale: [1, 1.1, 0.9, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 3,
          }}
        />
        <motion.div 
          className="absolute top-1/4 right-1/3 w-32 h-32 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 blur-3xl opacity-15 particle-float"
          animate={{
            y: [0, -20, 20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 5,
          }}
        />
        
        {/* New animated elements */}
        <motion.div 
          className="absolute top-1/2 right-20 w-28 h-28 rounded-full bg-gradient-to-r from-pink-300 to-rose-400 blur-3xl opacity-20 orbit"
          animate={{
            x: [0, 30, 0, -30, 0],
            y: [0, 30, 0, -30, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-20 w-36 h-36 rounded-full bg-gradient-to-r from-yellow-200 to-yellow-400 blur-3xl opacity-10 blur-breathe"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        {/* Additional animated elements */}
        <motion.div 
          className="absolute top-1/4 left-1/3 w-44 h-44 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-500 blur-3xl opacity-10 spiral-float"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 7,
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 blur-3xl opacity-10 radiance"
          animate={{
            y: [0, -40, 20, 0],
            x: [0, 30, -20, 0],
            rotate: [0, 20, -10, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />

        {/* New animated cosmic elements */}
        <motion.div 
          className="absolute top-10 right-1/3 w-60 h-60 rounded-full bg-gradient-to-r from-green-400 to-blue-300 blur-3xl opacity-15 cosmic-spiral"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div 
          className="absolute bottom-40 right-10 w-52 h-52 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 blur-3xl opacity-15 quantum-pulse"
          animate={{
            scale: [1, 1.2, 0.9, 1.15, 1],
            opacity: [0.1, 0.15, 0.1, 0.18, 0.1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
          }}
        />

        <motion.div 
          className="absolute top-40 left-10 w-48 h-48 rounded-full bg-gradient-to-r from-teal-300 to-cyan-400 blur-3xl opacity-15 nebula-drift"
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -20, 30, 10, 0],
            rotate: [0, 120, 240, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        {/* Background radial gradient overlay */}
        <motion.div
          className="absolute w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-100/5 to-transparent gradient-shift" />
        </motion.div>
        
        {/* Star field background */}
        {[...Array(50)].map((_, index) => (
          <motion.div
            key={`star-${index}`}
            className="absolute bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 1 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Background;
