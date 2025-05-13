
import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import Background from '@/components/auth/register/Background';
import Logo from '@/components/auth/register/Logo';
import Header from '@/components/auth/register/Header';
import CardContainer from '@/components/auth/register/CardContainer';

const Register: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen relative px-4 register-bg">
      {/* Enhanced animated background with more elements and animations */}
      <Background />
      
      {/* Content container */}
      <div className="w-full z-10 mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
        <CardContainer>
          {/* Logo */}
          <Logo />
          
          {/* Header */}
          <Header />
          
          {/* Registration Form */}
          <RegisterForm />
        </CardContainer>
      </div>
    </div>
  );
};

export default Register;
