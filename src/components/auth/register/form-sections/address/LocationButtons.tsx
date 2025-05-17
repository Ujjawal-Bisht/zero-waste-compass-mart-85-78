
import React from 'react';
import { Button } from '@/components/ui/button';
import { Map, Navigation } from 'lucide-react';
import { toast } from 'sonner';

interface LocationButtonsProps {
  onOpenMapDialog: () => void;
  onUseCurrentLocation: () => void;
}

const LocationButtons: React.FC<LocationButtonsProps> = ({ 
  onOpenMapDialog,
  onUseCurrentLocation 
}) => {
  return (
    <div className="flex space-x-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onOpenMapDialog}
        className="flex items-center gap-2"
      >
        <Map size={16} className="text-gray-600" />
        Choose on map
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onUseCurrentLocation}
        className="flex items-center gap-2"
      >
        <Navigation size={16} className="text-gray-600" />
        Use current location
      </Button>
    </div>
  );
};

export default LocationButtons;
