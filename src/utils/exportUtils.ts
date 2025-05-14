
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
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            line-height: 1.6;
          }
          .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
          }
          h1 {
            color: #333;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f3f4f6;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 0.8em;
            color: #666;
          }
          @media print {
            .no-print {
              display: none;
            }
            body {
              margin: 1cm;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${title}</h1>
          <div>
            <p><strong>Date:</strong> ${currentDate}</p>
          </div>
        </div>
        ${content}
        <div class="footer">
          <p>Generated on ${new Date().toLocaleString()}</p>
        </div>
        <div class="no-print" style="text-align: center; margin-top: 20px;">
          <button onclick="window.print();" style="padding: 10px 20px; background-color: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Print Document
          </button>
          <button onclick="window.close();" style="padding: 10px 20px; margin-left: 10px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer;">
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
  const itemsList = order.items.map(item => `
    <tr>
      <td>${item.itemId}</td>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${formatCurrency(item.price)}</td>
      <td>${formatCurrency(item.price * item.quantity)}</td>
    </tr>
  `).join('');

  const invoiceContent = `
    <div style="margin-bottom: 30px;">
      <h2>Invoice #${order.id}</h2>
      <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
        <div>
          <p><strong>Bill To:</strong></p>
          <p>${order.buyerName}</p>
          <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          <p><strong>Order Status:</strong> ${order.status}</p>
        </div>
        <div>
          <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
          <p><strong>Payment Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>

    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <thead style="background-color: #f3f4f6;">
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
      <tfoot>
        <tr>
          <td colspan="4" style="text-align: right; font-weight: bold;">Subtotal:</td>
          <td>${formatCurrency(order.totalAmount)}</td>
        </tr>
        <tr>
          <td colspan="4" style="text-align: right; font-weight: bold;">Taxes:</td>
          <td>${formatCurrency(0)}</td>
        </tr>
        <tr>
          <td colspan="4" style="text-align: right; font-weight: bold;">Total:</td>
          <td style="font-weight: bold;">${formatCurrency(order.totalAmount)}</td>
        </tr>
      </tfoot>
    </table>

    <div style="margin-top: 30px;">
      <p><strong>Terms & Conditions:</strong></p>
      <p>Payment is due within 30 days. Please make checks payable to Your Company Name.</p>
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
