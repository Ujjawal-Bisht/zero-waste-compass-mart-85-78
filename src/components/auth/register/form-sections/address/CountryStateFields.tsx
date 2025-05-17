
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Building, MapPinned } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { COUNTRY_CODES } from '@/utils/countryCodes';
import { INDIAN_STATES } from '@/utils/indianGeographicData';

interface CountryStateFieldsProps {
  form: UseFormReturn<any>;
  selectedState: string;
  setSelectedState: (state: string) => void;
  itemVariants: any;
}

const CountryStateFields: React.FC<CountryStateFieldsProps> = ({
  form,
  selectedState,
  setSelectedState,
  itemVariants
}) => {
  // Extract countries from country codes
  const countries = COUNTRY_CODES.map(country => country.name);
  
  // Extract Indian states
  const states = INDIAN_STATES.map(state => state.name);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <motion.div variants={itemVariants}>
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="form-field-focus">
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    // If the country is not India, reset state and city
                    if (value !== "India") {
                      form.setValue("state", "");
                      form.setValue("city", "");
                      setSelectedState("");
                    }
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full input-animate">
                    <div className="flex items-center">
                      <Building size={16} className="mr-2 text-gray-400" />
                      <SelectValue placeholder="Select Country" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {countries.map((country) => (
                      <SelectItem key={country} value={country} className="enhanced-hover">
                        {country}
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
          name="state"
          render={({ field }) => (
            <FormItem className="form-field-focus">
              <FormLabel>State/Province</FormLabel>
              <FormControl>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedState(value);
                  }}
                  defaultValue={field.value}
                  disabled={form.getValues("country") !== "India"}
                >
                  <SelectTrigger className="w-full input-animate">
                    <div className="flex items-center">
                      <MapPinned size={16} className="mr-2 text-gray-400" />
                      <SelectValue placeholder="Select State" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {states.map((state) => (
                      <SelectItem key={state} value={state} className="enhanced-hover">
                        {state}
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
    </div>
  );
};

export default CountryStateFields;
