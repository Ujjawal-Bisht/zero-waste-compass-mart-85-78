
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, Truck, Users, LineChart, Leaf, Star, Upload, MessageCircle, Box, Pill } from 'lucide-react';
import FeatureCard from './FeatureCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { toast } from '@/components/ui/use-toast';

const FeaturesTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('buyers');
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleButtonClick = (action: string) => {
    if (!currentUser) {
      // If user is not logged in, redirect to register page
      toast({
        title: "Authentication required",
        description: "Please sign up or log in to access this feature",
        duration: 3000,
      });
      navigate('/register');
      return;
    }

    // Handle different button actions based on user type and action
    switch (action) {
      case 'findDeals':
        navigate('/marketplace');
        break;
      case 'connectBuyers':
      case 'connectSellers':
        navigate('/dashboard');
        toast({
          title: "Coming Soon",
          description: "The messaging feature will be available soon!",
          duration: 3000,
        });
        break;
      case 'browseMedicine':
        navigate('/marketplace?category=medicine');
        break;
      case 'browseFood':
        navigate('/marketplace?category=food');
        break;
      case 'addItem':
        navigate('/items/add');
        break;
      case 'manageInventory':
        if (currentUser.isSeller) {
          navigate('/seller/products');
        } else {
          toast({
            title: "Seller Account Required",
            description: "You need a seller account to access this feature",
            duration: 3000,
          });
          navigate('/seller/profile');
        }
        break;
      case 'pharmacySolutions':
        if (currentUser.isSeller) {
          navigate('/seller/dashboard');
          toast({
            title: "Pharmacy Features",
            description: "Specialized pharmacy features coming soon!",
            duration: 3000,
          });
        } else {
          toast({
            title: "Seller Account Required",
            description: "You need a seller account to access this feature",
            duration: 3000,
          });
          navigate('/register');
        }
        break;
      default:
        navigate('/dashboard');
    }
  };

  return (
    <section className="bg-gray-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-heading mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Features That Make a Difference
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our platform offers unique tools for both buyers and sellers to reduce waste and promote sustainability.
          </motion.p>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:w-[400px] rounded-full p-1">
              <TabsTrigger 
                value="buyers" 
                className="rounded-full data-[state=active]:bg-zwm-primary data-[state=active]:text-white"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                For Buyers
              </TabsTrigger>
              <TabsTrigger 
                value="sellers" 
                className="rounded-full data-[state=active]:bg-zwm-secondary data-[state=active]:text-white"
              >
                <Truck className="w-4 h-4 mr-2" />
                For Sellers
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="relative">
            {/* Animated selection indicator */}
            <motion.div 
              className="absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r from-zwm-primary to-zwm-secondary tabs-selection-indicator"
              animate={{
                opacity: [0, 1],
                width: activeTab === 'buyers' ? '50%' : '50%',
                x: activeTab === 'buyers' ? '0%' : '50%'
              }}
              transition={{ duration: 0.3 }}
            />

            <TabsContent value="buyers" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FeatureCard 
                  title="Find Deals" 
                  description="Discover discounted products nearing expiry dates, helping reduce waste and save money."
                  icon={ShoppingBag}
                  buttonText="Explore Deals"
                  buttonAction={() => handleButtonClick('findDeals')}
                  iconBgColor="bg-blue-50"
                  animationType="scale"
                  delay={0.1}
                />
                <FeatureCard 
                  title="Connect with Sellers" 
                  description="Directly communicate with sellers to arrange pickups or deliveries."
                  icon={MessageCircle}
                  buttonText="Start Connecting"
                  buttonAction={() => handleButtonClick('connectSellers')}
                  iconBgColor="bg-purple-50"
                  animationType="rotate"
                  delay={0.2}
                />
                <FeatureCard 
                  title="Packaged Food" 
                  description="Browse a wide selection of packaged food items nearing their best-before date at great discounts."
                  icon={Box}
                  buttonText="Browse Food"
                  buttonAction={() => handleButtonClick('browseFood')}
                  iconBgColor="bg-amber-50"
                  animationType="vertical"
                  delay={0.3}
                />
                <FeatureCard 
                  title="Medicines" 
                  description="Find essential medicines at discounted prices while ensuring they're still effective and safe."
                  icon={Pill}
                  buttonText="Browse Medicines"
                  buttonAction={() => handleButtonClick('browseMedicine')}
                  iconBgColor="bg-green-50"
                  animationType="scale"
                  delay={0.4}
                />
              </div>
            </TabsContent>

            <TabsContent value="sellers" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FeatureCard 
                  title="Add Item" 
                  description="Easily list your products that are approaching expiry date for sale at discounted prices."
                  icon={Upload}
                  buttonText="Add Now"
                  buttonAction={() => handleButtonClick('addItem')}
                  iconBgColor="bg-indigo-50"
                  animationType="scale"
                  delay={0.1}
                />
                <FeatureCard 
                  title="Connect with Buyers" 
                  description="Communicate directly with interested buyers through our integrated messaging system."
                  icon={MessageCircle}
                  buttonText="Connect"
                  buttonAction={() => handleButtonClick('connectBuyers')}
                  iconBgColor="bg-purple-50"
                  animationType="rotate"
                  delay={0.2}
                />
                <FeatureCard 
                  title="Manage Food Items" 
                  description="Special tools to manage packaged food inventory and set dynamic pricing based on expiry dates."
                  icon={Box}
                  buttonText="Manage Inventory"
                  buttonAction={() => handleButtonClick('manageInventory')}
                  iconBgColor="bg-amber-50"
                  animationType="vertical"
                  delay={0.3}
                />
                <FeatureCard 
                  title="Pharmacy Solutions" 
                  description="Specialized features for pharmacies to manage medicine inventory and comply with regulations."
                  icon={Pill}
                  buttonText="Explore Solutions"
                  buttonAction={() => handleButtonClick('pharmacySolutions')}
                  iconBgColor="bg-green-50"
                  animationType="scale"
                  delay={0.4}
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturesTabs;
