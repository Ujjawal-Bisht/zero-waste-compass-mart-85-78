
/**
 * Draw a highlight box around the detected barcode.
 */
export const drawDetectedBarcode = (box: { x: number; y: number }[]): void => {
  const canvas = document.querySelector('canvas.drawingBuffer') as HTMLCanvasElement | null;
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
};

/**
 * Apply a visual effect to the scanner container
 */
export const applyVisualEffect = (containerId: string, effectClass: string, duration: number = 500): void => {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.classList.add(effectClass);
  setTimeout(() => container.classList.remove(effectClass), duration);
};

/**
 * Apply haptic feedback if supported by the device
 */
export const applyHapticFeedback = (pattern: number[] = [100]): void => {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};
