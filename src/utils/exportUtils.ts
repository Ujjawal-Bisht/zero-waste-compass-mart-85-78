
import { Order } from '@/types';
import { generateInvoicePdf } from './invoiceGenerator';

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
