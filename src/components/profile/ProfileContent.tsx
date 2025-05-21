
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import PersonalInfoSection from './PersonalInfoSection';
import SecuritySection from './SecuritySection';
import NotificationPreferences from '@/pages/profile/NotificationPreferences';
import SocialMediaConnections from '@/pages/profile/SocialMediaConnections';

interface ProfileContentProps {
  currentUser: any;
  updateProfile: any;
  activeTab: string;
  isEditing: boolean;
  toggleEdit: () => void;
  handleSave: () => void;
  loading: boolean;
  profileImage: string | null;
  handleProfileImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNotificationSave: (preferences: {
    email?: boolean;
    push?: boolean; 
    sms?: boolean;
    marketingEmails?: boolean;
  }) => Promise<void>;
  handleSocialSave: (connections: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  }) => Promise<void>;
}

const ProfileContent: React.FC<ProfileContentProps> = ({
  currentUser,
  updateProfile,
  activeTab,
  isEditing,
  toggleEdit,
  handleSave,
  loading,
  profileImage,
  handleProfileImageChange,
  handleNotificationSave,
  handleSocialSave,
}) => {
  return (
    <div className="w-full md:w-2/3 flex flex-col gap-6">
      <Tabs value={activeTab} className="w-full">
        <TabsContent value="personal" className="p-0 border-0">
          <PersonalInfoSection 
            currentUser={currentUser}
            updateProfile={updateProfile}
            isEditing={isEditing}
            toggleEdit={toggleEdit}
            handleSave={handleSave}
            loading={loading}
            profileImage={profileImage}
            handleProfileImageChange={handleProfileImageChange}
          />
        </TabsContent>
        
        <TabsContent value="security" className="p-0 border-0">
          <SecuritySection />
        </TabsContent>
        
        <TabsContent value="notifications" className="p-0 border-0">
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6 profile-section"
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
            className="bg-white rounded-lg shadow-md p-6 profile-section"
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
  );
};

export default ProfileContent;
