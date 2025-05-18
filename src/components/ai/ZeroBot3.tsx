
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Mic, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ZeroBot3Props {
  initialMessages?: Message[];
  showInitially?: boolean;
}

const ZeroBot3: React.FC<ZeroBot3Props> = ({
  initialMessages = [],
  showInitially = false,
}) => {
  const [isOpen, setIsOpen] = useState(showInitially);
  const [messages, setMessages] = useState<Message[]>(
    initialMessages.length > 0
      ? initialMessages
      : [
          {
            id: 1,
            text: "Hello! I'm ZeroBot v3. How can I assist you today?",
            sender: 'bot',
            timestamp: new Date(),
          },
        ]
  );
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const newUserMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user' as const,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newUserMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate bot response (in a real app, this would call an API)
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: `I'm ZeroBot v3. I'm processing your question: "${inputValue}"`,
        sender: 'bot' as const,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Floating chat button */}
      {!isOpen && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <Button
            onClick={handleToggle}
            className="rounded-full h-14 w-14 bg-primary hover:bg-primary/90 text-white shadow-lg"
            size="icon"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </motion.div>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 w-[350px] h-[500px] z-50 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 250, damping: 25 }}
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <h3 className="font-medium">ZeroBot</h3>
                <Badge className="ml-1.5 bg-white bg-opacity-20 text-xs">v3</Badge>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full hover:bg-primary-foreground/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[calc(100%-60px)]">
              <div className="border-b px-4">
                <TabsList className="bg-transparent mt-2 grid grid-cols-3">
                  <TabsTrigger value="chat" className="data-[state=active]:bg-primary/10">Chat</TabsTrigger>
                  <TabsTrigger value="help" className="data-[state=active]:bg-primary/10">Help</TabsTrigger>
                  <TabsTrigger value="settings" className="data-[state=active]:bg-primary/10">Settings</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent 
                value="chat" 
                className="h-full flex flex-col pt-0 mt-0"
              >
                {/* Messages area */}
                <div className="flex-1 overflow-y-auto p-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-gray-100'
                        }`}
                      >
                        <p>{message.text}</p>
                        <span className="text-xs opacity-70 block mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex justify-start mb-4">
                      <div className="bg-gray-100 rounded-lg px-4 py-2">
                        <div className="flex space-x-1 items-center">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input area */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="bg-primary hover:bg-primary/80"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="help" className="h-full overflow-auto p-4">
                <h3 className="text-lg font-medium mb-4">How can I help you?</h3>
                <div className="grid gap-3">
                  {['Order tracking', 'Product questions', 'Shipping info', 'Returns policy', 'Payment issues'].map((topic) => (
                    <Card key={topic} className="cursor-pointer hover:bg-gray-50 transition-colors">
                      <CardContent className="p-3">
                        <p>{topic}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="settings" className="h-full overflow-auto p-4">
                <h3 className="text-lg font-medium mb-4">Settings</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Notifications</span>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Clear conversation</span>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => setMessages([{
                        id: Date.now(),
                        text: "Chat history cleared. How can I help you today?",
                        sender: 'bot',
                        timestamp: new Date()
                      }])}
                    >
                      Clear
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bot version</span>
                    <Badge>v3.0</Badge>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ZeroBot3;
