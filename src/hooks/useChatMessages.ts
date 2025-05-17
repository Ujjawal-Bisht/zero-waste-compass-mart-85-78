
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
    "The delivery service shows your package is out for delivery today!",
    "I found your order in our system. Your items are being prepared for shipping.",
    "According to our records, your payment was successful and your order is confirmed.",
    "I've notified our shipping department about your inquiry. They'll prioritize your order.",
  ];

  // AI assistant responses for product questions
  const productResponses = [
    "This product is made from 100% organic materials and is eco-friendly.",
    "The item you're asking about is currently in stock and ready to ship.",
    "This product comes with a 1-year warranty against manufacturer defects.",
    "The size dimensions are 10\" x 12\" x 5\". Let me know if you need more specific measurements.",
    "This product is suitable for both indoor and outdoor use.",
    "We have this item available in blue, red, and green colors.",
  ];

  // AI assistant responses for general questions
  const generalResponses = [
    "I'd be happy to help with that question. Let me check our knowledge base.",
    "Thanks for reaching out! I'll find that information for you right away.",
    "Great question! Here's what I can tell you about that.",
    "I appreciate your patience. Let me find the answer for you.",
    "I'm here to assist you with any questions you have about our products and services.",
    "I'd recommend checking our FAQ page for more detailed information on this topic.",
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

    if (
      lowerCaseMessage.includes('order') ||
      lowerCaseMessage.includes('shipping') ||
      lowerCaseMessage.includes('delivery') ||
      lowerCaseMessage.includes('track')
    ) {
      responseArray = orderResponses;
    } else if (
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

    // Simulate AI thinking and typing
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        content: generateAIResponse(content),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return { messages, isTyping, sendMessage, messagesEndRef };
}
