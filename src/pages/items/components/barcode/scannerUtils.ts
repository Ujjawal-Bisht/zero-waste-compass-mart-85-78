
import Quagga from 'quagga';
import { selectOptimalCamera } from './utils/cameraUtils';

/**
 * Initialize the barcode scanner with the specified configuration
 */
export const initializeScanner = ({ 
  containerId, 
  onDetected, 
  onError 
}: { 
  containerId: string; 
  onDetected: (result: any) => void; 
  onError: (err: Error) => void 
}) => {
  try {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.getElementById(containerId) || undefined,
        constraints: {
          width: { min: 640 },
          height: { min: 480 },
          facingMode: "environment",
          aspectRatio: { min: 1, max: 2 }
        },
      },
      locator: {
        patchSize: "medium",
        halfSample: true
      },
      numOfWorkers: navigator.hardwareConcurrency || 4,
      decoder: {
        readers: [
          "code_128_reader",
          "ean_reader",
          "ean_8_reader",
          "code_39_reader",
          "code_39_vin_reader",
          "codabar_reader",
          "upc_reader",
          "upc_e_reader",
          "i2of5_reader"
        ]
      },
      locate: true
    }, (err) => {
      if (err) {
        onError(err);
        return;
      }
      
      console.log("Quagga initialized successfully");
      Quagga.start();
      Quagga.onDetected(onDetected);
    });
  } catch (error) {
    onError(error instanceof Error ? error : new Error('Failed to initialize scanner'));
  }
};

/**
 * Safely stop the scanner
 */
export const stopScanner = () => {
  try {
    if (Quagga) {
      Quagga.stop();
    }
  } catch (error) {
    console.error("Error stopping scanner:", error);
  }
};
