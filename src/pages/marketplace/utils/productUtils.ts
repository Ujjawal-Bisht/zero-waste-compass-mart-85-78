
// Calculate dynamic pricing based on expiry dates
export const calculateDiscount = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Dynamic pricing algorithm
  if (daysUntilExpiry <= 3) {
    return 70; // 70% discount if about to expire in 3 days
  } else if (daysUntilExpiry <= 7) {
    return 50; // 50% discount if expiring within a week
  } else if (daysUntilExpiry <= 14) {
    return 30; // 30% discount if expiring within two weeks
  } else if (daysUntilExpiry <= 30) {
    return 15; // 15% discount if expiring within a month
  }
  return 0; // No discount for items with expiry date far away
};

// AI-driven expiry alert generator
export const getAiExpiryAlert = (daysRemaining: number): string => {
  if (daysRemaining <= 3) {
    return "Act fast! This item expires in just a few days. Perfect for immediate use.";
  } else if (daysRemaining <= 7) {
    return "Limited time offer: Use within a week for optimal quality.";
  } else if (daysRemaining <= 14) {
    return "Plan ahead: This product is best used within two weeks.";
  } else if (daysRemaining <= 30) {
    return "Good value: This product will remain fresh for about a month.";
  }
  return "";
};
