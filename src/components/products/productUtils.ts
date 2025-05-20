
import { Item, ItemStatus } from "@/types";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    available: 'bg-green-500',
    sold: 'bg-blue-500',
    expired: 'bg-red-500',
    donated: 'bg-purple-500',
    flagged: 'bg-yellow-500',
    reserved: 'bg-orange-500'
  };

  return statusColors[status.toLowerCase()] || 'bg-gray-500';
};

export const getStatusText = (status: ItemStatus): string => {
  const statusText: Record<ItemStatus, string> = {
    available: 'Available',
    sold: 'Sold',
    expired: 'Expired',
    donated: 'Donated',
    flagged: 'Flagged',
    reserved: 'Reserved'
  };
  
  return statusText[status] || 'Unknown';
};

export const filterItems = (items: Item[], filter: string): Item[] => {
  if (filter === 'all') return items;
  return items.filter(item => item.status === filter);
};

export const calculateExpiryStatus = (expiryDate: string): { color: string; text: string } => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));
  
  if (daysUntilExpiry < 0) {
    return { color: 'text-red-500', text: 'Expired' };
  }
  if (daysUntilExpiry <= 3) {
    return { color: 'text-orange-500', text: `Expires in ${daysUntilExpiry} day${daysUntilExpiry !== 1 ? 's' : ''}` };
  }
  if (daysUntilExpiry <= 7) {
    return { color: 'text-yellow-500', text: `Expires in ${daysUntilExpiry} days` };
  }
  return { color: 'text-green-500', text: `Expires in ${daysUntilExpiry} days` };
};

// Add the missing getCategoryBadgeColor function
export const getCategoryBadgeColor = (category: string): string => {
  const categoryColors: Record<string, string> = {
    food: 'bg-green-100 text-green-800 border-green-300',
    clothing: 'bg-blue-100 text-blue-800 border-blue-300',
    electronics: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    furniture: 'bg-purple-100 text-purple-800 border-purple-300',
    household: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    books: 'bg-amber-100 text-amber-800 border-amber-300',
    toys: 'bg-pink-100 text-pink-800 border-pink-300',
    medicine: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    other: 'bg-gray-100 text-gray-800 border-gray-300'
  };

  return categoryColors[category.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-300';
};

// Add the missing getStatusBadgeColor function for consistency with imports in Products.tsx
export const getStatusBadgeColor = (status: string): string => {
  const statusBadgeColors: Record<string, string> = {
    available: 'bg-green-100 text-green-800 border-green-300',
    sold: 'bg-blue-100 text-blue-800 border-blue-300',
    expired: 'bg-red-100 text-red-800 border-red-300',
    donated: 'bg-purple-100 text-purple-800 border-purple-300',
    flagged: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    reserved: 'bg-orange-100 text-orange-800 border-orange-300'
  };

  return statusBadgeColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-300';
};
