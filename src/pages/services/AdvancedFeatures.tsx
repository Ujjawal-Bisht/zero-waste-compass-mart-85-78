
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Lock, Zap, CheckCircle2, Star, ShieldCheck, Building2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdvancedFeatures: React.FC = () => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const handleUpgrade = (plan: string) => {
    setSelectedPlan(plan);
    toast({
      title: "Upgrade initiated",
      description: `You selected the ${plan} plan. This feature will be available soon.`,
      duration: 5000,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 md:px-6">
      <motion.div 
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Advanced Features</h1>
              <p className="text-muted-foreground mt-1">
                Unlock premium capabilities to enhance your shopping experience
              </p>
            </div>
            <Sparkles className="h-10 w-10 text-zwm-primary" />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs defaultValue="premium" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="premium">Premium Features</TabsTrigger>
              <TabsTrigger value="business">Business Solutions</TabsTrigger>
              <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
            </TabsList>
            
            {/* Premium Features Tab */}
            <TabsContent value="premium">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <PremiumFeatureCard 
                  title="Priority Access"
                  description="Get early access to flash sales and limited inventory items before they're available to regular users."
                  icon={<Zap className="h-5 w-5" />}
                  price="499"
                  plan="Premium"
                  onUpgrade={handleUpgrade}
                  isSelected={selectedPlan === 'Premium'}
                />
                
                <PremiumFeatureCard 
                  title="Advanced Price Alerts"
                  description="Set custom price alerts with advanced conditions and get notifications when items match your criteria."
                  icon={<AlertCircle className="h-5 w-5" />}
                  price="299"
                  plan="Basic"
                  onUpgrade={handleUpgrade}
                  isSelected={selectedPlan === 'Basic'}
                />
                
                <PremiumFeatureCard 
                  title="Premium Support"
                  description="24/7 priority customer support with dedicated representatives to assist with your shopping needs."
                  icon={<ShieldCheck className="h-5 w-5" />}
                  price="999"
                  plan="Pro"
                  onUpgrade={handleUpgrade}
                  isSelected={selectedPlan === 'Pro'}
                  featured
                />
              </div>
            </TabsContent>
            
            {/* Business Solutions Tab */}
            <TabsContent value="business">
              <div className="grid gap-6 md:grid-cols-2">
                <BusinessSolutionCard 
                  title="Business Account"
                  description="Manage bulk orders, access wholesale pricing, and streamline procurement processes."
                  features={[
                    "Bulk order discounts",
                    "Invoice-based payments",
                    "Order history & analytics",
                    "Multi-user accounts"
                  ]}
                  price="2,999"
                  period="monthly"
                  onUpgrade={() => handleUpgrade('Business')}
                />
                
                <BusinessSolutionCard 
                  title="Enterprise Integration"
                  description="Custom API integration with your existing enterprise resource planning systems."
                  features={[
                    "API access & documentation",
                    "Custom workflow integration",
                    "Dedicated account manager",
                    "SLA guaranteed uptime"
                  ]}
                  price="9,999"
                  period="monthly"
                  onUpgrade={() => handleUpgrade('Enterprise')}
                  featured
                />
              </div>
            </TabsContent>
            
            {/* Enterprise Tab */}
            <TabsContent value="enterprise">
              <Card className="border-dashed border-2 border-zwm-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="mr-2 h-5 w-5 text-zwm-primary" />
                    Enterprise Solutions
                  </CardTitle>
                  <CardDescription>
                    Custom solutions tailored to your organization's specific needs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Our enterprise solutions are designed to meet the specific needs of large organizations:</p>
                  
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Custom integration with your existing systems</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Dedicated account management team</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Custom reporting and analytics</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Volume-based pricing</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Service level agreements</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      toast({
                        title: "Contact request submitted",
                        description: "Our enterprise team will contact you shortly to discuss your needs.",
                      });
                    }}
                  >
                    Contact Our Enterprise Team
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Common questions about our advanced features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">How do I activate premium features?</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    After purchase, premium features are automatically activated on your account within 5 minutes.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Can I cancel my subscription?</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Yes, you can cancel your subscription at any time from your account settings.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Do you offer refunds?</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    We offer a 14-day money-back guarantee on all premium features.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

interface PremiumFeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  price: string;
  plan: string;
  onUpgrade: (plan: string) => void;
  isSelected?: boolean;
  featured?: boolean;
}

const PremiumFeatureCard: React.FC<PremiumFeatureCardProps> = ({
  title,
  description,
  icon,
  price,
  plan,
  onUpgrade,
  isSelected,
  featured
}) => {
  return (
    <motion.div
      whileHover={{ scale: featured ? 1.03 : 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn(
        "overflow-hidden transition-all duration-300",
        featured ? "border-zwm-primary shadow-lg" : "border-gray-200 shadow-md",
        isSelected && "ring-2 ring-zwm-primary ring-opacity-60"
      )}>
        {featured && (
          <div className="bg-zwm-primary text-white text-xs font-medium py-1 px-3 text-center">
            Most Popular
          </div>
        )}
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className={cn(
                "p-2 rounded-full mr-2",
                featured ? "bg-zwm-primary text-white" : "bg-zwm-primary/10 text-zwm-primary"
              )}>
                {icon}
              </div>
              <CardTitle className="text-lg">{title}</CardTitle>
            </div>
            <Badge variant={featured ? "default" : "outline"} className="uppercase">
              {plan}
            </Badge>
          </div>
          <CardDescription className="mt-2">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">₹{price}</span>
            <span className="ml-1 text-muted-foreground">/month</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className={cn(
              "w-full",
              featured ? "bg-zwm-primary hover:bg-zwm-primary/90" : ""
            )}
            onClick={() => onUpgrade(plan)}
          >
            {isSelected ? "Selected" : "Upgrade Now"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

interface BusinessSolutionCardProps {
  title: string;
  description: string;
  features: string[];
  price: string;
  period: string;
  onUpgrade: () => void;
  featured?: boolean;
}

const BusinessSolutionCard: React.FC<BusinessSolutionCardProps> = ({
  title,
  description,
  features,
  price,
  period,
  onUpgrade,
  featured
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn(
        "overflow-hidden h-full flex flex-col transition-all duration-300",
        featured ? "border-zwm-primary shadow-lg" : "border-gray-200 shadow-md"
      )}>
        {featured && (
          <div className="bg-zwm-primary text-white text-xs font-medium py-1 px-3 text-center">
            Recommended for Businesses
          </div>
        )}
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{title}</CardTitle>
            {featured && <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />}
          </div>
          <CardDescription className="mt-2">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex items-baseline mb-6">
            <span className="text-3xl font-bold">₹{price}</span>
            <span className="ml-1 text-muted-foreground">/{period}</span>
          </div>
          
          <h4 className="font-medium text-sm mb-3">Included Features:</h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm">
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button 
            className={cn(
              "w-full",
              featured ? "bg-zwm-primary hover:bg-zwm-primary/90" : ""
            )}
            onClick={onUpgrade}
          >
            Get Started
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Helper function to conditionally apply class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default AdvancedFeatures;
