
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, TrendingUp, Users, IndianRupee, PillBottle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const SellerDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Welcome toast when dashboard loads
    toast({
      title: "Welcome to your dashboard!",
      description: "View your latest seller statistics and performance metrics."
    });
    
    // Set loaded state after a small delay for entrance animations
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [toast]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const stats = [
    {
      title: "Active Products",
      value: "12",
      icon: <Package className="h-8 w-8 text-muted-foreground icon-float" />,
      description: "Products currently listed"
    },
    {
      title: "Pending Orders",
      value: "3",
      icon: <ShoppingCart className="h-8 w-8 text-muted-foreground icon-float" />,
      description: "Orders awaiting fulfillment"
    },
    {
      title: "Total Sales",
      value: "₹12,400",
      icon: <IndianRupee className="h-8 w-8 text-muted-foreground icon-float" />,
      description: "Revenue this month"
    },
    {
      title: "Trust Score",
      value: currentUser?.trustScore?.toFixed(1) || "0.0",
      icon: <Users className="h-8 w-8 text-muted-foreground icon-float" />,
      description: `${currentUser?.verified ? "Verified seller" : "Pending verification"}`
    }
  ];

  const extraStats = [
    {
      title: "Packaged Food",
      value: "8",
      icon: <Package className="h-8 w-8 text-zwm-accent icon-float" />,
      description: "Food items listed"
    },
    {
      title: "Healthcare Items",
      value: "4",
      icon: <PillBottle className="h-8 w-8 text-zwm-primary icon-float" />,
      description: "Healthcare items listed"
    }
  ];

  // Calculate trust score circle animation values
  const trustScore = currentUser?.trustScore || 0;
  const trustScorePercentage = (trustScore / 5) * 100;
  const circleOffset = 100 - trustScorePercentage;

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome back, {currentUser?.businessName || currentUser?.displayName}
          </h2>
          <p className="text-muted-foreground">
            Manage your products, orders and seller profile from here.
          </p>
        </div>
        {currentUser?.verified && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="verified-badge bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
          >
            <CheckCircle2 className="h-4 w-4 mr-1" />
            Verified Seller
          </motion.div>
        )}
      </motion.div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`seller-card-enter seller-card-delay-${index + 1}`}
          >
            <motion.div 
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {stat.icon}
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                    className="text-2xl font-bold"
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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
                <div className="space-y-4">
                  {extraStats.map((stat, index) => (
                    <motion.div 
                      key={index} 
                      className="flex justify-between items-center"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.2 }}
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
                        className="text-2xl font-bold"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.7 + index * 0.2, type: "spring" }}
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

        <div className="col-span-2 md:col-span-1 seller-card-enter seller-card-delay-2">
          <motion.div
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Seller Performance</CardTitle>
                <CardDescription>
                  Your trust score and metrics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Trust Score</div>
                      <motion.div 
                        className="text-sm font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {currentUser?.trustScore?.toFixed(1) || "0.0"}/5.0
                      </motion.div>
                    </div>
                    <div className="mt-1 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-zwm-primary progress-animate" 
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentUser?.trustScore || 0) / 5) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={{ transformOrigin: 'left' }}
                      />
                    </div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <div className="text-sm font-medium flex items-center">
                      {currentUser?.verified ? (
                        <motion.span 
                          className="flex items-center text-green-600"
                          animate={{ 
                            scale: [1, 1.2, 1],
                          }}
                          transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Your seller account is verified
                        </motion.span>
                      ) : (
                        <span className="flex items-center text-amber-600">
                          ⚠️ Complete verification to improve your trust score
                        </span>
                      )}
                    </div>
                    {!currentUser?.verified && (
                      <motion.p 
                        className="text-sm text-muted-foreground mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                      >
                        Upload business documentation to get verified and increase your visibility.
                      </motion.p>
                    )}
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      
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
    </motion.div>
  );
};

export default SellerDashboard;
