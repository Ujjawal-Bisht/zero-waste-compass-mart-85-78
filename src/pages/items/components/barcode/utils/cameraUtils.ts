
/**
 * Utilities for camera handling and device selection
 */

/**
 * Attempt to select the optimal camera for barcode scanning
 * Returns the selected camera ID or null if not available
 */
export const selectOptimalCamera = async (): Promise<string | null> => {
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
        return backCamera.deviceId;
      }
    }
    
    // Try to get camera capabilities for better configuration
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const tracks = stream.getVideoTracks();
    
    if (tracks.length > 0) {
      // Stop the test stream
      tracks.forEach(track => track.stop());
      
      // Return the device ID of the first track
      return tracks[0].getSettings().deviceId || null;
    }
    
    return null;
  } catch (error) {
    console.warn('Could not select optimal camera:', error);
    // Fallback to default camera selection
    return null;
  }
};

/**
 * Configure camera settings based on capabilities
 */
export const configureCameraSettings = async (config: any): Promise<void> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const tracks = stream.getVideoTracks();
    
    if (tracks.length > 0) {
      const capabilities = tracks[0].getCapabilities();
      
      // Configuration using camera capabilities (not all browsers support these)
      try {
        if (capabilities && 'focusMode' in capabilities) {
          if (config && config.inputStream && config.inputStream.constraints) {
            // We need to use a different way to set advanced constraints
            // as the 'advanced' property doesn't exist directly on constraints object
            const enhancedConstraints = {
              ...config.inputStream.constraints,
              advanced: [{ focusMode: 'continuous' }]
            };
            
            // Replace constraints with enhanced version
            config.inputStream.constraints = enhancedConstraints;
          }
        }
      } catch (e) {
        console.warn('Could not set advanced camera features:', e);
      }
      
      // Stop the test stream
      tracks.forEach(track => track.stop());
    }
  } catch (error) {
    console.warn('Error configuring camera:', error);
  }
};

/**
 * Toggle the torch/flashlight if the device supports it
 */
export const toggleTorch = async (on: boolean): Promise<boolean> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: 'environment' } 
    });
    const track = stream.getVideoTracks()[0];
    
    // Check if torch is supported
    const capabilities = track.getCapabilities();
    
    // Only proceed if the torch capability is available
    if (!capabilities || !('torch' in capabilities)) {
      console.log('Torch not supported on this device');
      return false;
    }
    
    // Use the constraint as a custom setting since TypeScript doesn't recognize torch
    // @ts-ignore - Torch is a valid constraint in many mobile browsers but not in the TypeScript definitions
    await track.applyConstraints({
      advanced: [{ torch: on }]
    });
    
    return true;
  } catch (error) {
    console.error('Error toggling torch:', error);
    return false;
  }
};
