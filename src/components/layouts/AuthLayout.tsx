
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AuthLayout: React.FC = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zwm-primary"></div>
      </div>
    );
  }

  // Redirect if user is already logged in
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="h-16 w-16 mx-auto rounded-full bg-zwm-primary flex items-center justify-center text-white font-bold text-2xl">
            Z
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Zero Waste Mart
          </h2>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
