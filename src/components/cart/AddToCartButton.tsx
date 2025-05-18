import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart';
import { toast } from 'sonner';

const AddToCartButton = ({ product_id }: { product_id: string }) => {
  const { addItemToCart } = useCart();

  const handleAddToCart = () => {
    addItemToCart({
      product_id: product_id,
      quantity: 1,
    });
    toast.success('Item added to cart!');
  };

  return (
    <Button onClick={handleAddToCart}>
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
