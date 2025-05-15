
import React from 'react';
import { Form } from '@/components/ui/form';
import { useItemForm } from '../hooks/useItemForm';
import FormSections from './form/FormSections';
import FormButtons from './form/FormButtons';

interface ItemFormProps {
  onBarcodeDetected?: (barcode: string, item: any) => void;
  onFormSuccess?: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onBarcodeDetected, onFormSuccess }) => {
  const {
    form,
    imagePreview,
    setImagePreview,
    isSubmitting,
    handleBarcodeDetected,
    onSubmit
  } = useItemForm({ 
    onBarcodeDetected, 
    onFormSuccess 
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormSections 
          form={form}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          handleBarcodeDetected={handleBarcodeDetected}
        />
        <FormButtons isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};

export default ItemForm;
