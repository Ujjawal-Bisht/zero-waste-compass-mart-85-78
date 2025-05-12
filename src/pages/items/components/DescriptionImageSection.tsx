
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ImageUploader } from './ImageUploader';
import { UseFormReturn } from 'react-hook-form';

interface DescriptionImageSectionProps {
  form: UseFormReturn<any, any, undefined>;
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
}

const DescriptionImageSection: React.FC<DescriptionImageSectionProps> = ({ 
  form, 
  imagePreview, 
  setImagePreview 
}) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter a detailed description of the item" 
                className="h-32 transition-all"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <ImageUploader 
        imagePreview={imagePreview} 
        setImagePreview={setImagePreview} 
      />
    </div>
  );
};

export default DescriptionImageSection;
