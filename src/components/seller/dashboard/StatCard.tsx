
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  description: string;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description, index }) => {
  return (
    <div className={`seller-card-enter seller-card-delay-${index + 1}`}>
      <motion.div 
        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        transition={{ duration: 0.2 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {title}
            </CardTitle>
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
              className="text-2xl font-bold"
            >
              {value}
            </motion.div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StatCard;
