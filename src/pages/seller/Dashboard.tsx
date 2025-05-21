
import React, { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import DashboardContainer from '@/components/seller/dashboard/DashboardContainer';
import { useAuth } from '@/contexts/auth';

const SellerDashboard: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Welcome toast when dashboard loads
    toast({
      title: "Welcome to your dashboard!",
      description: "View your latest seller statistics and performance metrics."
    });
  }, []);

  return <DashboardContainer currentUser={user} />;
};

export default SellerDashboard;
