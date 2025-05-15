
import { Item } from '@/types';

export interface MenuItemProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  className?: string;
}

export interface CategoryMenuProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export interface ActionMenuProps {
  product: Item;
}
