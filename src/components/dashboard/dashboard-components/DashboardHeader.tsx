
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Manage your items and donations</p>
      </div>
      <Button 
        onClick={() => navigate('/items/add')} 
        className="zwm-gradient hover:opacity-90 transition-opacity"
      >
        Add New Item
      </Button>
    </div>
  );
};

export default DashboardHeader;
