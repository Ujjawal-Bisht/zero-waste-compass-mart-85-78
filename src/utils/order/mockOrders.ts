
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
    userId: "seller-001",
    items: [
      createOrderItem("item-001", "Organic Apples", 2, 1299, "ord-123456"),
      createOrderItem("item-002", "Fresh Bread", 1, 799, "ord-123456")
    ],
    status: "processing",
    paymentStatus: "paid",
    totalAmount: 3397,
    createdAt: "2025-05-15T10:30:00Z",
    updatedAt: "2025-05-15T10:35:00Z",
    shippingAddress: "123 Main St, Mumbai, Maharashtra, India"
  },
  {
    id: "ord-789012",
    buyerId: "buyer-001",
    buyerName: "John Doe",
    sellerId: "seller-002",
    sellerName: "Tech World",
    userId: "seller-002",
    items: [
      createOrderItem("item-003", "Wireless Headphones", 1, 6999, "ord-789012")
    ],
    status: "shipped",
    paymentStatus: "paid",
    totalAmount: 6999,
    createdAt: "2025-05-10T14:20:00Z",
    updatedAt: "2025-05-11T09:15:00Z",
    shippingAddress: "123 Main St, Mumbai, Maharashtra, India"
  },
  {
    id: "ord-345678",
    buyerId: "buyer-001",
    buyerName: "John Doe",
    sellerId: "seller-003",
    sellerName: "Dairy Delight",
    userId: "seller-003",
    items: [
      createOrderItem("item-004", "Organic Bananas", 3, 499, "ord-345678"),
      createOrderItem("item-005", "Fresh Milk", 2, 299, "ord-345678")
    ],
    status: "out-for-delivery",
    paymentStatus: "paid",
    totalAmount: 2095,
    createdAt: "2025-05-05T16:45:00Z",
    updatedAt: "2025-05-07T12:30:00Z",
    shippingAddress: "123 Main St, Mumbai, Maharashtra, India"
  },
  {
    id: "ord-901234",
    buyerId: "buyer-001",
    buyerName: "John Doe",
    sellerId: "seller-004",
    sellerName: "Fashion Styles",
    userId: "seller-004",
    items: [
      createOrderItem("item-006", "Cotton T-Shirt", 1, 2499, "ord-901234")
    ],
    status: "pending",
    paymentStatus: "pending",
    totalAmount: 2499,
    createdAt: "2025-05-16T09:10:00Z",
    updatedAt: "2025-05-16T09:10:00Z",
    shippingAddress: "123 Main St, Mumbai, Maharashtra, India"
  },
  {
    id: "ord-567890",
    buyerId: "buyer-002",
    buyerName: "Jane Smith",
    sellerId: "seller-001",
    sellerName: "Fresh Farms",
    userId: "seller-001",
    items: [
      createOrderItem("item-007", "Organic Vegetables Mix", 1, 899, "ord-567890"),
      createOrderItem("item-008", "Organic Strawberries", 2, 399, "ord-567890")
    ],
    status: "delivered",
    paymentStatus: "paid",
    totalAmount: 1697,
    createdAt: "2025-05-03T11:20:00Z",
    updatedAt: "2025-05-05T14:30:00Z",
    shippingAddress: "456 Park Avenue, Delhi, Delhi, India"
  },
  {
    id: "ord-234567",
    buyerId: "buyer-003",
    buyerName: "Robert Brown",
    sellerId: "seller-002",
    sellerName: "Tech World",
    userId: "seller-002",
    items: [
      createOrderItem("item-009", "Bluetooth Speaker", 1, 3999, "ord-234567")
    ],
    status: "shipped",
    paymentStatus: "paid",
    totalAmount: 3999,
    createdAt: "2025-05-12T15:40:00Z",
    updatedAt: "2025-05-13T10:25:00Z",
    shippingAddress: "789 Hill Road, Bangalore, Karnataka, India"
  },
  {
    id: "ord-890123",
    buyerId: "buyer-004",
    buyerName: "Emily Davis",
    sellerId: "seller-003",
    sellerName: "Dairy Delight",
    userId: "seller-003",
    items: [
      createOrderItem("item-010", "Greek Yogurt", 4, 199, "ord-890123"),
      createOrderItem("item-011", "Cheese Platter", 1, 899, "ord-890123")
    ],
    status: "processing",
    paymentStatus: "paid",
    totalAmount: 1695,
    createdAt: "2025-05-14T09:15:00Z",
    updatedAt: "2025-05-14T09:20:00Z",
    shippingAddress: "101 Valley View, Chennai, Tamil Nadu, India"
  },
  {
    id: "ord-456789",
    buyerId: "buyer-005",
    buyerName: "Michael Wilson",
    sellerId: "seller-004",
    sellerName: "Fashion Styles",
    userId: "seller-004",
    items: [
      createOrderItem("item-012", "Denim Jeans", 1, 2999, "ord-456789"),
      createOrderItem("item-013", "Cotton Shirt", 2, 1499, "ord-456789")
    ],
    status: "out-for-delivery",
    paymentStatus: "paid",
    totalAmount: 5997,
    createdAt: "2025-05-08T13:30:00Z",
    updatedAt: "2025-05-10T08:45:00Z",
    shippingAddress: "222 Beach Road, Kochi, Kerala, India"
  },
  {
    id: "ord-012345",
    buyerId: "buyer-006",
    buyerName: "Sarah Johnson",
    sellerId: "seller-005",
    sellerName: "Home Essentials",
    userId: "seller-005",
    items: [
      createOrderItem("item-014", "Scented Candles Set", 2, 799, "ord-012345"),
      createOrderItem("item-015", "Throw Pillows", 3, 599, "ord-012345")
    ],
    status: "delivered",
    paymentStatus: "paid",
    totalAmount: 3395,
    createdAt: "2025-05-02T16:20:00Z",
    updatedAt: "2025-05-04T11:15:00Z",
    shippingAddress: "333 River Lane, Hyderabad, Telangana, India"
  },
  {
    id: "ord-678901",
    buyerId: "buyer-007",
    buyerName: "David Thompson",
    sellerId: "seller-006",
    sellerName: "Gadget Galaxy",
    userId: "seller-006",
    items: [
      createOrderItem("item-016", "Smart Watch", 1, 9999, "ord-678901")
    ],
    status: "pending",
    paymentStatus: "pending",
    totalAmount: 9999,
    createdAt: "2025-05-17T10:10:00Z",
    updatedAt: "2025-05-17T10:10:00Z",
    shippingAddress: "444 Tech Park, Pune, Maharashtra, India"
  }
];
