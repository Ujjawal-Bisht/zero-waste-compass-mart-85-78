
import React, { useState, useEffect } from 'react';
import { Item } from '@/types';
import TableHeader from './TableHeader';
import TableColumnHeader from './TableColumnHeader';
import ProductsTableBody from './ProductsTableBody';
import TablePagination from './TablePagination';

interface ProductsTableProps {
  products: Item[];
  getCategoryBadgeColor: (category: string) => string;
  getStatusBadgeColor: (status: string) => string;
  formatDate: (dateString: string) => string;
  handleAddProduct: () => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ 
  products: initialProducts, 
  getCategoryBadgeColor, 
  getStatusBadgeColor, 
  formatDate,
  handleAddProduct
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [products, setProducts] = useState(initialProducts);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Sort and filter products
  const handleSortChange = (field: string) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Reset sorting and filtering
  const handleRefresh = () => {
    setIsRefreshing(true);
    setSearchTerm('');
    setSortField(null);
    setProducts(initialProducts);
    
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // Apply search and sorting
  useEffect(() => {
    let result = [...initialProducts];
    
    // Apply search
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortField) {
      result.sort((a, b) => {
        let valueA: any;
        let valueB: any;
        
        switch(sortField) {
          case 'name':
            valueA = a.name.toLowerCase();
            valueB = b.name.toLowerCase();
            break;
          case 'category':
            valueA = a.category.toLowerCase();
            valueB = b.category.toLowerCase();
            break;
          case 'price':
            valueA = a.currentPrice;
            valueB = b.currentPrice;
            break;
          case 'quantity':
            valueA = a.quantity;
            valueB = b.quantity;
            break;
          case 'expiry':
            valueA = new Date(a.expiryDate).getTime();
            valueB = new Date(b.expiryDate).getTime();
            break;
          case 'status':
            valueA = a.status.toLowerCase();
            valueB = b.status.toLowerCase();
            break;
          default:
            valueA = a[sortField as keyof Item];
            valueB = b[sortField as keyof Item];
        }
        
        if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    setProducts(result);
  }, [initialProducts, searchTerm, sortField, sortDirection]);

  return (
    <div className="space-y-4">
      {/* Search and filter controls */}
      <TableHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isRefreshing={isRefreshing}
        handleRefresh={handleRefresh}
      />
      
      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <TableColumnHeader
                  label="Product"
                  field="name"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  handleSortChange={handleSortChange}
                />
                <TableColumnHeader
                  label="Category"
                  field="category"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  handleSortChange={handleSortChange}
                />
                <TableColumnHeader
                  label="Price"
                  field="price"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  handleSortChange={handleSortChange}
                />
                <TableColumnHeader
                  label="Qty"
                  field="quantity"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  handleSortChange={handleSortChange}
                />
                <TableColumnHeader
                  label="Expiry"
                  field="expiry"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  handleSortChange={handleSortChange}
                />
                <TableColumnHeader
                  label="Status"
                  field="status"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  handleSortChange={handleSortChange}
                />
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <ProductsTableBody 
              products={products}
              getCategoryBadgeColor={getCategoryBadgeColor}
              getStatusBadgeColor={getStatusBadgeColor}
              formatDate={formatDate}
              handleAddProduct={handleAddProduct}
            />
          </table>
        </div>
        <TablePagination totalItems={products.length} />
      </div>
    </div>
  );
};

export default ProductsTable;
