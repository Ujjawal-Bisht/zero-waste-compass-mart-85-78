
import React from 'react';
import { motion } from 'framer-motion';
import ItemForm from './components/ItemForm';

const AddItem: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Item</h1>
        <p className="text-muted-foreground">List an item for donation or discount</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border card-hover">
        <ItemForm />
      </div>
    </div>
  );
};

export default AddItem;
