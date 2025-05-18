
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ZeroBotTabsProps {
  activeTab: 'chat' | 'help' | 'analytics';
  setActiveTab: (tab: 'chat' | 'help' | 'analytics') => void;
  showAnalytics: boolean;
}

const ZeroBotTabs: React.FC<ZeroBotTabsProps> = ({ 
  activeTab, 
  setActiveTab,
  showAnalytics 
}) => {
  return (
    <div className="border-b">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
        <TabsList className="w-full h-10 bg-gray-50">
          <TabsTrigger value="chat" className="flex-1 data-[state=active]:bg-white">
            Chat
          </TabsTrigger>
          <TabsTrigger value="help" className="flex-1 data-[state=active]:bg-white">
            Help
          </TabsTrigger>
          {showAnalytics && (
            <TabsTrigger value="analytics" className="flex-1 data-[state=active]:bg-white">
              Analytics
            </TabsTrigger>
          )}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ZeroBotTabs;
