
import { MessageCategory, Message } from '@/types/chat';
import { debounce } from 'lodash';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { ZeroBotResponse, ZeroBotRequestOptions } from './ai/types';
import { contextDetector } from './ai/contextDetector';
import { contentGenerator } from './ai/contentGenerator';
import { loggingService } from './ai/loggingService';
import { streamHandler } from './ai/streamHandler';

class ZeroBotAIService {
  private static instance: ZeroBotAIService;

  private constructor() {
    // Initialize the service
  }

  public static getInstance(): ZeroBotAIService {
    if (!ZeroBotAIService.instance) {
      ZeroBotAIService.instance = new ZeroBotAIService();
    }
    return ZeroBotAIService.instance;
  }

  // Expose the context detection functionality
  public detectMessageContext(message: string): MessageCategory {
    return contextDetector.detectMessageContext(message);
  }

  // Expose the realtime processing method
  public async processMessageRealtime(
    message: string, 
    options: ZeroBotRequestOptions,
    onChunk: (chunk: string) => void,
    onComplete: (response: ZeroBotResponse) => void
  ): Promise<void> {
    return streamHandler.processMessageRealtime(message, options, onChunk, onComplete);
  }
  
  // Traditional processing method for non-streaming requests
  public async processMessage(
    message: string, 
    options: ZeroBotRequestOptions = {}
  ): Promise<ZeroBotResponse> {
    try {
      // If Supabase is available, log the interaction
      if (supabase && options.userId) {
        await loggingService.logUserInteraction(options.userId, message, options.category);
      }
      
      const detectedContext = options.category || contextDetector.detectMessageContext(message);
      const response = contentGenerator.generateContextualResponse(message, detectedContext);
      
      return {
        answer: response,
        suggestions: contentGenerator.generateContextualSuggestions(detectedContext),
        context: detectedContext,
        confidence: 0.92,
        metadata: {
          relatedTopics: contentGenerator.generateRelatedTopics(detectedContext),
          processingTime: 1200, // Mock processing time in ms
        }
      };
    } catch (error) {
      console.error("Error processing message:", error);
      toast.error("Failed to process your request. Please try again.");
      
      // Return a fallback response
      return {
        answer: "I'm sorry, I encountered an error while processing your request. Please try again.",
        suggestions: ["Try a simpler question", "Contact support", "Reload the chat"],
        context: 'general',
        confidence: 0.1
      };
    }
  }
  
  // Cancel current streaming response
  public cancelCurrentStream(): void {
    streamHandler.cancelCurrentStream();
  }
  
  // Debounced version of process message for search-as-you-type scenarios
  public processMessageDebounced = debounce(this.processMessage, 300);
}

export const ZeroBotAI = ZeroBotAIService.getInstance();
export type { ZeroBotResponse, ZeroBotRequestOptions };
