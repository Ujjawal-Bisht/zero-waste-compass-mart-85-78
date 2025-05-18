
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
  Shield
} from 'lucide-react';

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
  const baseClass = "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors";
  const activeClass = "bg-zwm-primary/10 text-zwm-primary font-medium";
  const inactiveClass = "text-gray-700 hover:bg-gray-100";

  const NavItem = ({ path, icon, label }: { path: string; icon: React.ReactNode; label: string }) => (
    <Link
      to={path}
      className={`${baseClass} ${isActive(path) ? activeClass : inactiveClass}`}
      onClick={onItemClick}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </Link>
  );

  return (
    <div className="space-y-1 py-2">
      <NavItem path="/dashboard" icon={<Home size={18} />} label="Dashboard" />
      
      <NavItem path="/marketplace" icon={<Store size={18} />} label="Marketplace" />
      
      <NavItem path="/cart" icon={<ShoppingCart size={18} />} label="Cart" />
      
      <NavItem path="/orders" icon={<Box size={18} />} label="Orders" />

      <NavItem path="/chat" icon={<MessageSquare size={18} />} label="Chat" />
      
      {/* Advanced Features */}
      <NavItem path="/advanced-features" icon={<Sparkles size={18} />} label="Advanced Features" />
      
      {/* Seller Routes */}
      {isSeller && (
        <>
          <div className="pt-4 pb-2">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Seller Portal
            </p>
          </div>
          <NavItem path="/seller/dashboard" icon={<LineChart size={18} />} label="Seller Dashboard" />
          <NavItem path="/seller/products" icon={<Box size={18} />} label="Products" />
          <NavItem path="/seller/orders" icon={<ShoppingCart size={18} />} label="Orders" />
          <NavItem path="/seller/profile" icon={<Settings size={18} />} label="Seller Profile" />
        </>
      )}
      
      {/* Admin Routes */}
      {isAdmin && (
        <>
          <div className="pt-4 pb-2">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Admin
            </p>
          </div>
          <NavItem path="/admin/panel" icon={<Shield size={18} />} label="Admin Panel" />
        </>
      )}
    </div>
  );
};

export default NavigationLinks;
