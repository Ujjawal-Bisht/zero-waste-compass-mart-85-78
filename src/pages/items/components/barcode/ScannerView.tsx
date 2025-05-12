
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ScannerViewProps {
  scannerRef: React.RefObject<HTMLDivElement>;
  scanLineRef: React.RefObject<HTMLDivElement>;
  scanFeedback: string;
  onStopScanner: () => void;
}

const ScannerView: React.FC<ScannerViewProps> = ({
  scannerRef,
  scanLineRef,
  scanFeedback,
  onStopScanner,
}) => {
  return (
    <div className="relative w-full aspect-video bg-black rounded-md overflow-hidden">
      <div 
        ref={scannerRef} 
        className="w-full h-full"
      >
        {/* Quagga will inject video here */}
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-2/3 h-1/3 border-2 border-zwm-primary/70 rounded-md"></div>
        <div 
          ref={scanLineRef}
          className="absolute top-1/2 left-0 w-full h-0.5 bg-zwm-primary opacity-70"
        ></div>
      </div>
      
      <Button 
        type="button"
        variant="outline" 
        size="sm" 
        className="absolute top-2 right-2 bg-white/80 z-10"
        onClick={onStopScanner}
      >
        <X className="h-4 w-4" />
      </Button>
      
      {/* Status indicator */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/70 text-white text-center text-sm">
        {scanFeedback}
      </div>
    </div>
  );
};

export default ScannerView;
