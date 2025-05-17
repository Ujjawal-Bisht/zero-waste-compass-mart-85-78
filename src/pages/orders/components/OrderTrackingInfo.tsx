
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Order } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { generateInvoice } from '@/utils/exportUtils';
import MapDialog from './tracking/MapDialog';
import TrackingCard from './tracking/TrackingCard';

interface OrderTrackingInfoProps {
  orders: Order[];
  onTrackOrder: (orderId: string) => void;
  formatDate: (date: string) => string;
}

export const OrderTrackingInfo: React.FC<OrderTrackingInfoProps> = ({
  orders,
  onTrackOrder,
  formatDate
}) => {
  const { toast } = useToast();
  const shippedOrders = orders.filter(order => 
    order.status === 'shipped' || order.status === 'out-for-delivery'
  );
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  
  if (shippedOrders.length === 0) {
    return null;
  }

  const toggleExpandOrder = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleViewOnMap = (address: string) => {
    setSelectedLocation(address);
    setMapDialogOpen(true);
  };

  const handleDownloadInvoice = (order: Order) => {
    if (order.status === 'out-for-delivery' || order.status === 'delivered') {
      generateInvoice(order);
      toast({
        title: "Invoice Downloaded",
        description: `Invoice for order #${order.id.split('-')[1]} has been downloaded.`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Invoice Not Available",
        description: "Invoices are only available for orders that are out for delivery or delivered.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b flex flex-row items-center">
          <div className="flex items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="mr-2"
            >
              <Truck className="h-5 w-5 text-purple-600" />
            </motion.div>
            <CardTitle>Shipment Tracking</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <AnimatePresence>
            {shippedOrders.map(order => (
              <TrackingCard
                key={`shipping-${order.id}`}
                order={order}
                expandedOrderId={expandedOrderId}
                formatDate={formatDate}
                onTrackOrder={onTrackOrder}
                onToggleExpand={toggleExpandOrder}
                onViewMap={handleViewOnMap}
                onDownloadInvoice={handleDownloadInvoice}
              />
            ))}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Map Dialog */}
      <MapDialog
        open={mapDialogOpen}
        onOpenChange={setMapDialogOpen}
        location={selectedLocation}
      />
    </motion.div>
  );
};
