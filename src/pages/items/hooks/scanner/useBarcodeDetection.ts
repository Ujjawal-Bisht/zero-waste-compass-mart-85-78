
import { useState, useRef } from 'react';

export const useBarcodeDetection = () => {
  const [barcodeResult, setBarcodeResult] = useState<string | null>(null);
  const [scanFeedback, setScanFeedback] = useState('');
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const detectionCount = useRef<Record<string, number>>({});

  const resetDetection = () => {
    setBarcodeResult(null);
    setScanFeedback('');
    setScanProgress(0);
    setScanStatus('idle');
    detectionCount.current = {};
  };

  const incrementDetectionCount = (code: string): number => {
    detectionCount.current[code] = (detectionCount.current[code] || 0) + 1;
    return detectionCount.current[code];
  };

  return {
    barcodeResult,
    setBarcodeResult,
    scanFeedback,
    setScanFeedback,
    scanProgress,
    setScanProgress,
    scanStatus,
    setScanStatus,
    detectionCount,
    resetDetection,
    incrementDetectionCount
  };
};
