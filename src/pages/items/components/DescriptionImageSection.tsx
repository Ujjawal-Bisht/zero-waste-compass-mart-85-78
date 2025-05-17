
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { ItemFormValues } from '../schemas/itemFormSchema';
import { Textarea } from '@/components/ui/textarea';
import ImageUploader from './ImageUploader';
import ExpiryDatePicker from './ExpiryDatePicker';

interface DescriptionImageSectionProps {
  form: UseFormReturn<ItemFormValues>;
  imagePreview: string;
  setImagePreview: (url: string) => void;
  isDescriptionUpdated?: boolean;
}

const DescriptionImageSection: React.FC<DescriptionImageSectionProps> = ({
  form,
  imagePreview,
  setImagePreview,
  isDescriptionUpdated = false
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Description & Media</h2>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your item in detail..." 
                  className={`min-h-[120px] resize-y transition-all hover:border-zwm-primary focus:border-zwm-primary ${isDescriptionUpdated ? 'form-field-success' : ''}`}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploader 
            imagePreview={imagePreview} 
            setImagePreview={setImagePreview} 
          />
          
          <ExpiryDatePicker 
            form={form}
            isUpdated={false}
          />
        </div>
      </div>
    </div>
  );
};

export default DescriptionImageSection;
