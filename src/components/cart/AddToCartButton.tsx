
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/cart';
import { toast } from 'sonner';

const AddToCartButton = ({ product_id }: { product_id: string }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product_id, 1);
    toast.success('Item added to cart!');
  };

  return (
    <Button onClick={handleAddToCart}>
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
