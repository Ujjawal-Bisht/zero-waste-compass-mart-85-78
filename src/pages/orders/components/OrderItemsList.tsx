
import React from 'react';
import { Order } from '@/types';

interface OrderItemsListProps {
  items: Order['items'];
}

export const OrderItemsList: React.FC<OrderItemsListProps> = ({ items }) => {
  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        <span key={item.itemId} className="text-sm">
          {item.name} x {item.quantity}
          {index < items.length - 1 && <span className="text-gray-300">, </span>}
        </span>
      ))}
    </div>
  );
};
