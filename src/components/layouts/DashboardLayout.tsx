
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus,
  LayoutDashboard, 
  ShoppingCart, 
  Settings, 
  LogOut,
  Package,
  Truck,
  Store,
  ChevronLeft,
  ChevronRight,
  Bell,
  User,
  IndianRupee,
  Medicine
} from 'lucide-react';
import { toast } from 'sonner';
import NotificationCenter from '@/components/NotificationCenter';
import ChatBot from '@/components/ChatBot';
import Logo from '@/components/ui/logo';
import { motion } from 'framer-motion';

const DashboardLayout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        className={`bg-sidebar text-sidebar-foreground transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
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
          >
            <Link to="/" className="flex items-center">
              <Logo size={isCollapsed ? 'sm' : 'md'} showText={!isCollapsed} />
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
                    className={`flex items-center p-3 rounded-lg hover:bg-sidebar-accent transition-all duration-300 ${
                      location.pathname === item.path ? 'bg-sidebar-accent shadow-md' : ''
                    }`}
                  >
                    <div className="text-sidebar-foreground">{item.icon}</div>
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
              whileHover={{ scale: 1.05 }}
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm z-10 sticky top-0">
          <motion.div 
            className="flex justify-between items-center px-6 py-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex-1">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search..." 
                  className="pl-10 w-full" 
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationCenter />
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => navigate('/items/add')} 
                  className="zwm-gradient-hover shadow-pop"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Item
                </Button>
              </motion.div>
              
              <motion.div 
                className="ml-2 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/profile')}
              >
                <Avatar className="border-2 border-zwm-primary/20 hover-scale cursor-pointer">
                  <AvatarImage src={currentUser?.photoURL || undefined} />
                  <AvatarFallback className="bg-zwm-primary/10 text-zwm-primary font-medium">{getInitials(currentUser?.displayName)}</AvatarFallback>
                </Avatar>
                <div className="ml-2 hidden md:block">
                  <p className="text-sm font-medium">{currentUser?.displayName || 'User'}</p>
                  {currentUser?.isSeller && (
                    <p className="text-xs text-muted-foreground">
                      {currentUser?.verified ? 'Verified Seller' : 'Seller'}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
        
        {/* Chat Bot */}
        <ChatBot />
      </div>
    </div>
  );
};

export default DashboardLayout;
