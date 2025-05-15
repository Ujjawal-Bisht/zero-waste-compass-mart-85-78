import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { initializeScanner, stopScanner, selectOptimalCamera } from '../components/barcode/scannerUtils';
import { getProductByBarcode } from '../data/barcodeDatabase';
import { useLocalStorage } from './useLocalStorage';
import { Item } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const useBarcodeScanner = (onBarcodeDetected: (barcode: string) => void) => {
  const [isScanning, setIsScanning] = useState(false);
  const [barcodeResult, setBarcodeResult] = useState<string | null>(null);
  const [scanFeedback, setScanFeedback] = useState('');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const scannerRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const quaggaInitialized = useRef(false);
  const detectionCount = useRef<Record<string, number>>({});
  const progressIntervalRef = useRef<number | null>(null);
  
  // Add products to local storage
  const [savedProducts, setSavedProducts] = useLocalStorage<Item[]>('seller-products', []);

  // Add a product from the barcode database to the product list
  const addBarcodeProduct = (barcode: string) => {
    const product = getProductByBarcode(barcode);
    if (!product) return;

    // Check if product already exists
    const existingProduct = savedProducts.find(p => 
      p.name === product.name && 
      p.originalPrice === product.originalPrice
    );

    if (existingProduct) {
      // Update quantity if product exists
      const updatedProducts = savedProducts.map(p => {
        if (p.name === product.name && p.originalPrice === product.originalPrice) {
          return {
            ...p,
            quantity: (p.quantity || 0) + (product.quantity || 1)
          };
        }
        return p;
      });
      setSavedProducts(updatedProducts);
      toast.success(`Updated quantity of ${product.name}`);
    } else {
      // Create new product
      const newItem: Item = {
        id: uuidv4(),
        name: product.name,
        description: product.description || "",
        category: product.category,
        imageUrl: product.imageUrl || "https://via.placeholder.com/150",
        expiryDate: product.expiryDays ? 
          new Date(Date.now() + product.expiryDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : 
          undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "available",
        userId: "user123",
        userName: "Current User",
        userPhoto: null,
        location: {
          address: "Current Location",
          lat: 0,
          lng: 0,
        },
        quantity: product.quantity || 1,
        originalPrice: product.originalPrice,
        currentPrice: product.currentPrice,
        dynamicPricingEnabled: true,
      };

      setSavedProducts([...savedProducts, newItem]);
      toast.success(`Added ${product.name} to your inventory!`);
    }
  };

  const handleDetected = (result: any) => {
    if (result && result.codeResult && result.codeResult.code) {
      const code = result.codeResult.code;
      
      // Count detection frequency for reliability
      detectionCount.current[code] = (detectionCount.current[code] || 0) + 1;
      
      // Require multiple detections of the same barcode for reliability
      if (detectionCount.current[code] >= 3) {
        setBarcodeResult(code);
        setScanFeedback(`Barcode detected: ${code}`);
        setScanProgress(100);
        
        // Check if code exists in database
        const foundProduct = getProductByBarcode(code);
        if (foundProduct) {
          setScanFeedback(`Found product: ${foundProduct.name}`);
          
          // Add the product to inventory
          addBarcodeProduct(code);
        }
        
        // Visual feedback
        const scannerElement = scannerRef.current;
        if (scannerElement) {
          scannerElement.classList.add('barcode-detected');
          setTimeout(() => {
            scannerElement.classList.remove('barcode-detected');
          }, 1500);
        }
        
        // Stop scanning safely
        cleanupScanner();
        setIsScanning(false);
        
        // Haptic feedback if available
        if (navigator.vibrate) {
          navigator.vibrate([100, 50, 200]);
        }
        
        // Use a slight delay to show the detected barcode before closing
        setTimeout(() => {
          onBarcodeDetected(code);
          // Keep dialog open to show success state
        }, 500);
      } else {
        setScanFeedback(`Confirming scan: ${code} (${detectionCount.current[code]}/3)`);
        setScanProgress(30 + (detectionCount.current[code] * 20)); // Incremental progress
      }
    }
  };

  const handleScannerError = (err: Error) => {
    console.error("Error initializing Quagga:", err);
    setScanFeedback('Camera access denied. Please check permissions.');
    toast.error('Could not access camera. Please check permissions.');
    setIsScanning(false);
    setHasPermission(false);
    quaggaInitialized.current = false;
  };

  const cleanupScanner = () => {
    if (quaggaInitialized.current) {
      try {
        stopScanner();
        quaggaInitialized.current = false;
      } catch (error) {
        console.error("Error stopping Quagga:", error);
      }
    }
    
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const startScanner = async () => {
    setIsScanning(true);
    setScanFeedback('Initializing camera...');
    detectionCount.current = {}; // Reset detection counter
    setScanProgress(5); // Start progress indicator
    
    try {
      // Try to select the optimal camera (back camera if available)
      await selectOptimalCamera();
      
      if (scannerRef.current) {
        initializeScanner({
          containerId: scannerRef.current.id || 'scanner',
          onDetected: handleDetected,
          onError: handleScannerError
        });
        
        // On successful initialization
        quaggaInitialized.current = true;
        setHasPermission(true);
        setScanFeedback('Camera ready. Scanning for barcode...');
        setScanProgress(25); // Update progress after initialization
      }
    } catch (error) {
      console.error("Failed to initialize scanner:", error);
      handleScannerError(error instanceof Error ? error : new Error('Failed to start scanner'));
    }
  };

  // Animate the scan line
  useEffect(() => {
    if (isScanning && scanLineRef.current) {
      // Animation handled by CSS
    }
    
    // Start the scanning progress animation when scanning begins
    if (isScanning) {
      setScanProgress(0);
      const intervalId = window.setInterval(() => {
        setScanProgress(prev => {
          if (prev < 95) return prev + 1;
          return prev;
        });
      }, 100);
      progressIntervalRef.current = intervalId;
      return () => {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      };
    }
  }, [isScanning]);

  return {
    isScanning,
    setIsScanning,
    barcodeResult,
    setBarcodeResult,
    scanFeedback,
    setScanFeedback,
    scanProgress,
    setScanProgress,
    hasPermission,
    scannerRef,
    scanLineRef,
    startScanner,
    stopScanner: cleanupScanner,
    resetScanner: () => {
      setBarcodeResult(null);
      setScanFeedback('');
      setScanProgress(0);
      detectionCount.current = {};
      startScanner();
    }
  };
};
