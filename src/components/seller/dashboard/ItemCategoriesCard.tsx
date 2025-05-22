
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CategoryStat {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

interface ItemCategoriesCardProps {
  stats: CategoryStat[];
}

const ItemCategoriesCard: React.FC<ItemCategoriesCardProps> = ({ stats }) => {
  return (
    <div className="col-span-2 md:col-span-1 seller-card-enter seller-card-delay-1">
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Item Categories</CardTitle>
            <CardDescription>
              Breakdown of your listed items by category.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="flex justify-between items-center"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex items-center">
                    <motion.div
                      whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="mr-3"
                    >
                      {stat.icon}
                    </motion.div>
                    <div>
                      <p className="font-medium">{stat.title}</p>
                      <p className="text-xs text-muted-foreground">{stat.description}</p>
                    </div>
                  </div>
                  <motion.div 
                    className="ml-2 text-xl font-bold"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ItemCategoriesCard;
