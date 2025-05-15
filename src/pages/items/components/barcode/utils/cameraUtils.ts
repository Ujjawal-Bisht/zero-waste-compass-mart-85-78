
/**
 * Attempt to find a video input device with the matching facingMode
 * @param facingMode 
 * @returns 
 */
export const findCameraDevice = async (facingMode: string): Promise<MediaDeviceInfo | undefined> => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.find(device => device.kind === 'videoinput' && device.label.toLowerCase().includes(facingMode));
}

/**
 * Gets the constraints for the camera
 * @param deviceId 
 * @param facingMode 
 * @returns 
 */
export const getConstraints = (deviceId?: string, facingMode?: string): MediaStreamConstraints => {
  const video: MediaTrackConstraints = {};

  if (deviceId) {
    video.deviceId = deviceId;
  } else if (facingMode) {
    // Prefer user facing camera in mobile
    video.facingMode = facingMode;
  }

  return {
    video,
  };
}

/**
 * Toggles the camera between front and back
 * @param setFacingMode 
 * @returns 
 */
export const flipCamera = (setFacingMode: React.Dispatch<React.SetStateAction<string>>) => {
  setFacingMode((prevFacingMode: string) => (prevFacingMode === 'user' ? 'environment' : 'user'));
};

/**
 * Configure advanced camera settings for the scanner
 * @param config Scanner configuration
 */
export const configureCameraSettings = async (config: any): Promise<any> => {
  try {
    const deviceId = await selectOptimalCamera();
    if (deviceId) {
      config.inputStream.constraints.deviceId = deviceId;
    }
    return config;
  } catch (error) {
    console.error('Error configuring camera settings:', error);
    return config; // Return original config if there's an error
  }
};

/**
 * Select the optimal camera for barcode scanning (usually back camera)
 */
export const selectOptimalCamera = async (): Promise<string | undefined> => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter(device => device.kind === 'videoinput');
    
    // Try to find back camera
    const backCamera = cameras.find(camera => 
      camera.label.toLowerCase().includes('back') || 
      camera.label.toLowerCase().includes('rear') ||
      camera.label.toLowerCase().includes('environment')
    );
    
    return backCamera?.deviceId;
  } catch (error) {
    console.error('Error selecting optimal camera:', error);
    return undefined;
  }
};

/**
 * Check if the browser supports the MediaDevices API
 * @returns boolean
 */
export const hasMediaDevices = (): boolean => {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

/**
 * Check if the browser supports the Torch API
 * @returns boolean
 */
export const hasTorch = (): boolean => {
  let hasIt = false;

  try {
    // We need to ensure we're not accessing a global stream variable
    // that might not exist
    const videoTracks = document.querySelector('video')?.srcObject as MediaStream;
    const track = videoTracks?.getVideoTracks()[0];

    if (track) {
      // Use capabilities to check for torch support
      const capabilities = track.getCapabilities();
      // Using a type assertion to safely check if torch exists
      hasIt = !!(capabilities as any)?.torch;
    }
  } catch (e) {
    console.warn("Can't access to track settings", e);
  }

  return hasIt;
}

/**
 * Toggle the torch/flashlight of the active camera if available
 */
export const toggleTorch = async (enable: boolean): Promise<boolean> => {
  try {
    const stream = document.querySelector('video')?.srcObject as MediaStream;
    const track = stream?.getVideoTracks()[0];
    
    if (!track || !('getCapabilities' in track)) {
      console.warn('This browser does not support torch control');
      return false;
    }

    const capabilities = track.getCapabilities();
    
    // Check if torch is available using type assertion
    if (!((capabilities as any)?.torch)) {
      console.warn('This device does not have torch capability');
      return false;
    }

    // Use the applyConstraints method with type assertion
    await track.applyConstraints({
      advanced: [{ torch: enable } as any]
    });
    
    return true;
  } catch (err) {
    console.error('Error toggling torch:', err);
    return false;
  }
};
