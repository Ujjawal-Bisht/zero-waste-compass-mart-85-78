
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ChatBot from '@/components/ChatBot';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import PageContainer from '@/components/dashboard/PageContainer';
import { SidebarProvider } from '@/components/ui/sidebar';

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <DashboardHeader />

          {/* Page Content */}
          <div className="flex-1 overflow-auto">
            <PageContainer />
          </div>
          
          {/* Chat Bot */}
          <ChatBot />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
