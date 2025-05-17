
import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/chat';

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "👋 Hi there! I'm your AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // AI assistant responses for orders
  const orderResponses = [
    "Your order is being processed and should ship within 1-2 business days.",
    "I checked your order status - it has been shipped and should arrive by Wednesday.",
    "Good news! The delivery service shows your package is out for delivery today!",
    "I found your order in our system. Your items are being prepared for shipping.",
    "According to our records, your payment was successful and your order is confirmed.",
    "I've notified our shipping department about your inquiry. They'll prioritize your order.",
    "Your package has been dispatched from our warehouse and is on its way to the carrier facility.",
    "The estimated delivery date for your order is this Friday. You'll receive a notification once it's out for delivery.",
    "Our records show your order was delivered yesterday. If you haven't received it, please let me know so I can investigate.",
    "I've checked the tracking information, and your package is currently in transit through our shipping partner's network."
  ];

  // AI assistant responses for product questions
  const productResponses = [
    "This product is made from 100% organic materials and is eco-friendly.",
    "The item you're asking about is currently in stock and ready to ship.",
    "This product comes with a 1-year warranty against manufacturer defects.",
    "The size dimensions are 10\" x 12\" x 5\". Let me know if you need more specific measurements.",
    "This product is suitable for both indoor and outdoor use.",
    "We have this item available in blue, red, and green colors.",
    "The product is made in India using traditional crafting techniques that have been passed down for generations.",
    "This item requires minimal maintenance - just wipe with a damp cloth periodically to keep it clean.",
    "The weight of this product is approximately 2.5 kg, making it easy to move around as needed.",
    "If you're looking for accessories to go with this product, I recommend checking out our complementary collection."
  ];

  // AI assistant responses for general questions
  const generalResponses = [
    "I'd be happy to help with that question. Let me check our knowledge base.",
    "Thanks for reaching out! I'll find that information for you right away.",
    "Great question! Here's what I can tell you about that.",
    "I appreciate your patience. Let me find the answer for you.",
    "I'm here to assist you with any questions you have about our products and services.",
    "I'd recommend checking our FAQ page for more detailed information on this topic.",
    "That's an interesting question. Based on my information, here's what I can share with you.",
    "I understand how important this is. Let me provide you with the most accurate information we have available.",
    "Thank you for your question. I'll do my best to provide a comprehensive answer.",
    "I'm checking our resources to give you the most up-to-date information on this topic."
  ];

  // New detailed responses for tracking inquiries
  const trackingResponses = [
    "I can see your package is currently out for delivery! The delivery window is between 2 PM and 6 PM today. You'll receive a notification just before arrival.",
    "Your package is currently at our local distribution center. It's scheduled for delivery tomorrow between 9 AM and 12 PM. The driver will call you 30 minutes before arrival.",
    "According to our tracking system, your package has passed customs clearance and is now in domestic transit. It should be delivered within the next 2-3 business days.",
    "I've checked the detailed tracking, and your order was picked up by our courier partner at 10:15 AM today. It's now en route to the regional sorting facility and remains on schedule for delivery by Friday.",
    "The tracking information shows your package has been loaded onto the delivery vehicle at 8:30 AM today. It's part of today's delivery route, so you should receive it before 8 PM tonight.",
    "Our system indicates a slight delay with your package due to weather conditions affecting the shipping route. The new estimated delivery date is Monday. I've arranged for an automated update to be sent to you when it's out for delivery."
  ];

  // New detailed responses for invoice and receipt questions
  const invoiceResponses = [
    "Your invoice is now available for download from your order details page. It includes a detailed breakdown of all charges, including taxes and shipping costs. If you need a specific format for your accounting purposes, please let me know.",
    "I've generated an updated invoice that includes the recent discount we applied to your order. You should see it in your email inbox within the next 5 minutes. The PDF is also available in your account dashboard.",
    "For tax purposes, all our invoices include our company registration number and tax ID. The invoice for your recent purchase has been generated and is available in both PDF and CSV formats.",
    "I notice you're asking about an invoice for a recent order that's marked as 'out for delivery.' I'm pleased to confirm that your invoice is now ready and available for download directly from the tracking page.",
    "The system shows your order has been marked as delivered, so your final invoice has been generated automatically. It includes all the relevant details for your records and warranty claims if needed in the future."
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateAIResponse = (userMessage: string) => {
    // Simple keyword detection to provide more relevant responses
    const lowerCaseMessage = userMessage.toLowerCase();
    let responseArray = generalResponses;

    // Check for tracking-related keywords
    if (
      lowerCaseMessage.includes('track') || 
      lowerCaseMessage.includes('where is') || 
      lowerCaseMessage.includes('delivery status') || 
      lowerCaseMessage.includes('package location') ||
      lowerCaseMessage.includes('shipping status')
    ) {
      responseArray = trackingResponses;
    }
    // Check for invoice-related keywords
    else if (
      lowerCaseMessage.includes('invoice') || 
      lowerCaseMessage.includes('receipt') || 
      lowerCaseMessage.includes('bill') || 
      lowerCaseMessage.includes('payment proof')
    ) {
      responseArray = invoiceResponses;
    }
    // Check for order-related keywords
    else if (
      lowerCaseMessage.includes('order') ||
      lowerCaseMessage.includes('shipping') ||
      lowerCaseMessage.includes('delivery') ||
      lowerCaseMessage.includes('package')
    ) {
      responseArray = orderResponses;
    } 
    // Check for product-related keywords
    else if (
      lowerCaseMessage.includes('product') ||
      lowerCaseMessage.includes('item') ||
      lowerCaseMessage.includes('material') ||
      lowerCaseMessage.includes('size') ||
      lowerCaseMessage.includes('color')
    ) {
      responseArray = productResponses;
    }

    return responseArray[Math.floor(Math.random() * responseArray.length)];
  };

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI thinking and typing with variable response time
    const thinkingTime = 1000 + Math.random() * 1500; // Between 1-2.5 seconds
    
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        content: generateAIResponse(content),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, thinkingTime);
  };

  return { messages, isTyping, sendMessage, messagesEndRef };
}
