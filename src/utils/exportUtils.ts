
import { Order, OrderItem, Item } from '@/types';
import { format } from 'date-fns';

export const generateInvoice = (order: Order) => {
  // Mock implementation for invoice generation
  
  // Create a formatted order summary
  const orderDetails = {
    invoiceNumber: `INV-${order.id}`,
    date: format(new Date(), 'yyyy-MM-dd'),
    customerName: order.buyerName || 'Customer',
    orderItems: order.items.map(item => ({
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.quantity * item.price
    })),
    totalAmount: order.totalAmount,
    shippingAddress: order.shippingAddress || 'Not provided',
    paymentMethod: order.paymentMethod || 'Not specified'
  };
  
  console.log('Generating invoice for order:', orderDetails);
  
  // In a real app, this would generate a PDF or other document
  // Mock PDF generation - just logging to console for now
  console.log('Invoice generated successfully!');
  
  return true;
};

// Add the missing export functions
export const exportProducts = (products: Item[]) => {
  // Create a CSV string from products data
  const headers = ['ID', 'Name', 'Category', 'Price', 'Quantity', 'Status', 'Expiry Date'];
  
  const rows = products.map(product => [
    product.id,
    product.name,
    product.category,
    product.currentPrice.toString(),
    product.quantity.toString(),
    product.status,
    product.expiryDate
  ]);
  
  // Convert to CSV
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  // In a real application, this would trigger a file download
  console.log('Exporting products to CSV:', csvContent);
  
  // Mock download functionality
  downloadCSV(csvContent, 'products-export.csv');
  
  return true;
};

export const exportOrders = (orders: Order[]) => {
  // Create a CSV string from orders data
  const headers = ['Order ID', 'Date', 'Customer', 'Items', 'Total', 'Status', 'Payment Status'];
  
  const rows = orders.map(order => [
    order.id,
    format(new Date(order.createdAt), 'yyyy-MM-dd'),
    order.buyerName || order.buyerId,
    order.items.length.toString(),
    order.totalAmount.toString(),
    order.status,
    order.paymentStatus || 'unknown'
  ]);
  
  // Convert to CSV
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  // In a real application, this would trigger a file download
  console.log('Exporting orders to CSV:', csvContent);
  
  // Mock download functionality
  downloadCSV(csvContent, 'orders-export.csv');
  
  return true;
};

// Helper function to "download" CSV (mocked for this demo)
const downloadCSV = (content: string, filename: string) => {
  // In a real browser environment, this would create and trigger a download
  // But for this demo we'll just log to console
  console.log(`Downloading ${filename} with content:`, content);
  
  // In a real app, this would be:
  // const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  // const link = document.createElement('a');
  // const url = URL.createObjectURL(blob);
  // link.setAttribute('href', url);
  // link.setAttribute('download', filename);
  // link.style.visibility = 'hidden';
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);
};
