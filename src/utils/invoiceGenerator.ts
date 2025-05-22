
import { Order, OrderItem } from "@/types";
import { format } from "date-fns";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Leaf } from "lucide-react";

// Extend jsPDF with autotable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

// GST rate based on item category (simplified example)
const getGstRate = (itemCategory?: string): number => {
  // Default GST rate is 18%
  // In a real app, you would have a more comprehensive mapping based on HSN codes
  switch (itemCategory?.toLowerCase()) {
    case 'food':
    case 'groceries':
      return 5; // 5% for essential food items
    case 'books':
    case 'educational':
      return 12; // 12% for educational items
    case 'electronics':
    case 'appliances':
      return 28; // 28% for luxury items
    default:
      return 18; // 18% standard rate
  }
};

// Format amount in Indian Rupees
export const formatIndianRupees = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
};

// Calculate GST for an item
export const calculateItemGst = (item: OrderItem): { cgst: number, sgst: number, total: number } => {
  const basePrice = (item.price * item.quantity);
  const gstRate = getGstRate(item.category);
  const gstAmount = (basePrice * gstRate) / 100;
  
  return {
    cgst: gstAmount / 2, // Central GST (half of total GST)
    sgst: gstAmount / 2, // State GST (half of total GST)
    total: gstAmount
  };
};

// Generate and download invoice as PDF
export const generateInvoicePdf = (order: Order): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  
  // Company details
  const companyName = "Zero Waste Mart";
  const companyAddress = "123 Eco Street, Green City, India";
  const companyGstin = "27AADCZ1234A1ZX";
  const companyPhone = "+91 98765 43210";
  const companyEmail = "info@zerowaste.mart";

  // Add company logo (using a simple leaf character as placeholder)
  doc.setFontSize(24);
  doc.setTextColor(34, 139, 34); // Forest green color
  doc.text("🍃", 20, 20);
  
  // Company name
  doc.setFontSize(18);
  doc.text(companyName, 35, 20);
  
  // Company details
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(companyAddress, 35, 27);
  doc.text(`GSTIN: ${companyGstin}`, 35, 32);
  doc.text(`Tel: ${companyPhone} | Email: ${companyEmail}`, 35, 37);
  
  // Invoice header
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("TAX INVOICE", pageWidth / 2, 50, { align: "center" });
  
  // Invoice details
  doc.setFontSize(11);
  doc.text(`Invoice Number: INV-${order.id}`, 20, 60);
  doc.text(`Date: ${format(new Date(order.createdAt), 'dd-MM-yyyy')}`, 20, 65);
  doc.text("Payment: " + (order.paymentStatus || "Not specified"), 20, 70);
  
  // Customer details
  doc.text("Bill To:", pageWidth - 80, 60);
  doc.text(order.buyerName || "Customer", pageWidth - 80, 65);
  doc.text(order.shippingAddress || "Address not provided", pageWidth - 80, 70, {
    maxWidth: 70,
  });
  
  // Line separator
  doc.setLineWidth(0.5);
  doc.line(20, 75, pageWidth - 20, 75);
  
  // Order items table
  const tableColumns = ["SN", "Item", "Qty", "Unit Price", "CGST", "SGST", "Amount"];
  
  // Calculate all items with GST
  const tableRows = order.items.map((item, index) => {
    const gst = calculateItemGst(item);
    const basePrice = item.price * item.quantity;
    const totalPrice = basePrice + gst.total;
    
    return [
      index + 1,
      item.name,
      item.quantity,
      formatIndianRupees(item.price),
      formatIndianRupees(gst.cgst),
      formatIndianRupees(gst.sgst),
      formatIndianRupees(totalPrice)
    ];
  });
  
  // Add the table
  doc.autoTable({
    startY: 80,
    head: [tableColumns],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [34, 139, 34], textColor: 255 },
    margin: { left: 20, right: 20 },
  });
  
  // Calculate totals
  let subtotal = 0;
  let totalCGST = 0;
  let totalSGST = 0;
  
  order.items.forEach(item => {
    const itemTotal = item.price * item.quantity;
    const gst = calculateItemGst(item);
    
    subtotal += itemTotal;
    totalCGST += gst.cgst;
    totalSGST += gst.sgst;
  });
  
  const grandTotal = subtotal + totalCGST + totalSGST;
  
  // Table end position
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  // Summary section
  doc.text("Summary:", 20, finalY);
  doc.text(`Subtotal: ${formatIndianRupees(subtotal)}`, 20, finalY + 7);
  doc.text(`CGST: ${formatIndianRupees(totalCGST)}`, 20, finalY + 14);
  doc.text(`SGST: ${formatIndianRupees(totalSGST)}`, 20, finalY + 21);
  
  // Grand total with bold formatting
  doc.setFont(undefined, 'bold');
  doc.text(`Grand Total: ${formatIndianRupees(grandTotal)}`, 20, finalY + 30);
  doc.setFont(undefined, 'normal');
  
  // Terms and conditions
  doc.setFontSize(9);
  doc.text("Terms & Conditions:", 20, finalY + 40);
  doc.text("1. Goods once sold will not be taken back or exchanged.", 20, finalY + 46);
  doc.text("2. All disputes are subject to local jurisdiction only.", 20, finalY + 51);
  
  // Company stamp
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(pageWidth - 80, finalY, 60, 40, 3, 3, 'F');
  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);
  doc.text("Certified by", pageWidth - 60, finalY + 10, { align: "center" });
  doc.setFontSize(12);
  doc.setTextColor(34, 139, 34);
  doc.text("Zero Waste Mart", pageWidth - 60, finalY + 20, { align: "center" });
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text("Authorized Signature", pageWidth - 60, finalY + 35, { align: "center" });
  
  // Save the PDF
  doc.save(`invoice-${order.id}.pdf`);
};
