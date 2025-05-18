
import { MessageCategory, Message } from '@/types/chat';
import { debounce } from 'lodash';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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

class ZeroBotAIService {
  private static instance: ZeroBotAIService;
  private isProcessing: boolean = false;
  private streamController: AbortController | null = null;

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
  private sellerKeywords = ['inventory', 'stock', 'sales', 'listing', 'sell', 'price', 'profit', 'revenue', 'vendor'];

  private constructor() {
    // Initialize the service
  }

  public static getInstance(): ZeroBotAIService {
    if (!ZeroBotAIService.instance) {
      ZeroBotAIService.instance = new ZeroBotAIService();
    }
    return ZeroBotAIService.instance;
  }

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
      
      const detectedContext = options.category || this.detectMessageContext(message);
      const startTime = Date.now();
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Start with thinking indicators
      onChunk("Analyzing your question");
      await new Promise(resolve => setTimeout(resolve, 500));
      onChunk("...");
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Generate a realistic response based on context
      const fullResponse = this.generateContextualResponse(message, detectedContext);
      const tokens = fullResponse.split(' ');
      
      // Stream tokens with natural timing
      for (let i = 0; i < tokens.length; i++) {
        if (signal.aborted) {
          throw new Error('Stream was cancelled');
        }
        
        const token = tokens[i] + (i < tokens.length - 1 ? ' ' : '');
        onChunk(token);
        
        // Randomize streaming speed to feel more natural
        const delay = Math.floor(Math.random() * 40) + 20;  
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      // Prepare the complete response object
      const processingTime = Date.now() - startTime;
      const response: ZeroBotResponse = {
        answer: fullResponse,
        suggestions: this.generateContextualSuggestions(detectedContext),
        context: detectedContext,
        confidence: 0.92,
        metadata: {
          processingTime,
          relatedTopics: this.generateRelatedTopics(detectedContext),
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
  
  // Traditional processing method for non-streaming requests
  public async processMessage(
    message: string, 
    options: ZeroBotRequestOptions = {}
  ): Promise<ZeroBotResponse> {
    try {
      // If Supabase is available, log the interaction
      if (supabase && options.userId) {
        await this.logUserInteraction(options.userId, message, options.category);
      }
      
      const detectedContext = options.category || this.detectMessageContext(message);
      const response = this.generateContextualResponse(message, detectedContext);
      
      return {
        answer: response,
        suggestions: this.generateContextualSuggestions(detectedContext),
        context: detectedContext,
        confidence: 0.92,
        metadata: {
          relatedTopics: this.generateRelatedTopics(detectedContext),
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
    if (this.streamController) {
      this.streamController.abort();
      this.isProcessing = false;
    }
  }
  
  // Enhanced response generation with better context awareness
  private generateContextualResponse(message: string, context: MessageCategory): string {
    const lowerMessage = message.toLowerCase();
    
    // Product assistance responses
    if (context === 'product') {
      if (lowerMessage.includes('sustainable') || lowerMessage.includes('eco-friendly')) {
        return "Our sustainable products are made with environmentally friendly materials and processes. Each product page displays a sustainability score from 1-10 and details about materials, manufacturing, and end-of-life recycling options. You can filter the catalog to show only products with scores above a threshold you set.";
      }
      
      if (lowerMessage.includes('compare')) {
        return "I can help you compare products! Just tell me which items you're considering, and I'll create a side-by-side comparison of their features, prices, sustainability scores, and customer ratings. You can also use our comparison tool by selecting the 'Compare' checkbox on product cards.";
      }
      
      return "I can provide detailed information about any product in our catalog, including specifications, materials, sustainability impact, customer reviews, and current promotions. For personalized recommendations, I can analyze your past purchases and preferences to suggest items you might like.";
    }
    
    // Order assistance responses
    if (context === 'order') {
      if (lowerMessage.includes('track')) {
        return "You can track your orders in real-time from the 'My Orders' section of your account dashboard. Each order shows its current status, location, and estimated delivery date. You'll receive automatic notifications when your order ships, is out for delivery, and when it's delivered.";
      }
      
      if (lowerMessage.includes('cancel') || lowerMessage.includes('change')) {
        return "Orders can be modified or canceled within 1 hour of placement. After that, if the item hasn't shipped, you can request cancellation from your order details page. For orders already in process, you can contact our support team directly through the chat button on the order page.";
      }
      
      return "I can help you manage all aspects of your orders - from tracking packages to modifying details or processing returns. If you need assistance with a specific order, please provide the order number or let me know what you need help with.";
    }
    
    // Seller-specific responses
    if (this.sellerKeywords.some(keyword => lowerMessage.includes(keyword))) {
      if (lowerMessage.includes('add') || lowerMessage.includes('new item') || lowerMessage.includes('listing')) {
        return "To add new items to your seller inventory, go to your Seller Dashboard and select 'Add New Product'. You'll need to provide product details, pricing, quantity, shipping options, and at least one high-quality photo. Our AI tool can help you optimize your product description and suggest optimal pricing based on market analysis.";
      }
      
      if (lowerMessage.includes('sales') || lowerMessage.includes('analytics')) {
        return "Your seller dashboard provides comprehensive analytics on your sales performance, including daily/monthly revenue trends, best-selling items, customer demographics, and conversion rates. You can export these reports as CSV or PDF, or schedule automated email reports at your preferred frequency.";
      }
      
      if (lowerMessage.includes('profit') || lowerMessage.includes('revenue')) {
        return "The Finance section of your seller dashboard shows your profit margins, revenue streams, payment processing fees, and projected earnings. Our AI-powered forecasting tool can help you predict future sales based on historical data and market trends, helping you optimize inventory and pricing.";
      }
      
      return "As a seller, you have access to inventory management tools, sales analytics, customer insights, and promotion planning features. You can manage your product listings, track performance metrics, and optimize your store presence all from your centralized Seller Dashboard.";
    }
    
    // Handle other contexts with appropriate responses
    switch(context) {
      case 'tracking':
        return "I can help you track any order you've placed. The latest update shows your package is being prepared for shipping and should be dispatched within 24 hours. Once shipped, you'll receive real-time location updates and a precise delivery window on the day of delivery.";
      case 'invoice':
        return "All your invoices are available in the 'Billing History' section of your account. You can download them as PDF or CSV, and we can also email specific invoices to any address you provide. For tax purposes, we maintain your invoice history for 7 years.";
      case 'sustainability':
        return "Our sustainability program has prevented over 20 tons of waste from entering landfills this quarter alone. By shopping with us, you've personally contributed to planting 12 trees and offsetting approximately 1.2 tons of carbon emissions through our partnership with environmental organizations.";
      case 'climate':
        return "Our latest climate impact report shows that our circular economy model has reduced carbon emissions by 35% compared to traditional retail. Every product page now displays a carbon footprint calculation so you can make informed choices about your purchases.";
      case 'personal':
        return "Your account preferences and settings can be customized in the Profile section. You can update payment methods, manage shipping addresses, set communication preferences, and review your sustainability impact dashboard which tracks your personal contribution to our environmental initiatives.";
      default:
        return "I'm ZeroBot AI v4.0, your personal shopping and sustainability assistant. I can help with tracking orders, finding sustainable products, managing your seller account, analyzing market trends, and providing personalized recommendations based on your preferences and purchase history.";
    }
  }
  
  // Generate contextual suggestions based on detected category
  private generateContextualSuggestions(context: MessageCategory): string[] {
    switch(context) {
      case 'product':
        return [
          "What sustainable alternatives do you have for this product?",
          "Show me the highest-rated products in this category",
          "Compare these two products for me",
          "What materials is this product made from?",
          "Are there any discounts on this item?"
        ];
      case 'order':
        return [
          "Where is my latest order?",
          "Can I change my delivery address?",
          "How do I return an item?",
          "When will my order be delivered?",
          "Can I add items to my existing order?"
        ];
      case 'tracking':
        return [
          "Has my package been shipped yet?",
          "Is there a delay with my delivery?",
          "Can I redirect my package to a different address?",
          "What's the latest update on my order?",
          "When can I expect my delivery?"
        ];
      case 'invoice':
        return [
          "Email me a copy of my latest invoice",
          "How do I download all my invoices for tax purposes?",
          "Is there a discount applied to my invoice?",
          "Can I change the payment method on my invoice?",
          "Split this invoice into multiple payments"
        ];
      case 'sustainability':
        return [
          "What's my personal sustainability impact?",
          "How do you calculate sustainability scores?",
          "Show me the most eco-friendly products",
          "How does your packaging reduce waste?",
          "Tell me about your carbon offset program"
        ];
      case 'climate':
        return [
          "What's the carbon footprint of my recent purchase?",
          "How are you reducing emissions in your operations?",
          "Show me climate-positive products",
          "Tell me about your renewable energy initiatives",
          "How can I reduce my shopping carbon footprint?"
        ];
      case 'personal':
        return [
          "Update my delivery preferences",
          "Show my sustainability impact dashboard",
          "Change my payment information",
          "Customize my shopping preferences",
          "Manage my notification settings"
        ];
      default:
        return [
          "Help me find sustainable products",
          "Track my recent order",
          "Show me my purchase history",
          "What's new in the marketplace?",
          "Tell me about your sustainability initiatives"
        ];
    }
  }
  
  // Generate related topics based on context
  private generateRelatedTopics(context: MessageCategory): string[] {
    switch(context) {
      case 'product':
        return ["Product specifications", "Customer reviews", "Sustainability ratings", "Similar items"];
      case 'order':
        return ["Order tracking", "Delivery options", "Returns policy", "Order modifications"];
      case 'tracking':
        return ["Shipping methods", "Delivery estimates", "Package notifications", "Address verification"];
      case 'invoice':
        return ["Payment methods", "Tax documentation", "Refund processing", "Billing cycles"];
      case 'sustainability':
        return ["Eco-friendly products", "Zero waste initiatives", "Carbon offsetting", "Sustainable packaging"];
      case 'climate':
        return ["Carbon footprint", "Climate action", "Emissions reduction", "Environmental impact"];
      case 'personal':
        return ["Account settings", "Privacy preferences", "Communication options", "Personalization"];
      default:
        return ["Shopping assistance", "Seller tools", "Sustainability", "Account management"];
    }
  }
  
  // Log user interactions for personalization
  private async logUserInteraction(
    userId: string, 
    query: string, 
    category?: MessageCategory
  ): Promise<void> {
    try {
      const detectedCategory = category || this.detectMessageContext(query);
      
      await supabase.from('ai_interactions').insert({
        user_id: userId,
        query: query,
        category: detectedCategory,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Failed to log user interaction:", error);
      // Non-critical error, don't throw
    }
  }
  
  // Debounced version of process message for search-as-you-type scenarios
  public processMessageDebounced = debounce(this.processMessage, 300);
}

export const ZeroBotAI = ZeroBotAIService.getInstance();
