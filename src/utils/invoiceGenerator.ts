
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Order, OrderItem } from '@/types';
import { format } from 'date-fns';

/**
 * Format a number as Indian Rupees
 */
export const formatIndianRupees = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(amount);
};

/**
 * Calculate GST for an item price
 * @param price - The price of the item
 * @param gstRate - The GST rate (default: 18%)
 * @returns The GST amount
 */
export const calculateGST = (price: number, gstRate: number = 18) => {
  return (price * gstRate) / 100;
};

/**
 * Generate a PDF invoice for an order
 */
export const generateInvoicePdf = (order: Order) => {
  // Create a new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  
  // Set company info
  const companyInfo = {
    name: 'Zerowaste Mart',
    address: '123 Green Street, Eco City',
    pincode: '400001',
    state: 'Maharashtra',
    gstin: 'GSTIN: 27AADCZ1234A1ZP',
    email: 'support@zerowastemart.com',
    phone: '+91 9876543210'
  };
  
  // Current date formatting
  const currentDate = format(new Date(), 'dd/MM/yyyy');
  const invoiceNumber = `INV-${order.id.substring(0, 8).toUpperCase()}`;
  
  // Add logo (this would be a placeholder path, needs to be replaced with actual logo)
  const logoPath = '/logo.png'; // Replace with actual logo path
  doc.setFillColor(240, 248, 240); // Light green background
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setDrawColor(76, 175, 80); // Green border
  doc.setLineWidth(0.5);
  doc.rect(10, 10, pageWidth - 20, 30);
  
  // Header with company details
  doc.setFontSize(20);
  doc.setTextColor(0, 100, 0);
  doc.text('ZEROWASTE MART', pageWidth / 2, 15, { align: 'center' });
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text('(Sustainable Products Marketplace)', pageWidth / 2, 20, { align: 'center' });
  doc.text(`${companyInfo.address}, ${companyInfo.state} - ${companyInfo.pincode}`, pageWidth / 2, 25, { align: 'center' });
  doc.text(`${companyInfo.email} | ${companyInfo.phone}`, pageWidth / 2, 30, { align: 'center' });
  doc.text(companyInfo.gstin, pageWidth / 2, 35, { align: 'center' });

  // Invoice details
  doc.setLineWidth(0.1);
  doc.line(10, 45, pageWidth - 10, 45);
  doc.setFontSize(12);
  doc.text('TAX INVOICE', pageWidth / 2, 50, { align: 'center' });
  doc.line(10, 52, pageWidth - 10, 52);
  
  // Invoice number and date
  doc.setFontSize(10);
  doc.text(`Invoice Number: ${invoiceNumber}`, 15, 60);
  doc.text(`Date: ${currentDate}`, 15, 65);
  
  // Customer details  
  doc.text('Bill To:', pageWidth - 70, 60);
  doc.text(`${order.buyerName || 'Customer'}`, pageWidth - 70, 65);
  doc.text(`Order ID: ${order.id}`, pageWidth - 70, 70);
  
  // Use shippingAddress if buyerAddress is undefined
  const addressToUse = order.buyerAddress || order.shippingAddress;
  if (addressToUse) {
    doc.text(`${addressToUse}`, pageWidth - 70, 75, { maxWidth: 60 });
  }
  
  // Calculate item totals with GST
  const orderItemsWithGST = order.items.map(item => {
    const itemSubtotal = item.price * item.quantity;
    const gst = calculateGST(itemSubtotal);
    return {
      ...item,
      subtotal: itemSubtotal,
      gst: gst,
      total: itemSubtotal + gst
    };
  });
  
  // Calculate totals
  const subtotal = orderItemsWithGST.reduce((sum, item) => sum + item.subtotal, 0);
  const totalGST = orderItemsWithGST.reduce((sum, item) => sum + item.gst, 0);
  const grandTotal = subtotal + totalGST;
  
  // Table headers and data for items
  const tableColumn = ['#', 'Item', 'Qty', 'Rate', 'Subtotal', 'GST (18%)', 'Total'];
  const tableRows = orderItemsWithGST.map((item, index) => [
    (index + 1).toString(),
    item.name,
    item.quantity.toString(),
    formatIndianRupees(item.price),
    formatIndianRupees(item.subtotal),
    formatIndianRupees(item.gst),
    formatIndianRupees(item.total)
  ]);
  
  // Generate the items table
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 85,
    theme: 'striped',
    headStyles: { fillColor: [76, 175, 80], textColor: [255, 255, 255] },
    styles: { fontSize: 8, cellPadding: 2 },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 60 },
      2: { cellWidth: 15 },
      3: { cellWidth: 25 },
      4: { cellWidth: 25 },
      5: { cellWidth: 25 },
      6: { cellWidth: 25 },
    }
  });
  
  // Get the final Y position after the table
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  // Summary of totals
  doc.setFontSize(10);
  doc.text('Summary:', pageWidth - 70, finalY);
  doc.text(`Subtotal: ${formatIndianRupees(subtotal)}`, pageWidth - 70, finalY + 5);
  doc.text(`GST (18%): ${formatIndianRupees(totalGST)}`, pageWidth - 70, finalY + 10);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text(`Grand Total: ${formatIndianRupees(grandTotal)}`, pageWidth - 70, finalY + 18);
  doc.setFont(undefined, 'normal');
  
  // Payment information
  doc.setFontSize(10);
  doc.text('Payment Status:', 15, finalY);
  doc.text(`${order.paymentStatus || 'Pending'}`, 50, finalY);
  doc.text('Payment Method:', 15, finalY + 5);
  doc.text(`${order.paymentMethod || 'Online'}`, 50, finalY + 5);
  
  // Terms and conditions
  doc.setFontSize(8);
  doc.text('Terms & Conditions:', 15, finalY + 25);
  doc.text('1. All items once sold cannot be returned unless defective.', 15, finalY + 30);
  doc.text('2. This is a computer-generated invoice and does not require a signature.', 15, finalY + 35);
  
  // Final footer with stamp
  doc.setFillColor(240, 248, 240); // Light green background for stamp
  doc.circle(pageWidth - 35, finalY + 35, 15, 'F');
  doc.setTextColor(0, 100, 0);
  doc.setFontSize(6);
  doc.text('CERTIFIED BY', pageWidth - 35, finalY + 32, { align: 'center' });
  doc.setFontSize(8);
  doc.text('ZEROWASTE', pageWidth - 35, finalY + 36, { align: 'center' });
  doc.text('MART', pageWidth - 35, finalY + 40, { align: 'center' });
  
  // Save the PDF
  doc.save(`invoice-${order.id}.pdf`);
  return doc;
};
