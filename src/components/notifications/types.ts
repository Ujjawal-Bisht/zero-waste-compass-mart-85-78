
export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: NotificationType;
  icon?: string; // Optional icon for the notification
  action?: {
    label: string;
    url: string;
  }; // Optional action for the notification
}
