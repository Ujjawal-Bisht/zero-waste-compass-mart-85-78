
import { Order } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { generateInvoice } from '@/utils/exportUtils';

export const useOrderActions = () => {
  const handleViewDetails = (orderId: string) => {
    toast({
      title: "View Order Details",
      description: `Viewing details for order ${orderId}`,
      duration: 3000,
    });
  };

  const handleUpdateStatus = (
    orders: Order[], 
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>, 
    orderId: string, 
    newStatus: Order['status']
  ) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? {...order, status: newStatus} : order
      )
    );
    
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} is now ${newStatus.replace('-', ' ')}`,
      duration: 3000,
    });
  };

  const handlePrintInvoice = (orderId: string, orders: Order[]) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) {
      toast({
        title: "Order Not Found",
        description: "Could not find the specified order.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    if (order.status !== 'out-for-delivery' && order.status !== 'delivered') {
      toast({
        title: "Cannot Generate Invoice Yet",
        description: "Invoice can only be generated for orders that are out for delivery or delivered.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    if (generateInvoice(order)) {
      toast({
        title: "Invoice Generated",
        description: `Invoice for order ${orderId} has been generated and downloaded.`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Invoice Generation Failed",
        description: "There was a problem generating the invoice. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleSendShippingUpdate = (orderId: string) => {
    toast({
      title: "Shipping Update",
      description: `Sending shipping update for order ${orderId}`,
      duration: 3000,
    });
  };

  const handleCancelOrder = (
    orders: Order[], 
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>, 
    orderId: string
  ) => {
    toast({
      title: "Cancel Order",
      description: `Order ${orderId} has been cancelled`,
      variant: "destructive",
      duration: 3000,
    });
    
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? {...order, status: 'cancelled'} : order
      )
    );
  };

  return {
    handleViewDetails,
    handleUpdateStatus,
    handlePrintInvoice,
    handleSendShippingUpdate,
    handleCancelOrder
  };
};
