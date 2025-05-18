
import React from 'react';
import Background from '@/components/auth/login/Background';
import LoginCard from '@/components/auth/LoginComponents/LoginCard';

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-full relative px-4 py-8">
      {/* Enhanced animated background */}
      <Background />
      
      {/* Center the login card with flex */}
      <div className="flex items-center justify-center w-full z-10">
        <LoginCard />
      </div>
    </div>
  );
};

export default Login;
