
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home, Package, ShoppingCart, User, PlusCircle, Truck } from 'lucide-react';

interface NavigationLink {
  title: string;
  href: string;
  icon: JSX.Element;
}

interface NavigationLinksProps {
  isSeller: boolean;
  onItemClick?: () => void;
}

export const NavigationLinks: React.FC<NavigationLinksProps> = ({ isSeller, onItemClick }) => {
  const location = useLocation();

  // Different navigation links for buyers and sellers
  const navigationLinks = isSeller ? [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Add Item',
      href: '/items/add',
      icon: <PlusCircle className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Profile',
      href: '/profile',
      icon: <User className="mr-2 h-4 w-4" />,
    }
  ] : [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Marketplace',
      href: '/marketplace',
      icon: <Package className="mr-2 h-4 w-4" />,
    },
    {
      title: 'My Cart',
      href: '/cart',
      icon: <ShoppingCart className="mr-2 h-4 w-4" />,
    },
    {
      title: 'My Orders',
      href: '/orders',
      icon: <Truck className="mr-2 h-4 w-4" />, // Changed from ShoppingCart to Truck
    },
    {
      title: 'Profile',
      href: '/profile',
      icon: <User className="mr-2 h-4 w-4" />,
    }
  ];

  return (
    <div className="space-y-1">
      {navigationLinks.map((link) => {
        const isActive = location.pathname === link.href;
        
        return (
          <motion.div
            key={link.href}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                isActive 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'text-gray-200 hover:bg-white hover:bg-opacity-10'
              } transition-all duration-300 sidebar-menu-item`}
              onClick={onItemClick}
              asChild
            >
              <Link to={link.href}>
                {link.icon}
                {link.title}
              </Link>
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
};
