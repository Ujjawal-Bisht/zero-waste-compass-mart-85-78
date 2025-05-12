
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';

interface SellerRouteProps {
  children: React.ReactNode;
}

const SellerRoute: React.FC<SellerRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  // Block sellers from accessing the marketplace
  if (location.pathname === '/marketplace' && currentUser?.isSeller) {
    return <Navigate to="/seller/dashboard" state={{ from: location }} replace />;
  }
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return currentUser?.isSeller ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default SellerRoute;
