
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
  isMobile?: boolean;
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
  stopRecording,
  isMobile = false
}) => {
  const containerClasses = isMobile 
    ? 'p-2 border-t flex items-end gap-2 bg-white safe-area-bottom mobile-chat-input'
    : 'p-3 border-t flex items-end gap-2 bg-white';
    
  // Optimize button sizes for mobile
  const buttonSize = isMobile ? 'h-10 w-10' : 'h-9 w-9';
  const inputHeight = isMobile ? 'h-10' : '';

  return (
    <div className={containerClasses}>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={isMobile ? "Message..." : "Message ZeroBot AI..."}
        className={`flex-1 border-gray-200 focus-visible:ring-purple-500 ${inputHeight}`}
        disabled={isSearching || isProcessing}
      />
      
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="icon"
          className={`${buttonSize} ${isSearching ? 'bg-gray-100' : ''} touch-optimized`}
          onClick={toggleSearch}
          title={isSearching ? "Close search" : "Search conversation"}
        >
          <Search size={isMobile ? 18 : 16} className={isSearching ? 'text-gray-600' : 'text-gray-400'} />
        </Button>
        
        {!isMobile && (
          <Button
            variant="outline"
            size="icon"
            className={`${buttonSize} ${isRecording ? 'bg-red-50 border-red-200' : ''}`}
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing || isSearching}
          >
            <Mic size={16} className={isRecording ? 'text-red-500' : 'text-gray-400'} />
          </Button>
        )}
        
        <Button
          className={`${buttonSize} bg-purple-500 hover:bg-purple-600 touch-optimized`}
          size="icon"
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isProcessing || isSearching}
        >
          <Send size={isMobile ? 18 : 16} className="text-white" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
