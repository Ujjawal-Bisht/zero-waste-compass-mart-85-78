
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import ChatBot from '@/components/ChatBot';
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
        {/* Mobile Hamburger Menu Button */}
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="menu-button button-transition lg:hidden"
          >
            <Menu className="h-5 w-5 text-white" />
          </Button>
        )}
        
        {/* Show sidebar based on mobile/desktop view */}
        <div className={`${isMobile ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'} transition-transform duration-300 z-50`}>
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
          
          {/* Chat Bot */}
          <ChatBot />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
