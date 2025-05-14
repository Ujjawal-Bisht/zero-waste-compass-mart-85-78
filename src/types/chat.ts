
export type Message = {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  // Additional fields for enhanced capabilities
  isMarkdown?: boolean;
  attachments?: string[];
  referencedLinks?: string[];
  isHighlighted?: boolean;
  category?: 'general' | 'climate' | 'recycling' | 'sustainability' | 'food' | 'energy' | 'water' | 'fashion' | 'gardening' | 'transport';
  confidence?: number; // For future AI confidence scoring
  sentiment?: 'positive' | 'neutral' | 'negative'; // For future sentiment analysis
};
