
import React from 'react';
import { Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IdleViewProps {
  onStartScanner: () => void;
}

const IdleView: React.FC<IdleViewProps> = ({ onStartScanner }) => {
  return (
    <div className="flex flex-col items-center space-y-4 p-8">
      <Scan className="h-16 w-16 text-zwm-primary animate-pulse" />
      <p className="text-center text-sm text-muted-foreground">
        Position the barcode in front of your camera to scan automatically
      </p>
      <Button 
        type="button"
        onClick={onStartScanner}
        className="zwm-gradient hover:opacity-90 animate-bounce-subtle"
      >
        Start Scanner
      </Button>
    </div>
  );
};

export default IdleView;
