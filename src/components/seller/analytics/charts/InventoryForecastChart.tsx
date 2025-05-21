
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Legend
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface InventoryForecastChartProps {
  data: Array<{
    month: string;
    currentStock: number;
    projectedStock: number;
    reorderPoint: number;
  }>;
}

const InventoryForecastChart: React.FC<InventoryForecastChartProps> = ({ data }) => {
  const chartConfig = {
    currentStock: {
      label: "Current Stock",
      theme: {
        light: "#8b5cf6",
        dark: "#a78bfa"
      }
    },
    projectedStock: {
      label: "Projected Stock",
      theme: {
        light: "#c4b5fd",
        dark: "#ddd6fe"
      }
    },
    reorderPoint: {
      label: "Reorder Point",
      theme: {
        light: "#ef4444",
        dark: "#f87171"
      }
    }
  };
  
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Inventory Forecast</CardTitle>
        <CardDescription>Projected stock levels for the next 6 months</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-80 w-full">
          <ChartContainer config={chartConfig} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="colorCurrentStock" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorProjectedStock" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c4b5fd" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#c4b5fd" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis 
                  label={{ value: 'Units', angle: -90, position: 'insideLeft' }}
                />
                <ChartTooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    
                    return (
                      <ChartTooltipContent 
                        className="bg-white dark:bg-gray-800 rounded-md shadow-md p-2 border border-gray-200 dark:border-gray-700"
                      />
                    );
                  }}
                />
                <ReferenceLine 
                  y={200} 
                  stroke="#ef4444" 
                  strokeDasharray="3 3" 
                  label={{ value: 'Reorder Point', position: 'right', fill: '#ef4444', fontSize: 12 }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="currentStock" 
                  name="Current Stock"
                  stroke="#8b5cf6" 
                  fillOpacity={1} 
                  fill="url(#colorCurrentStock)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="projectedStock" 
                  name="Projected Stock"
                  stroke="#c4b5fd" 
                  fillOpacity={1} 
                  fill="url(#colorProjectedStock)" 
                />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
            <span>Reorder Point</span>
          </div>
          <div>
            <span className="font-medium">Recommendation: </span>
            <span>Order new stock by October to avoid shortages</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryForecastChart;
