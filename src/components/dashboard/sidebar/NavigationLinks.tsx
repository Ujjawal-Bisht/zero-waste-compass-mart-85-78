import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import {
  Home,
  Store,
  ShoppingCart,
  Box,
  MessageSquare,
  Settings,
  LineChart,
  Sparkles,
  Shield,
  User,
  Zap,
  BookOpen,
  Heart,
  Tag,
  Coffee
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavigationLinksProps {
  isSeller?: boolean;
  onItemClick?: () => void;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ isSeller, onItemClick }) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const isActive = (path: string) => location.pathname === path;
  const isAdmin = currentUser?.isAdmin === true;

  // Common navigation item styling
  const baseClass = "flex items-center w-full px-3 py-2.5 text-sm rounded-md transition-all duration-200";
  const activeClass = "bg-gradient-to-r from-zwm-primary/15 to-zwm-secondary/15 text-zwm-primary font-medium";
  const inactiveClass = "text-gray-100 hover:bg-white/10";

  // Improved buyer menu sections with better organization and additional categories
  const buyerMenuSections = [
    {
      title: "Main Navigation",
      items: [
        { path: "/dashboard", icon: <Home size={18} />, label: "Dashboard" },
        { path: "/marketplace", icon: <Store size={18} />, label: "Marketplace", highlight: true },
        { path: "/orders", icon: <Box size={18} />, label: "My Orders" },
      ]
    },
    {
      title: "Shopping",
      items: [
        { path: "/cart", icon: <ShoppingCart size={18} />, label: "Shopping Cart" },
        { path: "/favorites", icon: <Heart size={18} />, label: "Saved Items" },
        { path: "/deals", icon: <Tag size={18} />, label: "Special Deals" },
      ]
    },
    {
      title: "Features",
      items: [
        { path: "/profile", icon: <User size={18} />, label: "My Profile" },
        { path: "/chat", icon: <MessageSquare size={18} />, label: "Support Chat" },
        { path: "/advanced-features", icon: <Sparkles size={18} />, label: "Premium Features", highlight: true },
        { path: "/community", icon: <Coffee size={18} />, label: "Community" },
      ]
    },
  ];

  const sellerMenuSections = [
    {
      title: "Seller Dashboard",
      items: [
        { path: "/seller/dashboard", icon: <LineChart size={18} />, label: "Analytics" },
        { path: "/seller/products", icon: <Box size={18} />, label: "Products" },
        { path: "/seller/orders", icon: <ShoppingCart size={18} />, label: "Orders" },
        { path: "/seller/profile", icon: <Settings size={18} />, label: "Seller Profile" },
      ]
    }
  ];

  const adminMenuItems = [
    { path: "/admin/panel", icon: <Shield size={18} />, label: "Admin Panel" }
  ];

  const menuSections = isSeller ? sellerMenuSections : buyerMenuSections;

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5
      }
    }),
    hover: { 
      x: 5,
      transition: { duration: 0.2 }
    }
  };

  const NavItem = ({ path, icon, label, highlight = false, index }: { 
    path: string; 
    icon: React.ReactNode; 
    label: string;
    highlight?: boolean;
    index: number;
  }) => (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={itemVariants}
    >
      <Link
        to={path}
        className={cn(
          baseClass,
          isActive(path) ? activeClass : inactiveClass,
          highlight && !isActive(path) && "border border-dashed border-white/20"
        )}
        onClick={onItemClick}
      >
        <span className="mr-3">{icon}</span>
        <span className="relative">
          {label}
          {highlight && !isActive(path) && (
            <span className="absolute top-0 -right-6 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
          )}
        </span>
      </Link>
    </motion.div>
  );

  let itemIndexCounter = 0;

  return (
    <div className="space-y-4 py-2">
      {menuSections.map((section, sectionIndex) => (
        <div key={section.title} className="px-3 py-2">
          <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
            {section.title}
          </p>
          <div className="space-y-1.5">
            {section.items.map((item) => {
              const index = itemIndexCounter++;
              return (
                <NavItem 
                  key={item.path} 
                  path={item.path} 
                  icon={item.icon} 
                  label={item.label}
                  highlight={item.highlight}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      ))}
      
      {/* Admin Routes */}
      {isAdmin && (
        <div className="px-3 py-2">
          <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
            Administration
          </p>
          <div className="space-y-1.5">
            {adminMenuItems.map((item, i) => {
              const index = itemIndexCounter++;
              return (
                <NavItem 
                  key={item.path} 
                  path={item.path} 
                  icon={item.icon} 
                  label={item.label}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationLinks;
