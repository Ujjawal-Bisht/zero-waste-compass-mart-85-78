
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavButtonsProps {
  isSellerPortal: boolean;
}

const NavButtons: React.FC<NavButtonsProps> = ({ isSellerPortal }) => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  
  // In a real app, this would come from a cart context/store
  useEffect(() => {
    // Simulate cart data
    setCartCount(2);
  }, []);
  
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
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={goToCart}
            className="hidden md:flex items-center gap-2 hover:bg-gray-100 transition-colors cart-button cart-button-3d buyer-button-3d button-bounce button-shimmer relative"
          >
            <ShoppingCart className="h-4 w-4" /> 
            <span className="relative">Cart</span>
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default NavButtons;
