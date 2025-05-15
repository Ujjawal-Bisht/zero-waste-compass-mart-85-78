
import Quagga from 'quagga';

export const initializeScanner = (
  scannerRef: React.RefObject<HTMLDivElement>,
  onDetected: (result: any) => void,
  onProcessed: (result: any) => void,
  onError: (err: Error) => void,
  onInitSuccess?: () => void,
  enableTorch: boolean = false,
  deviceId?: string
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
            deviceId: deviceId ? { exact: deviceId } : undefined // Use specific device if available
          },
          area: { // Only consider the center part of the image
            top: "30%",
            right: "20%",
            left: "20%",
            bottom: "30%",
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

      // Draw focused box if result is found (enhanced with animation effects)
      if (result.codeResult && result.codeResult.code) {
        // Create gradient for detection box
        const gradient = drawingCtx.createLinearGradient(
          result.box.x, 
          result.box.y, 
          result.box.x + result.box.width, 
          result.box.y + result.box.height
        );
        gradient.addColorStop(0, '#4f46e5');
        gradient.addColorStop(1, '#8b5cf6');
        
        // Draw a more prominent box
        drawingCtx.strokeStyle = gradient;
        drawingCtx.lineWidth = 5;
        
        // Add a pulsing effect by varying opacity
        const currentTime = Date.now() % 1000;
        const opacity = 0.7 + 0.3 * Math.sin(currentTime / 1000 * Math.PI * 2);
        
        drawingCtx.strokeRect(result.box.x, result.box.y, result.box.width, result.box.height);
        
        // Add fancy text with the barcode number
        drawingCtx.font = 'bold 14px Arial';
        
        // Text background
        drawingCtx.fillStyle = 'rgba(99, 102, 241, 0.8)';
        const textPadding = 8;
        const textWidth = result.codeResult.code.length * 8 + textPadding * 2; // Approximate text width
        drawingCtx.fillRect(
          result.box.x, 
          result.box.y - 30, 
          textWidth, 
          24
        );
        
        // Arrow pointer
        drawingCtx.beginPath();
        drawingCtx.moveTo(result.box.x + textWidth/2 - 8, result.box.y - 6);
        drawingCtx.lineTo(result.box.x + textWidth/2 + 8, result.box.y - 6);
        drawingCtx.lineTo(result.box.x + textWidth/2, result.box.y);
        drawingCtx.closePath();
        drawingCtx.fill();
        
        // Text
        drawingCtx.fillStyle = 'white';
        drawingCtx.fillText(
          result.codeResult.code, 
          result.box.x + textPadding, 
          result.box.y - 14
        );
        
        // Add highlight behind the barcode
        drawingCtx.fillStyle = `rgba(99, 102, 241, ${opacity * 0.2})`;
        drawingCtx.fillRect(result.box.x, result.box.y, result.box.width, result.box.height);
      }
    }
  }
};

// Enhanced function to select the best camera
export const selectOptimalCamera = async (): Promise<string | undefined> => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
    
    if (videoDevices.length === 0) {
      return undefined;
    }
    
    // Try to find a back camera based on common naming patterns
    const backCameraKeywords = ['back', 'rear', 'environment', 'facing back'];
    
    for (const keyword of backCameraKeywords) {
      const matchingCamera = videoDevices.find(device => 
        device.label.toLowerCase().includes(keyword)
      );
      
      if (matchingCamera) {
        return matchingCamera.deviceId;
      }
    }
    
    // If no back camera found by name, use heuristics:
    // On mobile, the back camera is usually the last in the list
    if (videoDevices.length > 1 && /Mobi|Android/i.test(navigator.userAgent)) {
      return videoDevices[videoDevices.length - 1].deviceId;
    }
    
    // Fall back to the first camera
    return videoDevices[0].deviceId;
  } catch (error) {
    console.error("Error selecting camera:", error);
    return undefined;
  }
};

// Function to check and enhance camera capabilities
export const enhanceCameraCapabilities = async (stream: MediaStream) => {
  try {
    const videoTrack = stream.getVideoTracks()[0];
    if (!videoTrack) return;
    
    const capabilities = videoTrack.getCapabilities();
    const settings = videoTrack.getSettings();
    
    // Try to improve zoom for better barcode detection
    if (capabilities.zoom) {
      await videoTrack.applyConstraints({
        advanced: [{ zoom: Math.min(capabilities.zoom.max, 1.5) }]
      });
    }
    
    // Try to improve focus for better barcode detection
    if (capabilities.focusMode) {
      await videoTrack.applyConstraints({
        advanced: [{ focusMode: "continuous" }]
      });
    }
    
    // Improve sharpness if available
    if (capabilities.sharpness) {
      await videoTrack.applyConstraints({
        advanced: [{ sharpness: capabilities.sharpness.max }]
      });
    }
    
    return true;
  } catch (error) {
    console.log("Could not enhance camera capabilities:", error);
    return false;
  }
};
