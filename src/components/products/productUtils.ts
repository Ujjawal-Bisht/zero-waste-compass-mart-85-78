
import { ItemCategory } from '@/types';

export const getCategoryBadgeColor = (category: ItemCategory) => {
  const colors: Record<ItemCategory, string> = {
    food: 'bg-green-100 text-green-800',
    clothing: 'bg-blue-100 text-blue-800',
    electronics: 'bg-purple-100 text-purple-800',
    furniture: 'bg-amber-100 text-amber-800',
    household: 'bg-cyan-100 text-cyan-800',
    books: 'bg-indigo-100 text-indigo-800',
    toys: 'bg-pink-100 text-pink-800',
    medicine: 'bg-red-100 text-red-800',
    other: 'bg-gray-100 text-gray-800',
  };
  return colors[category];
};

export const getStatusBadgeColor = (status: string) => {
  const colors: Record<string, string> = {
    available: 'bg-green-100 text-green-800',
    donated: 'bg-blue-100 text-blue-800',
    expired: 'bg-red-100 text-red-800',
    flagged: 'bg-amber-100 text-amber-800',
    sold: 'bg-purple-100 text-purple-800',
  };
  return colors[status];
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};
