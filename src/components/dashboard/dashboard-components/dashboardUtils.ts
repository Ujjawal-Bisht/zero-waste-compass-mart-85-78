
import { ItemStatus } from '@/types';

export const getStatusClass = (status: ItemStatus) => {
  switch (status) {
    case 'available': return 'zwm-status-available';
    case 'donated': return 'zwm-status-donated';
    case 'expired': return 'zwm-status-expired';
    case 'flagged': return 'zwm-status-pending';
    default: return '';
  }
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getCategoryText = (category: string) => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};
