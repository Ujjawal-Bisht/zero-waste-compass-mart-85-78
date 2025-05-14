
import { Item, Order } from '@/types';

// Format currency for display
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
};

// Generate table HTML for products
export const generateProductsTable = (products: Item[]): string => {
  return `
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <thead style="background-color: #f3f4f6;">
        <tr>
          <th>ID</th>
          <th>Product Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${products.map(product => `
          <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${formatCurrency(product.currentPrice || 0)}</td>
            <td>${product.quantity || 0}</td>
            <td>${product.status}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
};

// Generate table HTML for orders
export const generateOrdersTable = (orders: Order[]): string => {
  return `
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <thead style="background-color: #f3f4f6;">
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Payment Status</th>
        </tr>
      </thead>
      <tbody>
        ${orders.map(order => `
          <tr>
            <td>${order.id}</td>
            <td>${order.buyerName}</td>
            <td>${new Date(order.createdAt).toLocaleDateString()}</td>
            <td>${formatCurrency(order.totalAmount)}</td>
            <td>${order.status}</td>
            <td>${order.paymentStatus}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
};

// Function to print a specific content
export const printContent = (title: string, content: string): void => {
  const printWindow = window.open('', '_blank');
  
  if (printWindow) {
    const currentDate = new Date().toLocaleDateString();
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap');
          
          body {
            font-family: 'Poppins', sans-serif;
            margin: 20px;
            line-height: 1.6;
            color: #333;
          }
          .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
          }
          .branding {
            display: flex;
            align-items: center;
            gap: 15px;
          }
          .logo {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(to right, #3b82f6, #8b5cf6);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            font-weight: bold;
          }
          .company-info {
            display: flex;
            flex-direction: column;
          }
          h1 {
            font-family: 'Montserrat', sans-serif;
            color: #333;
            margin-bottom: 20px;
            font-weight: 700;
          }
          h2 {
            font-family: 'Montserrat', sans-serif;
            color: #4f46e5;
            margin-bottom: 15px;
            font-weight: 600;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          }
          th, td {
            border: 1px solid #eee;
            padding: 12px;
            text-align: left;
          }
          th {
            background-color: #f8fafc;
            font-weight: 600;
            color: #4b5563;
            font-family: 'Montserrat', sans-serif;
          }
          tr:nth-child(even) {
            background-color: #f9fafb;
          }
          tr:hover {
            background-color: #f3f4f6;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 0.85em;
            color: #6b7280;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
          .document-type {
            font-family: 'Montserrat', sans-serif;
            font-size: 0.8em;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #6b7280;
            margin-bottom: 5px;
          }
          .info-box {
            background-color: #f9fafb;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
            border-left: 4px solid #4f46e5;
          }
          .status-badge {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 500;
            text-transform: uppercase;
          }
          .status-pending {
            background-color: #fff7ed;
            color: #c2410c;
          }
          .status-shipped {
            background-color: #f0f9ff;
            color: #0369a1;
          }
          .status-delivered {
            background-color: #f0fdf4;
            color: #16a34a;
          }
          .status-cancelled {
            background-color: #fef2f2;
            color: #dc2626;
          }
          .payment-paid {
            background-color: #f0fdf4;
            color: #16a34a;
          }
          .payment-pending {
            background-color: #fff7ed;
            color: #c2410c;
          }
          .payment-failed {
            background-color: #fef2f2;
            color: #dc2626;
          }
          .amount-section {
            font-family: 'Montserrat', sans-serif;
          }
          .amount-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #f3f4f6;
          }
          .amount-total {
            font-size: 1.1rem;
            font-weight: 700;
            color: #111827;
            padding: 10px 0;
            border-top: 2px solid #e5e7eb;
          }
          @media print {
            .no-print {
              display: none;
            }
            body {
              margin: 1cm;
            }
            .shadow {
              box-shadow: none !important;
            }
            .info-box {
              border: 1px solid #e5e7eb;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="branding">
            <div class="logo">ZWM</div>
            <div class="company-info">
              <h1>Zero Waste Mart</h1>
              <p>Your trusted marketplace for sustainable products</p>
            </div>
          </div>
          <div>
            <p class="document-type">${title}</p>
            <p><strong>Date:</strong> ${currentDate}</p>
          </div>
        </div>
        ${content}
        <div class="footer">
          <p>Thank you for shopping with Zero Waste Mart</p>
          <p>Generated on ${new Date().toLocaleString()}</p>
        </div>
        <div class="no-print" style="text-align: center; margin-top: 20px;">
          <button onclick="window.print();" style="padding: 10px 20px; background-color: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer; font-family: 'Poppins', sans-serif;">
            Print Document
          </button>
          <button onclick="window.close();" style="padding: 10px 20px; margin-left: 10px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer; font-family: 'Poppins', sans-serif;">
            Close
          </button>
        </div>
      </body>
      </html>
    `);
    
    printWindow.document.close();
  } else {
    console.error('Could not open print window. Please check if pop-ups are blocked.');
  }
};

// Function to generate and print an invoice for a specific order
export const generateInvoice = (order: Order): void => {
  const getStatusBadge = (status: string) => {
    const statusClasses: Record<string, string> = {
      pending: 'status-pending',
      processing: 'status-processing',
      shipped: 'status-shipped',
      delivered: 'status-delivered',
      cancelled: 'status-cancelled',
    };
    return statusClasses[status] || '';
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusClasses: Record<string, string> = {
      pending: 'payment-pending',
      paid: 'payment-paid',
      failed: 'payment-failed',
    };
    return statusClasses[status] || '';
  };

  const itemsList = order.items.map(item => `
    <tr>
      <td>${item.itemId}</td>
      <td>${item.name || 'Product'}</td>
      <td>${item.quantity}</td>
      <td>${formatCurrency(item.price)}</td>
      <td>${formatCurrency(item.price * item.quantity)}</td>
    </tr>
  `).join('');

  const invoiceContent = `
    <div class="info-box" style="margin-bottom: 30px;">
      <h2>Invoice #${order.id}</h2>
      <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
        <div>
          <p><strong>Bill To:</strong></p>
          <p>${order.buyerName || 'Customer'}</p>
          <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
        <div>
          <p>
            <strong>Status: </strong> 
            <span class="status-badge ${getStatusBadge(order.status)}">
              ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </p>
          <p>
            <strong>Payment: </strong>
            <span class="status-badge ${getPaymentStatusBadge(order.paymentStatus)}">
              ${order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
            </span>
          </p>
          <p><strong>Payment Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Item ID</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        ${itemsList}
      </tbody>
    </table>

    <div class="amount-section" style="width: 300px; margin-left: auto;">
      <div class="amount-row">
        <span>Subtotal:</span>
        <span>${formatCurrency(order.totalAmount)}</span>
      </div>
      <div class="amount-row">
        <span>Taxes:</span>
        <span>${formatCurrency(0)}</span>
      </div>
      <div class="amount-row">
        <span>Shipping:</span>
        <span>${formatCurrency(0)}</span>
      </div>
      <div class="amount-row amount-total">
        <span>Total:</span>
        <span>${formatCurrency(order.totalAmount)}</span>
      </div>
    </div>

    <div style="margin-top: 40px;">
      <h3>Terms & Conditions</h3>
      <p>Payment is due within 30 days. Please make checks payable to Zero Waste Mart.</p>
      <p>For questions concerning this invoice, please contact customer support.</p>
    </div>
  `;

  printContent(`Invoice - ${order.id}`, invoiceContent);
};

// Function to export products list
export const exportProducts = (products: Item[]): void => {
  const content = generateProductsTable(products);
  printContent('Products List', content);
};

// Function to export orders list
export const exportOrders = (orders: Order[]): void => {
  const content = generateOrdersTable(orders);
  printContent('Orders List', content);
};
