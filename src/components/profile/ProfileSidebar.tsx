
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Link2, ShieldCheck, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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

  // Avatar animation variants
  const avatarVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 0 15px rgba(79, 70, 229, 0.6)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="w-full md:w-1/3 bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-lg p-6 overflow-hidden border border-blue-100"
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
        <motion.div
          variants={avatarVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <Avatar className="h-24 w-24 border-4 border-zwm-primary mb-4 profile-avatar ring-offset-2 ring-2 ring-blue-300">
            <AvatarImage src={profileImage || undefined} alt={currentUser.displayName || "Profile"} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold">
              {currentUser.displayName?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
        </motion.div>
        
        <motion.h2 
          className="text-2xl font-semibold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {currentUser.displayName || "User"}
        </motion.h2>
        
        <motion.p 
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {currentUser.email}
        </motion.p>
        
        <div className="mt-4 flex space-x-3">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Badge variant={currentUser.isSeller ? "default" : "outline"} className="flex items-center gap-1 px-3 py-1.5 transition-all hover:bg-blue-600">
              <User className="h-3.5 w-3.5" />
              {currentUser.isSeller ? 'Seller' : 'Buyer'}
            </Badge>
          </motion.div>
          
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <Badge variant={currentUser.isAdmin ? "destructive" : "secondary"} className="flex items-center gap-1 px-3 py-1.5 transition-all hover:scale-105">
              <Settings className="h-3.5 w-3.5" />
              {currentUser.isAdmin ? 'Admin' : 'User'}
            </Badge>
          </motion.div>
        </div>
      </motion.div>
      
      <Separator className="my-6 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      
      <div className="space-y-3">
        <motion.h3 
          className="text-lg font-medium text-gray-700 mb-2 pl-2 border-l-4 border-blue-500"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          Profile Navigation
        </motion.h3>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-col space-y-2 w-full justify-start bg-transparent">
            <motion.div
              custom={0}
              variants={navItemVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <TabsTrigger 
                value="personal" 
                className={`justify-start text-left w-full transition-all duration-300 rounded-md profile-nav-item
                  ${activeTab === "personal" 
                    ? "bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 font-medium shadow-sm" 
                    : "hover:bg-blue-50 hover:border-l-4 hover:border-blue-300"}`}
              >
                <User className="mr-2 h-4 w-4" />
                Personal Information
              </TabsTrigger>
            </motion.div>
            
            <motion.div
              custom={1}
              variants={navItemVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <TabsTrigger 
                value="security" 
                className={`justify-start text-left w-full transition-all duration-300 rounded-md profile-nav-item
                  ${activeTab === "security" 
                    ? "bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500 font-medium shadow-sm" 
                    : "hover:bg-purple-50 hover:border-l-4 hover:border-purple-300"}`}
              >
                <ShieldCheck className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
            </motion.div>
            
            <motion.div
              custom={2}
              variants={navItemVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <TabsTrigger 
                value="notifications" 
                className={`justify-start text-left w-full transition-all duration-300 rounded-md profile-nav-item
                  ${activeTab === "notifications" 
                    ? "bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-500 font-medium shadow-sm" 
                    : "hover:bg-amber-50 hover:border-l-4 hover:border-amber-300"}`}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
            </motion.div>
            
            <motion.div
              custom={3}
              variants={navItemVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <TabsTrigger 
                value="social" 
                className={`justify-start text-left w-full transition-all duration-300 rounded-md profile-nav-item
                  ${activeTab === "social" 
                    ? "bg-gradient-to-r from-teal-50 to-teal-100 border-l-4 border-teal-500 font-medium shadow-sm" 
                    : "hover:bg-teal-50 hover:border-l-4 hover:border-teal-300"}`}
              >
                <Link2 className="mr-2 h-4 w-4" />
                Social Media
              </TabsTrigger>
            </motion.div>
          </TabsList>
        </Tabs>
      </div>
      
      <motion.div 
        className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <p className="text-sm text-blue-800 text-center">
          <span className="font-medium">Member since:</span> {new Date(currentUser.createdAt || Date.now()).toLocaleDateString()}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ProfileSidebar;
