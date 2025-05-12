
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, MessageCircle, Package, PillBottle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FeatureCard from './FeatureCard';
import { useIsMobile } from '@/hooks/use-mobile';

const FeaturesTabs: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upload");
  const isMobile = useIsMobile();

  const features = [
    {
      id: "upload",
      title: "Upload Items",
      icon: Upload,
      description: "Add items you no longer need with details, photos, and location.",
      buttonText: "Add New Item",
      buttonAction: () => navigate('/items/add'),
      iconBgColor: "bg-indigo-100",
      animationType: "rotate" as const
    },
    {
      id: "connect",
      title: "Connect",
      icon: MessageCircle,
      description: "Our platform matches your items with nearby people or organizations.",
      buttonText: "Go to Marketplace",
      buttonAction: () => navigate('/marketplace'),
      iconBgColor: "bg-purple-100",
      animationType: "scale" as const
    },
    {
      id: "packaged",
      title: "Packaged Food",
      icon: Package,
      description: "Find quality packaged food items near expiry at discounted prices in ₹.",
      buttonText: "Browse Food Items",
      buttonAction: () => navigate('/marketplace?category=food'),
      iconBgColor: "bg-green-100",
      animationType: "vertical" as const
    },
    {
      id: "medicines",
      title: "Medicines",
      icon: PillBottle,
      description: "Access unexpired medicines at affordable prices in ₹ from verified sellers.",
      buttonText: "Browse Medicines",
      buttonAction: () => navigate('/marketplace?category=medicine'),
      iconBgColor: "bg-blue-100",
      animationType: "rotate" as const
    }
  ];

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
            <div className="flex justify-center overflow-x-auto pb-2">
              <TabsList className={`bg-gray-100/80 p-1.5 ${isMobile ? 'flex flex-wrap' : ''}`}>
                {features.map(feature => (
                  <TabsTrigger 
                    key={feature.id}
                    value={feature.id} 
                    className={`px-4 md:px-6 py-2 md:py-2.5 text-sm rounded-md transition-all duration-200 ${activeTab === feature.id ? "bg-white shadow-sm" : "hover:bg-gray-200/50"}`}
                  >
                    {feature.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="mt-10">
              {features.map(feature => (
                <TabsContent key={feature.id} value={feature.id} className="mt-6">
                  <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
                    <FeatureCard 
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                      buttonText={feature.buttonText}
                      buttonAction={feature.buttonAction}
                      iconBgColor={feature.iconBgColor}
                      animationType={feature.animationType}
                    />
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default FeaturesTabs;
