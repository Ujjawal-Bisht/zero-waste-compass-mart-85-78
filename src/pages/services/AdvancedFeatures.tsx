
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Sparkles, Zap, Bell, Repeat, Calendar, BarChart3, Shield, Lightbulb } from 'lucide-react';

const AdvancedFeatures: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('ai');
  
  const features = {
    ai: [
      {
        id: "ai-1",
        title: "Smart Item Suggestions",
        description: "Get AI-powered recommendations for items to add, based on your past activity and sustainability goals.",
        icon: <Lightbulb className="h-5 w-5 text-amber-500" />,
        status: "active"
      },
      {
        id: "ai-2",
        title: "Category Prediction",
        description: "Automatically categorize items from images or descriptions using our advanced machine learning algorithms.",
        icon: <Zap className="h-5 w-5 text-purple-500" />,
        status: "active"
      },
      {
        id: "ai-3",
        title: "Sustainability Score Analysis",
        description: "Analyze your environmental impact and get suggestions for improvement.",
        icon: <BarChart3 className="h-5 w-5 text-green-500" />,
        status: "coming-soon"
      }
    ],
    automation: [
      {
        id: "auto-1",
        title: "Scheduled Item Alerts",
        description: "Set up automated reminders for expiring items to reduce waste.",
        icon: <Calendar className="h-5 w-5 text-blue-500" />,
        status: "active"
      },
      {
        id: "auto-2",
        title: "Recurring Donations",
        description: "Schedule regular donations to your favorite charities or community members.",
        icon: <Repeat className="h-5 w-5 text-indigo-500" />,
        status: "active"
      },
      {
        id: "auto-3",
        title: "Smart Notifications",
        description: "Get personalized alerts based on your usage patterns and preferences.",
        icon: <Bell className="h-5 w-5 text-rose-500" />,
        status: "coming-soon"
      }
    ],
    security: [
      {
        id: "sec-1",
        title: "Advanced Account Protection",
        description: "Enable two-factor authentication and enhanced security measures for your account.",
        icon: <Shield className="h-5 w-5 text-emerald-500" />,
        status: "active"
      },
      {
        id: "sec-2",
        title: "Verified User Badge",
        description: "Get a verified badge on your profile after completing our trusted user program.",
        icon: <Sparkles className="h-5 w-5 text-amber-500" />,
        status: "active"
      }
    ]
  };
  
  const handleEnableFeature = (featureId: string, featureTitle: string) => {
    toast({
      title: "Feature Activated",
      description: `You've successfully enabled ${featureTitle}`,
    });
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <Badge variant="outline" className="mb-2 text-zwm-primary border-zwm-primary">
          Premium Features
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight">Advanced Features</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Enhance your zero waste experience with our premium tools and features designed to maximize your impact.
        </p>
      </motion.div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger 
            value="ai" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
          >
            <Sparkles className="h-4 w-4" /> 
            <span>AI Features</span>
          </TabsTrigger>
          <TabsTrigger 
            value="automation"
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white"
          >
            <Zap className="h-4 w-4" /> 
            <span>Automation</span>
          </TabsTrigger>
          <TabsTrigger 
            value="security"
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white"
          >
            <Shield className="h-4 w-4" /> 
            <span>Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="space-y-4 focus-visible:outline-none focus-visible:ring-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.ai.map((feature) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                onEnable={handleEnableFeature}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4 focus-visible:outline-none focus-visible:ring-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.automation.map((feature) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                onEnable={handleEnableFeature}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 focus-visible:outline-none focus-visible:ring-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.security.map((feature) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                onEnable={handleEnableFeature}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'coming-soon';
}

interface FeatureCardProps {
  feature: Feature;
  onEnable: (id: string, title: string) => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, onEnable }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col border-t-4 border-t-zwm-primary shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="bg-primary-50 p-2 rounded-full">{feature.icon}</div>
            {feature.status === 'coming-soon' && (
              <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">
                Coming Soon
              </Badge>
            )}
          </div>
          <CardTitle className="mt-2">{feature.title}</CardTitle>
          <CardDescription>{feature.description}</CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto pt-2">
          <Button
            onClick={() => onEnable(feature.id, feature.title)}
            variant={feature.status === 'active' ? "default" : "outline"}
            className={feature.status === 'active' ? "w-full bg-gradient-to-r from-zwm-primary to-zwm-secondary hover:to-zwm-primary" : "w-full"}
            disabled={feature.status === 'coming-soon'}
          >
            {feature.status === 'active' ? 'Enable Feature' : 'Coming Soon'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AdvancedFeatures;
