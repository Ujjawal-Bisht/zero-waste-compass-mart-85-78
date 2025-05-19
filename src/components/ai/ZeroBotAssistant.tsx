
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot } from 'lucide-react';
import { useDeviceType } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import ZeroBotMessage from './components/zerobot/ZeroBotMessage';
import ZeroBotTypingIndicator from './components/zerobot/ZeroBotTypingIndicator';

interface ZeroBotAssistantProps {
  initialPrompt?: string;
  showInitially?: boolean;
}

const ZeroBotAssistant: React.FC<ZeroBotAssistantProps> = ({
  initialPrompt,
  showInitially = false,
}) => {
  const [isOpen, setIsOpen] = useState(showInitially);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  useEffect(() => {
    if (isOpen) {
      // Initial welcome message
      if (messages.length === 0) {
        setMessages([
          {
            id: Date.now(),
            content: "Welcome to ZeroBot Assistant. How can I help you today?",
            sender: 'bot',
            timestamp: new Date(),
          },
        ]);
      }
      
      // Focus input when chat opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
    
    // Handle initial prompt
    if (initialPrompt && isOpen && messages.length === 1) {
      handleSendMessage(initialPrompt);
    }
  }, [isOpen]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Method to handle different types of queries with appropriate responses
  const getResponseForQuery = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    // Check for order-related queries
    if (lowerQuery.includes('order') || lowerQuery.includes('delivery') || lowerQuery.includes('shipping')) {
      return "I can help you with your order! To check your order status, please go to 'My Orders' section. For specific order inquiries, please provide your order number.";
    }
    
    // Check for product-related queries
    if (lowerQuery.includes('product') || lowerQuery.includes('item') || lowerQuery.includes('buy')) {
      return "We have a wide range of sustainable products. Would you like to browse by category, or are you looking for something specific?";
    }
    
    // Check for sustainability queries
    if (lowerQuery.includes('sustain') || lowerQuery.includes('eco') || lowerQuery.includes('environment')) {
      return "Sustainability is at the core of our mission! All our products are eco-friendly and ethically sourced. Would you like to learn more about our environmental initiatives?";
    }
    
    // Default response for other queries
    return `Thank you for your question about "${query}". I'm here to help you with any information about our products, orders, or sustainability practices. How else can I assist you?`;
  };

  const handleSendMessage = (content: string = inputValue) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Generate contextual response based on query type
    setTimeout(() => {
      setIsTyping(false);
      const response = getResponseForQuery(content.trim());
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      }]);
      
      // Show toast notification for certain types of queries
      if (content.toLowerCase().includes('help') || content.toLowerCase().includes('support')) {
        toast.info("Support resources are available in the Help section!");
      }
    }, 1000 + Math.random() * 1000); // Randomize response time for more natural feel
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <Bot size={24} />
        </motion.button>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed ${
              isMobile 
                ? 'inset-x-0 bottom-0 rounded-t-2xl max-h-[85vh] h-[85vh] mx-0'
                : 'bottom-6 right-6 w-[380px] h-[600px] rounded-xl'
            } z-50 flex flex-col bg-white overflow-hidden shadow-xl border border-indigo-100`}
          >
            {/* Header */}
            <div className="bg-indigo-600 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-white/20 rounded-full">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <span className="text-white font-medium flex items-center">
                    ZeroBot Assistant
                    <span className="ml-2 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">v5.0</span>
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1.5 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 bg-gray-50 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <ZeroBotMessage 
                  key={message.id} 
                  message={message}
                  isMobile={isMobile}
                />
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <ZeroBotTypingIndicator isMobile={isMobile} />
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input area */}
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="bg-indigo-600 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ZeroBotAssistant;
