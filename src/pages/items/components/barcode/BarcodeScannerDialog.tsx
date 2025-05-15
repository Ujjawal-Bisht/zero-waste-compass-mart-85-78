
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Camera, X, Loader2, Check, AlertTriangle, Barcode, PackageOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { initializeScanner, stopScanner } from './scannerUtils';
import { barcodeDatabase } from '../../data/barcodeDatabase';
import { toast } from 'sonner';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Item } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface BarcodeScannerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onBarcodeDetected: (barcode: string) => void;
}

const BarcodeScannerDialog: React.FC<BarcodeScannerDialogProps> = ({
  isOpen,
  onClose,
  onBarcodeDetected,
}) => {
  const [scanProgress, setScanProgress] = useState(0);
  const [scannerActive, setScannerActive] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [lastDetectedCode, setLastDetectedCode] = useState<string | null>(null);
  const [savedProducts, setSavedProducts] = useLocalStorage<Item[]>('seller-products', []);
  const [productInfo, setProductInfo] = useState<any>(null);
  
  // Increase progress when scanner is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (scannerActive && scanProgress < 95) {
      interval = setInterval(() => {
        setScanProgress(prev => {
          const nextValue = prev + (95 - prev) * 0.05;
          return Math.min(nextValue, 95);
        });
      }, 500);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [scannerActive, scanProgress]);

  useEffect(() => {
    // Reset state when dialog opens
    if (isOpen) {
      setScanProgress(0);
      setScannerActive(false);
      setError(null);
      setSuccess(false);
      setManualBarcode('');
      setLastDetectedCode(null);
      setProductInfo(null);
    }
  }, [isOpen]);

  useEffect(() => {
    // Clean up scanner on component unmount
    return () => {
      stopScanner();
    };
  }, []);

  const handleStartScanner = () => {
    setScannerActive(true);
    setError(null);
    
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    initializeScanner({
      containerId: 'interactive',
      onDetected: (code) => {
        setLastDetectedCode(code);
        handleBarcodeDetection(code);
      },
      onError: (err) => {
        setError(err.message || 'Failed to access camera');
        setScannerActive(false);
        setScanProgress(0);
      }
    });
  };

  const handleBarcodeDetection = (code: string) => {
    stopScanner();
    setScannerActive(false);
    setScanProgress(100);
    setSuccess(true);
    
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate([50, 100, 100]);
    }
    
    // Check if product exists in database
    const foundProduct = barcodeDatabase[code];
    if (foundProduct) {
      setProductInfo(foundProduct);
      
      // Add product to saved products
      const today = new Date();
      const expiryDate = new Date();
      expiryDate.setDate(today.getDate() + (foundProduct.expiryDays || 30));
      
      const newProduct: Item = {
        id: uuidv4(),
        name: foundProduct.name,
        description: foundProduct.description || '',
        category: foundProduct.category || 'other',
        imageUrl: foundProduct.imageUrl || 'https://via.placeholder.com/150',
        expiryDate: expiryDate.toISOString().split('T')[0],
        createdAt: today.toISOString(),
        updatedAt: today.toISOString(),
        status: 'available',
        userId: 'seller123',
        userName: 'Demo Business',
        userPhoto: null,
        location: {
          address: '123 Main St',
          lat: 40.7128,
          lng: -74.006,
        },
        quantity: foundProduct.quantity || 1,
        originalPrice: foundProduct.originalPrice || 0,
        currentPrice: foundProduct.currentPrice || 0,
        dynamicPricingEnabled: false,
      };
      
      // Save to local storage
      setSavedProducts([...savedProducts, newProduct]);
      
      toast.success(`Product added: ${foundProduct.name}`, {
        description: "Added to your inventory",
      });
    }
    
    // Delay to show success animation
    setTimeout(() => {
      onBarcodeDetected(code);
      onClose();
    }, 1500);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualBarcode.trim()) {
      handleBarcodeDetection(manualBarcode);
    }
  };

  const handleClose = () => {
    stopScanner();
    setScannerActive(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Camera className="mr-2 h-5 w-5 text-indigo-500" />
            </motion.div>
            <span>Enhanced Barcode Scanner</span>
          </DialogTitle>
          <DialogDescription>
            Position the barcode within the camera view or enter the code manually.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4">
          {/* Progress indicator */}
          <div className="relative">
            <Progress 
              value={scanProgress} 
              className="h-2 bg-gray-100" 
            />
            {scanProgress === 100 && success && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, 0] }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute -right-3 -top-3"
              >
                <div className="bg-green-500 text-white p-1 rounded-full">
                  <Check className="h-4 w-4" />
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Scanner or error display */}
          <div className="relative h-60 bg-gray-100 rounded-md overflow-hidden">
            <AnimatePresence mode="wait">
              {error ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gray-100"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
                  </motion.div>
                  <p className="text-center text-gray-700">{error}</p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="outline" 
                      onClick={() => setError(null)}
                      className="mt-4"
                    >
                      Try Again
                    </Button>
                  </motion.div>
                </motion.div>
              ) : scannerActive ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  <div id="interactive" className="h-full viewport"></div>
                  <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-indigo-400 m-8 rounded-md scanner-target"></div>
                  <motion.div 
                    className="scan-line absolute left-0 w-full h-px bg-indigo-500 opacity-75"
                    animate={{ 
                      top: ["30%", "70%", "30%"],
                      opacity: [0.5, 1, 0.5],
                      boxShadow: [
                        "0 0 4px rgba(79, 70, 229, 0.3)",
                        "0 0 8px rgba(79, 70, 229, 0.6)",
                        "0 0 4px rgba(79, 70, 229, 0.3)"
                      ]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  ></motion.div>
                  
                  {/* Enhanced scanning corners */}
                  <div className="absolute inset-8 pointer-events-none">
                    <motion.div 
                      className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-indigo-500"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    ></motion.div>
                    <motion.div 
                      className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-indigo-500"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    ></motion.div>
                    <motion.div 
                      className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-indigo-500"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                    ></motion.div>
                    <motion.div 
                      className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-indigo-500"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                    ></motion.div>
                  </div>
                </motion.div>
              ) : success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-green-50"
                >
                  <div className="text-center px-4">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, 10, 0] }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4 success-pulse">
                        <Check className="h-8 w-8 text-green-600" />
                      </div>
                    </motion.div>
                    <h3 className="text-lg font-medium text-green-800 mb-2">Barcode Detected!</h3>
                    <p className="text-green-600 text-sm">{lastDetectedCode}</p>
                    
                    {productInfo && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-3 bg-white p-2 rounded-md text-left text-sm text-gray-700 border border-green-200"
                      >
                        <div className="flex items-center">
                          <PackageOpen className="h-4 w-4 text-green-500 mr-1" />
                          <span className="font-medium">{productInfo.name}</span>
                        </div>
                        {productInfo.currentPrice && (
                          <p className="text-xs mt-1">Price: ₹{productInfo.currentPrice.toFixed(2)}</p>
                        )}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.2)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleStartScanner}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Start Scanner
                    </Button>
                  </motion.div>
                  
                  {/* Animated scanner hint */}
                  <motion.div 
                    className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="inline-block"
                    >
                      <Barcode className="h-4 w-4 mx-auto mb-1 text-indigo-400" />
                    </motion.div>
                    <p>Position barcode within frame once started</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Manual entry form */}
          <form onSubmit={handleManualSubmit} className="space-y-2">
            <p className="text-sm text-gray-500">Or enter barcode manually:</p>
            <div className="flex space-x-2">
              <Input
                value={manualBarcode}
                onChange={(e) => setManualBarcode(e.target.value)}
                placeholder="Enter barcode number"
                className="flex-1"
                disabled={scannerActive || success}
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  type="submit" 
                  disabled={!manualBarcode.trim() || scannerActive || success}
                >
                  {success ? <Check className="h-4 w-4" /> : 'Submit'}
                </Button>
              </motion.div>
            </div>
          </form>
        </div>
        
        <DialogFooter className="flex justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex items-center"
              disabled={success}
            >
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
          </motion.div>
          
          {scannerActive && (
            <motion.div 
              className="flex items-center text-sm text-indigo-600"
              animate={{ 
                opacity: [0.7, 1, 0.7], 
                scale: [0.98, 1, 0.98] 
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scanning...
            </motion.div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BarcodeScannerDialog;
