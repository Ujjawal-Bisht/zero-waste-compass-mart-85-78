
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Package, Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import ProductTable from '@/components/products/ProductTable';
import { getCategoryBadgeColor, getStatusBadgeColor, formatDate } from '@/components/products/productUtils';
import { Item, ItemCategory } from '@/types';

interface ProductsCardProps {
  products: Item[];
  activeFilter: string | null;
  handleAddProduct: () => void;
}

const ProductsCard: React.FC<ProductsCardProps> = ({ 
  products, 
  activeFilter,
  handleAddProduct
}) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="product-card border-0 shadow-md">
        <CardHeader className="flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-lg">
          <CardTitle className="flex items-center">
            <Package className="mr-2 h-5 w-5 text-indigo-600" />
            <span>All Products {activeFilter && `(${activeFilter})`}</span>
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4 mr-1" /> Filter
            </Button>
            <Button variant="ghost" size="sm">
              <ArrowUpDown className="h-4 w-4 mr-1" /> Sort
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            <ProductTable
              products={products}
              getCategoryBadgeColor={getCategoryBadgeColor}
              getStatusBadgeColor={getStatusBadgeColor}
              formatDate={formatDate}
              handleAddProduct={handleAddProduct}
            />
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductsCard;
