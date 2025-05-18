
import React from 'react';
import { Item } from '@/types';
import { motion } from 'framer-motion';
import ProductActionMenu from './ProductActionMenu';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

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
  const getStatusIcon = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'out of stock':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <motion.tr 
      className="bg-white border-b hover:bg-gray-50 table-row-hover"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
      transition={{ duration: 0.2 }}
      layout
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
          <motion.img 
            src={product.imageUrl} 
            alt={product.name}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </td>
      <motion.td className="px-6 py-4 whitespace-nowrap animate-cell" style={{ animationDelay: '0.05s' }}>
        <div className="text-sm font-medium text-gray-900">{product.name}</div>
      </motion.td>
      <motion.td className="px-6 py-4 whitespace-nowrap animate-cell" style={{ animationDelay: '0.1s' }}>
        <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
      </motion.td>
      <motion.td className="px-6 py-4 whitespace-nowrap animate-cell" style={{ animationDelay: '0.15s' }}>
        <Badge className={`${getCategoryBadgeColor(product.category)}`}>
          {product.category}
        </Badge>
      </motion.td>
      <motion.td className="px-6 py-4 whitespace-nowrap animate-cell" style={{ animationDelay: '0.2s' }}>
        <motion.div 
          className="flex items-center"
          whileHover={{ x: 3 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {getStatusIcon(product.status)}
          <Badge className={`ml-1 ${getStatusBadgeColor(product.status)}`}>
            {product.status}
          </Badge>
        </motion.div>
      </motion.td>
      <motion.td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 animate-cell" style={{ animationDelay: '0.25s' }}>
        {formatDate(product.createdAt)}
      </motion.td>
      <motion.td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium animate-cell" style={{ animationDelay: '0.3s' }}>
        <motion.div 
          className="table-action-hover"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ProductActionMenu product={product} />
        </motion.div>
      </motion.td>
    </motion.tr>
  );
};

export default ProductRow;
