
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Notification } from './types';
import NotificationItem from './NotificationItem';

interface NotificationListProps {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ 
  notifications, 
  markAsRead, 
  deleteNotification 
}) => {
  if (notifications.length === 0) {
    return (
      <motion.div 
        className="p-8 text-center text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-sm">No notifications</p>
      </motion.div>
    );
  }

  return (
    <motion.div>
      {notifications.map((notification, index) => (
        <NotificationItem 
          key={notification.id}
          notification={notification}
          index={index}
          markAsRead={markAsRead}
          deleteNotification={deleteNotification}
        />
      ))}
    </motion.div>
  );
};

export default NotificationList;
