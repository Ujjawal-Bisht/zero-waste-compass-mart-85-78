
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, RefreshCw, ZoomIn, ZoomOut, Flashlight, Camera, ImagePlus } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScannerControlsProps {
  onResetScanner: () => void;
  onStopScanner: () => void;
  onToggleTorch?: () => void;
  onSwitchCamera?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onCaptureImage?: () => void;
  isDetected: boolean;
  torchEnabled?: boolean;
  zoomLevel?: number;
  maxZoom?: number;
  hasMultipleCameras?: boolean;
}

const ScannerControls: React.FC<ScannerControlsProps> = ({
  onResetScanner,
  onStopScanner,
  onToggleTorch,
  onSwitchCamera,
  onZoomIn,
  onZoomOut,
  onCaptureImage,
  isDetected,
  torchEnabled = false,
  zoomLevel = 1,
  maxZoom = 5,
  hasMultipleCameras = false
}) => {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
      <div className="flex gap-2 justify-end">
        {isDetected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="scanner-button bg-indigo-500 text-white hover:bg-indigo-600"
              onClick={onResetScanner}
              title="Scan Again"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              <span>Scan Again</span>
            </Button>
          </motion.div>
        )}
        
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="scanner-button bg-white/90 backdrop-blur-sm"
            onClick={onStopScanner}
          >
            <X className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      {/* Extended controls */}
      <div className="flex gap-2 justify-end mt-2">
        {onToggleTorch && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={`scanner-button bg-white/90 backdrop-blur-sm ${torchEnabled ? 'ring-2 ring-yellow-400' : ''}`}
              onClick={onToggleTorch}
              title={torchEnabled ? "Turn off flashlight" : "Turn on flashlight"}
            >
              <Flashlight className={`h-4 w-4 ${torchEnabled ? 'text-yellow-400' : ''}`} />
            </Button>
          </motion.div>
        )}

        {hasMultipleCameras && onSwitchCamera && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="scanner-button bg-white/90 backdrop-blur-sm"
              onClick={onSwitchCamera}
              title="Switch Camera"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {onZoomIn && onZoomOut && (
          <>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="scanner-button bg-white/90 backdrop-blur-sm"
                onClick={onZoomOut}
                disabled={zoomLevel <= 1}
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="scanner-button bg-white/90 backdrop-blur-sm"
                onClick={onZoomIn}
                disabled={zoomLevel >= maxZoom}
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </motion.div>
          </>
        )}

        {onCaptureImage && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="scanner-button bg-white/90 backdrop-blur-sm"
              onClick={onCaptureImage}
              title="Capture Image"
            >
              <ImagePlus className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ScannerControls;
