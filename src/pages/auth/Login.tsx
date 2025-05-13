
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoginCard from '@/components/auth/LoginComponents/LoginCard';
import Logo from '@/components/ui/logo';

const Login: React.FC = () => {
  return (
    <div className="flex flex-col items-center relative">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <motion.div 
            className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-r from-blue-300 to-indigo-300 blur-3xl opacity-20"
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
            className="absolute -bottom-32 -right-16 w-64 h-64 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-3xl opacity-20"
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
            className="absolute top-1/3 -left-32 w-72 h-72 rounded-full bg-gradient-to-r from-green-300 to-emerald-400 blur-3xl opacity-10"
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
        </motion.div>
      </div>
      
      {/* Logo Section */}
      <div className="w-full max-w-md mb-4">
        <motion.div 
          className="flex justify-center my-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link to="/">
            <Logo size="lg" animated={true} />
          </Link>
        </motion.div>
      </div>
      
      {/* Login Card */}
      <LoginCard />
    </div>
  );
};

export default Login;
