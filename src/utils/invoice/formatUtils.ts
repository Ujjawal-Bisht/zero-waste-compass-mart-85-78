
/**
 * Format a number as Indian Rupees
 */
export const formatIndianRupees = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    currencyDisplay: 'code'
  }).format(amount).replace('INR', 'INR '); // Add space after symbol for better readability
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
 * Export orders to CSV format
 */
export const exportOrders = (orders: any[]): void => {
  if (!orders || orders.length === 0) {
    console.warn('No orders to export');
    return;
  }

  // Create CSV content
  const headers = ['Order ID', 'Customer', 'Date', 'Amount (INR)', 'Status', 'Payment Status'];
  
  const rows = orders.map(order => [
    order.id,
    order.buyerName,
    new Date(order.createdAt).toLocaleDateString(),
    order.totalAmount.toFixed(2),
    order.status,
    order.paymentStatus
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  // Create a blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `orders-export-${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
