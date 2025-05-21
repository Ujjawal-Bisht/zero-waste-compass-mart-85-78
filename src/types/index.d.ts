
// Adding or updating the Order and OrderItem types to ensure consistency
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  productId?: string;
  orderId?: string;
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName?: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'out-for-delivery' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  shippingAddress?: string;
  trackingInfo?: {
    carrier?: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
    lastUpdated?: string;
    currentLocation?: string;
  };
  paymentMethod?: string;
}
