
import { toast } from 'sonner';
import { ZeroBotAI } from '@/services/ZeroBotAI';
import { Message, MessageCategory } from '@/types/chat';

interface MessageHandlingProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  addUserMessage: (content: string) => void;
  addBotMessage: (content: string, category?: MessageCategory, metadata?: any) => void;
  currentUser?: any;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  setStreamedResponse: React.Dispatch<React.SetStateAction<string>>;
  setCurrentContext: React.Dispatch<React.SetStateAction<MessageCategory>>;
  isProcessing: boolean;
  realtimeActive: boolean;
  currentContext: MessageCategory;
  setSuggestions: React.Dispatch<React.SetStateAction<string[]>>;
}

export function useMessageHandling({
  addUserMessage,
  addBotMessage,
  currentUser,
  setIsProcessing,
  setStreamedResponse,
  setCurrentContext,
  realtimeActive,
  setSuggestions,
}: MessageHandlingProps) {
  const handleSendMessage = async (content: string = '') => {
    if (!content.trim()) return;
    
    // Add user message to chat
    addUserMessage(content);
    
    setIsProcessing(true);
    
    try {
      // Detect context of user message
      const detectedContext = ZeroBotAI.detectMessageContext(content);
      setCurrentContext(detectedContext);
      
      // Set options for request
      const options = {
        category: detectedContext,
        userId: currentUser?.id,
        realtime: realtimeActive
      };
      
      if (realtimeActive) {
        // Initialize streaming response
        setStreamedResponse('');
        
        // Process with streaming
        await ZeroBotAI.processMessageRealtime(
          content,
          options,
          // On chunk handler
          (chunk: string) => {
            setStreamedResponse(prev => prev + chunk);
          },
          // On complete handler
          (response) => {
            setIsProcessing(false);
            setStreamedResponse('');
            
            // Add completed message
            addBotMessage(
              response.answer, 
              response.context || 'general',
              {
                processingTime: response.metadata?.processingTime,
                sources: response.metadata?.relatedTopics,
                isRealtime: true
              }
            );
            
            // Update suggestions
            setSuggestions(response.suggestions || []);
          }
        );
      } else {
        // Process normally
        const response = await ZeroBotAI.processMessage(content, options);
        
        // Add bot response
        addBotMessage(
          response.answer, 
          response.context || 'general',
          {
            processingTime: response.metadata?.processingTime,
            sources: response.metadata?.relatedTopics
          }
        );
        
        // Update suggestions
        setSuggestions(response.suggestions || []);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error processing message:", error);
      setIsProcessing(false);
      setStreamedResponse('');
      
      // Add error message
      addBotMessage(
        "I apologize, but I encountered an error processing your request. Please try again.",
        'general'
      );
      
      toast.error("Something went wrong. Please try again.");
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      handleSendMessage(target.value);
      target.value = '';
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };
  
  const handleMessageReaction = (messageId: number | string, reaction: 'like' | 'dislike') => {
    // Update message with reaction
    
    toast.success(
      reaction === 'like' 
        ? 'Thank you for your feedback!' 
        : 'Thanks for helping us improve'
    );
    
    // In a real implementation, you'd send this feedback to your server
  };
  
  const handleTopicClick = (title: string) => {
    handleSendMessage(`Tell me about ${title}`);
  };
  
  const handleGetStartedClick = () => {
    handleSendMessage('Help me get started');
  };
  
  return {
    handleSendMessage,
    handleKeyPress,
    handleSuggestionClick,
    handleMessageReaction,
    handleTopicClick,
    handleGetStartedClick,
    cancelCurrentStream: ZeroBotAI.cancelCurrentStream
  };
}
