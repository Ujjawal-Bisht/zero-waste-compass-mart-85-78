
import React, { useEffect, useState } from 'react';
import { MapPin, Building, MapPinned } from 'lucide-react';
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
import { COUNTRY_CODES } from '@/utils/countryCodes';
import { INDIAN_STATES, getCitiesByState } from '@/utils/indianGeographicData';

interface AddressSectionProps {
  form: UseFormReturn<any>;
  isSeller?: boolean;
  isBusiness?: boolean;
}

const AddressSection: React.FC<AddressSectionProps> = ({ 
  form, 
  isSeller = false,
  isBusiness = false
}) => {
  const [selectedState, setSelectedState] = useState<string>("");
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const addressFieldName = isBusiness ? "businessAddress" : "address";
  const title = isBusiness ? "Business Address" : (isSeller ? "Address Information" : "Address Information (Optional)");
  
  // Update cities when state changes
  useEffect(() => {
    if (selectedState) {
      const cities = getCitiesByState(selectedState);
      setAvailableCities(cities);
      
      // If the current city is not in the new state, clear it
      const currentCity = form.getValues("city");
      if (currentCity && !cities.includes(currentCity)) {
        form.setValue("city", "");
      }
    } else {
      setAvailableCities([]);
    }
  }, [selectedState, form]);

  // Extract countries from country codes
  const countries = COUNTRY_CODES.map(country => country.name);
  
  // Extract Indian states
  const states = INDIAN_STATES.map(state => state.name);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="space-y-4 pt-4 border-t border-gray-200"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3 
        className="text-lg font-medium"
        variants={itemVariants}
      >
        {title}
      </motion.h3>
      
      <motion.div variants={itemVariants}>
        <FormField
          control={form.control}
          name={addressFieldName}
          render={({ field }) => (
            <FormItem className="form-field-focus">
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MapPin size={16} className="text-gray-400" />
                  </div>
                  <Input 
                    placeholder={isBusiness ? "123 Business Ave" : "123 Main St"} 
                    className="pl-10 input-animate" 
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
      
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
    </motion.div>
  );
};

export default AddressSection;
