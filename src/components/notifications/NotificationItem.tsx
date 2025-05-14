
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { Notification } from './types';

interface NotificationItemProps {
  notification: Notification;
  index: number;
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  index,
  markAsRead,
  deleteNotification
}) => {
  return (
    <motion.div 
      key={notification.id} 
      className={`p-3 border-b transition-colors hover:bg-gray-50 flex ${!notification.read ? 'bg-gray-50' : ''}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
    >
      <div className="mr-3 mt-1">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-zwm-secondary text-white">ZW</AvatarFallback>
        </Avatar>
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-sm">{notification.title}</h4>
          <div className="flex gap-1">
            {!notification.read && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 hover:bg-green-50 hover:text-green-500 transition-all duration-300" 
                onClick={() => markAsRead(notification.id)}
              >
                <Check size={12} />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 hover:bg-red-50 hover:text-red-500 transition-all duration-300" 
              onClick={() => deleteNotification(notification.id)}
            >
              <X size={12} />
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
        <span className="text-xs text-gray-400 mt-2 block">{notification.time}</span>
      </div>
    </motion.div>
  );
};

export default NotificationItem;
