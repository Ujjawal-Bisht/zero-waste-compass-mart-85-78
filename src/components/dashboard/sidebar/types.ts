
import { ReactNode } from 'react';

export interface NavItemType {
  label: string;
  path: string;
  icon: ReactNode;
  highlight?: boolean;
  description?: string;
}

export interface MenuSection {
  title: string;
  items: NavItemType[];
}

export interface NavigationProps {
  isSeller: boolean;
  onItemClick?: () => void;
}
