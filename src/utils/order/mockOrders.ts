
import { Order } from '@/types';
import { createOrderItem } from './orderUtils';

// Mock data for orders
export const generateMockOrders = (): Order[] => [
  {
    id: "ord-123456",
    buyerId: "buyer-001",
    buyerName: "John Doe",
    sellerId: "seller-001",
    sellerName: "Fresh Farms",
    items: [
      createOrderItem("item-001", "Organic Apples", 2, 1299, "ord-123456"),
      createOrderItem("item-002", "Fresh Bread", 1, 799, "ord-123456")
    ],
    status: "processing",
    paymentStatus: "paid",
    totalAmount: 3397,
    createdAt: "2025-05-15T10:30:00Z",
    updatedAt: "2025-05-15T10:35:00Z"
  },
  {
    id: "ord-789012",
    buyerId: "buyer-001",
    buyerName: "John Doe",
    sellerId: "seller-002",
    sellerName: "Tech World",
    items: [
      createOrderItem("item-003", "Wireless Headphones", 1, 6999, "ord-789012")
    ],
    status: "shipped",
    paymentStatus: "paid",
    totalAmount: 6999,
    createdAt: "2025-05-10T14:20:00Z",
    updatedAt: "2025-05-11T09:15:00Z"
  },
  {
    id: "ord-345678",
    buyerId: "buyer-001",
    buyerName: "John Doe",
    sellerId: "seller-003",
    sellerName: "Dairy Delight",
    items: [
      createOrderItem("item-004", "Organic Bananas", 3, 499, "ord-345678"),
      createOrderItem("item-005", "Fresh Milk", 2, 299, "ord-345678")
    ],
    status: "out-for-delivery",
    paymentStatus: "paid",
    totalAmount: 2095,
    createdAt: "2025-05-05T16:45:00Z",
    updatedAt: "2025-05-07T12:30:00Z"
  },
  {
    id: "ord-901234",
    buyerId: "buyer-001",
    buyerName: "John Doe",
    sellerId: "seller-004",
    sellerName: "Fashion Styles",
    items: [
      createOrderItem("item-006", "Cotton T-Shirt", 1, 2499, "ord-901234")
    ],
    status: "pending",
    paymentStatus: "pending",
    totalAmount: 2499,
    createdAt: "2025-05-16T09:10:00Z",
    updatedAt: "2025-05-16T09:10:00Z"
  }
];
