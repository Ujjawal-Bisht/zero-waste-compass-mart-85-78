
import React, { useState, useRef, useEffect } from 'react';
import { Barcode, X, Scan } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface BarcodeScannerProps {
  onBarcodeDetected: (barcode: string) => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onBarcodeDetected }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [barcodeResult, setBarcodeResult] = useState<string | null>(null);
  const [scanFeedback, setScanFeedback] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerIntervalRef = useRef<number | null>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);

  // Animate the scan line
  useEffect(() => {
    if (isScanning && scanLineRef.current) {
      const animation = scanLineRef.current.animate(
        [
          { transform: 'translateY(-100%)', opacity: 0.5 },
          { transform: 'translateY(100%)', opacity: 1 },
          { transform: 'translateY(300%)', opacity: 0.5 },
        ],
        {
          duration: 2000,
          iterations: Infinity,
          easing: 'ease-in-out',
        }
      );

      return () => {
        animation.cancel();
      };
    }
  }, [isScanning]);

  const startScanner = async () => {
    setIsScanning(true);
    setScanFeedback('Initializing camera...');
    
    try {
      if (videoRef.current) {
        const constraints = {
          video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
        setScanFeedback('Scanning for barcode...');
        
        // In a real app, we would use a real barcode scanning library like QuaggaJS
        // For demo purposes, we'll simulate detecting a barcode after a delay
        let scanProgress = 0;
        const scanSimulation = setInterval(() => {
          scanProgress += 10;
          setScanFeedback(`Scanning... ${scanProgress}%`);
          
          if (scanProgress >= 100) {
            clearInterval(scanSimulation);
            
            // Pick a random barcode from our mock database
            const barcodes = ['9780140157376', '7350053850019', '5901234123457'];
            const randomBarcode = barcodes[Math.floor(Math.random() * barcodes.length)];
            setBarcodeResult(randomBarcode);
            setScanFeedback(`Barcode detected: ${randomBarcode}`);
            
            // Use a slight delay to show the detected barcode before applying data
            setTimeout(() => {
              onBarcodeDetected(randomBarcode);
              stopScanner();
            }, 1500);
          }
        }, 200);
        
        scannerIntervalRef.current = scanSimulation as unknown as number;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setScanFeedback('Camera access denied. Please check permissions.');
      toast.error('Could not access camera. Please check permissions.');
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    if (scannerIntervalRef.current) {
      clearInterval(scannerIntervalRef.current);
      scannerIntervalRef.current = null;
    }
    
    setIsScanning(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          type="button" 
          variant="outline" 
          className="mt-8 button-glow animate-pulse"
          title="Scan Barcode"
        >
          <Barcode className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan Barcode</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4">
          {isScanning ? (
            <div className="relative w-full aspect-video bg-black rounded-md overflow-hidden">
              <video 
                ref={videoRef} 
                className="w-full h-full object-cover"
                autoPlay 
                playsInline
              />
              <div className="absolute inset-0 flex items-center justify-center">
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
                className="absolute top-2 right-2 bg-white/80"
                onClick={stopScanner}
              >
                <X className="h-4 w-4" />
              </Button>
              
              {/* Status indicator */}
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/70 text-white text-center text-sm">
                {scanFeedback}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4 p-8">
              <Scan className="h-16 w-16 text-zwm-primary animate-pulse" />
              <p className="text-center text-sm text-muted-foreground">
                Position the barcode in front of your camera to scan automatically
              </p>
              <Button 
                type="button"
                onClick={startScanner}
                className="zwm-gradient hover:opacity-90 animate-bounce-subtle"
              >
                Start Scanner
              </Button>
            </div>
          )}
          
          {barcodeResult && !isScanning && (
            <div className="text-center p-3 bg-muted rounded-md w-full animate-fade-in">
              <p className="text-sm font-semibold">Barcode detected: {barcodeResult}</p>
              <p className="text-xs text-muted-foreground mt-1">Item details have been filled automatically</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
