
import React, { useState } from 'react';
import { Bell, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { mockNotifications } from './notifications/mockData';
import { Notification } from './notifications/types';

const NotificationCenter: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [notifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

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
          tabIndex={0}
          className={`relative notification-bell notification-bell-pulse button-shimmer notification-shimmer group ring-2 ring-primary/30`}
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
    </div>
  );
};

export default NotificationCenter;
