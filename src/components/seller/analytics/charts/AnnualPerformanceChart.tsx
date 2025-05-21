
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface AnnualPerformanceChartProps {
  data: Array<{
    year: string;
    revenue: number;
    profit: number;
    projected?: boolean;
  }>;
}

const AnnualPerformanceChart: React.FC<AnnualPerformanceChartProps> = ({ data }) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Annual Performance</CardTitle>
        <CardDescription>Yearly revenue and profit comparison</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" />
              <YAxis
                tickFormatter={(value) => `₹${(value/1000000).toFixed(1)}M`}
              />
              <Tooltip
                formatter={(value, name, props) => {
                  const formatted = `₹${(Number(value)/1000000).toFixed(2)}M`;
                  const item = data.find(d => d.year === props.payload.year);
                  return [formatted + (item?.projected ? ' (Projected)' : ''), name];
                }}
              />
              <Bar dataKey="revenue" fill="#8b5cf6" name="Revenue" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" fill="#10b981" name="Profit" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnnualPerformanceChart;
