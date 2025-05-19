
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Search, Mic } from 'lucide-react';
import { useDeviceType } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import ZeroBotMessage from './components/zerobot/ZeroBotMessage';
import ZeroBotTypingIndicator from './components/zerobot/ZeroBotTypingIndicator';
import { useSuggestedQuestions } from '@/hooks/chat/useSuggestedQuestions';

interface ZeroBotAssistantProps {
  initialPrompt?: string;
  showInitially?: boolean;
  sellerMode?: boolean;
}

const ZeroBotAssistant: React.FC<ZeroBotAssistantProps> = ({
  initialPrompt,
  showInitially = false,
  sellerMode = false,
}) => {
  const [isOpen, setIsOpen] = useState(showInitially);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  const { getSuggestedQuestions } = useSuggestedQuestions();
  const suggestions = getSuggestedQuestions(currentCategory as any);

  useEffect(() => {
    if (isOpen) {
      // Initial welcome message
      if (messages.length === 0) {
        setMessages([
          {
            id: Date.now(),
            content: sellerMode
              ? "Welcome to Zero Waste Mart Seller Dashboard! I'm here to help you manage your products, track orders, and boost your business. How can I assist you today?"
              : "Welcome to Zero Waste Mart! I can help you find sustainable products, track your orders, or answer questions about our zero waste initiatives. What can I help you with?",
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
  }, [isOpen, sellerMode]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Method to detect the context of the message for better response generation
  const detectMessageContext = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('order') || lowerQuery.includes('delivery') || lowerQuery.includes('shipping')) {
      return 'tracking';
    }
    
    if (lowerQuery.includes('product') || lowerQuery.includes('item') || lowerQuery.includes('buy')) {
      return 'product';
    }
    
    if (lowerQuery.includes('sustain') || lowerQuery.includes('eco') || lowerQuery.includes('environment')) {
      return 'sustainability';
    }
    
    if (lowerQuery.includes('climate') || lowerQuery.includes('carbon') || lowerQuery.includes('emission')) {
      return 'climate';
    }
    
    if (sellerMode && (lowerQuery.includes('sell') || lowerQuery.includes('inventory') || lowerQuery.includes('stock'))) {
      return 'seller';
    }
    
    return 'general';
  };

  // Method to handle different types of queries with appropriate responses
  const getResponseForQuery = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const category = detectMessageContext(query);
    setCurrentCategory(category);
    
    // Seller-specific responses
    if (sellerMode) {
      if (category === 'tracking') {
        return "I can help you track your orders! You can view all order statuses in the Orders tab. Would you like me to show you recent orders with pending shipments?";
      }
      
      if (category === 'product') {
        return "Your product management is important! You currently have products listed in our marketplace. Would you like to add new products or modify existing listings?";
      }
      
      if (category === 'seller') {
        return "As a seller on Zero Waste Mart, you have access to our analytics dashboard, inventory management tools, and marketing assistance. Which area would you like to explore?";
      }
      
      // Default seller response
      return `Thank you for your question about "${query}". I'm here to help you manage your seller account, optimize your listings, and grow your sustainable business. How else can I assist you today?`;
    }
    
    // Buyer-specific responses
    if (category === 'tracking') {
      return "I can help you with your order! To check your order status, please go to 'My Orders' section. For specific order inquiries, please provide your order number.";
    }
    
    if (category === 'product') {
      return "We have a wide range of sustainable products. Would you like to browse by category, or are you looking for something specific?";
    }
    
    if (category === 'sustainability') {
      return "Sustainability is at the core of our mission! All our products are eco-friendly and ethically sourced. Would you like to learn more about our environmental initiatives?";
    }
    
    if (category === 'climate') {
      return "Our climate-focused approach means we carefully evaluate the carbon footprint of all products. Each purchase includes information about its environmental impact and how it helps reduce waste.";
    }
    
    // Default buyer response
    return `Thank you for your question about "${query}". I'm here to help you with any information about our sustainable products, orders, or zero waste practices. How else can I assist you?`;
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
        category: detectMessageContext(content),
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

  const toggleSearch = () => {
    setIsSearching(!isSearching);
    setSearchQuery('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  // Filter messages based on search query
  const filteredMessages = messages.filter(message => 
    message.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayMessages = searchQuery ? filteredMessages : messages;

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center shadow-xl"
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
            } z-50 flex flex-col bg-white overflow-hidden shadow-xl border border-gray-200`}
          >
            {/* Header */}
            <div className="bg-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-white/20 rounded-full">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <span className="text-white font-medium flex items-center">
                    {sellerMode ? "Seller Assistant" : "Shopping Assistant"}
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
            
            {/* Search bar - only show when searching */}
            {isSearching && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-b border-gray-100"
              >
                <div className="p-2 bg-gray-50 flex items-center gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search conversation..."
                    className="w-full text-sm border border-gray-200 rounded-md py-1 px-2 focus:outline-none focus:ring-1 focus:ring-purple-400"
                    autoFocus
                  />
                  <button
                    onClick={toggleSearch}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                </div>
                {searchQuery && (
                  <div className="px-3 py-1 bg-gray-50">
                    <p className="text-xs text-gray-500">
                      Found {filteredMessages.length} {filteredMessages.length === 1 ? 'result' : 'results'}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Messages */}
            <div className="flex-1 bg-gray-50 overflow-y-auto p-4 space-y-4">
              {displayMessages.map((message) => (
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
            
            {/* Suggestions */}
            {!isSearching && suggestions.length > 0 && (
              <div className="bg-gray-50 border-t border-gray-100 p-2">
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      className="px-3 py-1 bg-white text-purple-600 text-xs rounded-full border border-purple-200 whitespace-nowrap flex-shrink-0 hover:bg-purple-50 transition-colors"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Input area */}
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={sellerMode ? "Ask seller assistant..." : "Ask shopping assistant..."}
                  className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={toggleSearch}
                  className="bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-gray-200"
                  title="Search conversation"
                >
                  <Search size={18} />
                </button>
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="bg-purple-600 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700"
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
