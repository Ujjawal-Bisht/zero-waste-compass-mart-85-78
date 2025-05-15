
import Quagga from 'quagga';
import { selectOptimalCamera, toggleTorch } from './utils/cameraUtils';

/**
 * Initialize the barcode scanner with the specified configuration
 */
export const initializeScanner = ({ 
  containerId, 
  onDetected, 
  onError,
  format = 'all',
  resolution = 'hd',
  frequency = 10
}: { 
  containerId: string; 
  onDetected: (result: any) => void; 
  onError: (err: Error) => void;
  format?: string;
  resolution?: string;
  frequency?: number;
}) => {
  try {
    // Configure resolution constraints based on settings
    const resolutionConstraints = (() => {
      switch(resolution) {
        case 'sd':
          return { width: { min: 640 }, height: { min: 480 } };
        case 'hd':
          return { width: { min: 1280 }, height: { min: 720 } };
        case 'fullhd':
          return { width: { min: 1920 }, height: { min: 1080 } };
        default:
          return { width: { min: 1280 }, height: { min: 720 } };
      }
    })();
    
    // Configure barcode readers based on format
    const readers = (() => {
      switch(format) {
        case 'ean':
          return ['ean_reader', 'ean_8_reader', 'upc_reader', 'upc_e_reader'];
        case 'code128':
          return ['code_128_reader'];
        case 'qrcode':
          return ['qrcode_reader'];
        default:
          return [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader",
            "i2of5_reader"
          ];
      }
    })();

    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.getElementById(containerId) || undefined,
        constraints: {
          ...resolutionConstraints,
          facingMode: "environment",
          aspectRatio: { min: 1, max: 2 }
        },
      },
      locator: {
        patchSize: "medium",
        halfSample: true
      },
      numOfWorkers: navigator.hardwareConcurrency || 4,
      frequency: frequency, // Use custom scan frequency
      decoder: {
        readers
      },
      locate: true
    }, (err) => {
      if (err) {
        console.error("Quagga initialization error:", err);
        onError(err);
        return;
      }
      
      console.log("Quagga initialized successfully with format:", format, "resolution:", resolution);
      Quagga.start();
      Quagga.onDetected(onDetected);
      
      // Set up processing feedback
      Quagga.onProcessed((result) => {
        const canvas = document.querySelector('canvas.drawingBuffer');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Draw box around potential barcode
        if (result && result.boxes) {
          drawBoundingBox(result, ctx);
        }
        
        // If barcode detected
        if (result && result.codeResult && result.codeResult.code) {
          // Add highlighting logic
        }
      });
    });
  } catch (error) {
    console.error("Error initializing scanner:", error);
    onError(error instanceof Error ? error : new Error('Failed to initialize scanner'));
  }
};

/**
 * Draw bounding box around potential barcode
 */
const drawBoundingBox = (result: any, ctx: CanvasRenderingContext2D) => {
  if (result.boxes) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    const hasResult = result.codeResult && result.codeResult.code;
    
    for (const box of result.boxes) {
      if (hasResult && box !== result.box) {
        continue;
      }
      
      ctx.beginPath();
      ctx.lineWidth = hasResult ? 4 : 2;
      ctx.strokeStyle = hasResult ? 'rgba(16, 185, 129, 0.8)' : 'rgba(99, 102, 241, 0.5)';
      
      // Draw box
      ctx.moveTo(box[0][0], box[0][1]);
      ctx.lineTo(box[1][0], box[1][1]);
      ctx.lineTo(box[2][0], box[2][1]);
      ctx.lineTo(box[3][0], box[3][1]);
      ctx.lineTo(box[0][0], box[0][1]);
      ctx.stroke();
    }
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

/**
 * Take a snapshot from the camera
 */
export const takeSnapshot = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const video = document.querySelector('video');
      if (!video) {
        reject(new Error('No video element found'));
        return;
      }
      
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL);
      
    } catch (error) {
      reject(error);
    }
  });
};

// Re-export functions from cameraUtils to maintain API
export { selectOptimalCamera, toggleTorch };
