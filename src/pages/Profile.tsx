
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileContent from '@/components/profile/ProfileContent';

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

  const handleNotificationSave = async (preferences: {
    email?: boolean;
    push?: boolean; 
    sms?: boolean;
    marketingEmails?: boolean;
  }) => {
    // Placeholder for saving notification preferences
    await new Promise<void>(resolve => {
      setTimeout(() => {
        toast.success("Notification preferences saved!");
        resolve();
      }, 500);
    });
  };

  const handleSocialSave = async (connections: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  }) => {
    // Placeholder for saving social media connections
    await new Promise<void>(resolve => {
      setTimeout(() => {
        toast.success("Social media connections saved!");
        resolve();
      }, 500);
    });
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      className="container mx-auto p-8 flex flex-col md:flex-row gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Profile Sidebar */}
      <ProfileSidebar
        currentUser={currentUser}
        profileImage={profileImage}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Profile Content */}
      <ProfileContent
        currentUser={currentUser}
        updateProfile={updateProfile}
        activeTab={activeTab}
        isEditing={isEditing}
        toggleEdit={toggleEdit}
        handleSave={handleSave}
        loading={loading}
        profileImage={profileImage}
        handleProfileImageChange={handleProfileImageChange}
        handleNotificationSave={handleNotificationSave}
        handleSocialSave={handleSocialSave}
      />
    </motion.div>
  );
};

export default Profile;
