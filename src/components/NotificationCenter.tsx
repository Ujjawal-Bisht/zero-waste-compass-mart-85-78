
import React, { useState } from 'react';
import { Bell, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'success' | 'info' | 'warning' | 'error';
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Item Request',
    message: 'Sarah has requested your canned vegetables item.',
    time: '10 minutes ago',
    read: false,
    type: 'info',
  },
  {
    id: '2',
    title: 'Donation Confirmed',
    message: 'Your winter jacket was successfully donated to the local shelter!',
    time: '2 hours ago',
    read: false,
    type: 'success',
  },
  {
    id: '3',
    title: 'Item Expiring Soon',
    message: 'Your bread item will expire in 2 days. Consider donating it soon!',
    time: '1 day ago',
    read: true,
    type: 'warning',
  },
  {
    id: '4',
    title: 'Trust Score Updated',
    message: 'Your trust score has increased to 4.5! Keep up the good work.',
    time: '2 days ago',
    read: true,
    type: 'success',
  },
];

const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getTypeStyles = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-zwm-success/10 border-l-4 border-zwm-success';
      case 'warning':
        return 'bg-zwm-warning/10 border-l-4 border-zwm-warning';
      case 'error':
        return 'bg-zwm-error/10 border-l-4 border-zwm-error';
      default:
        return 'bg-zwm-info/10 border-l-4 border-zwm-info';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative notification-bell notification-bell-pulse button-shimmer notification-shimmer"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-zwm-primary text-white notification-badge pulse-soft badge-animate">
            {unreadCount}
          </Badge>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-lg border z-50 dropdown-menu-animate"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
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
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-red-50 hover:text-red-500 transition-all duration-300"
                >
                  <X size={16} />
                </Button>
              </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length > 0 ? (
                <motion.div>
                  {notifications.map((notification, index) => (
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
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  className="p-8 text-center text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-sm">No notifications</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;
