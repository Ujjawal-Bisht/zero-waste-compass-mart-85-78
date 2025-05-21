
import React, { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import DashboardContainer from '@/components/seller/dashboard/DashboardContainer';
import { useAuth } from '@/contexts/auth';

const SellerDashboard: React.FC = () => {
  const { toast } = useToast();
  const { currentUser } = useAuth();

  useEffect(() => {
    toast({
      title: "Welcome to your dashboard!",
      description: "View your latest seller statistics and performance metrics."
    });
  }, []);

  // Pass currentUser as a prop to DashboardContainer
  return <DashboardContainer currentUser={currentUser} />;
};

export default SellerDashboard;
