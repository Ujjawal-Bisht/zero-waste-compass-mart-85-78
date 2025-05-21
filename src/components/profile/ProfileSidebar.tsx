
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Link2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ProfileSidebarProps {
  currentUser: any;
  profileImage: string | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ 
  currentUser, 
  profileImage, 
  activeTab, 
  setActiveTab 
}) => {
  // Animation variants for navigation items
  const navItemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 * custom,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.03,
      backgroundColor: "rgba(99, 102, 241, 0.1)",
      transition: { duration: 0.2 }
    },
    active: {
      scale: 1.05,
      backgroundColor: "rgba(99, 102, 241, 0.2)",
    }
  };

  return (
    <motion.div 
      className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <motion.div 
        className="flex flex-col items-center"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Avatar className="h-24 w-24 border-4 border-zwm-primary mb-4 profile-avatar">
          <AvatarImage src={profileImage || undefined} alt={currentUser.displayName || "Profile"} />
          <AvatarFallback>{currentUser.displayName?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-semibold text-gray-800">{currentUser.displayName}</h2>
        <p className="text-gray-600">{currentUser.email}</p>
        <div className="mt-4 flex space-x-3">
          <Button variant="outline" size="sm" disabled>
            <User className="mr-2 h-4 w-4" />
            {currentUser.isSeller ? 'Seller' : 'Buyer'}
          </Button>
          <Button variant="outline" size="sm" disabled>
            <Bell className="mr-2 h-4 w-4" />
            {currentUser.isAdmin ? 'Admin' : 'User'}
          </Button>
        </div>
      </motion.div>
      
      <Separator className="my-6" />
      
      <div className="space-y-1">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Profile Navigation</h3>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-col space-y-1 w-full justify-start bg-transparent">
            <motion.div
              custom={0}
              variants={navItemVariants}
              initial="initial"
              animate={activeTab === "personal" ? "active" : "animate"}
              whileHover="hover"
            >
              <TabsTrigger 
                value="personal" 
                className="justify-start text-left w-full transition-all duration-300 hover:bg-gray-50 profile-tab-active profile-nav-item"
              >
                <User className="mr-2 h-4 w-4" />
                Personal Information
              </TabsTrigger>
            </motion.div>
            
            <motion.div
              custom={1}
              variants={navItemVariants}
              initial="initial"
              animate={activeTab === "security" ? "active" : "animate"}
              whileHover="hover"
            >
              <TabsTrigger 
                value="security" 
                className="justify-start text-left w-full transition-all duration-300 hover:bg-gray-50 profile-nav-item"
              >
                <ShieldCheck className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
            </motion.div>
            
            <motion.div
              custom={2}
              variants={navItemVariants}
              initial="initial"
              animate={activeTab === "notifications" ? "active" : "animate"}
              whileHover="hover"
            >
              <TabsTrigger 
                value="notifications" 
                className="justify-start text-left w-full transition-all duration-300 hover:bg-gray-50 profile-nav-item"
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
            </motion.div>
            
            <motion.div
              custom={3}
              variants={navItemVariants}
              initial="initial"
              animate={activeTab === "social" ? "active" : "animate"}
              whileHover="hover"
            >
              <TabsTrigger 
                value="social" 
                className="justify-start text-left w-full transition-all duration-300 hover:bg-gray-50 profile-nav-item"
              >
                <Link2 className="mr-2 h-4 w-4" />
                Social Media
              </TabsTrigger>
            </motion.div>
          </TabsList>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default ProfileSidebar;
