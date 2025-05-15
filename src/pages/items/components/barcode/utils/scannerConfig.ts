
import Quagga from 'quagga';

export interface ScannerConfig {
  inputStream: {
    name: string;
    type: string;
    target: string | HTMLElement;
    constraints: {
      width?: { min: number } | number;
      height?: { min: number } | number;
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
 * Creates a default scanner configuration
 */
export const createDefaultConfig = (containerId: string): ScannerConfig => {
  return {
    inputStream: {
      name: 'Live',
      type: 'LiveStream',
      target: document.querySelector(`#${containerId}`) as HTMLElement || containerId,
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
};
