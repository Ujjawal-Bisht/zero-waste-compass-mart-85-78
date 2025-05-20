
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
      className={cn("pb-4 pt-16 bg-navy-blue w-64 flex flex-col", className)} // More flexible vertical layout and reduced padding-bottom
      {...props}
    >
      <div className="px-3 flex flex-col h-full">
        <SidebarLogo onClose={onClose} />

        <h2 className="mb-3 px-4 text-lg font-semibold tracking-tight text-white">
          Navigation
        </h2>

        <div className="flex-1 min-h-0 overflow-auto">
          <NavigationLinks
            isSeller={Boolean(isSeller)}
            onItemClick={onClose}
          />
        </div>

        <div className="shrink-0 pt-3 pb-2 px-3">
          <LogoutButton onLogout={handleLogout} />
        </div>
      </div>
    </Sidebar>
  );
};

export default DashboardSidebar;
