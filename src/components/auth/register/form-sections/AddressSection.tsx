
import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { getCitiesByState } from '@/utils/indianGeographicData';

// Import the new component files
import AddressField from './address/AddressField';
import LocationButtons from './address/LocationButtons';
import CountryStateFields from './address/CountryStateFields';
import CityZipFields from './address/CityZipFields';
import MapSelectionDialog from './address/MapSelectionDialog';

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
      
      <AddressField 
        form={form} 
        addressFieldName={addressFieldName} 
        isBusiness={isBusiness} 
        itemVariants={itemVariants} 
      />

      <LocationButtons 
        onOpenMapDialog={() => setMapDialogOpen(true)}
        onUseCurrentLocation={handleUseCurrentLocation}
      />
      
      <CountryStateFields 
        form={form} 
        selectedState={selectedState} 
        setSelectedState={setSelectedState} 
        itemVariants={itemVariants} 
      />
      
      <CityZipFields 
        form={form} 
        selectedState={selectedState}
        availableCities={availableCities} 
        itemVariants={itemVariants} 
      />

      {/* Map selection dialog */}
      <MapSelectionDialog 
        open={mapDialogOpen}
        onOpenChange={setMapDialogOpen}
        onSelectAddress={handleMapSelection}
      />
    </motion.div>
  );
};

export default AddressSection;
