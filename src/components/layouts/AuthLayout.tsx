
import React from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const AuthLayout: React.FC = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-white to-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-zwm-primary"></div>
      </div>
    );
  }

  // Redirect if user is already logged in
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-gray-100 flex flex-col justify-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-10 right-16 w-32 h-32 bg-zwm-primary rounded-full opacity-5"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute bottom-20 left-10 w-40 h-40 bg-zwm-secondary rounded-full opacity-5"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        />
        <motion.div 
          className="absolute top-40 left-1/4 w-24 h-24 bg-zwm-accent rounded-full opacity-5"
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", delay: 2 }}
        />
      </div>
      
      <div className="py-12 sm:px-6 lg:px-8 z-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="h-16 w-16 mx-auto rounded-full zwm-gradient flex items-center justify-center text-white shadow-lg"
          >
            <Leaf className="h-8 w-8 text-white animate-float" />
          </motion.div>
          <motion.h2 
            className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-heading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Zero Waste Mart
          </motion.h2>
          <motion.p 
            className="mt-2 text-center text-sm text-gray-600 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Join our sustainable community and help reduce waste together
          </motion.p>
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Outlet />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 text-center"
        >
          <Link to="/" className="text-sm text-zwm-primary hover:text-zwm-secondary transition-colors">
            ← Return to Home Page
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
