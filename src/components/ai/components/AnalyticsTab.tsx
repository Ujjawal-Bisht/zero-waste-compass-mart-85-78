
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AnalyticsTabProps {
  mockAnalytics: {
    interactions: number;
    topQuestions: string[];
    averageResponseTime: string;
    satisfactionRate: string;
    categoriesDistribution: Record<string, number>;
  };
  sellerMode: boolean;
  onReturn: () => void;
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ 
  mockAnalytics, 
  sellerMode,
  onReturn 
}) => {
  return (
    <div className="p-2 space-y-4">
      <h3 className="text-sm font-medium mb-2">Your ZeroBot Analytics</h3>
      
      <div className="grid grid-cols-2 gap-2">
        <Card>
          <CardContent className="p-3 flex flex-col items-center justify-center">
            <p className="text-xs text-gray-500">Interactions</p>
            <p className="text-xl font-bold">{mockAnalytics.interactions}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 flex flex-col items-center justify-center">
            <p className="text-xs text-gray-500">Avg. Response</p>
            <p className="text-xl font-bold">{mockAnalytics.averageResponseTime}</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="p-3 pb-0">
          <CardTitle className="text-sm">Question Categories</CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="h-20 relative">
            {/* Simple bar chart - would use recharts in production */}
            <div className="absolute inset-0 flex items-end gap-1">
              {Object.entries(mockAnalytics.categoriesDistribution).map(([category, value], i) => (
                <div key={i} className="relative flex-1 group">
                  <div 
                    className={`w-full ${
                      sellerMode 
                        ? 'bg-amber-500' 
                        : 'bg-emerald-500'
                    } rounded-t`}
                    style={{ height: `${value}%` }}
                  ></div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-xs text-center mt-1 truncate cursor-help">{category}</p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{category}: {value}%</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="p-3 pb-0">
          <CardTitle className="text-sm">Top Questions</CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <ul className="text-xs space-y-2">
            {mockAnalytics.topQuestions.map((q, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-gray-400">{i+1}.</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={onReturn}
      >
        Return to Chat
      </Button>
    </div>
  );
};

export default AnalyticsTab;
