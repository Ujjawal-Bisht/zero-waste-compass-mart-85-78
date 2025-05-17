
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';

interface CityZipFieldsProps {
  form: UseFormReturn<any>;
  selectedState: string;
  availableCities: string[];
  itemVariants: any;
}

const CityZipFields: React.FC<CityZipFieldsProps> = ({
  form,
  selectedState,
  availableCities,
  itemVariants
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <motion.div variants={itemVariants}>
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="form-field-focus">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Select 
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!selectedState || form.getValues("country") !== "India"}
                >
                  <SelectTrigger className="w-full input-animate">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {availableCities.map((city) => (
                      <SelectItem key={city} value={city} className="enhanced-hover">
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem className="form-field-focus">
              <FormLabel>Zip/Postal Code</FormLabel>
              <FormControl>
                <Input placeholder="10001" {...field} className="input-animate" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
    </div>
  );
};

export default CityZipFields;
