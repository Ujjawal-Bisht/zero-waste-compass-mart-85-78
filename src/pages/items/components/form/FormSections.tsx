
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ItemFormValues } from '../../schemas/itemFormSchema';
import ItemDetailsSection from '../ItemDetailsSection';
import DescriptionImageSection from '../DescriptionImageSection';
import AddressField from '../details/AddressField';

interface FormSectionsProps {
  form: UseFormReturn<ItemFormValues>;
  imagePreview: string;
  setImagePreview: (url: string) => void;
  handleBarcodeDetected: (barcode: string) => void;
  updatedFields?: Record<string, boolean>;
}

const FormSections: React.FC<FormSectionsProps> = ({ 
  form, 
  imagePreview, 
  setImagePreview, 
  handleBarcodeDetected, 
  updatedFields = {} 
}) => {
  return (
    <>
      <div className="mb-8 space-y-6">
        <ItemDetailsSection 
          form={form} 
          handleBarcodeDetected={handleBarcodeDetected}
          isNameUpdated={updatedFields.name}
          isPriceUpdated={updatedFields.currentPrice || updatedFields.originalPrice}
          isQuantityUpdated={updatedFields.quantity}
          isCategoryUpdated={updatedFields.category}
        />
        
        <DescriptionImageSection 
          form={form} 
          imagePreview={imagePreview} 
          setImagePreview={setImagePreview}
          isDescriptionUpdated={updatedFields.description}
        />
        
        <AddressField 
          form={form} 
          isUpdated={updatedFields.address}
        />
      </div>
    </>
  );
};

export default FormSections;
