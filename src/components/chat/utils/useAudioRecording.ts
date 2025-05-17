
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

export const useAudioRecording = (onTranscriptionComplete: (text: string) => void) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const audioStream = useRef<MediaStream | null>(null);

  // Initialize audio context
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    return () => {
      if (audioStream.current) {
        audioStream.current.getTracks().forEach(track => track.stop());
      }
      if (audioContext.current && audioContext.current.state !== 'closed') {
        audioContext.current.close();
      }
    };
  }, []);

  // Audio visualization setup
  const setupAudioAnalyser = (stream: MediaStream) => {
    if (!audioContext.current) return;
    
    const source = audioContext.current.createMediaStreamSource(stream);
    analyser.current = audioContext.current.createAnalyser();
    analyser.current.fftSize = 256;
    source.connect(analyser.current);
  };

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      await startRecording();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      audioStream.current = stream;
      setupAudioAnalyser(stream);
      recordedChunks.current = [];
      
      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') 
          ? 'audio/webm' 
          : 'audio/mp3'
      });
      
      mediaRecorder.current = recorder;
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunks.current.push(e.data);
        }
      };
      
      recorder.onstop = async () => {
        const audioBlob = new Blob(recordedChunks.current, { 
          type: MediaRecorder.isTypeSupported('audio/webm') 
            ? 'audio/webm' 
            : 'audio/mp3'
        });
        
        setAudioBlob(audioBlob);
        recordedChunks.current = [];
        
        // Process the audio
        processAudioToText(audioBlob);
        
        // Release mic access
        if (audioStream.current) {
          audioStream.current.getTracks().forEach(track => track.stop());
        }
      };
      
      recorder.start();
      setIsRecording(true);
      toast.info("Recording started... Speak now");
      
    } catch (err) {
      console.error("Error accessing microphone:", err);
      toast.error("Could not access microphone. Please check your permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      toast.info("Recording stopped, processing...");
    }
  };
  
  const processAudioToText = async (audioBlob: Blob) => {
    // In a real application, you would send this to a Speech-to-Text API
    // Here we're simulating the response with predefined messages
    
    toast.info("Processing your voice message...");
    
    // Simulate processing time
    setTimeout(() => {
      // For the simulation, we pass a generic transcription to the callback
      onTranscriptionComplete("Tell me more about Zero Waste Mart's sustainability initiatives.");
      toast.success("Voice message processed!");
    }, 1200);
    
    // In a production environment, you would use a real speech-to-text API
  };

  return {
    isRecording,
    toggleRecording
  };
};
