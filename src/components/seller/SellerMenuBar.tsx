
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Store, Package, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const SellerMenuBar: React.FC = () => {
  // This component is no longer needed in the same form
  // since the sidebar now handles the navigation
  return null;
};

export default SellerMenuBar;
