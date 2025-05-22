
import { useToast } from '@/components/ui/use-toast';
import { Order } from '@/types';

export const useOrderActions = () => {
  const { toast } = useToast();

  const handleCancelOrder = (orderId: string, setOrders: React.Dispatch<React.SetStateAction<Order[]>>) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'cancelled' } 
          : order
      )
    );
    
    toast({
      title: "Order Cancelled",
      description: `Order #${orderId.split('-')[1]} has been cancelled successfully.`,
      variant: "destructive",
    });
  };

  const handleTrackOrder = (orderId: string, orders: Order[]) => {
    const order = orders.find(o => o.id === orderId);
    
    if (order?.status === 'out-for-delivery') {
      toast({
        title: "Out for Delivery!",
        description: `Your order #${orderId.split('-')[1]} is out for delivery today. It should arrive within a few hours.`,
      });
    } else {
      toast({
        title: "Tracking Information",
        description: `Tracking details for order #${orderId.split('-')[1]} are now shown on this page.`,
      });
    }
  };

  return {
    handleCancelOrder,
    handleTrackOrder
  };
};
