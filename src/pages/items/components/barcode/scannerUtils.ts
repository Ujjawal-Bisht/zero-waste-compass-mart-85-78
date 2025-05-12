
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
        numOfWorkers: navigator.hardwareConcurrency || 2,
        frequency: 10,
        decoder: {
          readers: [
            "ean_reader",
            "ean_8_reader", 
            "code_128_reader",
            "code_39_reader",
            "code_93_reader",
            "upc_reader",
            "upc_e_reader"
          ]
        },
        locate: true
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
    
      // Draw box if barcode is detected
      if (result.boxes) {
        drawingCtx.strokeStyle = 'green';
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

      // Draw focused box if result is found
      if (result.codeResult && result.codeResult.code) {
        drawingCtx.strokeStyle = '#00FF00';
        drawingCtx.lineWidth = 5;
        drawingCtx.strokeRect(result.box.x, result.box.y, result.box.width, result.box.height);
      }
    }
  }
};
