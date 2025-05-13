
import React from 'react';
import { motion } from 'framer-motion';
import LoginCard from '@/components/auth/LoginComponents/LoginCard';

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen relative px-4">
      {/* Enhanced animated background with more elements and animations */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 2 }}
        >
          {/* Original floating elements with new animations */}
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
          
          {/* Wave effect elements */}
          <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
            {[...Array(5)].map((_, index) => (
              <motion.div
                key={`wave-${index}`}
                className={`absolute h-6 w-full bg-gradient-to-r from-blue-300/10 via-indigo-300/10 to-purple-300/10 rounded-full wave wave-group-${index + 1}`}
                style={{
                  bottom: `${index * 8}px`,
                  opacity: 0.1 - index * 0.01,
                  filter: `blur(${8 + index * 2}px)`,
                }}
              />
            ))}
          </div>
          
          {/* Particle system */}
          {[...Array(12)].map((_, index) => (
            <motion.div
              key={`particle-${index}`}
              className="absolute rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                opacity: Math.random() * 0.3,
              }}
              animate={{
                y: [0, Math.random() * -100],
                x: [0, (Math.random() - 0.5) * 50],
                opacity: [Math.random() * 0.3, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
          
          {/* Background radial gradient overlay */}
          <motion.div
            className="absolute w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2 }}
          >
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-100/5 to-transparent gradient-shift" />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Center the login card with flex */}
      <div className="flex items-center justify-center w-full">
        <LoginCard />
      </div>
    </div>
  );
};

export default Login;
