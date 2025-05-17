
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock } from 'lucide-react';

interface TrackingTimelineProps {
  status: string;
  createdAt: string;
  updatedAt: string;
  formatDate: (date: string) => string;
}

const TrackingTimeline: React.FC<TrackingTimelineProps> = ({
  status,
  createdAt,
  updatedAt,
  formatDate
}) => {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium">Tracking Timeline</h4>
      <div className="space-y-3">
        <motion.div 
          className="flex items-start space-x-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="mt-0.5">
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
          <div>
            <p className="text-sm font-medium">Order Confirmed</p>
            <p className="text-xs text-gray-500">{formatDate(createdAt)}</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-start space-x-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mt-0.5">
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
          <div>
            <p className="text-sm font-medium">Processing Started</p>
            <p className="text-xs text-gray-500">{formatDate(new Date(new Date(createdAt).getTime() + 1 * 24 * 60 * 60 * 1000).toISOString())}</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-start space-x-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mt-0.5">
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
          <div>
            <p className="text-sm font-medium">Shipped</p>
            <p className="text-xs text-gray-500">{formatDate(updatedAt)}</p>
          </div>
        </motion.div>
        
        {status === 'out-for-delivery' || status === 'delivered' ? (
          <motion.div 
            className="flex items-start space-x-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="mt-0.5">
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Out for Delivery</p>
              <p className="text-xs text-gray-500">{formatDate(new Date(new Date(updatedAt).getTime() + 2 * 24 * 60 * 60 * 1000).toISOString())}</p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="flex items-start space-x-2 opacity-50"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 0.5 }}
            transition={{ delay: 0.4 }}
          >
            <div className="mt-0.5">
              <Clock className="h-4 w-4 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium">Out for Delivery</p>
              <p className="text-xs text-gray-500">Coming soon</p>
            </div>
          </motion.div>
        )}
        
        {status === 'delivered' ? (
          <motion.div 
            className="flex items-start space-x-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="mt-0.5">
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Delivered</p>
              <p className="text-xs text-gray-500">{formatDate(new Date(new Date(updatedAt).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString())}</p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="flex items-start space-x-2 opacity-50"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 0.5 }}
            transition={{ delay: 0.5 }}
          >
            <div className="mt-0.5">
              <Clock className="h-4 w-4 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium">Delivery</p>
              <p className="text-xs text-gray-500">Expected: {new Date(new Date(updatedAt).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TrackingTimeline;
