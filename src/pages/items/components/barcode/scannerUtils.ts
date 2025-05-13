
import Quagga from 'quagga';

export const initializeScanner = (
  scannerRef: React.RefObject<HTMLDivElement>,
  onDetected: (result: any) => void,
  onProcessed: (result: any) => void,
  onError: (err: Error) => void,
  onInitSuccess?: () => void,
  enableTorch: boolean = false
) => {
  if (scannerRef.current) {
    try {
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            width: { min: 640 },
            height: { min: 480 },
            facingMode: "environment", // Use the rear camera
            aspectRatio: { min: 1, max: 2 },
            torch: enableTorch, // Enable or disable flashlight
          },
        },
        locator: {
          patchSize: "medium",
          halfSample: true
        },
        numOfWorkers: navigator.hardwareConcurrency ? Math.min(navigator.hardwareConcurrency, 4) : 2,
        frequency: 15, // Increased frequency for faster detection
        decoder: {
          readers: [
            "ean_reader",
            "ean_8_reader", 
            "code_128_reader",
            "code_39_reader",
            "code_93_reader",
            "upc_reader",
            "upc_e_reader"
          ],
          multiple: false, // Focus on finding one barcode at a time
          debug: {
            showCanvas: true,
            showPatches: true,
            showFoundPatches: true,
            showSkeleton: true,
            showLabels: true,
            showPatchLabels: true,
            showRemainingPatchLabels: true
          }
        },
        locate: true,
        visual: {
          showPattern: true
        }
      }, (err) => {
        if (err) {
          onError(err);
          return;
        }
        
        try {
          // Start Quagga
          Quagga.start();

          // Set up barcode detection event
          Quagga.onDetected(onDetected);

          // Set up processing event to show scanning feedback
          Quagga.onProcessed(onProcessed);
          
          // Call success callback
          if (onInitSuccess) {
            onInitSuccess();
          }
        } catch (startError) {
          console.error("Error starting Quagga:", startError);
          onError(new Error("Failed to start the scanner"));
        }
      });
    } catch (initError) {
      console.error("Error during Quagga initialization:", initError);
      onError(new Error("Failed to initialize the scanner"));
    }
  }
};

// Helper function to toggle torch/flashlight
export const toggleTorch = (enable: boolean): boolean => {
  try {
    const track = Quagga.CameraAccess.getActiveTrack();
    if (track && typeof track.applyConstraints === 'function') {
      track.applyConstraints({
        advanced: [{ torch: enable }]
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error toggling torch:", error);
    return false;
  }
};

// Improved drawing function with better visual feedback
export const drawBarcodeBox = (result: any) => {
  if (!result) return;
  
  const drawingCtx = Quagga.canvas.ctx.overlay;
  const drawingCanvas = Quagga.canvas.dom.overlay;

  if (result && drawingCtx && drawingCanvas) {
    // Clear the canvas
    const width = parseInt(drawingCanvas.getAttribute("width") || "0");
    const height = parseInt(drawingCanvas.getAttribute("height") || "0");
    
    if (width && height) {
      drawingCtx.clearRect(0, 0, width, height);
    
      // Draw boxes for all potential barcodes (in yellow)
      if (result.boxes) {
        drawingCtx.strokeStyle = 'rgba(255, 204, 0, 0.8)';
        drawingCtx.lineWidth = 2;
        
        for (let box of result.boxes) {
          drawingCtx.beginPath();
          drawingCtx.moveTo(box[0][0], box[0][1]);
          drawingCtx.lineTo(box[1][0], box[1][1]);
          drawingCtx.lineTo(box[2][0], box[2][1]);
          drawingCtx.lineTo(box[3][0], box[3][1]);
          drawingCtx.lineTo(box[0][0], box[0][1]);
          drawingCtx.stroke();
        }
      }

      // Draw focused box if result is found (in green with animation effect)
      if (result.codeResult && result.codeResult.code) {
        // Draw a more prominent box
        drawingCtx.strokeStyle = '#00FF00';
        drawingCtx.lineWidth = 5;
        
        // Add a pulsing effect by varying opacity
        const currentTime = Date.now() % 1000;
        const opacity = 0.6 + 0.4 * Math.sin(currentTime / 1000 * Math.PI * 2);
        
        drawingCtx.strokeStyle = `rgba(0, 255, 0, ${opacity})`;
        drawingCtx.strokeRect(result.box.x, result.box.y, result.box.width, result.box.height);
        
        // Add text with the barcode number
        drawingCtx.font = '16px Arial';
        drawingCtx.fillStyle = 'white';
        drawingCtx.fillRect(result.box.x, result.box.y - 25, result.codeResult.code.length * 10 + 20, 25);
        drawingCtx.fillStyle = 'black';
        drawingCtx.fillText(result.codeResult.code, result.box.x + 10, result.box.y - 7);
        
        // Add highlight behind the barcode
        drawingCtx.fillStyle = 'rgba(0, 255, 0, 0.2)';
        drawingCtx.fillRect(result.box.x, result.box.y, result.box.width, result.box.height);
      }
    }
  }
};

// New function to improve camera selection
export const selectOptimalCamera = async (): Promise<string | undefined> => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
    
    // Try to find a back camera
    const backCamera = videoDevices.find(device => 
      device.label.toLowerCase().includes('back') || 
      device.label.toLowerCase().includes('rear')
    );
    
    if (backCamera) {
      return backCamera.deviceId;
    }
    
    // If no back camera found, use the last device (often the back camera on mobile)
    if (videoDevices.length > 1) {
      return videoDevices[videoDevices.length - 1].deviceId;
    }
    
    // Fall back to the first camera
    if (videoDevices.length > 0) {
      return videoDevices[0].deviceId;
    }
    
    return undefined;
  } catch (error) {
    console.error("Error selecting camera:", error);
    return undefined;
  }
};
