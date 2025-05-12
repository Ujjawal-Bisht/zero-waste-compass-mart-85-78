
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Settings, 
  LogOut,
  Package,
  Truck,
  Store,
  ChevronLeft,
  ChevronRight,
  User,
} from 'lucide-react';
import Logo from '@/components/ui/logo';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DashboardSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isCollapsed,
  setIsCollapsed
}) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const sidebarItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/marketplace', label: 'Marketplace', icon: <ShoppingCart size={20} /> },
    { path: '/profile', label: 'Profile', icon: <User size={20} /> },
  ];

  // Add seller items if user is seller
  if (currentUser?.isSeller) {
    sidebarItems.push(
      { 
        path: '/seller/dashboard', 
        label: 'Seller Dashboard', 
        icon: <Store size={20} /> 
      },
      { 
        path: '/seller/products', 
        label: 'My Products', 
        icon: <Package size={20} /> 
      },
      { 
        path: '/seller/orders', 
        label: 'Orders', 
        icon: <Truck size={20} /> 
      },
      { 
        path: '/seller/profile', 
        label: 'Seller Profile', 
        icon: <Settings size={20} /> 
      }
    );
  }

  // Add admin item if user is admin
  if (currentUser?.isAdmin) {
    sidebarItems.push({ 
      path: '/admin', 
      label: 'Admin Panel', 
      icon: <Settings size={20} /> 
    });
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
      } 
    }
  };

  const itemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <motion.aside
      className={cn("bg-sidebar text-sidebar-foreground transition-all duration-300", 
        isCollapsed ? 'w-20' : 'w-64'
      )}
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-full flex flex-col">
        {/* Logo */}
        <motion.div 
          className="p-4 flex items-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/" className="flex items-center">
            <Logo size={isCollapsed ? 'sm' : 'md'} showText={!isCollapsed} animated={true} />
          </Link>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 pt-6 overflow-y-auto">
          <motion.ul 
            className="space-y-1 px-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sidebarItems.map((item, index) => (
              <motion.li 
                key={index} 
                className="hover-scale"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 } 
                }}
              >
                <Link
                  to={item.path}
                  className={cn("flex items-center p-3 rounded-lg hover:bg-sidebar-accent transition-all duration-300", 
                    location.pathname === item.path ? 'bg-sidebar-accent shadow-md' : ''
                  )}
                >
                  <motion.div 
                    className="text-sidebar-foreground"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>
                  {!isCollapsed && (
                    <motion.span 
                      className="ml-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        {/* Logout */}
        <div className="p-4 mt-auto">
          <motion.button
            onClick={handleLogout}
            className="flex items-center p-3 rounded-lg w-full hover:bg-sidebar-accent transition-all duration-300"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={20} className="animate-pulse" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </motion.button>
        </div>

        {/* Collapse Button */}
        <div className="p-4">
          <motion.button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-3 rounded-lg w-full flex justify-center hover:bg-sidebar-accent transition-all duration-300"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.9 }}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </motion.button>
        </div>
      </div>
    </motion.aside>
  );
};

export default DashboardSidebar;
