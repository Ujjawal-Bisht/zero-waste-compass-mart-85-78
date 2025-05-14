
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const OrdersCard: React.FC = () => {
  return (
    <div className="seller-card-enter seller-card-delay-3">
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Your most recent customer orders.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.p 
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              No orders yet. When customers purchase your products, they'll appear here.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OrdersCard;
