
import React, { useState, useRef } from 'react';
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
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);
  
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

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordedChunks.current = [];
      
      const recorder = new MediaRecorder(stream);
      mediaRecorder.current = recorder;
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunks.current.push(e.data);
        }
      };
      
      recorder.onstop = async () => {
        const audioBlob = new Blob(recordedChunks.current, { type: 'audio/webm' });
        recordedChunks.current = [];
        
        // In a real app, you'd send this to a speech-to-text API
        // For now, let's simulate with a timeout and a placeholder message
        toast.info("Processing your voice message...");
        
        setTimeout(() => {
          const fakeTranscription = "How can I reduce my plastic usage at home?";
          setMessage(fakeTranscription);
          toast.success("Voice message processed!");
        }, 1500);
        
        // Release mic access
        stream.getTracks().forEach(track => track.stop());
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
          className={isRecording ? "bg-red-100 text-red-500 animate-pulse" : "bg-white"}
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
