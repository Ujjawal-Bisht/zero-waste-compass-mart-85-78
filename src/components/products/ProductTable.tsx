
import React from 'react';
import { Item } from '@/types';
import ProductsTable from './table/ProductsTable';

interface ProductTableProps {
  products: Item[];
  getCategoryBadgeColor: (category: string) => string;
  getStatusBadgeColor: (status: string) => string;
  formatDate: (dateString: string) => string;
  handleAddProduct: () => void;
}

const ProductTable: React.FC<ProductTableProps> = (props) => {
  return <ProductsTable {...props} />;
};

export default ProductTable;
