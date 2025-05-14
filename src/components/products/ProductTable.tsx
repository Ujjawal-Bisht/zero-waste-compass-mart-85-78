
import React from 'react';
import { Item } from '@/types';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductRow from './ProductRow';

interface ProductTableProps {
  products: Item[];
  getCategoryBadgeColor: (category: string) => string;
  getStatusBadgeColor: (status: string) => string;
  formatDate: (dateString: string) => string;
  handleAddProduct: () => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ 
  products, 
  getCategoryBadgeColor, 
  getStatusBadgeColor, 
  formatDate,
  handleAddProduct
}) => {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="rounded-md border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Qty
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Expiry
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
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
                  <p>No products found</p>
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
  );
};

export default ProductTable;
