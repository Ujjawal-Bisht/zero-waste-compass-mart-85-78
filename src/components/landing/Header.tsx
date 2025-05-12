
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/logo';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Logo size="md" showText={true} animated={true} onClick={() => navigate('/')} />
          </div>
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <Button 
                onClick={() => navigate('/dashboard')} 
                className="zwm-gradient-hover"
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button 
                  onClick={() => navigate('/register')} 
                  className="zwm-gradient-hover"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
