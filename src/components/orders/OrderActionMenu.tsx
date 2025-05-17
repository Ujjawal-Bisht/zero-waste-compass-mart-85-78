
import React from 'react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical, Mail, Printer, MessageCircle, FileDown, Truck } from 'lucide-react';
import { Order } from '@/types';
import { generateInvoice } from '@/utils/exportUtils';
import { toast } from '@/components/ui/use-toast';

interface OrderActionMenuProps {
  order: Order;
  onViewDetails: (orderId: string) => void;
  onUpdateStatus: (orderId: string, newStatus: Order['status']) => void;
  onContactBuyer: (buyerId: string, buyerName: string) => void;
  onPrintInvoice: (orderId: string) => void;
  onSendShippingUpdate: (orderId: string) => void;
  onCancelOrder: (orderId: string) => void;
}

const OrderActionMenu: React.FC<OrderActionMenuProps> = ({ 
  order,
  onViewDetails,
  onUpdateStatus,
  onContactBuyer,
  onPrintInvoice,
  onSendShippingUpdate,
  onCancelOrder
}) => {
  const handleGenerateInvoice = () => {
    if (order.status === 'out-for-delivery' || order.status === 'delivered') {
      generateInvoice(order);
      toast({
        title: "Invoice Generated",
        description: `Invoice for order ${order.id} has been generated.`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Cannot Generate Invoice",
        description: "Invoices can only be generated for orders that are out for delivery or delivered.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 menu-icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="table-dropdown-content">
        <DropdownMenuLabel>Order Actions</DropdownMenuLabel>
        <DropdownMenuItem 
          onClick={() => onViewDetails(order.id)}
          className="flex items-center cursor-pointer action-view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          View details
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => onContactBuyer(order.buyerId, order.buyerName)}
          className="flex items-center cursor-pointer"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Chat with customer
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={handleGenerateInvoice}
          className="flex items-center cursor-pointer"
        >
          <FileDown className="h-4 w-4 mr-2" />
          Generate Invoice
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
        {order.status !== 'pending' && (
          <DropdownMenuItem 
            onClick={() => onUpdateStatus(order.id, 'pending')}
            className="cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Set as Pending
          </DropdownMenuItem>
        )}
        {order.status !== 'processing' && (
          <DropdownMenuItem 
            onClick={() => onUpdateStatus(order.id, 'processing')}
            className="cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/><path d="M9 12.75h6M9 15h6"/><path d="M9 9.75C9 9.34 9.34 9 9.75 9h4.5c.41 0 .75.34.75.75v4.5c0 .41-.34.75-.75.75h-4.5C9.34 15 9 14.66 9 14.25v-4.5Z"/></svg>
            Set as Processing
          </DropdownMenuItem>
        )}
        {order.status !== 'shipped' && (
          <DropdownMenuItem 
            onClick={() => onUpdateStatus(order.id, 'shipped')}
            className="cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 19a2 2 0 0 1-2-2"/><path d="M17 19a2 2 0 0 0 2-2"/><path d="M3 17h18"/><path d="M6 17V6a1 1 0 0 1 1-1h5"/><path d="M9 5H8"/><path d="M17 8v9"/><path d="M13 8a3 3 0 1 1 6 0v1H13V8Z"/></svg>
            Set as Shipped
          </DropdownMenuItem>
        )}
        {order.status !== 'out-for-delivery' && (
          <DropdownMenuItem 
            onClick={() => onUpdateStatus(order.id, 'out-for-delivery')}
            className="cursor-pointer"
          >
            <Truck className="h-4 w-4 mr-2 text-orange-500" />
            Set as Out for Delivery
          </DropdownMenuItem>
        )}
        {order.status !== 'delivered' && (
          <DropdownMenuItem 
            onClick={() => onUpdateStatus(order.id, 'delivered')}
            className="cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M12 3c-4.8 0-9 3.86-9 9s4.2 9 9 9 9-3.86 9-9-4.2-9-9-9"/></svg>
            Set as Delivered
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => onContactBuyer(order.buyerId, order.buyerName)}
          className="cursor-pointer"
        >
          <Mail className="h-4 w-4 mr-2" />
          Contact buyer
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onPrintInvoice(order.id)}
          className="cursor-pointer"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print invoice
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onSendShippingUpdate(order.id)}
          className="cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4l2 2"/><path d="M5 19h14"/><path d="M17.7 14.5c1.7-2 2.3-4.5 1.7-7.5"/><path d="M19.4 7c-.4-1.3-1.2-2-3.4-3-3-1.5-6-1.5-9 0-3 1.5-3 6.5-3 8 0 .6.1 1.2.3 1.7"/><path d="M16 19c0-4-1.8-7-4-7s-4 3-4 7"/></svg>
          Send shipping update
        </DropdownMenuItem>
        
        {order.status !== 'cancelled' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => onCancelOrder(order.id)}
              className="text-red-600 cursor-pointer action-delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              Cancel order
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderActionMenu;
