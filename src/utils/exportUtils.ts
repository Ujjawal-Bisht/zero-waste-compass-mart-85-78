
import { Order, OrderItem, Item } from '@/types';
import { format } from 'date-fns';
import { generateInvoicePdf, formatIndianRupees } from './invoiceGenerator';

export const generateInvoice = (order: Order) => {
  try {
    // Use our enhanced PDF invoice generator
    generateInvoicePdf(order);
    console.log('Invoice generated successfully!');
    return true;
  } catch (error) {
    console.error('Error generating invoice:', error);
    return false;
  }
};

// Add the missing export functions
export const exportProducts = (products: Item[]) => {
  // Create a CSV string from products data
  const headers = ['ID', 'Name', 'Category', 'Price', 'Quantity', 'Status', 'Expiry Date'];
  
  const rows = products.map(product => [
    product.id,
    product.name,
    product.category,
    formatIndianRupees(product.currentPrice),
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
    formatIndianRupees(order.totalAmount),
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
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
