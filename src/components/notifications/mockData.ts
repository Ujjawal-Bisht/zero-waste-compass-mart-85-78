
import { Notification } from './types';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Item Request',
    message: 'Sarah has requested your canned vegetables item.',
    time: '10 minutes ago',
    read: false,
    type: 'info',
  },
  {
    id: '2',
    title: 'Donation Confirmed',
    message: 'Your winter jacket was successfully donated to the local shelter!',
    time: '2 hours ago',
    read: false,
    type: 'success',
  },
  {
    id: '3',
    title: 'Item Expiring Soon',
    message: 'Your bread item will expire in 2 days. Consider donating it soon!',
    time: '1 day ago',
    read: true,
    type: 'warning',
  },
  {
    id: '4',
    title: 'Trust Score Updated',
    message: 'Your trust score has increased to 4.5! Keep up the good work.',
    time: '2 days ago',
    read: true,
    type: 'success',
  },
];
