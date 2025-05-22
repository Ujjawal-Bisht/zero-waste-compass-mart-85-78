
import { Order, Item } from '@/types';
import { generateInvoicePdf } from './invoiceGenerator';
import { formatIndianRupees } from './invoice/formatUtils';

/**
 * Generate an invoice for an order
 * @param order - The order to generate an invoice for
 * @returns boolean - Whether the invoice was successfully generated
 */
export const generateInvoice = (order: Order): boolean => {
  try {
    // Check if the order status allows for invoice generation
    if (order.status !== 'out-for-delivery' && order.status !== 'delivered') {
      console.error('Cannot generate invoice: order status must be out-for-delivery or delivered');
      return false;
    }
    
    // Generate the invoice using the PDF generator
    generateInvoicePdf(order);
    return true;
  } catch (error) {
    console.error('Error generating invoice:', error);
    return false;
  }
};

/**
 * Export products data to CSV file
 * @param products - Array of products to export
 * @returns boolean - Whether the export was successful
 */
export const exportProducts = (products: Item[]): boolean => {
  try {
    if (!products || products.length === 0) {
      console.error('No products to export');
      return false;
    }

    // Create CSV header row
    const headers = ['ID', 'Name', 'Category', 'Status', 'Quantity', 'Price', 'Original Price', 'Expiry Date'];
    
    // Create CSV data rows from products
    const rows = products.map(product => [
      product.id,
      product.name,
      product.category,
      product.status,
      product.quantity.toString(),
      formatIndianRupees(product.currentPrice).replace('₹', ''),
      formatIndianRupees(product.originalPrice).replace('₹', ''),
      product.expiryDate ? new Date(product.expiryDate).toLocaleDateString() : 'N/A'
    ]);
    
    // Combine header and data rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Set up link for download
    link.setAttribute('href', url);
    link.setAttribute('download', `products_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    // Add to document, click to download, then clean up
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
  } catch (error) {
    console.error('Error exporting products:', error);
    return false;
  }
};

/**
 * Export orders data to CSV file
 * @param orders - Array of orders to export
 * @returns boolean - Whether the export was successful
 */
export const exportOrders = (orders: Order[]): boolean => {
  try {
    if (!orders || orders.length === 0) {
      console.error('No orders to export');
      return false;
    }

    // Create CSV header row
    const headers = ['Order ID', 'Buyer Name', 'Date', 'Status', 'Payment Status', 'Items', 'Total Amount'];
    
    // Create CSV data rows from orders
    const rows = orders.map(order => [
      order.id,
      order.buyerName || 'Unknown',
      new Date(order.createdAt).toLocaleDateString(),
      order.status,
      order.paymentStatus,
      order.items.length.toString(),
      formatIndianRupees(order.totalAmount).replace('₹', '')
    ]);
    
    // Combine header and data rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Set up link for download
    link.setAttribute('href', url);
    link.setAttribute('download', `orders_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    // Add to document, click to download, then clean up
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
  } catch (error) {
    console.error('Error exporting orders:', error);
    return false;
  }
};
