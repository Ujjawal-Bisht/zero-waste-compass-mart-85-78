
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import VerificationForm from '@/components/seller/VerificationForm';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Building, User, Shield, Store, Package, LineChart } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const profileSchema = z.object({
  displayName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  businessName: z.string().min(1, { message: 'Business name is required' }),
  businessType: z.enum(['retailer', 'distributor', 'manufacturer', 'individual'], { 
    required_error: 'Please select a business type' 
  }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// Mock data for statistics
const revenueData = [
  { month: 'Jan', revenue: 4500, profit: 1200 },
  { month: 'Feb', revenue: 5200, profit: 1500 },
  { month: 'Mar', revenue: 6100, profit: 1800 },
  { month: 'Apr', revenue: 5800, profit: 1600 },
  { month: 'May', revenue: 7000, profit: 2100 },
  { month: 'Jun', revenue: 8200, profit: 2400 },
];

// Mock data for recent items
const recentItems = [
  { id: 1, name: 'Bamboo Cutlery Set', price: 19.99, date: '2025-05-10', image: '/placeholder.svg' },
  { id: 2, name: 'Reusable Produce Bags (5-pack)', price: 12.50, date: '2025-05-09', image: '/placeholder.svg' },
  { id: 3, name: 'Stainless Steel Water Bottle', price: 24.99, date: '2025-05-08', image: '/placeholder.svg' },
  { id: 4, name: 'Compostable Phone Case', price: 29.99, date: '2025-05-07', image: '/placeholder.svg' },
];

const SellerProfile: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: currentUser?.displayName || '',
      email: currentUser?.email || '',
      businessName: currentUser?.businessName || '',
      businessType: currentUser?.businessType || 'retailer',
    },
  });
  
  const onSubmit = async (values: ProfileFormValues) => {
    try {
      await updateProfile(values);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      <div>
        <h2 className="text-3xl font-bold tracking-tight gradient-text bg-gradient-to-r from-zwm-primary via-zwm-secondary to-zwm-accent">Seller Profile</h2>
        <p className="text-muted-foreground">
          Manage your business settings and verification status
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-4 mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <Store size={16} /> Profile
          </TabsTrigger>
          <TabsTrigger value="statistics" className="flex items-center gap-2">
            <LineChart size={16} /> Statistics
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Package size={16} /> Recent Items
          </TabsTrigger>
          <TabsTrigger value="verification" className="flex items-center gap-2">
            <Shield size={16} /> Verification
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-pop hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Manage your business details</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="displayName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Person</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input {...field} className="pl-10" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} disabled className="bg-muted" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input {...field} className="pl-10" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="businessType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Type</FormLabel>
                            <FormControl>
                              <Select 
                                value={field.value} 
                                onValueChange={(value: 'retailer' | 'distributor' | 'manufacturer' | 'individual') => field.onChange(value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select business type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="retailer">Retailer</SelectItem>
                                  <SelectItem value="distributor">Distributor</SelectItem>
                                  <SelectItem value="manufacturer">Manufacturer</SelectItem>
                                  <SelectItem value="individual">Individual</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex gap-2 justify-end">
                      <Button 
                        type="submit" 
                        className="zwm-gradient-hover"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="shadow-pop hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <FormLabel htmlFor="current-password">Current Password</FormLabel>
                    <div className="relative">
                      <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="current-password" type="password" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <FormLabel htmlFor="new-password">New Password</FormLabel>
                    <div className="relative">
                      <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="new-password" type="password" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
                    <div className="relative">
                      <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="confirm-password" type="password" className="pl-10" />
                    </div>
                  </div>
                  <Button className="zwm-gradient-hover">Change Password</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="statistics">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-pop hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Revenue & Profit Statistics</CardTitle>
                <CardDescription>Performance overview for your business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-1">Last Month Revenue</h3>
                    <p className="text-3xl font-bold text-zwm-primary">$8,200</p>
                    <p className="text-sm text-muted-foreground">+14.7% from previous month</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-1">Last Month Profit</h3>
                    <p className="text-3xl font-bold text-green-500">$2,400</p>
                    <p className="text-sm text-muted-foreground">+12.5% from previous month</p>
                  </div>
                </div>

                <div className="mt-8 h-80">
                  <h3 className="text-lg font-semibold mb-4">6-Month Performance</h3>
                  <div className="h-full w-full">
                    <div className="grid grid-cols-6 h-64 gap-1 relative">
                      {revenueData.map((item, index) => (
                        <div key={index} className="flex flex-col justify-end items-center gap-1">
                          <div className="w-full flex justify-center items-end gap-1 h-full">
                            <div 
                              className="w-5 bg-zwm-primary rounded-t-sm" 
                              style={{ height: `${(item.revenue / 10000) * 100}%` }}
                              title={`Revenue: $${item.revenue}`}
                            />
                            <div 
                              className="w-5 bg-green-500 rounded-t-sm" 
                              style={{ height: `${(item.profit / 10000) * 100}%` }}
                              title={`Profit: $${item.profit}`}
                            />
                          </div>
                          <span className="text-xs">{item.month}</span>
                        </div>
                      ))}
                      
                      {/* Y-axis label */}
                      <div className="absolute -left-6 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
                        <span>$10K</span>
                        <span>$7.5K</span>
                        <span>$5K</span>
                        <span>$2.5K</span>
                        <span>$0</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-zwm-primary rounded-full"></div>
                        <span className="text-sm">Revenue</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Profit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="recent">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-pop hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Recently Added Items</CardTitle>
                <CardDescription>Products you've added to your inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentItems.map((item) => (
                    <motion.div 
                      key={item.id}
                      className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-16 w-16 object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-zwm-primary font-medium">${item.price.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">Added on {item.date}</p>
                      </div>
                      <div className="flex flex-col justify-between items-end">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Package size={16} />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" className="zwm-gradient-hover">
                    View All Items
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="verification">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <VerificationForm />
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default SellerProfile;
