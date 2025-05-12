
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
import Quagga from 'quagga';

interface BarcodeScannerProps {
  onBarcodeDetected: (barcode: string) => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onBarcodeDetected }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [barcodeResult, setBarcodeResult] = useState<string | null>(null);
  const [scanFeedback, setScanFeedback] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const scannerRef = useRef<HTMLDivElement>(null);
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

  // Initialize and clean up Quagga when dialog opens/closes
  useEffect(() => {
    if (isDialogOpen && isScanning) {
      startScanner();
    }
    
    return () => {
      if (Quagga) {
        Quagga.stop();
      }
    };
  }, [isDialogOpen, isScanning]);

  const startScanner = () => {
    setIsScanning(true);
    setScanFeedback('Initializing camera...');
    
    if (scannerRef.current) {
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            width: { min: 640 },
            height: { min: 480 },
            facingMode: "environment", // Use the rear camera
            aspectRatio: { min: 1, max: 2 }
          },
        },
        locator: {
          patchSize: "medium",
          halfSample: true
        },
        numOfWorkers: navigator.hardwareConcurrency || 2,
        frequency: 10,
        decoder: {
          readers: [
            "ean_reader",
            "ean_8_reader", 
            "code_128_reader",
            "code_39_reader",
            "code_93_reader",
            "upc_reader",
            "upc_e_reader"
          ]
        },
        locate: true
      }, (err) => {
        if (err) {
          console.error("Error initializing Quagga:", err);
          setScanFeedback('Camera access denied. Please check permissions.');
          toast.error('Could not access camera. Please check permissions.');
          setIsScanning(false);
          return;
        }

        setScanFeedback('Camera ready. Scanning for barcode...');
        
        // Start Quagga
        Quagga.start();

        // Set up barcode detection event
        Quagga.onDetected((result) => {
          if (result && result.codeResult && result.codeResult.code) {
            const code = result.codeResult.code;
            setBarcodeResult(code);
            setScanFeedback(`Barcode detected: ${code}`);
            
            // Stop scanning
            Quagga.stop();
            setIsScanning(false);
            
            // Use a slight delay to show the detected barcode before closing
            setTimeout(() => {
              onBarcodeDetected(code);
              setIsDialogOpen(false);
            }, 1500);
          }
        });

        // Set up processing event to show scanning feedback
        Quagga.onProcessed((result) => {
          const drawingCtx = Quagga.canvas.ctx.overlay;
          const drawingCanvas = Quagga.canvas.dom.overlay;

          if (result) {
            // Clear the canvas
            if (drawingCtx) {
              drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width") || "0"), parseInt(drawingCanvas.getAttribute("height") || "0"));
            
              // Draw box if barcode is detected
              if (result.boxes) {
                drawingCtx.strokeStyle = 'green';
                drawingCtx.lineWidth = 2;
                
                for (let box of result.boxes) {
                  drawingCtx.beginPath();
                  drawingCtx.moveTo(box[0][0], box[0][1]);
                  drawingCtx.lineTo(box[1][0], box[1][1]);
                  drawingCtx.lineTo(box[2][0], box[2][1]);
                  drawingCtx.lineTo(box[3][0], box[3][1]);
                  drawingCtx.lineTo(box[0][0], box[0][1]);
                  drawingCtx.stroke();
                }
              }

              // Draw focused box if result is found
              if (result.codeResult && result.codeResult.code) {
                drawingCtx.strokeStyle = '#00FF00';
                drawingCtx.lineWidth = 5;
                drawingCtx.strokeRect(result.box.x, result.box.y, result.box.width, result.box.height);
              }
            }
          }
        });
      });
    }
  };

  const stopScanner = () => {
    if (Quagga) {
      Quagga.stop();
    }
    setIsScanning(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
