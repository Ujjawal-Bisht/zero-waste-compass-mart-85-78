import React, { useState } from 'react';
import { Bell, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationHeader from './notifications/NotificationHeader';
import NotificationList from './notifications/NotificationList';
import { mockNotifications } from './notifications/mockData';
import { Notification } from './notifications/types';

const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.10, rotate: 3 }}
        whileTap={{ scale: 0.96, rotate: -3 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="transition-transform duration-200"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className={`relative notification-bell notification-bell-pulse button-shimmer notification-shimmer group ring-2 ring-primary/30 ${isOpen ? "animate-pulse" : ""}`}
          aria-label="Notifications"
        >
          <motion.div
            animate={unreadCount > 0 ? { rotate: [0, 10, -10, 0], scale: [1, 1.1, 0.96, 1] } : {}}
            transition={{ 
              duration: 0.5, 
              repeat: unreadCount > 0 ? Infinity : 0, 
              repeatDelay: 5 
            }}
          >
            {isHovered || unreadCount > 0 ? 
              <BellRing className="h-5 w-5 text-primary transition-all duration-300" /> : 
              <Bell className="h-5 w-5 transition-all duration-300" />
            }
          </motion.div>
          
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-zwm-primary text-white notification-badge pulse-soft badge-animate"
            >
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                {unreadCount}
              </motion.span>
            </Badge>
          )}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-lg border z-50 dropdown-menu-animate overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, type: "spring" }}
            >
              <NotificationHeader 
                unreadCount={unreadCount} 
                markAllAsRead={markAllAsRead} 
                closeNotifications={() => setIsOpen(false)} 
              />
            </motion.div>
            <motion.div 
              className="max-h-[400px] overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <NotificationList 
                notifications={notifications}
                markAsRead={markAsRead}
                deleteNotification={deleteNotification}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;
