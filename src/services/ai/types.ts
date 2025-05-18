
import { MessageCategory, Message } from '@/types/chat';

export interface ZeroBotResponse {
  answer: string;
  suggestions: string[];
  context?: MessageCategory;
  confidence?: number;
  metadata?: {
    sources?: string[];
    processingTime?: number;
    relatedTopics?: string[];
  }
}

export interface ZeroBotRequestOptions {
  category?: MessageCategory;
  userId?: string;
  previousMessages?: Message[];
  realtime?: boolean;
  maxTokens?: number;
}
