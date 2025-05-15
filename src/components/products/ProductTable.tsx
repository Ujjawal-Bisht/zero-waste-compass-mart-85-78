
import React, { useState } from 'react';
import { Item } from '@/types';
import { motion } from 'framer-motion';
import { Package, Search, Filter, SortAsc, SortDesc, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductRow from './ProductRow';

interface ProductTableProps {
  products: Item[];
  getCategoryBadgeColor: (category: string) => string;
  getStatusBadgeColor: (status: string) => string;
  formatDate: (dateString: string) => string;
  handleAddProduct: () => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ 
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
  React.useEffect(() => {
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

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and filter controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            title="Filter"
            className="transition-all hover:bg-gray-100"
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            title="Refresh"
            className={`transition-all hover:bg-gray-100 ${isRefreshing ? 'animate-spin' : ''}`}
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSortChange('name')}
                >
                  <div className="flex items-center">
                    Product
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSortChange('category')}
                >
                  <div className="flex items-center">
                    Category
                    {sortField === 'category' && (
                      sortDirection === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSortChange('price')}
                >
                  <div className="flex items-center">
                    Price
                    {sortField === 'price' && (
                      sortDirection === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSortChange('quantity')}
                >
                  <div className="flex items-center">
                    Qty
                    {sortField === 'quantity' && (
                      sortDirection === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSortChange('expiry')}
                >
                  <div className="flex items-center">
                    Expiry
                    {sortField === 'expiry' && (
                      sortDirection === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSortChange('status')}
                >
                  <div className="flex items-center">
                    Status
                    {sortField === 'status' && (
                      sortDirection === 'asc' ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            {products.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    <div className="flex flex-col items-center py-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                      >
                        <Package className="h-12 w-12 text-gray-300 mb-2" />
                      </motion.div>
                      <p className="text-gray-500 mb-2">No products found</p>
                      <Button variant="link" onClick={handleAddProduct} className="mt-2">
                        Add your first product
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <motion.tbody
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {products.map((product) => (
                  <ProductRow 
                    key={product.id}
                    product={product}
                    getCategoryBadgeColor={getCategoryBadgeColor}
                    getStatusBadgeColor={getStatusBadgeColor}
                    formatDate={formatDate}
                  />
                ))}
              </motion.tbody>
            )}
          </table>
        </div>
        {/* Simple pagination footer */}
        {products.length > 0 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{products.length}</span> of{" "}
                  <span className="font-medium">{products.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <Button variant="outline" size="sm" className="rounded-l-md">Previous</Button>
                  <Button variant="outline" size="sm" className="ml-1 rounded-r-md">Next</Button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
