
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/ui/sidebar';
import { Logo } from '@/components/ui/logo';
import { useAuth } from '@/contexts/auth';
import { motion } from 'framer-motion';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  User, 
  LogOut, 
  PlusCircle,
  Store,
  ShieldCheck
} from 'lucide-react';

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

export const DashboardSidebar = ({ className, onClose, ...props }: SidebarNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const isSeller = currentUser?.isSeller;
  
  // All navigation links for all users
  const navigationLinks = [
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
      title: 'Add Item',
      href: '/items/add',
      icon: <PlusCircle className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Profile',
      href: '/profile',
      icon: <User className="mr-2 h-4 w-4" />,
    }
  ];

  // Add seller options if user is a seller
  const sellerLinks = isSeller ? [
    { title: 'Seller Options', href: '', icon: null }, // This is a divider
    {
      title: 'Seller Dashboard',
      href: '/seller/dashboard',
      icon: <Store className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Products',
      href: '/seller/products',
      icon: <Package className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Orders',
      href: '/seller/orders',
      icon: <ShoppingCart className="mr-2 h-4 w-4" />,
    },
    {
      title: 'Seller Profile',
      href: '/seller/profile',
      icon: <ShieldCheck className="mr-2 h-4 w-4" />,
    }
  ] : [];

  // Combine all links
  const allLinks = [...navigationLinks, ...sellerLinks];

  const handleItemClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <Sidebar 
      className={cn("pb-12 bg-navy-blue", className)} 
      {...props}
    >
      <div className="px-3 py-2 flex flex-col h-full">
        <motion.div 
          className="mb-8 pl-2 flex items-center"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Logo className="cursor-pointer hover-scale" onClick={handleLogoClick} />
        </motion.div>
        
        <h2 className="mb-4 px-4 text-lg font-semibold tracking-tight text-white">
          Navigation
        </h2>
        
        <div className="space-y-1">
          {allLinks.map((link, index) => {
            // Check if this is a divider entry (no href)
            if (!link.href) {
              return (
                <div key={`divider-${index}`} className="mt-6 mb-2 px-4">
                  <h3 className="text-sm font-medium text-gray-300 border-b border-gray-600 pb-1">
                    {link.title}
                  </h3>
                </div>
              );
            }
            
            // Regular navigation link
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
                  onClick={handleItemClick}
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
        
        <div className="mt-auto px-3 py-2">
          <motion.div
            whileHover={{ x: 5, backgroundColor: "rgba(239, 68, 68, 0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              className="w-full justify-start text-white hover:bg-white hover:bg-opacity-10 logout-button" 
              variant="ghost" 
              onClick={handleLogout}
            >
              <motion.div
                whileHover={{ rotate: 10 }}
                className="mr-2 flex items-center"
              >
                <LogOut className="h-4 w-4 transition-transform duration-300" />
              </motion.div>
              Logout
            </Button>
          </motion.div>
        </div>
      </div>
    </Sidebar>
  );
};

export default DashboardSidebar;
