
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { MessageCategory } from '@/types/chat';
import { toast } from 'sonner';
import { useAudioRecording } from './utils/useAudioRecording';
import { defaultSuggestions } from './utils/defaultSuggestions';
import { getContextualTranscription } from './utils/getContextualTranscription';
import SuggestedQuestions from './SuggestedQuestions';
import ChatInputActions from './ChatInputActions';

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
  const [showSearch, setShowSearch] = useState(false);
  
  // Handle audio recording and transcription
  const { isRecording, toggleRecording } = useAudioRecording((transcription) => {
    // When transcription is complete, set the message
    const contextualTranscription = getContextualTranscription(conversationContext);
    setMessage(contextualTranscription);
  });

  // Get suggestions based on context or use provided ones
  const getSuggestions = () => {
    if (suggestedQuestions.length > 0) {
      return suggestedQuestions;
    }
    
    // Fallback to default suggestions
    return defaultSuggestions[conversationContext] || defaultSuggestions.general;
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

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSelectSuggestion = (question: string) => {
    setMessage(question);
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
        
        <ChatInputActions
          showSearch={showSearch}
          isRecording={isRecording}
          message={message}
          toggleSearch={toggleSearch}
          toggleRecording={toggleRecording}
          handleSendMessage={handleSendMessage}
        />
      </div>
      
      <SuggestedQuestions 
        suggestions={getSuggestions()} 
        showSearch={showSearch}
        onSelectSuggestion={handleSelectSuggestion}
      />
    </div>
  );
};

export default ChatInput;
