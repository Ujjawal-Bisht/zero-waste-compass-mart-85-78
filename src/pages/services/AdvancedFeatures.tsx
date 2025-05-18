
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AIAssistant from '@/components/services/AIAssistant';
import TaskScheduler from '@/components/services/TaskScheduler';
import PaymentProcessor from '@/components/services/PaymentProcessor';
import EmailManager from '@/components/services/EmailManager';
import { useAuth } from '@/contexts/auth';

const mockOrder = {
  id: 'order-123',
  amount: 2499.99,
  items: [
    {
      id: 'item-1',
      productId: 'product-1',
      quantity: 2,
      name: 'Eco-friendly Water Bottle',
      price: 599.99,
      image: 'https://source.unsplash.com/random/800x600/?bottle'
    },
    {
      id: 'item-2',
      productId: 'product-2',
      quantity: 1,
      name: 'Bamboo Cutlery Set',
      price: 1299.99,
      image: 'https://source.unsplash.com/random/800x600/?bamboo'
    }
  ]
};

const AdvancedFeatures: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('ai');
  
  // Only show admin tabs if user is admin
  const isAdmin = currentUser?.isAdmin === true;
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Advanced Features</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="ai">AI Assistant</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="email">Email Notifications</TabsTrigger>
          {isAdmin && <TabsTrigger value="tasks">Scheduled Tasks</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="ai" className="space-y-6">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>AI Shopping Assistant</CardTitle>
              <CardDescription>
                Ask questions about products, get recommendations, or get help with your shopping journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 pb-8 px-6">
              <div className="border rounded-lg bg-gray-50 p-6 h-[500px] flex items-center justify-center">
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-medium">ZeroWaste AI Assistant</h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto">
                    Our AI assistant can help you find sustainable products, answer questions about reducing waste,
                    and provide personalized shopping recommendations.
                  </p>
                  <AIAssistant />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Processing</CardTitle>
              <CardDescription>
                Securely process payments for your orders using our integrated payment system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentProcessor 
                orderId={mockOrder.id}
                amount={mockOrder.amount}
                items={mockOrder.items}
                onPaymentComplete={(success) => {
                  console.log('Payment complete:', success);
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Send personalized email notifications to customers about their orders, promotions, or other updates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmailManager />
            </CardContent>
          </Card>
        </TabsContent>
        
        {isAdmin && (
          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Tasks</CardTitle>
                <CardDescription>
                  Manage automated tasks that run on a schedule, such as price updates, notifications, and reports.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <TaskScheduler />
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default AdvancedFeatures;
