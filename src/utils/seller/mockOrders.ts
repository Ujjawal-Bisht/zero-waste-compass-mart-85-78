
import { Order, OrderStatus, PaymentStatus } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Helper function to create mock order items
const createMockOrderItem = (name: string, quantity: number, price: number, orderId: string) => {
  return {
    id: uuidv4(),
    name,
    quantity,
    price,
    productId: uuidv4(),
    orderId,
    imageUrl: `https://source.unsplash.com/random/100x100?${name.toLowerCase().split(' ').join('-')}`
  };
};

export const generateMockSellerOrders = (): Order[] => {
  return [
    {
      id: "ord-123456",
      buyerId: "buyer-001",
      buyerName: "John Doe",
      sellerId: "seller-001",
      sellerName: "Fresh Farms",
      userId: "seller-001",
      items: [
        createMockOrderItem("Organic Apples", 2, 1299, "ord-123456"),
        createMockOrderItem("Fresh Bread", 1, 799, "ord-123456")
      ],
      status: "processing" as OrderStatus,
      paymentStatus: "paid" as PaymentStatus,
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
        createMockOrderItem("Wireless Headphones", 1, 6999, "ord-789012")
      ],
      status: "shipped" as OrderStatus,
      paymentStatus: "paid" as PaymentStatus,
      totalAmount: 6999,
      createdAt: "2025-05-10T14:20:00Z",
      updatedAt: "2025-05-11T09:15:00Z",
      shippingAddress: "123 Main St, Mumbai, Maharashtra, India"
    },
    {
      id: "ord-345678",
      buyerId: "buyer-001",
      buyerName: "John Doe",
      sellerId: "seller-001",
      sellerName: "Fresh Farms",
      userId: "seller-001",
      items: [
        createMockOrderItem("Organic Bananas", 3, 499, "ord-345678"),
        createMockOrderItem("Fresh Milk", 2, 299, "ord-345678")
      ],
      status: "out-for-delivery" as OrderStatus,
      paymentStatus: "paid" as PaymentStatus,
      totalAmount: 2095,
      createdAt: "2025-05-05T16:45:00Z",
      updatedAt: "2025-05-07T12:30:00Z",
      shippingAddress: "123 Main St, Mumbai, Maharashtra, India"
    },
    {
      id: "ord-901234",
      buyerId: "buyer-001",
      buyerName: "John Doe",
      sellerId: "seller-001",
      sellerName: "Fresh Farms",
      userId: "seller-001",
      items: [
        createMockOrderItem("Cotton T-Shirt", 1, 2499, "ord-901234")
      ],
      status: "pending" as OrderStatus,
      paymentStatus: "pending" as PaymentStatus,
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
        createMockOrderItem("Organic Vegetables Mix", 1, 899, "ord-567890"),
        createMockOrderItem("Organic Strawberries", 2, 399, "ord-567890")
      ],
      status: "delivered" as OrderStatus,
      paymentStatus: "paid" as PaymentStatus,
      totalAmount: 1697,
      createdAt: "2025-05-03T11:20:00Z",
      updatedAt: "2025-05-05T14:30:00Z",
      shippingAddress: "456 Park Avenue, Delhi, Delhi, India"
    },
    {
      id: "ord-234567",
      buyerId: "buyer-003",
      buyerName: "Robert Brown",
      sellerId: "seller-001",
      sellerName: "Fresh Farms",
      userId: "seller-001",
      items: [
        createMockOrderItem("Bluetooth Speaker", 1, 3999, "ord-234567")
      ],
      status: "shipped" as OrderStatus,
      paymentStatus: "paid" as PaymentStatus,
      totalAmount: 3999,
      createdAt: "2025-05-12T15:40:00Z",
      updatedAt: "2025-05-13T10:25:00Z",
      shippingAddress: "789 Hill Road, Bangalore, Karnataka, India"
    },
    {
      id: "ord-890123",
      buyerId: "buyer-004",
      buyerName: "Emily Davis",
      sellerId: "seller-001",
      sellerName: "Fresh Farms",
      userId: "seller-001",
      items: [
        createMockOrderItem("Greek Yogurt", 4, 199, "ord-890123"),
        createMockOrderItem("Cheese Platter", 1, 899, "ord-890123")
      ],
      status: "processing" as OrderStatus,
      paymentStatus: "paid" as PaymentStatus,
      totalAmount: 1695,
      createdAt: "2025-05-14T09:15:00Z",
      updatedAt: "2025-05-14T09:20:00Z",
      shippingAddress: "101 Valley View, Chennai, Tamil Nadu, India"
    },
    {
      id: "ord-456789",
      buyerId: "buyer-005",
      buyerName: "Michael Wilson",
      sellerId: "seller-001",
      sellerName: "Fresh Farms",
      userId: "seller-001",
      items: [
        createMockOrderItem("Denim Jeans", 1, 2999, "ord-456789"),
        createMockOrderItem("Cotton Shirt", 2, 1499, "ord-456789")
      ],
      status: "out-for-delivery" as OrderStatus,
      paymentStatus: "paid" as PaymentStatus,
      totalAmount: 5997,
      createdAt: "2025-05-08T13:30:00Z",
      updatedAt: "2025-05-10T08:45:00Z",
      shippingAddress: "222 Beach Road, Kochi, Kerala, India"
    },
    {
      id: "ord-012345",
      buyerId: "buyer-006",
      buyerName: "Sarah Johnson",
      sellerId: "seller-001",
      sellerName: "Fresh Farms",
      userId: "seller-001",
      items: [
        createMockOrderItem("Scented Candles Set", 2, 799, "ord-012345"),
        createMockOrderItem("Throw Pillows", 3, 599, "ord-012345")
      ],
      status: "delivered" as OrderStatus,
      paymentStatus: "paid" as PaymentStatus,
      totalAmount: 3395,
      createdAt: "2025-05-02T16:20:00Z",
      updatedAt: "2025-05-04T11:15:00Z",
      shippingAddress: "333 River Lane, Hyderabad, Telangana, India"
    },
    {
      id: "ord-678901",
      buyerId: "buyer-007",
      buyerName: "David Thompson",
      sellerId: "seller-001",
      sellerName: "Fresh Farms",
      userId: "seller-001",
      items: [
        createMockOrderItem("Smart Watch", 1, 9999, "ord-678901")
      ],
      status: "pending" as OrderStatus,
      paymentStatus: "pending" as PaymentStatus,
      totalAmount: 9999,
      createdAt: "2025-05-17T10:10:00Z",
      updatedAt: "2025-05-17T10:10:00Z",
      shippingAddress: "444 Tech Park, Pune, Maharashtra, India"
    }
  ];
};
