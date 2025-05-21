
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';
import { Edit, Check, User, Bell, Link2, Save, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import PersonalInfoForm from './profile/PersonalInfoForm';
import NotificationPreferences from './profile/NotificationPreferences';
import SocialMediaConnections from './profile/SocialMediaConnections';
import SecurityForm from './profile/SecurityForm';
import TwoFactorSetup from '@/components/auth/two-factor/TwoFactorSetup';

const Profile: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(currentUser?.photoURL || null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    if (currentUser) {
      setProfileImage(currentUser.photoURL || null);
    }
  }, [currentUser]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (currentUser && updateProfile) {
        await updateProfile({
          ...currentUser,
          photoURL: profileImage,
        });
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast.error(error?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationSave = async (preferences: any) => {
    // Placeholder for saving notification preferences
    toast.success("Notification preferences saved!");
  };

  const handleSocialSave = async (connections: any) => {
    // Placeholder for saving social media connections
    toast.success("Social media connections saved!");
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

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
      className="container mx-auto p-8 flex flex-col md:flex-row gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Profile Summary */}
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
          <Avatar className="h-24 w-24 border-4 border-zwm-primary mb-4">
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
                animate="animate"
                whileHover="hover"
                animate={activeTab === "personal" ? "active" : "animate"}
              >
                <TabsTrigger 
                  value="personal" 
                  className="justify-start text-left w-full transition-all duration-300 hover:bg-gray-50"
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
                animate={activeTab === "security" ? "active" : "animate"}
              >
                <TabsTrigger 
                  value="security" 
                  className="justify-start text-left w-full transition-all duration-300 hover:bg-gray-50"
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
                animate={activeTab === "notifications" ? "active" : "animate"}
              >
                <TabsTrigger 
                  value="notifications" 
                  className="justify-start text-left w-full transition-all duration-300 hover:bg-gray-50"
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
                animate={activeTab === "social" ? "active" : "animate"}
              >
                <TabsTrigger 
                  value="social" 
                  className="justify-start text-left w-full transition-all duration-300 hover:bg-gray-50"
                >
                  <Link2 className="mr-2 h-4 w-4" />
                  Social Media
                </TabsTrigger>
              </motion.div>
            </TabsList>
          </Tabs>
        </div>
      </motion.div>

      {/* Profile Details */}
      <div className="w-full md:w-2/3 flex flex-col gap-6">
        <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
          <TabsContent value="personal" className="p-0 border-0">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                {isEditing ? (
                  <div className="flex space-x-2">
                    <Button variant="secondary" size="sm" onClick={handleSave} disabled={loading}>
                      {loading ? <span className="animate-spin">Saving...</span> : <><Save className="mr-2 h-4 w-4" /> Save</>}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={toggleEdit} disabled={loading}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button variant="ghost" size="sm" onClick={toggleEdit}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </div>

              <PersonalInfoForm
                currentUser={currentUser}
                updateProfile={updateProfile}
                profileImage={profileImage}
                handleProfileImageChange={handleProfileImageChange}
              />
            </motion.div>
          </TabsContent>
          
          <TabsContent value="security" className="p-0 border-0">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Security Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <SecurityForm />
                </div>
                <div>
                  <TwoFactorSetup />
                </div>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="notifications" className="p-0 border-0">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification Preferences</h2>
              <NotificationPreferences
                onSave={handleNotificationSave}
              />
            </motion.div>
          </TabsContent>
          
          <TabsContent value="social" className="p-0 border-0">
            <motion.div 
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Social Media Connections</h2>
              <SocialMediaConnections
                onSave={handleSocialSave}
              />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Profile;
