
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, MessageCircle, Package, PillBottle, IndianRupee } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FeatureCard from './FeatureCard';

const FeaturesTabs: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform helps connect people with excess items to those who need them, reducing waste and building community.
          </p>
        </motion.div>

        <div className="mt-10">
          <Tabs defaultValue="upload" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center">
              <TabsList className="bg-gray-100/80 p-1.5">
                <TabsTrigger 
                  value="upload" 
                  className={`px-6 py-2.5 rounded-md transition-all duration-200 ${activeTab === "upload" ? "bg-white shadow-sm" : "hover:bg-gray-200/50"}`}
                >
                  Upload Items
                </TabsTrigger>
                <TabsTrigger 
                  value="connect" 
                  className={`px-6 py-2.5 rounded-md transition-all duration-200 ${activeTab === "connect" ? "bg-white shadow-sm" : "hover:bg-gray-200/50"}`}
                >
                  Connect
                </TabsTrigger>
                <TabsTrigger 
                  value="packaged" 
                  className={`px-6 py-2.5 rounded-md transition-all duration-200 ${activeTab === "packaged" ? "bg-white shadow-sm" : "hover:bg-gray-200/50"}`}
                >
                  Packaged Food
                </TabsTrigger>
                <TabsTrigger 
                  value="medicines" 
                  className={`px-6 py-2.5 rounded-md transition-all duration-200 ${activeTab === "medicines" ? "bg-white shadow-sm" : "hover:bg-gray-200/50"}`}
                >
                  Medicines
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="mt-10">
              <TabsContent value="upload" className="mt-6">
                <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
                  <FeatureCard 
                    icon={Upload}
                    title="Upload Items"
                    description="Add items you no longer need with details, photos, and location."
                    buttonText="Add New Item"
                    buttonAction={() => navigate('/items/add')}
                    iconBgColor="bg-indigo-100"
                    animationType="rotate"
                  />
                </div>
              </TabsContent>

              <TabsContent value="connect" className="mt-6">
                <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
                  <FeatureCard 
                    icon={MessageCircle}
                    title="Connect"
                    description="Our platform matches your items with nearby people or organizations."
                    buttonText="Go to Marketplace"
                    buttonAction={() => navigate('/marketplace')}
                    iconBgColor="bg-purple-100"
                    animationType="scale"
                  />
                </div>
              </TabsContent>

              <TabsContent value="packaged" className="mt-6">
                <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
                  <FeatureCard 
                    icon={Package}
                    title="Packaged Food"
                    description="Find quality packaged food items near expiry at discounted prices in ₹."
                    buttonText="Browse Food Items"
                    buttonAction={() => navigate('/marketplace?category=food')}
                    iconBgColor="bg-green-100"
                    animationType="vertical"
                  />
                </div>
              </TabsContent>

              <TabsContent value="medicines" className="mt-6">
                <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
                  <FeatureCard 
                    icon={PillBottle}
                    title="Medicines"
                    description="Access unexpired medicines at affordable prices in ₹ from verified sellers."
                    buttonText="Browse Medicines"
                    buttonAction={() => navigate('/marketplace?category=medicine')}
                    iconBgColor="bg-blue-100"
                    animationType="rotate"
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default FeaturesTabs;
