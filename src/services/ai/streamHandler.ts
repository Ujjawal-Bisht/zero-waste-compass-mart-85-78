
import { ZeroBotResponse, ZeroBotRequestOptions } from './types';
import { contentGenerator } from './contentGenerator';
import { contextDetector } from './contextDetector';

/**
 * Handles streaming responses and realtime processing
 */
class StreamHandlerService {
  private isProcessing: boolean = false;
  private streamController: AbortController | null = null;
  
  // New real-time processing method for streaming responses
  public async processMessageRealtime(
    message: string, 
    options: ZeroBotRequestOptions,
    onChunk: (chunk: string) => void,
    onComplete: (response: ZeroBotResponse) => void
  ): Promise<void> {
    if (this.isProcessing) {
      this.cancelCurrentStream();
    }
    
    this.isProcessing = true;
    this.streamController = new AbortController();
    const signal = this.streamController.signal;
    
    try {
      // In a real implementation, this would connect to an actual AI service with streaming capability
      // Here we'll simulate streaming with a realistic mock
      
      const detectedContext = options.category || contextDetector.detectMessageContext(message);
      const startTime = Date.now();
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Start with thinking indicators
      onChunk("Analyzing your question");
      await new Promise(resolve => setTimeout(resolve, 500));
      onChunk("...\n\n");
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Generate a realistic response based on context
      const fullResponse = contentGenerator.generateContextualResponse(message, detectedContext);
      
      // Split into sentences for more realistic streaming
      const sentences = fullResponse.match(/[^.!?]+[.!?]+/g) || [fullResponse];
      
      for (const sentence of sentences) {
        if (signal.aborted) {
          throw new Error('Stream was cancelled');
        }
        
        // Stream each word with natural timing
        const words = sentence.split(' ');
        
        for (let i = 0; i < words.length; i++) {
          if (signal.aborted) {
            throw new Error('Stream was cancelled');
          }
          
          const word = words[i] + (i < words.length - 1 ? ' ' : '');
          onChunk(word);
          
          // Randomize streaming speed to feel more natural
          const delay = Math.floor(Math.random() * 30) + 15;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
        
        // Add a short pause between sentences
        if (signal.aborted) {
          throw new Error('Stream was cancelled');
        }
        
        await new Promise(resolve => setTimeout(resolve, 150));
      }
      
      // Prepare the complete response object
      const processingTime = Date.now() - startTime;
      const response: ZeroBotResponse = {
        answer: fullResponse,
        suggestions: contentGenerator.generateContextualSuggestions(detectedContext),
        context: detectedContext,
        confidence: 0.92,
        metadata: {
          processingTime,
          relatedTopics: contentGenerator.generateRelatedTopics(detectedContext),
        }
      };
      
      onComplete(response);
      
    } catch (error) {
      if (!signal.aborted) {
        console.error("Error in real-time processing:", error);
        onChunk("\n\nI apologize, but I encountered an error while processing your request. Please try again.");
      }
    } finally {
      this.isProcessing = false;
      this.streamController = null;
    }
  }
  
  // Cancel current streaming response
  public cancelCurrentStream(): void {
    if (this.streamController) {
      this.streamController.abort();
      this.isProcessing = false;
    }
  }
}

export const streamHandler = new StreamHandlerService();
