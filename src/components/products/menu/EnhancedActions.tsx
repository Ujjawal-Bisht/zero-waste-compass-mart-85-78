
import React from 'react';
import { 
  Zap, Gift, Printer, Bell, Download, 
  FileBarChart, Share2, Eye, EyeOff 
} from 'lucide-react';
import MenuItem from './MenuItem';
import { Item } from '@/types';

interface EnhancedActionsProps {
  product: Item;
  onToggleDynamicPricing: (product: Item) => void;
  onPromoteProduct: (product: Item) => void;
  onPrintLabel: (product: Item) => void;
  onSetAlert: (product: Item) => void;
  onDownloadProductData: (product: Item) => void;
  onAnalyticsView: (id: string) => void;
  onShareProduct: (product: Item) => void;
  onToggleVisibility: (product: Item, status: string) => void;
}

const EnhancedActions: React.FC<EnhancedActionsProps> = ({
  product,
  onToggleDynamicPricing,
  onPromoteProduct,
  onPrintLabel,
  onSetAlert,
  onDownloadProductData,
  onAnalyticsView,
  onShareProduct,
  onToggleVisibility
}) => {
  return (
    <>
      <MenuItem 
        onClick={() => onToggleDynamicPricing(product)}
        icon={<Zap className="h-4 w-4 mr-2 text-yellow-500" />}
        label={product.dynamicPricingEnabled ? 'Disable dynamic pricing' : 'Enable dynamic pricing'}
      />
      
      <MenuItem 
        onClick={() => onPromoteProduct(product)}
        icon={<Gift className="h-4 w-4 mr-2 text-purple-500" />}
        label="Promote product"
      />
      
      <MenuItem 
        onClick={() => onPrintLabel(product)}
        icon={<Printer className="h-4 w-4 mr-2 text-blue-500" />}
        label="Print label"
      />
      
      <MenuItem 
        onClick={() => onSetAlert(product)}
        icon={<Bell className="h-4 w-4 mr-2 text-amber-500" />}
        label="Set stock alert"
      />
      
      <MenuItem 
        onClick={() => onDownloadProductData(product)}
        icon={<Download className="h-4 w-4 mr-2 text-blue-600" />}
        label="Export product data"
      />
      
      <MenuItem 
        onClick={() => onAnalyticsView(product.id)}
        icon={<FileBarChart className="h-4 w-4 mr-2 text-indigo-600" />}
        label="View analytics"
      />
      
      <MenuItem 
        onClick={() => onShareProduct(product)}
        icon={<Share2 className="h-4 w-4 mr-2 text-green-600" />}
        label="Share product"
      />
      
      <MenuItem 
        onClick={() => onToggleVisibility(product, product.status)}
        icon={product.status === 'available' ? 
          <EyeOff className="h-4 w-4 mr-2 text-amber-600" /> : 
          <Eye className="h-4 w-4 mr-2 text-green-600" />
        }
        label={product.status === 'available' ? 'Hide product' : 'Show product'}
      />
    </>
  );
};

export default EnhancedActions;
