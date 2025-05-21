
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Edit, Save } from 'lucide-react';
import PersonalInfoForm from '@/pages/profile/PersonalInfoForm';

interface PersonalInfoSectionProps {
  currentUser: any;
  updateProfile: any;
  isEditing: boolean;
  toggleEdit: () => void;
  handleSave: () => void;
  loading: boolean;
  profileImage: string | null;
  handleProfileImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  currentUser,
  updateProfile,
  isEditing,
  toggleEdit,
  handleSave,
  loading,
  profileImage,
  handleProfileImageChange,
}) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6 profile-section"
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
  );
};

export default PersonalInfoSection;
