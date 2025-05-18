
import React, { useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message, MessageCategory } from '@/types/chat';
import ChatMessage from './ChatMessage';
import StreamingMessage from './StreamingMessage';
import SearchBar from './SearchBar';
import SuggestionsList from './SuggestionsList';
import ChatInput from './ChatInput';

interface ZeroBotChatContentProps {
  messages: Message[];
  filteredMessages: Message[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearching: boolean;
  toggleSearch: () => void;
  isProcessing: boolean;
  streamedResponse: string;
  currentContext: MessageCategory;
  sellerMode: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  suggestions: string[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  currentUser?: any;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  handleMessageReaction: (messageId: number | string, reaction: 'like' | 'dislike') => void;
  cancelCurrentStream: () => void;
  startRecording: () => void;
  stopRecording: () => void;
  isRecording: boolean;
  handleSuggestionClick: (suggestion: string) => void;
}

const ZeroBotChatContent: React.FC<ZeroBotChatContentProps> = ({
  messages,
  filteredMessages,
  searchQuery,
  setSearchQuery,
  isSearching,
  toggleSearch,
  isProcessing,
  streamedResponse,
  currentContext,
  sellerMode,
  inputValue,
  setInputValue,
  suggestions,
  messagesEndRef,
  currentUser,
  handleSendMessage,
  handleKeyPress,
  handleMessageReaction,
  cancelCurrentStream,
  startRecording,
  stopRecording,
  isRecording,
  handleSuggestionClick
}) => {
  const displayMessages = searchQuery ? filteredMessages : messages;
  
  return (
    <>
      <AnimatePresence>
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredMessages={filteredMessages}
          isSearching={isSearching}
        />
      </AnimatePresence>
      
      {/* Messages */}
      <ScrollArea className="flex-1 p-3 space-y-4">
        {(searchQuery ? filteredMessages : messages).map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            searchQuery={searchQuery}
            sellerMode={sellerMode}
            currentUser={currentUser}
            handleMessageReaction={handleMessageReaction}
          />
        ))}
        
        {/* Streaming message */}
        {streamedResponse && (
          <StreamingMessage
            streamedResponse={streamedResponse}
            currentContext={currentContext}
            sellerMode={sellerMode}
            onCancel={cancelCurrentStream}
          />
        )}
        
        {/* No results message */}
        {searchQuery && filteredMessages.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-gray-500">No messages matching "{searchQuery}"</p>
          </div>
        )}
        
        {/* Reference for auto-scroll */}
        <div ref={messagesEndRef} />
      </ScrollArea>
      
      {/* Suggestions */}
      <SuggestionsList 
        suggestions={suggestions}
        isSearching={isSearching}
        handleSuggestionClick={handleSuggestionClick}
      />
      
      {/* Input area */}
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleKeyPress={handleKeyPress}
        handleSendMessage={handleSendMessage}
        isProcessing={isProcessing}
        isSearching={isSearching}
        toggleSearch={toggleSearch}
        startRecording={startRecording}
        isRecording={isRecording}
        stopRecording={stopRecording}
      />
    </>
  );
};

export default ZeroBotChatContent;
