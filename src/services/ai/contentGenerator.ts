
import { MessageCategory } from '@/types/chat';

/**
 * Handles generating contextual responses, suggestions, and topics
 * based on user input and detected categories
 */
class ContentGeneratorService {
  // Enhanced response generation with better context awareness
  public generateContextualResponse(message: string, context: MessageCategory): string {
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
    if (this.isSellerRelated(lowerMessage)) {
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
  public generateContextualSuggestions(context: MessageCategory): string[] {
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
  public generateRelatedTopics(context: MessageCategory): string[] {
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
  
  // Check if message is seller related
  private isSellerRelated(message: string): boolean {
    const sellerKeywords = [
      'inventory', 'stock', 'sales', 'listing', 'sell', 
      'price', 'profit', 'revenue', 'vendor'
    ];
    
    return sellerKeywords.some(keyword => message.includes(keyword));
  }
}

export const contentGenerator = new ContentGeneratorService();
