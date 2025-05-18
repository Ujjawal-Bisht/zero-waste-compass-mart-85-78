
import { useState, useRef } from 'react';
import { toast } from 'sonner';

export function useVoiceRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  
  const startRecording = async () => {
    try {
      // Reset state
      audioChunks.current = [];
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      // Create media recorder
      const recorder = new MediaRecorder(stream);
      mediaRecorder.current = recorder;
      
      // Set up event handlers
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.current.push(e.data);
        }
      };
      
      recorder.onstop = () => {
        // Process the audio data
        processAudioToText();
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      // Start recording
      recorder.start();
      setIsRecording(true);
      toast.info("Voice recording started");
      
      // Auto-stop after 10 seconds as a safety measure
      setTimeout(() => {
        if (isRecording) {
          stopRecording();
        }
      }, 10000);
      
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Could not access microphone. Please check your permissions.");
      setIsRecording(false);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
      setIsRecording(false);
      toast.info("Voice recording stopped");
    }
  };
  
  const processAudioToText = () => {
    // In a real implementation, this would send the audio to a speech-to-text service
    // For now, we're just showing a success message
    toast.success("Voice input received");
    
    // Simulate a delay for processing
    setTimeout(() => {
      toast.info("Speech recognized: 'Tell me about sustainability features'");
    }, 1000);
  };
  
  return {
    isRecording,
    startRecording,
    stopRecording,
  };
}
