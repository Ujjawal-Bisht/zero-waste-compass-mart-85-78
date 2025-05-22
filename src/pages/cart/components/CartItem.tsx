
import React from 'react';
import { MinusCircle, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/hooks/cart/types';

interface CartItemProps {
  item: CartItemType;
  removeFromCart: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, removeFromCart, onUpdateQuantity }) => {
  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-0">
      {/* Product Image */}
      <div className="h-20 w-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="h-full w-full object-cover"
        />
      </div>
      
      {/* Product Details */}
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500">INR {item.price.toFixed(2)}</p>

        {/* Item expiry date if available */}
        {item.expiryDate && (
          <p className="text-xs text-amber-600 mt-1">
            Expires: {new Date(item.expiryDate).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={() => onUpdateQuantity(item.id, -1)}
          disabled={item.quantity <= 1}
        >
          <MinusCircle className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{item.quantity}</span>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={() => onUpdateQuantity(item.id, 1)}
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>

      {/* Total & Remove */}
      <div className="flex flex-col items-end gap-2">
        <span className="font-medium">INR {(item.price * item.quantity).toFixed(2)}</span>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => removeFromCart(item.id)}
          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
