
/**
 * Main scanner utilities file that exports all functionality
 * This file serves as the entry point for scanner utilities
 */

// Export everything from the utility files
export { initializeScanner, stopScanner } from './utils/scannerInitializer';
export { selectOptimalCamera, toggleTorch } from './utils/cameraUtils';
export { drawDetectedBarcode, applyVisualEffect, applyHapticFeedback } from './utils/visualFeedback';
export { createDefaultConfig, type ScannerConfig } from './utils/scannerConfig';
