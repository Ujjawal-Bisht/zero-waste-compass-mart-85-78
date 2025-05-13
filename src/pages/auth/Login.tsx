
import React from 'react';
import { Link } from 'react-router-dom';
import LoginCard from '@/components/auth/LoginComponents/LoginCard';
import Logo from '@/components/ui/logo';

const Login: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md mb-4">
        <div className="flex justify-center my-8">
          <Link to="/">
            <Logo size="lg" animated={true} />
          </Link>
        </div>
      </div>
      <LoginCard />
    </div>
  );
};

export default Login;
