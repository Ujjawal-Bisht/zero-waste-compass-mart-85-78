
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Order, OrderItem } from '@/types';
import { format } from 'date-fns';

/**
 * Format a number as Indian Rupees
 */
export const formatIndianRupees = (amount: number): string => {
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
export const calculateGST = (price: number, gstRate: number = 18): number => {
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
    name: 'ZERO WASTE MART',
    address: '123 Green Street, Eco City',
    pincode: '400001',
    state: 'Karnataka',
    gstin: '29AADCB2230M1ZT',
    hsn: '9973',
    email: 'support@zerowastemart.com',
    phone: '+91 9876543210'
  };
  
  // Current date formatting
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const invoiceNumber = `INV-${order.id.substring(0, 8).toUpperCase()}`;
  
  // Header section with light purple background
  doc.setFillColor(148, 87, 235, 0.1);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  // Add logo and header
  // Logo circle
  doc.setFillColor(148, 87, 235);
  doc.circle(20, 20, 10, 'F');
  
  // Add logo content
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text('ZWM', 20, 20, { align: 'center' });
  
  // Company name and invoice header
  doc.setTextColor(148, 87, 235);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(companyInfo.name, 35, 15);
  
  doc.setFontSize(14);
  doc.text('INVOICE', 35, 23);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(invoiceNumber, 35, 30);
  
  // Date on the right
  doc.setFontSize(10);
  doc.text(`Date: ${currentDate}`, pageWidth - 15, 15, { align: 'right' });
  
  // Customer and payment info
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text(`Customer: ${order.buyerName || 'Customer'}`, 15, 50);
  doc.text(`Shipping Address: ${order.shippingAddress || 'Not specified'}`, 15, 57);
  
  doc.text(`Payment Method: ${order.paymentMethod || 'Online Payment'}`, pageWidth - 15, 50, { align: 'right' });
  
  // Table headers for items - improved alignment
  const tableColumn = ['Item', 'Quantity', 'Unit Price', 'Total'];
  const tableRows = order.items.map(item => [
    item.name,
    item.quantity.toString(),
    formatIndianRupees(item.price),
    formatIndianRupees(item.quantity * item.price)
  ]);
  
  // Generate the items table with improved alignment
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 65,
    theme: 'grid',
    headStyles: { 
      fillColor: [148, 87, 235], 
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'left',
    },
    styles: { 
      fontSize: 10,
      cellPadding: 5,
      font: 'helvetica',
      lineColor: [200, 200, 200],
      overflow: 'linebreak',
    },
    columnStyles: {
      0: { cellWidth: 'auto', halign: 'left' },
      1: { cellWidth: 40, halign: 'center' },
      2: { cellWidth: 60, halign: 'right' },
      3: { cellWidth: 60, halign: 'right' },
    },
    alternateRowStyles: {
      fillColor: [248, 248, 255]
    },
    margin: { left: 15, right: 15, top: 10, bottom: 10 },
    didDrawPage: (data) => {
      // Reset margins on each page
      data.settings.margin = { left: 15, right: 15, top: 10, bottom: 10 };
    }
  });
  
  // Get the final Y position after the table
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  // Calculate GST values
  const subtotalBeforeTax = order.totalAmount / 1.18; // Remove 18% GST
  const cgst = subtotalBeforeTax * 0.09; // 9% CGST
  const sgst = subtotalBeforeTax * 0.09; // 9% SGST
  const totalGST = cgst + sgst;
  
  // Pricing summary - improve number formatting and alignment
  const summaryX = pageWidth - 110; // Start position for summary section
  const valueX = pageWidth - 15;   // Position for values
  
  doc.setFontSize(10);
  doc.text('Subtotal (before tax):', summaryX, finalY, { align: 'left' });
  doc.text(formatIndianRupees(subtotalBeforeTax), valueX, finalY, { align: 'right' });
  
  doc.text('CGST (9%):', summaryX, finalY + 7, { align: 'left' });
  doc.text(formatIndianRupees(cgst), valueX, finalY + 7, { align: 'right' });
  
  doc.text('SGST (9%):', summaryX, finalY + 14, { align: 'left' });
  doc.text(formatIndianRupees(sgst), valueX, finalY + 14, { align: 'right' });
  
  doc.setLineWidth(0.5);
  doc.line(summaryX, finalY + 17, valueX, finalY + 17);
  
  doc.text('Total GST (18%):', summaryX, finalY + 23, { align: 'left' });
  doc.text(formatIndianRupees(totalGST), valueX, finalY + 23, { align: 'right' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(148, 87, 235);
  doc.text('Total Amount (inc. GST):', summaryX, finalY + 33, { align: 'left' });
  doc.text(formatIndianRupees(order.totalAmount), valueX, finalY + 33, { align: 'right' });
  
  // GST Information box - improved layout
  doc.setFillColor(245, 245, 255);
  doc.rect(15, finalY + 40, 95, 35, 'F');
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(148, 87, 235);
  doc.text('GST Information', 20, finalY + 50);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text(`GSTIN: ${companyInfo.gstin}`, 20, finalY + 57);
  doc.text(`HSN Code: ${companyInfo.hsn}`, 20, finalY + 63);
  doc.text(`Place of Supply: ${companyInfo.state}`, 20, finalY + 69);
  
  // Zero Waste Certified stamp - improved visibility
  // Stamp border
  doc.setDrawColor(75, 181, 67);
  doc.setLineWidth(1.5);
  doc.roundedRect(pageWidth - 95, finalY + 45, 80, 25, 4, 4, 'S');
  
  // Stamp text
  doc.setTextColor(75, 181, 67);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('ZERO WASTE CERTIFIED', pageWidth - 55, finalY + 60, { align: 'center' });
  
  // Footer text - improved alignment and spacing
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Thank you for your business! Your contribution helps reduce waste.', pageWidth / 2, finalY + 85, { align: 'center' });
  doc.text('Payment made in India - All prices are inclusive of GST', pageWidth / 2, finalY + 90, { align: 'center' });
  doc.text('For any queries related to this invoice, please contact support@zerowastemart.com', pageWidth / 2, finalY + 95, { align: 'center' });
  
  // Save the PDF
  doc.save(`invoice-${order.id}.pdf`);
  return doc;
};
