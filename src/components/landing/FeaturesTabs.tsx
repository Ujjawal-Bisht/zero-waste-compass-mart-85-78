
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, Truck, Users, LineChart, Leaf, Star } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('buyers');

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard 
                  title="Find Deals" 
                  description="Discover discounted products nearing expiry dates, helping reduce waste and save money."
                  icon={<ShoppingBag className="w-6 h-6" />}
                  delay={0.1}
                />
                <FeatureCard 
                  title="Community Impact" 
                  description="Track your environmental impact through a dashboard showing waste reduction metrics."
                  icon={<Users className="w-6 h-6" />}
                  delay={0.2}
                />
                <FeatureCard 
                  title="Sustainability Rewards" 
                  description="Earn points for sustainable choices that can be redeemed for eco-friendly products."
                  icon={<Leaf className="w-6 h-6" />}
                  delay={0.3}
                />
              </div>
            </TabsContent>

            <TabsContent value="sellers" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard 
                  title="Inventory Management" 
                  description="Manage products nearing expiry with automated discounting and promotion tools."
                  icon={<LineChart className="w-6 h-6" />}
                  delay={0.1}
                />
                <FeatureCard 
                  title="Business Analytics" 
                  description="Access detailed analytics on waste reduction, sales, and sustainability metrics."
                  icon={<Star className="w-6 h-6" />}
                  delay={0.2}
                />
                <FeatureCard 
                  title="Brand Reputation" 
                  description="Enhance your brand's sustainability profile with badges and metrics to share."
                  icon={<Leaf className="w-6 h-6" />}
                  delay={0.3}
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
