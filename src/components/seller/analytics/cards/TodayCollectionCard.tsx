
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, CalendarCheck } from 'lucide-react';
import { format } from 'date-fns';

interface TodayCollectionCardProps {
  todayCollection: number;
}

const TodayCollectionCard: React.FC<TodayCollectionCardProps> = ({ todayCollection }) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-semibold">
          <CalendarCheck className="mr-2 h-5 w-5 text-zwm-primary" />
          Today's Collection
        </CardTitle>
        <CardDescription>Revenue collected today</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-baseline"
        >
          <span className="text-3xl font-extrabold text-zwm-primary flex items-center">
            <IndianRupee className="h-6 w-6" />
            {todayCollection.toLocaleString('en-IN')}
          </span>
          <span className="ml-2 text-sm text-muted-foreground">
            as of {format(new Date(), 'h:mm a')}
          </span>
        </motion.div>
        
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">Today vs. Yesterday</p>
          <div className="flex items-center mt-1">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-500">+12.4%</span>
            <span className="ml-2 text-xs text-muted-foreground">↑ ₹3,150</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayCollectionCard;
