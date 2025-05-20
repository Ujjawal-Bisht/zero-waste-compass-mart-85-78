
import { ReactNode } from 'react';

export interface NavItemType {
  path: string;
  icon: ReactNode;
  label: string;
  highlight?: boolean;
}

export interface MenuSection {
  title: string;
  items: NavItemType[];
}

export interface NavigationProps {
  isSeller?: boolean;
  onItemClick?: () => void;
}
