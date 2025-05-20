
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/auth';
import { SidebarLogo } from './sidebar/SidebarLogo';
import NavigationLinks from './sidebar/NavigationLinks';
import LogoutButton from './sidebar/LogoutButton';

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

export const DashboardSidebar = ({ className, onClose, ...props }: SidebarNavProps) => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const isSeller = currentUser?.isSeller;
  
  const handleLogout = async () => {
    try {
      await logout();
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Sidebar 
      className={cn("pb-12 bg-navy-blue w-64", className)} 
      {...props}
    >
      {/* Add padding-top so the fixed cross/menu button never covers the logo or content */}
      <div className="px-3 py-2 flex flex-col h-full pt-16">
        <SidebarLogo onClose={onClose} />
        
        <h2 className="mb-4 px-4 text-lg font-semibold tracking-tight text-white">
          Navigation
        </h2>
        
        <NavigationLinks 
          isSeller={Boolean(isSeller)} 
          onItemClick={onClose} 
        />
        
        <div className="mt-auto px-3 py-2">
          <LogoutButton onLogout={handleLogout} />
        </div>
      </div>
    </Sidebar>
  );
};

export default DashboardSidebar;
