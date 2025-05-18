
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

export const getStatusText = (status: keyof ItemStatus): string => {
  const statusText: Record<ItemStatus[keyof ItemStatus], string> = {
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
