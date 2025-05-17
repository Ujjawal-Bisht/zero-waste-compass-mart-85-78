
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressTrackerProps {
  status: string;
  updatedAt: string;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  status,
  updatedAt
}) => {
  // Function to get progress based on current status
  const getProgressValue = (status: string): number => {
    const statusValues: Record<string, number> = {
      'pending': 0,
      'processing': 25,
      'shipped': 65,
      'out-for-delivery': 85,
      'delivered': 100,
      'cancelled': 0
    };
    return statusValues[status] || 0;
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">Shipping Progress</h4>
        <span className="text-xs text-gray-500">
          Estimated delivery: {new Date(new Date(updatedAt).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
        </span>
      </div>
      <Progress value={getProgressValue(status)} className="h-2 bg-gray-200" />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Order Placed</span>
        <span>Processing</span>
        <span>Shipped</span>
        <span>Out for Delivery</span>
        <span>Delivered</span>
      </div>
    </div>
  );
};

export default ProgressTracker;
