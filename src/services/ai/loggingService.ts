
import { MessageCategory } from '@/types/chat';
import { supabase } from '@/integrations/supabase/client';
import { contextDetector } from './contextDetector';

/**
 * Handles logging user interactions and analytics
 */
class LoggingService {
  // Log user interactions for personalization
  public async logUserInteraction(
    userId: string, 
    query: string, 
    category?: MessageCategory
  ): Promise<void> {
    try {
      const detectedCategory = category || contextDetector.detectMessageContext(query);
      
      // Log to console for development
      console.log("User interaction logged:", {
        user_id: userId,
        query: query,
        category: detectedCategory,
        timestamp: new Date().toISOString()
      });
      
      // In a production environment, you would uncomment this code
      // after creating the ai_interactions table in Supabase
      /*
      await supabase.from('ai_interactions').insert({
        user_id: userId,
        query: query,
        category: detectedCategory,
        timestamp: new Date().toISOString()
      });
      */
    } catch (error) {
      console.error("Failed to log user interaction:", error);
      // Non-critical error, don't throw
    }
  }
}

export const loggingService = new LoggingService();
