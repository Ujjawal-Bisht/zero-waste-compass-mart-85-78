
import { useOrderActions } from './useOrderActions';
import { useChatState } from './useChatState';
import { useMockOrders } from './useMockOrders';

export const useSellerOrders = () => {
  const { orders, setOrders } = useMockOrders();
  const { chatState, handleContactBuyer, handleCloseChat } = useChatState();
  const { 
    handleViewDetails, 
    handleUpdateStatus, 
    handlePrintInvoice, 
    handleSendShippingUpdate, 
    handleCancelOrder 
  } = useOrderActions();

  return {
    orders,
    chatState,
    handleViewDetails,
    handleUpdateStatus: (orderId: string, newStatus: string) => 
      handleUpdateStatus(orders, setOrders, orderId, newStatus),
    handleContactBuyer,
    handlePrintInvoice: (orderId: string) => 
      handlePrintInvoice(orderId, orders),
    handleSendShippingUpdate,
    handleCancelOrder: (orderId: string) => 
      handleCancelOrder(orders, setOrders, orderId),
    handleCloseChat
  };
};
