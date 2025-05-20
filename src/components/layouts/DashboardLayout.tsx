
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import PageContainer from '@/components/dashboard/PageContainer';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
        {/* Hamburger Menu Button - always visible */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="menu-button button-transition fixed top-4 left-4 z-50 border border-gray-200 bg-white hover:bg-gray-100"
        >
          {sidebarOpen ? (
            <X className="h-5 w-5 text-gray-700" />
          ) : (
            <div className="flex flex-col items-center justify-center space-y-1.5">
              <span className="h-0.5 w-5 bg-gray-600 menu-line menu-line-1"></span>
              <span className="h-0.5 w-5 bg-gray-600 menu-line menu-line-2"></span>
              <span className="h-0.5 w-5 bg-gray-600 menu-line menu-line-3"></span>
            </div>
          )}
        </Button>
        
        {/* Sidebar - hidden by default, shown when toggled */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-40 fixed h-full`}>
          <DashboardSidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <DashboardHeader />

          {/* Page Content */}
          <div className="flex-1 overflow-auto bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto py-6 px-4 md:px-6">
              <PageContainer />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
