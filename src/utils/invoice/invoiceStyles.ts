
import { jsPDF } from 'jspdf';

/**
 * Set up header section styling with light purple background
 */
export const setupHeaderStyle = (doc: jsPDF, pageWidth: number) => {
  // Header section with light purple background
  doc.setFillColor(148, 87, 235, 0.1);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  // Logo circle
  doc.setFillColor(148, 87, 235);
  doc.circle(20, 20, 10, 'F');
  
  // Add logo content
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text('ZWM', 20, 20, { align: 'center' });
};

/**
 * Apply company header styling
 */
export const setupCompanyHeader = (doc: jsPDF, companyName: string, invoiceNumber: string, date: string, pageWidth: number) => {
  // Company name and invoice header
  doc.setTextColor(148, 87, 235);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(companyName, 35, 15);
  
  doc.setFontSize(14);
  doc.text('INVOICE', 35, 23);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(invoiceNumber, 35, 30);
  
  // Date on the right
  doc.setFontSize(10);
  doc.text(`Date: ${date}`, pageWidth - 15, 15, { align: 'right' });
};

/**
 * Style for customer and payment info section
 */
export const setupCustomerInfo = (doc: jsPDF, customerName: string, shippingAddress: string, paymentMethod: string, pageWidth: number) => {
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text(`Customer: ${customerName || 'Customer'}`, 15, 50);
  doc.text(`Shipping Address: ${shippingAddress || 'Not specified'}`, 15, 57);
  
  doc.text(`Payment Method: ${paymentMethod || 'Online Payment'}`, pageWidth - 15, 50, { align: 'right' });
};

/**
 * Style for GST information box
 */
export const addGSTInfoBox = (doc: jsPDF, gstInfo: { gstin: string, hsn: string, state: string }, finalY: number) => {
  // GST Information box
  doc.setFillColor(245, 245, 255);
  doc.rect(15, finalY + 40, 95, 35, 'F');
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(148, 87, 235);
  doc.text('GST Information', 20, finalY + 50);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text(`GSTIN: ${gstInfo.gstin}`, 20, finalY + 57);
  doc.text(`HSN Code: ${gstInfo.hsn}`, 20, finalY + 63);
  doc.text(`Place of Supply: ${gstInfo.state}`, 20, finalY + 69);
};

/**
 * Add Zero Waste Certified stamp
 */
export const addZeroWasteCertifiedStamp = (doc: jsPDF, finalY: number, pageWidth: number) => {
  // Stamp border
  doc.setDrawColor(75, 181, 67);
  doc.setLineWidth(1.5);
  doc.roundedRect(pageWidth - 95, finalY + 45, 80, 25, 4, 4, 'S');
  
  // Stamp text
  doc.setTextColor(75, 181, 67);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('ZERO WASTE CERTIFIED', pageWidth - 55, finalY + 60, { align: 'center' });
};

/**
 * Add footer text to invoice
 */
export const addFooterText = (doc: jsPDF, finalY: number, pageWidth: number) => {
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Thank you for your business! Your contribution helps reduce waste.', pageWidth / 2, finalY + 85, { align: 'center' });
  doc.text('Payment made in India - All prices are inclusive of GST', pageWidth / 2, finalY + 90, { align: 'center' });
  doc.text('For any queries related to this invoice, please contact support@zerowastemart.com', pageWidth / 2, finalY + 95, { align: 'center' });
};
