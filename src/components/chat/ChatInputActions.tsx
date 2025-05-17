
import React from 'react';
import { Send, Mic, MicOff, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInputActionsProps {
  showSearch: boolean;
  isRecording: boolean;
  message: string;
  toggleSearch: () => void;
  toggleRecording: () => void;
  handleSendMessage: () => void;
}

const ChatInputActions: React.FC<ChatInputActionsProps> = ({
  showSearch,
  isRecording,
  message,
  toggleSearch,
  toggleRecording,
  handleSendMessage
}) => {
  return (
    <>
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
    </>
  );
};

export default ChatInputActions;
