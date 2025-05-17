
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Navigation, Map } from 'lucide-react';
import { toast } from 'sonner';

interface MapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location: string | null;
}

const MapDialog: React.FC<MapDialogProps> = ({
  open,
  onOpenChange,
  location
}) => {
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      toast.info("Getting your current location...");
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we would use reverse geocoding here
          const { latitude, longitude } = position.coords;
          setCurrentLocation(`Current location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          toast.success("Location successfully retrieved");
        },
        (error) => {
          toast.error("Couldn't access your location. Please check your browser permissions.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>View Delivery Location</DialogTitle>
        </DialogHeader>
        <div className="h-80 w-full relative">
          <iframe
            title="Location Map"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0, borderRadius: '0.5rem' }}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(currentLocation || location || '')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            allowFullScreen
          ></iframe>
        </div>
        <div className="flex space-x-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleUseCurrentLocation}
            className="flex items-center gap-2"
          >
            <Navigation size={16} className="text-gray-600" />
            Use current location
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => {
              toast.info("Choose on map feature would open an interactive map in a production app");
            }}
          >
            <Map size={16} className="text-gray-600" />
            Choose on map
          </Button>
        </div>
        <div className="mt-2 p-3 bg-indigo-50 rounded-lg text-xs text-indigo-700">
          <p className="font-medium">Delivery Address:</p>
          <p className="mt-1">{currentLocation || location}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapDialog;
