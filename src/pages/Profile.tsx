
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, User, BellRing, Share2 } from 'lucide-react';
import PersonalInfoForm from './profile/PersonalInfoForm';
import SecurityForm from './profile/SecurityForm';
import SocialMediaConnections from './profile/SocialMediaConnections';
import NotificationPreferences from './profile/NotificationPreferences';
import { userService } from '@/services/user-service';

const Profile: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(currentUser?.photoURL || null);
  const [activeTab, setActiveTab] = useState('profile');

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSocialMediaUpdate = async (values: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  }) => {
    await userService.updateSocialMedia(values);
  };

  const handleNotificationUpdate = async (values: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketingEmails: boolean;
  }) => {
    await userService.updateNotificationPreferences(values);
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <motion.div 
        className="mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <h1 className="text-3xl font-bold gradient-text bg-gradient-to-r from-zwm-primary to-zwm-secondary">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </motion.div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User size={18} /> Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield size={18} /> Security
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Share2 size={18} /> Social
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <BellRing size={18} /> Notifications
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
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
              </CardHeader>
              <CardContent>
                <PersonalInfoForm 
                  currentUser={currentUser}
                  updateProfile={updateProfile}
                  profileImage={profileImage}
                  handleProfileImageChange={handleProfileImageChange}
                />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-pop hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password here.</CardDescription>
              </CardHeader>
              <CardContent>
                <SecurityForm />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="social">
          <SocialMediaConnections 
            initialValues={currentUser?.socialMedia}
            onSave={handleSocialMediaUpdate}
          />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationPreferences 
            initialValues={currentUser?.notificationPreferences || {
              email: true,
              push: true,
              sms: false,
              marketingEmails: false
            }}
            onSave={handleNotificationUpdate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
