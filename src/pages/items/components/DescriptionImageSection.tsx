
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ImageUploader } from './ImageUploader';
import { ItemFormValues } from '../schemas/itemFormSchema';

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
  isDescriptionUpdated
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Description & Image</h3>
        
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your item in detail..." 
                    className={`h-24 resize-none transition-all ${isDescriptionUpdated ? 'border-green-500 bg-green-50' : ''}`}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Include details like condition, features, etc.
                </FormDescription>
              </FormItem>
            )}
          />
          
          <div>
            <FormLabel className="text-base block mb-2">Item Image</FormLabel>
            <ImageUploader 
              imagePreview={imagePreview} 
              setImagePreview={setImagePreview}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DescriptionImageSection;
