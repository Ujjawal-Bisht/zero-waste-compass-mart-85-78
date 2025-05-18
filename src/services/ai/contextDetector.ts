
import { MessageCategory } from '@/types/chat';

/**
 * Service to detect the context/category of user messages
 */
class ContextDetectorService {
  // Enhanced context detection with weighted categories
  private categoryKeywords: Record<MessageCategory, string[]> = {
    general: ['help', 'information', 'question', 'support', 'guide'],
    tracking: ['track', 'shipping', 'delivery', 'package', 'arrive', 'when', 'status'],
    invoice: ['invoice', 'receipt', 'bill', 'payment', 'transaction', 'refund', 'charge'],
    order: ['order', 'purchase', 'buy', 'cancel', 'modify', 'change'],
    product: ['product', 'item', 'material', 'made', 'specification', 'quality', 'dimension'],
    sustainability: ['sustainability', 'sustainable', 'eco', 'green', 'environment', 'planet', 'recycling'],
    climate: ['climate', 'carbon', 'emissions', 'global warming', 'footprint', 'impact'],
    personal: ['account', 'profile', 'settings', 'preference', 'my', 'me', 'i']
  };

  // Add seller-specific keywords
  private sellerKeywords = [
    'inventory', 'stock', 'sales', 'listing', 'sell', 
    'price', 'profit', 'revenue', 'vendor'
  ];

  // Detect context from user message with improved weighting algorithm
  public detectMessageContext(message: string): MessageCategory {
    const lowerMessage = message.toLowerCase();
    let maxScore = 0;
    let detectedCategory: MessageCategory = 'general';
    
    // Check each category and calculate a weighted score
    Object.entries(this.categoryKeywords).forEach(([category, keywords]) => {
      let categoryScore = 0;
      
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        const matches = lowerMessage.match(regex);
        if (matches) {
          // Calculate score based on keyword frequency and position in text
          const frequencyWeight = matches.length;
          const positionWeight = lowerMessage.indexOf(keyword.toLowerCase()) < 20 ? 1.5 : 1;
          categoryScore += frequencyWeight * positionWeight;
        }
      });
      
      // Special handling for seller-related queries
      if (this.sellerKeywords.some(keyword => lowerMessage.includes(keyword))) {
        // If seller related, prioritize order and product categories
        if (category === 'order' || category === 'product') {
          categoryScore *= 1.5;
        }
      }
      
      if (categoryScore > maxScore) {
        maxScore = categoryScore;
        detectedCategory = category as MessageCategory;
      }
    });
    
    return detectedCategory;
  }
}

export const contextDetector = new ContextDetectorService();
