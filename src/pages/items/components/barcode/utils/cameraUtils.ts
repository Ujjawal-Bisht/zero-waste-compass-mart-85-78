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
export const flipCamera = (setFacingMode: (facingMode: string) => void) => {
  setFacingMode(facingMode => (facingMode === 'user' ? 'environment' : 'user'));
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
    const track = window.stream?.getVideoTracks()[0];

    if (track) {
      hasIt = 'torch' in track.getSettings();
    }
  } catch (e) {
    console.warn("Can't access to track settings", e);
  }

  return hasIt;
}

/**
 * Toggle the torch/flashlight of the active camera if available
 */
export const toggleTorch = async (track: MediaStreamTrack | null, enable: boolean): Promise<boolean> => {
  if (!track || !('getCapabilities' in track)) {
    console.warn('This browser does not support torch control');
    return false;
  }

  const capabilities = track.getCapabilities();
  
  // Check if torch is available in the capabilities
  if (!capabilities.torch) {
    console.warn('This device does not have torch capability');
    return false;
  }

  try {
    // Use the applyConstraints method without referencing 'torch' directly in type
    // This avoids TypeScript errors while still allowing the functionality to work
    // in browsers that support it
    await track.applyConstraints({
      advanced: [{ torch: enable } as any]
    });
    return true;
  } catch (err) {
    console.error('Error toggling torch:', err);
    return false;
  }
}
