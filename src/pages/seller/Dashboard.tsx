
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, TrendingUp, Users, IndianRupee, PillBottle } from 'lucide-react';
import { motion } from 'framer-motion';

const SellerDashboard: React.FC = () => {
  const { currentUser } = useAuth();

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
      icon: <Package className="h-8 w-8 text-muted-foreground" />,
      description: "Products currently listed"
    },
    {
      title: "Pending Orders",
      value: "3",
      icon: <ShoppingCart className="h-8 w-8 text-muted-foreground" />,
      description: "Orders awaiting fulfillment"
    },
    {
      title: "Total Sales",
      value: "₹12,400",
      icon: <IndianRupee className="h-8 w-8 text-muted-foreground" />,
      description: "Revenue this month"
    },
    {
      title: "Trust Score",
      value: currentUser?.trustScore?.toFixed(1) || "0.0",
      icon: <Users className="h-8 w-8 text-muted-foreground" />,
      description: `${currentUser?.verified ? "Verified seller" : "Pending verification"}`
    }
  ];

  const extraStats = [
    {
      title: "Packaged Food",
      value: "8",
      icon: <Package className="h-8 w-8 text-zwm-accent" />,
      description: "Food items listed"
    },
    {
      title: "Healthcare Items",
      value: "4",
      icon: <PillBottle className="h-8 w-8 text-zwm-primary" />,
      description: "Healthcare items listed"
    }
  ];

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {currentUser?.businessName || currentUser?.displayName}</h2>
        <p className="text-muted-foreground">
          Manage your products, orders and seller profile from here.
        </p>
      </motion.div>
      
      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
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
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="grid gap-4 md:grid-cols-2"
        variants={containerVariants}
      >
        <motion.div 
          className="col-span-2 md:col-span-1"
          variants={itemVariants}
        >
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
                    <div key={index} className="flex justify-between items-center">
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
                      <div className="text-2xl font-bold">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div 
          className="col-span-2 md:col-span-1"
          variants={itemVariants}
        >
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
                      <div className="text-sm font-medium">
                        {currentUser?.trustScore?.toFixed(1) || "0.0"}/5.0
                      </div>
                    </div>
                    <div className="mt-1 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-zwm-primary" 
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentUser?.trustScore || 0) / 5) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <div className="text-sm font-medium">
                      {currentUser?.verified 
                        ? "✓ Your seller account is verified" 
                        : "⚠️ Complete verification to improve your trust score"}
                    </div>
                    {!currentUser?.verified && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Upload business documentation to get verified and increase your visibility.
                      </p>
                    )}
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
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
              <p className="text-sm text-muted-foreground">
                No orders yet. When customers purchase your products, they'll appear here.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SellerDashboard;
