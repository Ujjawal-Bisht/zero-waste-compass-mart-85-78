
/**
 * Format a number as Indian Rupees
 */
export const formatIndianRupees = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    // Use INR symbol instead of ₹ for better readability
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
