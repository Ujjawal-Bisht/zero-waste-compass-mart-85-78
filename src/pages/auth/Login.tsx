
import React from 'react';
import Background from '@/components/auth/login/Background';
import LoginCard from '@/components/auth/LoginComponents/LoginCard';

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen relative px-4">
      {/* Enhanced animated background */}
      <Background />
      
      {/* Center the login card with flex */}
      <div className="flex items-center justify-center w-full">
        <LoginCard />
      </div>
    </div>
  );
};

export default Login;
