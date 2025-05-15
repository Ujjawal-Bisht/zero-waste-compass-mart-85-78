
import { useEffect } from 'react';

export const useScanProgress = (
  isScanning: boolean,
  setScanProgress: (value: React.SetStateAction<number>) => void,
  progressIntervalRef: React.MutableRefObject<number | null>
) => {
  // Manage scan progress animation
  useEffect(() => {
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
  }, [isScanning, setScanProgress, progressIntervalRef]);
};
