
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { Loader2 } from 'lucide-react';
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
      
      <div className="py-12 sm:px-6 lg:px-8 z-10 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
