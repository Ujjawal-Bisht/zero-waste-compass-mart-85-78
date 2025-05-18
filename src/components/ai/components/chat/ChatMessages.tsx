
import React from 'react';
import { Message, MessageCategory } from '@/types/chat';
import ChatMessage from '../ChatMessage';
import StreamingMessage from '../StreamingMessage';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatMessagesProps {
  messages: Message[];
  searchQuery: string;
  streamedResponse: string;
  currentContext: MessageCategory;
  sellerMode: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  handleMessageReaction: (messageId: number | string, reaction: 'like' | 'dislike') => void;
  cancelCurrentStream: () => void;
  currentUser?: any;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  searchQuery,
  streamedResponse,
  currentContext,
  sellerMode,
  messagesEndRef,
  handleMessageReaction,
  cancelCurrentStream,
  currentUser
}) => {
  return (
    <ScrollArea className="flex-1 p-3 space-y-4">
      {messages.map((message) => (
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
      {searchQuery && messages.length === 0 && (
        <div className="h-full flex items-center justify-center">
          <p className="text-sm text-gray-500">No messages matching "{searchQuery}"</p>
        </div>
      )}
      
      {/* Reference for auto-scroll */}
      <div ref={messagesEndRef} />
    </ScrollArea>
  );
};

export default ChatMessages;
