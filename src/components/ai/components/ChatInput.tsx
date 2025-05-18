
import React from 'react';
import { Search, Send, Mic } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  handleSendMessage: () => void;
  isProcessing: boolean;
  isSearching: boolean;
  toggleSearch: () => void;
  startRecording: () => void;
  isRecording: boolean;
  stopRecording: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  setInputValue,
  handleKeyPress,
  handleSendMessage,
  isProcessing,
  isSearching,
  toggleSearch,
  startRecording,
  isRecording,
  stopRecording
}) => {
  return (
    <div className="p-3 border-t flex items-end gap-2 bg-white">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Message ZeroBot AI..."
        className="flex-1 border-gray-200 focus-visible:ring-purple-500"
        disabled={isSearching || isProcessing}
      />
      
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="icon"
          className={`h-9 w-9 ${isSearching ? 'bg-gray-100' : ''}`}
          onClick={toggleSearch}
          title={isSearching ? "Close search" : "Search conversation"}
        >
          <Search size={16} className={isSearching ? 'text-gray-600' : 'text-gray-400'} />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className={`h-9 w-9 ${isRecording ? 'bg-red-50 border-red-200' : ''}`}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing || isSearching}
        >
          <Mic size={16} className={isRecording ? 'text-red-500' : 'text-gray-400'} />
        </Button>
        
        <Button
          className="h-9 w-9 bg-purple-500 hover:bg-purple-600"
          size="icon"
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isProcessing || isSearching}
        >
          <Send size={16} className="text-white" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
