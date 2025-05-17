import React, { useEffect, useState } from 'react';
import { MapPin, Building, MapPinned, Navigation, Map } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

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
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
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

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      toast.info("Getting your current location...");
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // In a real app, we would use reverse geocoding here
          // For now, we'll just set some placeholder data
          const { latitude, longitude } = position.coords;
          
          try {
            toast.success("Location successfully retrieved");
            form.setValue(addressFieldName, `Location coordinates: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          } catch (error) {
            toast.error("Couldn't determine your address");
          }
        },
        (error) => {
          toast.error("Couldn't access your location. Please check your browser permissions.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };

  const handleChooseOnMap = () => {
    setMapDialogOpen(true);
  };

  const handleMapSelection = (address: string) => {
    form.setValue(addressFieldName, address);
    setMapDialogOpen(false);
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

      <div className="flex space-x-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleChooseOnMap}
          className="flex items-center gap-2"
        >
          <Map size={16} className="text-gray-600" />
          Choose on map
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleUseCurrentLocation}
          className="flex items-center gap-2"
        >
          <Navigation size={16} className="text-gray-600" />
          Use current location
        </Button>
      </div>
      
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

      {/* Map selection dialog */}
      <Dialog open={mapDialogOpen} onOpenChange={setMapDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Choose location on map</DialogTitle>
          </DialogHeader>
          <div className="h-80 w-full relative border rounded-md">
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <p className="text-center text-gray-500">Map interface would go here</p>
              <p className="text-sm text-gray-400 absolute bottom-4">
                In a production app, this would be an interactive map
              </p>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setMapDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleMapSelection("123 Selected Location St, Example City")}>
              Confirm Location
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default AddressSection;
