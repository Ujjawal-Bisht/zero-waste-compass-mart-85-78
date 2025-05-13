
import React from 'react';
import { motion } from 'framer-motion';
import RegisterForm from '@/components/auth/RegisterForm';

const Register: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen relative px-4 register-bg">
      {/* Enhanced animated background with more elements and animations - similar to Login page */}
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
      
      {/* Content container */}
      <div className="w-full z-10 mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}>
              <div className="h-16 w-16 rounded-full zwm-gradient flex items-center justify-center text-white font-bold text-2xl mb-2">ZW</div>
            </motion.div>
          </motion.div>
          
          {/* Card */}
          <div className="border-0 shadow-xl overflow-hidden bg-white rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 z-0"></div>
            <div className="relative z-10 px-6 py-8 md:p-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center mb-6"
              >
                <h1 className="text-2xl font-bold mb-2">Create an Account</h1>
                <motion.div 
                  className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"
                  animate={{
                    width: ["0%", "100%", "50%"],
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "easeInOut",
                  }}
                />
                <p className="text-center mt-2 text-gray-600">
                  Join Zero Waste Mart to buy and sell surplus goods
                </p>
              </motion.div>
              
              {/* Registration Form */}
              <RegisterForm />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
