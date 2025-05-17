
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
            src={`https://maps.google.com/maps?q=${encodeURIComponent(location || '')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            allowFullScreen
          ></iframe>
        </div>
        <div className="mt-2 p-3 bg-indigo-50 rounded-lg text-xs text-indigo-700">
          <p className="font-medium">Delivery Address:</p>
          <p className="mt-1">{location}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapDialog;
