
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { MessageCategory } from '@/types/chat';
import { toast } from 'sonner';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  conversationContext?: MessageCategory;
  suggestedQuestions: string[];
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  conversationContext = 'general',
  suggestedQuestions,
  searchQuery = '',
  onSearchChange
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const audioStream = useRef<MediaStream | null>(null);
  
  // Suggestions by category
  const defaultSuggestions = {
    general: [
      "How does Zero Waste Mart work?", 
      "Where are nearby drop-offs?", 
      "What impact have we made?", 
      "How to donate items?"
    ],
    sustainability: [
      "Tips for sustainable living?",
      "How to start composting?",
      "Zero waste kitchen ideas?",
      "Eco-friendly alternatives?"
    ],
    climate: [
      "How does reusing help climate?",
      "Carbon footprint of recycling?",
      "Climate impact of food waste?",
      "Individual vs corporate impact?"
    ],
    personal: [
      "Track my waste reduction?",
      "Start my zero waste journey?",
      "Find local sustainability groups?",
      "Create sustainable habits?"
    ]
  };

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

  // Get suggestions based on context or use provided ones
  const getSuggestions = () => {
    if (suggestedQuestions.length > 0) {
      return suggestedQuestions;
    }
    
    // Fallback to default suggestions
    return defaultSuggestions[conversationContext as keyof typeof defaultSuggestions] || 
           defaultSuggestions.general;
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Audio visualization setup
  const setupAudioAnalyser = (stream: MediaStream) => {
    if (!audioContext.current) return;
    
    const source = audioContext.current.createMediaStreamSource(stream);
    analyser.current = audioContext.current.createAnalyser();
    analyser.current.fftSize = 256;
    source.connect(analyser.current);
    
    // Note: We don't connect to destination to avoid feedback
    // source.connect(audioContext.current.destination);
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
    // Here we're simulating the response with predefined messages based on context
    
    toast.info("Processing your voice message...");
    
    // Simulate processing time
    setTimeout(() => {
      // Generate contextual transcription based on current conversation context
      let fakeTranscription = "";
      
      switch(conversationContext) {
        case 'sustainability':
          fakeTranscription = "How can I reduce plastic waste in my daily routine?";
          break;
        case 'climate':
          fakeTranscription = "What's the carbon footprint of recycling compared to composting?";
          break;
        case 'tracking':
          fakeTranscription = "Where is my package right now?";
          break;
        case 'order':
          fakeTranscription = "I need to change my delivery address for order ZWM-7829.";
          break;
        case 'product':
          fakeTranscription = "Are your bamboo products sustainably sourced?";
          break;
        case 'invoice':
          fakeTranscription = "Can I get a receipt for my last purchase?";
          break;
        case 'personal':
          fakeTranscription = "How much waste have I saved this month?";
          break;
        default:
          fakeTranscription = "Tell me more about Zero Waste Mart's sustainability initiatives.";
      }
      
      setMessage(fakeTranscription);
      toast.success("Voice message processed!");
    }, 1200);
    
    // In a production environment, you would use a real speech-to-text API like:
    /*
    const formData = new FormData();
    formData.append('audio', audioBlob);
    
    try {
      const response = await fetch('/api/speech-to-text', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const { text } = await response.json();
        setMessage(text);
        toast.success("Voice message processed!");
      } else {
        toast.error("Failed to process voice message");
      }
    } catch (error) {
      console.error('Speech to text error:', error);
      toast.error("Could not process voice message");
    }
    */
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="p-3 border-t bg-gray-50">
      <div className="flex gap-2 items-center">
        {showSearch ? (
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search conversation..."
            className="flex-1 border-gray-200 focus:border-zwm-primary shadow-sm"
          />
        ) : (
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about sustainability..."
            className="flex-1 border-gray-200 focus:border-zwm-primary shadow-sm"
          />
        )}
        
        <Button
          onClick={toggleSearch}
          variant="outline"
          size="icon"
          className="bg-white"
          title="Search conversation"
        >
          <Search size={18} />
        </Button>
        
        <Button
          onClick={toggleRecording}
          variant="outline"
          size="icon"
          className={isRecording ? "bg-red-100 text-red-500 recording-pulse" : "bg-white"}
          title={isRecording ? "Stop recording" : "Start voice message"}
        >
          {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
        </Button>
        
        <Button 
          onClick={handleSendMessage} 
          className="zwm-gradient"
          disabled={!message.trim() || showSearch}
        >
          <Send size={18} />
        </Button>
      </div>
      
      <div className="text-center mt-2">
        <Collapsible>
          <CollapsibleTrigger className="text-xs text-gray-500 hover:text-zwm-primary flex justify-center w-full">
            {showSearch ? "Close search" : "Suggested questions"}
          </CollapsibleTrigger>
          <CollapsibleContent>
            {!showSearch && (
              <div className="pt-2 pb-1">
                <div className="grid grid-cols-2 gap-2">
                  {getSuggestions().map(q => (
                    <Button 
                      key={q} 
                      variant="outline" 
                      size="sm"
                      className="text-xs h-auto py-1 justify-start text-left"
                      onClick={() => {
                        setMessage(q);
                      }}
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default ChatInput;
