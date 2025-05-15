
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import IdleView from "./IdleView";
import ScannerView from "./ScannerView";
import { useBarcodeScanner } from "../../hooks/useBarcodeScanner";

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
  const [view, setView] = useState<"idle" | "scanning">("idle");

  const {
    isScanning,
    setIsScanning,
    barcodeResult,
    scanFeedback,
    scanProgress,
    scannerRef,
    scanLineRef,
    startScanner,
    stopScanner,
    resetScanner
  } = useBarcodeScanner(onBarcodeDetected);

  // Reset to idle view when dialog closes
  useEffect(() => {
    if (!isOpen) {
      stopScanner();
      setView("idle");
    }
  }, [isOpen, stopScanner]);

  const handleStartScanner = () => {
    setView("scanning");
    setIsScanning(true);
    startScanner();
  };

  const handleStopScanner = () => {
    stopScanner();
    setView("idle");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {view === "idle" ? "Scan Product Barcode" : "Scanning Barcode"}
          </DialogTitle>
        </DialogHeader>

        <motion.div
          layout
          className="relative rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {view === "idle" ? (
            <IdleView onStartScanner={handleStartScanner} />
          ) : (
            <ScannerView
              scannerRef={scannerRef}
              scanLineRef={scanLineRef}
              scanFeedback={scanFeedback}
              scanProgress={scanProgress}
              onStopScanner={handleStopScanner}
              onResetScanner={resetScanner}
              barcodeResult={barcodeResult}
            />
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default BarcodeScannerDialog;
