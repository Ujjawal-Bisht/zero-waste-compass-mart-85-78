
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { User } from '@/types';

interface UserAvatarProps {
  currentUser: User | null;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ currentUser }) => {
  const navigate = useNavigate();
  
  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <motion.div 
      className="flex items-center cursor-pointer navbar-item"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/profile')}
    >
      <Avatar className={`border-2 ${currentUser?.isSeller ? 'border-amber-300 hover:border-amber-400' : 'border-blue-300 hover:border-blue-400'} hover:shadow-lg transition-all duration-300`}>
        <AvatarImage src={currentUser?.photoURL || undefined} />
        <AvatarFallback className={`${currentUser?.isSeller ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'} font-medium`}>
          {getInitials(currentUser?.displayName)}
        </AvatarFallback>
      </Avatar>
    </motion.div>
  );
};

export default UserAvatar;
