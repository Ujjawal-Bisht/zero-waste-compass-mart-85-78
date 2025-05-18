
import { useState, useRef, useEffect } from 'react';
import { Message, MessageCategory } from '@/types/chat';

export function useChatMessages(sellerMode: boolean, initialPrompt?: string) {
  // State for messages
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamedResponse, setStreamedResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentContext, setCurrentContext] = useState<MessageCategory>('general');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  // References
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      addBotMessage(
        sellerMode
          ? "Welcome to ZeroBot AI v4.0! I'm here to help you manage your seller account, add new products, analyze sales data, and optimize your store performance. What would you like assistance with today?"
          : "Hello! I'm ZeroBot AI v4.0, your shopping and sustainability assistant. I can help you find products, track orders, learn about sustainability features, and more. How can I assist you today?",
        'general'
      );
    }
    
    // Handle initial prompt if provided
    if (initialPrompt && messages.length === 1) {
      handleInitialPrompt(initialPrompt);
    }
  }, [initialPrompt, sellerMode]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, streamedResponse]);

  // Helper functions
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const addUserMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
  };
  
  const addBotMessage = (content: string, category: MessageCategory = 'general', metadata?: any) => {
    const botMessage: Message = {
      id: Date.now(),
      content,
      sender: 'bot',
      timestamp: new Date(),
      category,
      metadata
    };
    setMessages(prev => [...prev, botMessage]);
  };
  
  const handleInitialPrompt = (prompt: string) => {
    // This will be handled by the message handling hook
    // Just adding a placeholder function here for the effect dependency
  };

  return {
    messages,
    setMessages,
    streamedResponse,
    setStreamedResponse,
    isProcessing,
    setIsProcessing,
    currentContext,
    setCurrentContext,
    suggestions,
    setSuggestions,
    messagesEndRef,
    addUserMessage,
    addBotMessage,
  };
}
