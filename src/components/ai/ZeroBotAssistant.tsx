
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot } from 'lucide-react';
import { useDeviceType } from '@/hooks/use-mobile';

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
    
    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now(),
        content: `This is a simulated response to "${content.trim()}"`,
        sender: 'bot',
        timestamp: new Date(),
      }]);
    }, 1500);
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
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`p-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-none' 
                        : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                    } max-w-[80%]`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-lg shadow-sm rounded-tl-none max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-gray-500">Typing</div>
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
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
