
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrdersCard: React.FC = () => {
  const navigate = useNavigate();

  const handleViewOrders = () => {
    navigate('/seller/orders');
  };

  return (
    <div className="seller-card-enter seller-card-delay-3">
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        className="h-full"
      >
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2 text-blue-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "easeInOut", repeat: 0, delay: 1 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </motion.svg>
              Recent Orders
            </CardTitle>
            <CardDescription>
              Your most recent customer orders.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <motion.div 
              className="text-sm text-muted-foreground flex-grow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-col items-center py-6"
              >
                <motion.div
                  className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-3"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-blue-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </motion.div>
                <p className="text-center mb-2">No orders yet. When customers purchase your products, they'll appear here.</p>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-4"
            >
              <Button 
                variant="outline" 
                className="w-full button-shimmer" 
                onClick={handleViewOrders}
              >
                <span>View All Orders</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OrdersCard;
