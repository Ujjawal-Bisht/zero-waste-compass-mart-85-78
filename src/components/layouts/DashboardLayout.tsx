
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ChatBot from '@/components/ChatBot';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import PageContainer from '@/components/dashboard/PageContainer';
import { SidebarProvider } from '@/components/ui/sidebar';

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-50">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <DashboardHeader />

          {/* Page Content */}
          <PageContainer />
          
          {/* Chat Bot */}
          <ChatBot />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
