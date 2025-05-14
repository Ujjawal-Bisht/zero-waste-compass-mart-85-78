
import React from 'react';
import { Item } from '@/types';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { IndianRupee } from 'lucide-react';
import ProductActionMenu from './ProductActionMenu';

interface ProductRowProps {
  product: Item;
  getCategoryBadgeColor: (category: string) => string;
  getStatusBadgeColor: (status: string) => string;
  formatDate: (dateString: string) => string;
}

const ProductRow: React.FC<ProductRowProps> = ({ 
  product, 
  getCategoryBadgeColor, 
  getStatusBadgeColor, 
  formatDate 
}) => {
  return (
    <motion.tr 
      className="table-row-animate hover:bg-gray-50"
      whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.8)", x: 3 }}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <motion.div 
            className="h-10 w-10 flex-shrink-0 rounded bg-gray-100 overflow-hidden"
            whileHover={{ scale: 1.1 }}
          >
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} className="h-10 w-10 rounded object-cover" />
            )}
          </motion.div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{product.name}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Badge className={`${getCategoryBadgeColor(product.category)} badge-animate`}>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Badge>
        </motion.div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="flex items-center">
          <IndianRupee size={14} className="mr-1" />
          <motion.span 
            className={product.dynamicPricingEnabled ? "price-pulse" : ""}
          >
            {product.currentPrice.toFixed(2)}
          </motion.span>
        </div>
        {product.dynamicPricingEnabled && (
          <div className="text-xs text-green-600">Dynamic pricing</div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.quantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(product.expiryDate)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Badge className={`${getStatusBadgeColor(product.status)} badge-animate`}>
            {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
          </Badge>
        </motion.div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <ProductActionMenu product={product} />
      </td>
    </motion.tr>
  );
};

export default ProductRow;
