
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

// Mock data for recent items
const recentItems = [
  { id: 1, name: 'Bamboo Cutlery Set', price: 19.99, date: '2025-05-10', image: '/placeholder.svg' },
  { id: 2, name: 'Reusable Produce Bags (5-pack)', price: 12.50, date: '2025-05-09', image: '/placeholder.svg' },
  { id: 3, name: 'Stainless Steel Water Bottle', price: 24.99, date: '2025-05-08', image: '/placeholder.svg' },
  { id: 4, name: 'Compostable Phone Case', price: 29.99, date: '2025-05-07', image: '/placeholder.svg' },
];

const RecentItemsTab: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-pop hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle>Recently Added Items</CardTitle>
          <CardDescription>Products you've added to your inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentItems.map((item) => (
              <motion.div 
                key={item.id}
                className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-16 w-16 object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-zwm-primary font-medium">${item.price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Added on {item.date}</p>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Package size={16} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-center">
            <Button variant="outline" className="zwm-gradient-hover">
              View All Items
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentItemsTab;
