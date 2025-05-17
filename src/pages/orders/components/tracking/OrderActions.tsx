
import React from 'react';
import { MoreVertical, FileDown, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface OrderActionsProps {
  orderId: string;
  onDownloadInvoice?: () => void;
}

const OrderActions: React.FC<OrderActionsProps> = ({ 
  orderId, 
  onDownloadInvoice 
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {onDownloadInvoice && (
          <DropdownMenuItem onClick={onDownloadInvoice}>
            <FileDown className="mr-2 h-4 w-4" />
            <span>Download Invoice</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Phone className="mr-2 h-4 w-4" />
          <span>Contact Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MessageSquare className="mr-2 h-4 w-4" />
          <span>Message Seller</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderActions;
