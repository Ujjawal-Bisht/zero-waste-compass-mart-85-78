
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '@/components/ui/form';
import { useItemForm } from '../hooks/useItemForm';
import FormSections from './form/FormSections';
import FormButtons from './form/FormButtons';
import { useAuth } from '@/contexts/auth';

interface ItemFormProps {
  onBarcodeDetected?: (barcode: string, item: any) => void;
  onFormSuccess?: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onBarcodeDetected, onFormSuccess }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Redirect non-sellers away from the form
  useEffect(() => {
    if (currentUser && !currentUser.isSeller) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);
  
  const {
    form,
    imagePreview,
    setImagePreview,
    isSubmitting,
    handleBarcodeDetected,
    onSubmit,
    updatedFields
  } = useItemForm({ 
    onBarcodeDetected, 
    onFormSuccess 
  });

  // If user is not a seller, don't render the form
  if (currentUser && !currentUser.isSeller) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormSections 
          form={form}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          handleBarcodeDetected={handleBarcodeDetected}
          updatedFields={updatedFields}
        />
        <FormButtons isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};

export default ItemForm;
