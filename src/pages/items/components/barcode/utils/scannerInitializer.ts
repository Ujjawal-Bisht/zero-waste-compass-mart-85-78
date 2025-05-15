
import Quagga from 'quagga';
import { createDefaultConfig, ScannerConfig } from './scannerConfig';
import { configureCameraSettings } from './cameraUtils';
import { drawDetectedBarcode } from './visualFeedback';

interface ScannerOptions {
  containerId: string;
  onDetected: (code: string) => void;
  onError: (error: Error) => void;
}

/**
 * Initialize the barcode scanner with the given options.
 */
export const initializeScanner = async (options: ScannerOptions): Promise<void> => {
  try {
    // Get available video devices to see if we need to request permission
    await navigator.mediaDevices.getUserMedia({ video: true });
    
    // Initialize Quagga with configuration
    const config = createDefaultConfig(options.containerId);
    
    // Apply advanced camera settings if possible
    await configureCameraSettings(config);

    Quagga.init(config, (err) => {
      if (err) {
        console.error('Error initializing Quagga:', err);
        options.onError(new Error('Could not initialize barcode scanner'));
        return;
      }
      
      Quagga.start();
      
      // Listen for barcode detection events
      Quagga.onDetected((result) => {
        const code = result.codeResult.code;
        if (code) {
          options.onDetected(code);
          
          // Highlight the detected barcode area
          if (result.box) {
            drawDetectedBarcode(result.box);
          }
        }
      });

      // Add processing feedback
      Quagga.onProcessed((result) => {
        if (result && result.codeResult && result.codeResult.code) {
          // Visual feedback when a barcode is being processed
          const container = document.getElementById(options.containerId);
          if (container) {
            container.classList.add('barcode-detected');
            setTimeout(() => container.classList.remove('barcode-detected'), 500);
          }
        }
      });
    });
  } catch (error) {
    console.error('Error initializing Quagga:', error);
    options.onError(error instanceof Error ? error : new Error('Could not access camera'));
  }
};

/**
 * Stop the barcode scanner.
 */
export const stopScanner = (): void => {
  Quagga.stop();
};
