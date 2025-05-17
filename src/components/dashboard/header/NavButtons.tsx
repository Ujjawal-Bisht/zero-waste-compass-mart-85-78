
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavButtonsProps {
  isSellerPortal: boolean;
}

const NavButtons: React.FC<NavButtonsProps> = ({ isSellerPortal }) => {
  const navigate = useNavigate();
  
  const goToHome = () => {
    navigate('/');
  };

  const goToCart = () => {
    navigate('/cart');
  };
  
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={goToHome}
        className={`hidden md:flex items-center gap-2 hover:bg-gray-100 transition-colors home-button home-button-3d ${isSellerPortal ? 'seller-home-button seller-button-3d' : 'buyer-home-button buyer-button-3d'} button-bounce button-shimmer`}
      >
        <Home className="h-4 w-4 home-button-icon" /> 
        <span className="relative">Home</span>
      </Button>
      
      {!isSellerPortal && (
        <Button
          variant="outline"
          size="sm"
          onClick={goToCart}
          className="hidden md:flex items-center gap-2 hover:bg-gray-100 transition-colors cart-button cart-button-3d buyer-button-3d button-bounce button-shimmer"
        >
          <ShoppingCart className="h-4 w-4" /> 
          <span className="relative">Cart</span>
        </Button>
      )}
    </div>
  );
};

export default NavButtons;
