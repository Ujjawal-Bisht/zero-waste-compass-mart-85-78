
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
  // Calculate days until expiry
  const daysUntilExpiry = () => {
    const today = new Date();
    const expiryDate = new Date(product.expiryDate);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const days = daysUntilExpiry();
  
  return (
    <motion.tr 
      className="table-row-animate hover:bg-gray-50 relative"
      whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.8)", x: 3 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <motion.div 
            className="h-12 w-12 flex-shrink-0 rounded-md bg-gray-100 overflow-hidden shadow-sm border border-gray-200"
            whileHover={{ scale: 1.1, rotate: 3 }}
          >
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} className="h-12 w-12 rounded-md object-cover" />
            )}
          </motion.div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{product.name}</div>
            <div className="text-xs text-gray-500 mt-1">ID: {product.id.substring(0, 8)}...</div>
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
            className={product.dynamicPricingEnabled ? "price-pulse font-medium" : "font-medium"}
            whileHover={product.dynamicPricingEnabled ? { scale: 1.1 } : {}}
          >
            {product.currentPrice.toFixed(2)}
          </motion.span>
          {product.originalPrice && product.originalPrice > product.currentPrice && (
            <span className="text-xs text-gray-500 line-through ml-2">
              <IndianRupee size={10} className="inline mr-0.5" />
              {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        {product.dynamicPricingEnabled && (
          <div className="text-xs text-green-600 flex items-center mt-1">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1 animate-pulse"></span>
            Dynamic pricing
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <motion.div 
          className={`inline-flex items-center justify-center px-2 py-1 rounded-full ${
            product.quantity < 5 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
          }`}
          whileHover={{ scale: 1.05 }}
        >
          {product.quantity}
          {product.quantity < 5 && (
            <span className="ml-1 text-xs text-red-600">(Low)</span>
          )}
        </motion.div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className="flex flex-col">
          <span className="font-medium">{formatDate(product.expiryDate)}</span>
          {days <= 30 && (
            <span className={`text-xs mt-1 ${days <= 7 ? 'text-red-600' : days <= 14 ? 'text-amber-600' : 'text-blue-600'}`}>
              {days <= 0 ? 'Expired!' : `${days} days left`}
            </span>
          )}
        </div>
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
