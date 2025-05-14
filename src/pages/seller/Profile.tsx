
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, LineChart, Package, Shield, Bell, Settings, Wallet, FileText, MapPin, Clock } from 'lucide-react';
import VerificationForm from '@/components/seller/VerificationForm';
import ProfileFormTab from '@/components/seller/ProfileFormTab';
import StatisticsTab from '@/components/seller/StatisticsTab';
import RecentItemsTab from '@/components/seller/RecentItemsTab';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const SellerProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationTrackingEnabled, setLocationTrackingEnabled] = useState(false);
  const [autoPublishEnabled, setAutoPublishEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleToggleNotifications = (checked: boolean) => {
    setNotificationsEnabled(checked);
    toast.success(`Notifications ${checked ? 'enabled' : 'disabled'}`);
  };

  const handleToggleLocationTracking = (checked: boolean) => {
    setLocationTrackingEnabled(checked);
    toast.success(`Location tracking ${checked ? 'enabled' : 'disabled'}`);
  };

  const handleToggleAutoPublish = (checked: boolean) => {
    setAutoPublishEnabled(checked);
    toast.success(`Auto-publish ${checked ? 'enabled' : 'disabled'}`);
  };

  const handleToggleDarkMode = (checked: boolean) => {
    setDarkModeEnabled(checked);
    toast.success(`Dark mode ${checked ? 'enabled' : 'disabled'}`);
  };

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={fadeInVariants}>
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight gradient-text bg-gradient-to-r from-zwm-primary via-zwm-secondary to-zwm-accent">
              Seller Profile
            </h2>
            <p className="text-muted-foreground">
              Manage your business settings and verification status
            </p>
          </motion.div>
          
          <motion.div
            className="h-1 w-0 bg-gradient-to-r from-zwm-primary via-zwm-secondary to-zwm-accent mt-2 rounded-full"
            animate={{ width: "30%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>
      </motion.div>
      
      <Tabs defaultValue="profile" value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <TabsList className="grid w-full max-w-4xl grid-cols-6 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2 profile-tab group">
              <Store size={16} className="group-hover:scale-110 transition-transform" /> 
              Profile
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center gap-2 profile-tab group">
              <LineChart size={16} className="group-hover:scale-110 transition-transform" /> 
              Statistics
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-2 profile-tab group">
              <Package size={16} className="group-hover:scale-110 transition-transform" /> 
              Recent Items
            </TabsTrigger>
            <TabsTrigger value="verification" className="flex items-center gap-2 profile-tab group">
              <Shield size={16} className="group-hover:scale-110 transition-transform" /> 
              Verification
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 profile-tab group">
              <Bell size={16} className="group-hover:scale-110 transition-transform" /> 
              Notifications
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 profile-tab group">
              <Settings size={16} className="group-hover:scale-110 transition-transform" /> 
              Settings
            </TabsTrigger>
          </TabsList>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {activeTab === "profile" && (
            <TabsContent value="profile" className="space-y-6 profile-tab-content">
              <motion.div variants={tabVariants}>
                <ProfileFormTab />
              </motion.div>
            </TabsContent>
          )}
          
          {activeTab === "statistics" && (
            <TabsContent value="statistics" className="profile-tab-content">
              <motion.div variants={tabVariants}>
                <StatisticsTab />
              </motion.div>
            </TabsContent>
          )}
          
          {activeTab === "recent" && (
            <TabsContent value="recent" className="profile-tab-content">
              <motion.div variants={tabVariants}>
                <RecentItemsTab />
              </motion.div>
            </TabsContent>
          )}
          
          {activeTab === "verification" && (
            <TabsContent value="verification" className="profile-tab-content">
              <motion.div variants={tabVariants}>
                <VerificationForm />
              </motion.div>
            </TabsContent>
          )}
          
          {activeTab === "notifications" && (
            <TabsContent value="notifications" className="profile-tab-content">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-pop hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-zwm-primary" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Manage how you receive notifications from the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <motion.div 
                        className="flex items-center justify-between p-4 border rounded-md"
                        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex gap-3 items-center">
                          <Bell className="h-5 w-5 text-zwm-primary" />
                          <div>
                            <h4 className="font-medium">Push Notifications</h4>
                            <p className="text-sm text-muted-foreground">Receive notifications on this device</p>
                          </div>
                        </div>
                        <Switch 
                          checked={notificationsEnabled} 
                          onCheckedChange={handleToggleNotifications} 
                        />
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center justify-between p-4 border rounded-md"
                        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex gap-3 items-center">
                          <Package className="h-5 w-5 text-zwm-primary" />
                          <div>
                            <h4 className="font-medium">Product Updates</h4>
                            <p className="text-sm text-muted-foreground">Get notified when your items are sold or updated</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center justify-between p-4 border rounded-md"
                        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex gap-3 items-center">
                          <Wallet className="h-5 w-5 text-zwm-primary" />
                          <div>
                            <h4 className="font-medium">Payment Notifications</h4>
                            <p className="text-sm text-muted-foreground">Get notified about payments and transactions</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center justify-between p-4 border rounded-md"
                        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex gap-3 items-center">
                          <FileText className="h-5 w-5 text-zwm-primary" />
                          <div>
                            <h4 className="font-medium">Report Notifications</h4>
                            <p className="text-sm text-muted-foreground">Get weekly performance reports</p>
                          </div>
                        </div>
                        <Switch />
                      </motion.div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Email Frequency</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <motion.div 
                          className="border rounded-md p-3 cursor-pointer flex flex-col items-center justify-center h-24"
                          whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)", y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Clock className="mb-2 h-5 w-5 text-zwm-primary" />
                          <p className="text-sm font-medium">Real-time</p>
                        </motion.div>
                        
                        <motion.div 
                          className="border rounded-md p-3 cursor-pointer flex flex-col items-center justify-center h-24 bg-blue-50"
                          whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)", y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Clock className="mb-2 h-5 w-5 text-zwm-primary" />
                          <p className="text-sm font-medium">Daily Digest</p>
                        </motion.div>
                        
                        <motion.div 
                          className="border rounded-md p-3 cursor-pointer flex flex-col items-center justify-center h-24"
                          whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)", y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Clock className="mb-2 h-5 w-5 text-zwm-primary" />
                          <p className="text-sm font-medium">Weekly Summary</p>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          )}
          
          {activeTab === "settings" && (
            <TabsContent value="settings" className="profile-tab-content">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-pop hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-zwm-primary" />
                      Settings & Preferences
                    </CardTitle>
                    <CardDescription>
                      Customize your account settings and application preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <motion.div 
                        className="flex items-center justify-between p-4 border rounded-md"
                        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex gap-3 items-center">
                          <MapPin className="h-5 w-5 text-zwm-primary" />
                          <div>
                            <h4 className="font-medium">Location Services</h4>
                            <p className="text-sm text-muted-foreground">Allow location tracking for better service</p>
                          </div>
                        </div>
                        <Switch 
                          checked={locationTrackingEnabled} 
                          onCheckedChange={handleToggleLocationTracking} 
                        />
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center justify-between p-4 border rounded-md"
                        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex gap-3 items-center">
                          <Package className="h-5 w-5 text-zwm-primary" />
                          <div>
                            <h4 className="font-medium">Auto-Publish Items</h4>
                            <p className="text-sm text-muted-foreground">Automatically publish items when added</p>
                          </div>
                        </div>
                        <Switch 
                          checked={autoPublishEnabled} 
                          onCheckedChange={handleToggleAutoPublish} 
                        />
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center justify-between p-4 border rounded-md"
                        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex gap-3 items-center">
                          <Settings className="h-5 w-5 text-zwm-primary" />
                          <div>
                            <h4 className="font-medium">Dark Mode</h4>
                            <p className="text-sm text-muted-foreground">Toggle dark mode appearance</p>
                          </div>
                        </div>
                        <Switch 
                          checked={darkModeEnabled} 
                          onCheckedChange={handleToggleDarkMode}
                        />
                      </motion.div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Language & Region</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <select 
                            id="language" 
                            className="w-full p-2 border rounded-md"
                            defaultValue="en"
                          >
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                            <option value="de">Deutsch</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Timezone</Label>
                          <select 
                            id="timezone" 
                            className="w-full p-2 border rounded-md"
                            defaultValue="utc"
                          >
                            <option value="utc">UTC (GMT+0)</option>
                            <option value="est">EST (GMT-5)</option>
                            <option value="pst">PST (GMT-8)</option>
                            <option value="ist">IST (GMT+5:30)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Account Actions</h3>
                      <div className="flex flex-wrap gap-4">
                        <motion.button 
                          className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50 transition-colors"
                          whileHover={{ y: -2, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
                          whileTap={{ y: 0 }}
                          onClick={() => toast.success("Account data exported successfully")}
                        >
                          Export Account Data
                        </motion.button>
                        
                        <motion.button 
                          className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50 transition-colors"
                          whileHover={{ y: -2, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
                          whileTap={{ y: 0 }}
                          onClick={() => toast.success("Password change requested. Check your email.")}
                        >
                          Change Password
                        </motion.button>
                        
                        <motion.button 
                          className="px-4 py-2 border rounded-md text-sm text-red-600 hover:bg-red-50 transition-colors"
                          whileHover={{ y: -2, boxShadow: "0 4px 8px rgba(255,0,0,0.1)" }}
                          whileTap={{ y: 0 }}
                          onClick={() => toast({
                            title: "Are you sure?",
                            description: "Deactivating your account will hide all your listings.",
                            variant: "destructive"
                          })}
                        >
                          Deactivate Account
                        </motion.button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          )}
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
};

export default SellerProfile;
