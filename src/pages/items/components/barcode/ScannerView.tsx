
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Flashlight, Camera, ZoomIn, ZoomOut, ImagePlus } from 'lucide-react';
import { toggleTorch } from './scannerUtils';
import { motion } from 'framer-motion';
import ScannerControls from './ScannerControls';
import ScanProgressBar from './ScanProgressBar';
import ScanFeedback from './ScanFeedback';
import { toast } from 'sonner';

interface ScannerViewProps {
  scannerRef: React.RefObject<HTMLDivElement>;
  scanLineRef: React.RefObject<HTMLDivElement>;
  scanFeedback: string;
  scanProgress: number;
  onStopScanner: () => void;
  onResetScanner: () => void;
  barcodeResult: string | null;
  scanStatus?: 'idle' | 'scanning' | 'success' | 'error';
}

const ScannerView: React.FC<ScannerViewProps> = ({
  scannerRef,
  scanLineRef,
  scanFeedback,
  scanProgress,
  onStopScanner,
  onResetScanner,
  barcodeResult,
  scanStatus = 'scanning'
}) => {
  // Advanced features state
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [currentCamera, setCurrentCamera] = useState('environment');
  
  // Check for multiple cameras on component mount
  React.useEffect(() => {
    const checkCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setHasMultipleCameras(videoDevices.length > 1);
      } catch (error) {
        console.error('Error checking for cameras:', error);
      }
    };
    
    checkCameras();
  }, []);
  
  const handleTorchToggle = async () => {
    const newStatus = !torchEnabled;
    const success = await toggleTorch(newStatus);
    if (success) {
      setTorchEnabled(newStatus);
      toast.success(newStatus ? "Flashlight turned on" : "Flashlight turned off");
    } else if (newStatus) {
      // Only show error if user was trying to enable the torch
      toast.error("Flashlight not supported on this device");
    }
  };
  
  const handleSwitchCamera = () => {
    const newCamera = currentCamera === 'environment' ? 'user' : 'environment';
    setCurrentCamera(newCamera);
    // In a real implementation, this would reconfigure the scanner
    // with the new camera facingMode
    toast.success(`Switched to ${newCamera === 'environment' ? 'back' : 'front'} camera`);
    
    // This would require a reset of the scanner with new settings
    onResetScanner();
  };
  
  const handleZoomIn = () => {
    if (zoomLevel < 5) {
      const newZoom = parseFloat((zoomLevel + 0.5).toFixed(1));
      setZoomLevel(newZoom);
      toast.success(`Zoom level: ${newZoom}x`);
      // In a real implementation, this would adjust the camera zoom
    }
  };
  
  const handleZoomOut = () => {
    if (zoomLevel > 1) {
      const newZoom = parseFloat((zoomLevel - 0.5).toFixed(1));
      setZoomLevel(newZoom);
      toast.success(`Zoom level: ${newZoom}x`);
      // In a real implementation, this would adjust the camera zoom
    }
  };
  
  const handleCaptureImage = () => {
    // In a real implementation, this would capture the current frame
    toast.success("Image captured");
  };

  // Determine feedback status based on scan state
  const getFeedbackStatus = () => {
    if (barcodeResult) return 'success';
    if (scanStatus === 'error') return 'error';
    if (scanProgress > 70) return 'warning';
    return 'processing';
  };

  return (
    <motion.div 
      className="relative w-full aspect-video bg-black rounded-lg overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}
    >
      <div 
        ref={scannerRef} 
        id="scanner"
        className="w-full h-full"
      >
        {/* Quagga will inject video here */}
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Scan target overlay with animated corners */}
        <div className="relative w-2/3 h-1/3 border-2 border-indigo-400/70 rounded-md">
          {/* Animated corners */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t-4 border-l-4 border-indigo-500 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-5 h-5 border-t-4 border-r-4 border-indigo-500 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-4 border-l-4 border-indigo-500 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-4 border-r-4 border-indigo-500 animate-pulse"></div>
        </div>
        
        {/* Enhanced scan line with gradient */}
        <div 
          ref={scanLineRef}
          className="absolute top-1/3 left-1/6 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-70 scan-line shadow-sm shadow-indigo-500/50 blur-[0.5px]"
        ></div>
      </div>
      
      {/* Zoom level indicator */}
      {zoomLevel > 1 && (
        <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-white font-medium">
          {zoomLevel}x
        </div>
      )}
      
      {/* Enhanced scanner controls */}
      <ScannerControls
        onStopScanner={onStopScanner}
        onResetScanner={onResetScanner}
        onToggleTorch={handleTorchToggle}
        onSwitchCamera={handleSwitchCamera}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onCaptureImage={handleCaptureImage}
        isDetected={!!barcodeResult}
        torchEnabled={torchEnabled}
        zoomLevel={zoomLevel}
        maxZoom={5}
        hasMultipleCameras={hasMultipleCameras}
      />
      
      {/* Enhanced progress bar */}
      <ScanProgressBar 
        progress={scanProgress} 
        showPercentage={scanProgress > 10 && scanProgress < 100} 
        indeterminate={scanProgress < 10}
        status={scanStatus}
      />
      
      {/* Enhanced status indicator */}
      <ScanFeedback 
        message={scanFeedback} 
        status={getFeedbackStatus()}
      />
    </motion.div>
  );
};

export default ScannerView;
