
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Bot, Sparkles, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type Message = {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm Zero Bot. How can I help you reduce waste today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "Thanks for your message! We're committed to reducing waste together.",
        "That's a great question about sustainability. Every small action counts!",
        "You can donate items by filling out our donation form or visiting our drop-off locations.",
        "Our community has saved over 1,200kg of food waste so far. Join us!",
        "Need help finding items? You can search by category or location on our marketplace.",
        "Remember, even small changes to reduce waste make a big difference for our planet.",
        "Did you know? Food waste accounts for 8% of global greenhouse gas emissions.",
        "We have collection points in over 25 locations across the city.",
        "Have you tried our waste tracking feature? It helps visualize your positive impact.",
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      setIsTyping(false);
      
      const botMessage: Message = {
        id: messages.length + 2,
        content: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className={`rounded-full h-14 w-14 p-0 zwm-gradient shadow-lg hover:shadow-xl pulse-glow float-button ${isOpen ? 'hidden' : ''}`}
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </Button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 z-50"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bot-entrance"
          >
            {/* Header */}
            <div className="zwm-gradient p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border-2 border-white">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-zwm-accent text-white flex items-center justify-center">
                    <Bot size={14} />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <span className="text-white font-medium flex items-center gap-1">
                    Zero Bot <Sparkles size={14} className="ml-1" />
                  </span>
                  <span className="text-white/70 text-xs">AI assistant</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X size={18} />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} message-appear message-delay-${(index % 3) + 1}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {msg.sender === 'bot' && (
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarFallback className="bg-zwm-accent text-white flex items-center justify-center">
                        <Bot size={14} />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={`max-w-[80%] p-3 ${
                      msg.sender === 'user'
                        ? 'bg-zwm-primary text-white chat-bubble-user shadow-md'
                        : 'bot-message-gradient text-gray-800 chat-bubble-bot shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <span className="text-xs mt-1 block opacity-70">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  {msg.sender === 'user' && (
                    <Avatar className="h-8 w-8 ml-2 mt-1">
                      {currentUser?.photoURL ? (
                        <AvatarImage src={currentUser.photoURL} />
                      ) : (
                        <AvatarFallback className="bg-zwm-primary text-white flex items-center justify-center">
                          <User size={14} />
                        </AvatarFallback>
                      )}
                    </Avatar>
                  )}
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <motion.div 
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-zwm-accent text-white flex items-center justify-center">
                      <Bot size={14} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bot-message-gradient p-3 rounded-xl flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-zwm-accent typing-dot"></div>
                    <div className="w-2 h-2 rounded-full bg-zwm-accent typing-dot"></div>
                    <div className="w-2 h-2 rounded-full bg-zwm-accent typing-dot"></div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t bg-gray-50">
              <div className="flex gap-2 items-center">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 border-gray-200 focus:border-zwm-primary shadow-sm"
                />
                <Button 
                  onClick={handleSendMessage} 
                  className="zwm-gradient"
                  disabled={!message.trim()}
                >
                  <Send size={18} />
                </Button>
              </div>
              <div className="text-center mt-2">
                <Collapsible>
                  <CollapsibleTrigger className="text-xs text-gray-500 hover:text-zwm-primary flex justify-center w-full">
                    Suggested questions
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {["How to donate?", "Nearby drop-offs?", "Statistics", "Impact report"].map(q => (
                        <Button 
                          key={q} 
                          variant="outline" 
                          size="sm"
                          className="text-xs h-auto py-1"
                          onClick={() => {
                            setMessage(q);
                          }}
                        >
                          {q}
                        </Button>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
