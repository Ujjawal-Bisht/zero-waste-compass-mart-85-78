
export type MessageCategory = 
  | 'general' 
  | 'tracking' 
  | 'invoice' 
  | 'order' 
  | 'product' 
  | 'sustainability' 
  | 'climate' 
  | 'personal';

export type Message = {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  // Enhanced fields
  category?: MessageCategory;
  isMarkdown?: boolean;
  attachments?: string[];
  referencedLinks?: string[];
  isHighlighted?: boolean;
  confidence?: number; // For AI confidence scoring
  sentiment?: 'positive' | 'neutral' | 'negative'; // For sentiment analysis
};
