
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotificationHeaderProps {
  unreadCount: number;
  markAllAsRead: () => void;
  closeNotifications: () => void;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({ 
  unreadCount, 
  markAllAsRead, 
  closeNotifications 
}) => {
  return (
    <div className="p-3 border-b flex items-center justify-between">
      <h3 className="font-medium">Notifications</h3>
      <div className="flex gap-2">
        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={markAllAsRead} 
            className="text-xs hover:bg-gray-100 transition-all duration-300"
          >
            Mark all as read
          </Button>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={closeNotifications}
          className="hover:bg-red-50 hover:text-red-500 transition-all duration-300"
        >
          <X size={16} />
        </Button>
      </div>
    </div>
  );
};

export default NotificationHeader;
