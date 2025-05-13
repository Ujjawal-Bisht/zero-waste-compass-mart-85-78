
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

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Background decoration positions for each tab
  const decorationElements = {
    upload: [
      { top: '20%', left: '10%', size: 'w-8 h-8', delay: 0 },
      { top: '70%', right: '15%', size: 'w-6 h-6', delay: 1 },
      { bottom: '10%', left: '20%', size: 'w-5 h-5', delay: 2 },
    ],
    connect: [
      { top: '30%', right: '10%', size: 'w-7 h-7', delay: 0 },
      { bottom: '20%', left: '15%', size: 'w-5 h-5', delay: 1.5 },
      { top: '15%', left: '25%', size: 'w-6 h-6', delay: 0.8 },
    ],
    packaged: [
      { top: '25%', left: '8%', size: 'w-8 h-8', delay: 0.5 },
      { bottom: '30%', right: '10%', size: 'w-7 h-7', delay: 1.2 },
      { top: '60%', left: '20%', size: 'w-6 h-6', delay: 0.3 },
    ],
    medicines: [
      { top: '15%', right: '15%', size: 'w-6 h-6', delay: 0.7 },
      { bottom: '20%', left: '10%', size: 'w-8 h-8', delay: 0 },
      { top: '40%', right: '25%', size: 'w-5 h-5', delay: 1.5 },
    ]
  };

  // Render background decorations based on the active tab
  const renderDecorations = (tabId: string) => {
    const elements = decorationElements[tabId as keyof typeof decorationElements];
    
    if (!elements) return null;
    
    return elements.map((el, index) => (
      <motion.div
        key={`${tabId}-decor-${index}`}
        className={`absolute rounded-full opacity-20 ${
          tabId === 'upload' ? 'bg-indigo-400' :
          tabId === 'connect' ? 'bg-purple-400' :
          tabId === 'packaged' ? 'bg-green-400' :
          'bg-blue-400'
        } ${el.size}`}
        style={{
          top: el.top,
          left: el.left,
          right: el.right,
          bottom: el.bottom
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 0.2, 
          scale: 1,
        }}
        transition={{
          duration: 1.5,
          delay: el.delay,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
        className={
          tabId === 'medicines' ? 'pill-float' :
          tabId === 'packaged' ? 'package-float' :
          tabId === 'connect' ? 'message-pop' :
          'icon-bounce'
        }
      />
    ));
  };

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-heading text-gray-900"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span className="text-reveal text-reveal-delay-1">How It Works</span>
          </motion.h2>
          <motion.p 
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <span className="text-reveal text-reveal-delay-2">
              Our platform helps connect people with excess items to those who need them, reducing waste and building community.
            </span>
          </motion.p>
        </motion.div>

        <motion.div 
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs defaultValue="upload" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center overflow-x-auto pb-2">
              <TabsList className={`bg-gray-100/80 p-1.5 ${isMobile ? 'flex flex-wrap' : ''}`}>
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <TabsTrigger 
                      value={feature.id} 
                      className={`px-4 md:px-6 py-2 md:py-2.5 text-sm rounded-md transition-all duration-200 ${activeTab === feature.id ? "bg-white shadow-sm tab-glow" : "hover:bg-gray-200/50"}`}
                    >
                      <span className="flex items-center">
                        {/* Icon with animation */}
                        <feature.icon className={`h-4 w-4 mr-2 ${activeTab === feature.id ? "text-zwm-primary" : "text-gray-500"}`} />
                        {feature.title}
                      </span>
                    </TabsTrigger>
                  </motion.div>
                ))}
              </TabsList>
            </div>

            <div className="mt-10 relative">
              {/* Background decorative elements based on active tab */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {renderDecorations(activeTab)}
              </div>

              {/* Tab content with animations */}
              {features.map((feature) => (
                <TabsContent key={feature.id} value={feature.id} className="mt-6">
                  <motion.div
                    className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate={activeTab === feature.id ? "visible" : "hidden"}
                  >
                    <motion.div variants={itemVariants} className="card-breathe border-dance">
                      <FeatureCard 
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                        buttonText={feature.buttonText}
                        buttonAction={feature.buttonAction}
                        iconBgColor={`${feature.iconBgColor} icon-bg-pulse`}
                        animationType={feature.animationType}
                      />
                    </motion.div>
                  </motion.div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturesTabs;
