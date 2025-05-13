
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
          
          {/* Additional NEW animated elements */}
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
          
          <motion.div 
            className="absolute top-10 right-1/3 w-24 h-24 rounded-full bg-gradient-to-r from-red-300 to-orange-300 blur-3xl opacity-15 glow-pulse"
            animate={{
              y: [0, 15, -15, 0],
              x: [0, -10, 10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "mirror",
              delay: 2,
            }}
          />
          
          <motion.div 
            className="absolute top-2/3 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-purple-300 to-indigo-500 blur-3xl opacity-10 pulse-glow"
            animate={{
              scale: [1, 1.2, 0.9, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-blue-400/10 to-indigo-400/10 blur-3xl gradient-shift"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          
          <motion.div 
            className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-r from-emerald-300 to-teal-400 blur-3xl opacity-10"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 20, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          
          <motion.div 
            className="absolute top-20 left-20 w-4 h-4 rounded-full bg-white opacity-20"
            animate={{
              y: [0, -100],
              opacity: [0.2, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
          
          {/* Animated comets */}
          {[...Array(5)].map((_, i) => (
            <motion.div 
              key={`comet-${i}`}
              className="absolute w-2 h-2 rounded-full bg-white opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() > 0.5 ? 200 : -200],
                y: [0, Math.random() > 0.5 ? 200 : -200],
                opacity: [0.2, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeOut",
              }}
            />
          ))}
          
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
          {[...Array(20)].map((_, index) => (
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
          
          {/* Star field background */}
          {[...Array(30)].map((_, index) => (
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
      
      {/* Center the login card with flex */}
      <div className="flex items-center justify-center w-full">
        <LoginCard />
      </div>
    </div>
  );
};

export default Login;
