
import Quagga from 'quagga';

interface ScannerOptions {
  containerId: string;
  onDetected: (code: string) => void;
  onError: (error: Error) => void;
}

interface ScannerConfig {
  inputStream: {
    name: string;
    type: string;
    target: string | HTMLElement;
    constraints: {
      width?: number;
      height?: number;
      facingMode?: string;
      deviceId?: string;
      aspectRatio?: { min: number; max: number };
      frameRate?: { ideal: number };
    };
    singleChannel?: boolean;
  };
  locator: {
    patchSize: string;
    halfSample: boolean;
  };
  decoder: {
    readers: string[];
  };
  locate: boolean;
  frequency: number;
}

/**
 * Initialize the barcode scanner with the given options.
 */
export const initializeScanner = async (options: ScannerOptions): Promise<void> => {
  try {
    // Get available video devices to see if we need to request permission
    await navigator.mediaDevices.getUserMedia({ video: true });
    
    // Initialize Quagga with configuration
    const config: ScannerConfig = {
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: document.querySelector(`#${options.containerId}`) || options.containerId,
        constraints: {
          width: { min: 640 },
          height: { min: 480 },
          aspectRatio: { min: 1, max: 2 },
          facingMode: 'environment', // Use back camera on mobile devices
          frameRate: { ideal: 25 }
        },
        singleChannel: false
      },
      locator: {
        patchSize: 'medium',
        halfSample: true
      },
      decoder: {
        readers: [
          'code_128_reader',
          'ean_reader',
          'ean_8_reader',
          'code_39_reader',
          'code_93_reader',
          'upc_reader',
          'upc_e_reader',
          'codabar_reader'
        ]
      },
      locate: true,
      frequency: 10
    };

    // Check for preferred devices and try to select a camera
    await selectOptimalCamera(config);

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
 * Attempt to select the optimal camera for barcode scanning
 */
async function selectOptimalCamera(config: ScannerConfig) {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
    
    // If there are multiple cameras, prefer back camera for mobile devices
    if (videoDevices.length > 1) {
      // Try to find a back camera by looking for common naming patterns
      const backCameraKeywords = ['back', 'environment', 'rear'];
      const backCamera = videoDevices.find(device => 
        backCameraKeywords.some(keyword => 
          device.label.toLowerCase().includes(keyword)
        )
      );
      
      if (backCamera) {
        config.inputStream.constraints.deviceId = backCamera.deviceId;
      }
    }
    
    // Try to get camera capabilities for better configuration
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const tracks = stream.getVideoTracks();
    
    if (tracks.length > 0) {
      const capabilities = tracks[0].getCapabilities();
      
      // Configuration using camera capabilities (not all browsers support these)
      try {
        // Handle focus mode if available
        if ('focusMode' in capabilities) {
          // @ts-ignore - focusMode is not in TypeScript definitions but may be available
          config.inputStream.constraints.advanced = [
            { focusMode: 'continuous' }
          ];
        }
      } catch (e) {
        console.warn('Could not set advanced camera features:', e);
      }
      
      // Stop the test stream
      tracks.forEach(track => track.stop());
    }
    
  } catch (error) {
    console.warn('Could not select optimal camera:', error);
    // Fallback to default camera selection
  }
}

/**
 * Stop the barcode scanner.
 */
export const stopScanner = (): void => {
  Quagga.stop();
};

/**
 * Draw a highlight box around the detected barcode.
 */
function drawDetectedBarcode(box: { x: number; y: number }[]) {
  const canvas = document.querySelector('canvas.drawingBuffer');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // Draw the detected barcode area
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(0, 255, 0, 0.7)';
  ctx.moveTo(box[0].x, box[0].y);
  box.forEach((point) => {
    ctx.lineTo(point.x, point.y);
  });
  ctx.lineTo(box[0].x, box[0].y);
  ctx.stroke();
  
  // Add some visual feedback that lasts briefly
  setTimeout(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 300);
}
