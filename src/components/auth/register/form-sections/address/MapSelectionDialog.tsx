
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface MapSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectAddress: (address: string) => void;
}

const MapSelectionDialog: React.FC<MapSelectionDialogProps> = ({ 
  open, 
  onOpenChange, 
  onSelectAddress 
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onSelectAddress("123 Selected Location St, Example City")}>
            Confirm Location
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapSelectionDialog;
