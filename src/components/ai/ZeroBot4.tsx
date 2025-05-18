
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Search, Send, ThumbsUp, ThumbsDown, PauseCircle, Volume2, Mic, Sparkles, ShoppingCart, MessagesSquare } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { ZeroBotAI, ZeroBotResponse, ZeroBotRequestOptions } from '@/services/ZeroBotAI';
import { Message, MessageCategory, RealtimeResponse } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface ZeroBot4Props {
  initialPrompt?: string;
  showInitially?: boolean;
  enableVoice?: boolean;
  enableRealtime?: boolean;
  showAnalytics?: boolean;
  sellerMode?: boolean;
}

const ZeroBot4: React.FC<ZeroBot4Props> = ({
  initialPrompt,
  showInitially = false,
  enableVoice = true,
  enableRealtime = true,
  showAnalytics = false,
  sellerMode = false,
}) => {
  // State
  const [isOpen, setIsOpen] = useState(showInitially);
  const [activeTab, setActiveTab] = useState<'chat' | 'help' | 'analytics'>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentContext, setCurrentContext] = useState<MessageCategory>('general');
  const [streamedResponse, setStreamedResponse] = useState('');
  const [realtimeActive, setRealtimeActive] = useState(enableRealtime);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  
  // Help topics for seller mode vs regular mode
  const helpTopics = sellerMode ? [
    { title: 'Adding Products', description: 'Learn how to add new products to your inventory.' },
    { title: 'Managing Orders', description: 'Track and manage customer orders efficiently.' },
    { title: 'Analytics Dashboard', description: 'Understand your seller performance metrics.' },
    { title: 'Promotions & Discounts', description: 'Create effective promotions for your products.' },
    { title: 'Shipping Settings', description: 'Configure your shipping options and rates.' }
  ] : [
    { title: 'Tracking Orders', description: 'How to track your packages and deliveries.' },
    { title: 'Returns & Refunds', description: 'Process for returning items and getting refunds.' },
    { title: 'Sustainability Scores', description: 'Understanding our product sustainability ratings.' },
    { title: 'Account Management', description: 'Managing your profile and preferences.' },
    { title: 'Payment Methods', description: 'Setting up and managing payment options.' }
  ];
  
  // Analytics data (would be from real data in production)
  const mockAnalytics = {
    interactions: 24,
    topQuestions: ['Where is my order?', 'How do I return this item?', 'Are these products sustainable?'],
    averageResponseTime: '1.4 seconds',
    satisfactionRate: '92%',
    categoriesDistribution: {
      product: 35,
      order: 25,
      tracking: 20,
      sustainability: 15,
      other: 5
    }
  };
  
  // References
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentUser } = useAuth();
  
  // Effects
  useEffect(() => {
    if (messages.length === 0) {
      // Add welcome message
      addBotMessage(
        sellerMode
          ? "Welcome to ZeroBot AI v4.0! I'm here to help you manage your seller account, add new products, analyze sales data, and optimize your store performance. What would you like assistance with today?"
          : "Hello! I'm ZeroBot AI v4.0, your shopping and sustainability assistant. I can help you find products, track orders, learn about sustainability features, and more. How can I assist you today?",
        'general'
      );
    }
    
    // Handle initial prompt if provided
    if (initialPrompt && messages.length === 1) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, sellerMode]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, streamedResponse]);
  
  // Track unread messages when chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > 1 && messages[messages.length - 1].sender === 'bot') {
      setHasUnreadMessages(true);
    }
  }, [messages, isOpen]);
  
  // Handle filtering messages when search query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = messages.filter(message => 
        message.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMessages(filtered);
    } else {
      setFilteredMessages([]);
    }
  }, [searchQuery, messages]);
  
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
  
  // Handler functions
  const handleSendMessage = async (content: string = inputValue.trim()) => {
    if (!content) return;
    
    // Add user message to chat
    addUserMessage(content);
    setInputValue('');
    setIsProcessing(true);
    
    try {
      // Detect context of user message
      const detectedContext = ZeroBotAI.detectMessageContext(content);
      setCurrentContext(detectedContext);
      
      // Set options for request
      const options: ZeroBotRequestOptions = {
        category: detectedContext,
        userId: currentUser?.id,
        realtime: realtimeActive
      };
      
      if (realtimeActive) {
        // Initialize streaming response
        setStreamedResponse('');
        
        // Process with streaming
        await ZeroBotAI.processMessageRealtime(
          content,
          options,
          // On chunk handler
          (chunk: string) => {
            setStreamedResponse(prev => prev + chunk);
          },
          // On complete handler
          (response: ZeroBotResponse) => {
            setIsProcessing(false);
            setStreamedResponse('');
            
            // Add completed message
            addBotMessage(
              response.answer, 
              response.context || 'general',
              {
                processingTime: response.metadata?.processingTime,
                sources: response.metadata?.relatedTopics,
                isRealtime: true
              }
            );
            
            // Update suggestions
            setSuggestions(response.suggestions || []);
          }
        );
      } else {
        // Process normally
        const response = await ZeroBotAI.processMessage(content, options);
        
        // Add bot response
        addBotMessage(
          response.answer, 
          response.context || 'general',
          {
            processingTime: response.metadata?.processingTime,
            sources: response.metadata?.relatedTopics
          }
        );
        
        // Update suggestions
        setSuggestions(response.suggestions || []);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error processing message:", error);
      setIsProcessing(false);
      setStreamedResponse('');
      
      // Add error message
      addBotMessage(
        "I apologize, but I encountered an error processing your request. Please try again.",
        'general'
      );
      
      toast.error("Something went wrong. Please try again.");
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const toggleSearch = () => {
    setIsSearching(!isSearching);
    if (!isSearching) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => inputRef.current?.focus(), 100);
  };
  
  const toggleRealtimeMode = () => {
    const newMode = !realtimeActive;
    setRealtimeActive(newMode);
    toast.success(`${newMode ? 'Enabled' : 'Disabled'} real-time response mode`);
  };
  
  const handleMessageReaction = (messageId: number | string, reaction: 'like' | 'dislike') => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, reaction } 
          : msg
      )
    );
    
    toast.success(
      reaction === 'like' 
        ? 'Thank you for your feedback!' 
        : 'Thanks for helping us improve'
    );
    
    // In a real implementation, you'd send this feedback to your server
  };
  
  const startRecording = () => {
    setIsRecording(true);
    // In a real implementation, this would activate speech recognition
    toast.info("Voice recording feature coming soon");
    
    // Mock recording completion after 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      setInputValue("Show me sustainable kitchen products");
      toast.success("Voice input received");
    }, 3000);
  };
  
  const stopRecording = () => {
    setIsRecording(false);
  };
  
  const clearChat = () => {
    setMessages([]);
    // Re-add welcome message
    setTimeout(() => {
      addBotMessage(
        sellerMode
          ? "Chat cleared. What else can I help you with regarding your seller account?"
          : "Chat cleared. How else can I help you today?",
        'general'
      );
    }, 100);
    toast.success("Chat history cleared");
  };
  
  // Render helper functions
  const renderChatButton = () => (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <Button
        onClick={() => {
          setIsOpen(true);
          setHasUnreadMessages(false);
        }}
        className={`rounded-full h-14 w-14 relative ${
          sellerMode 
            ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700' 
            : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700'
        } shadow-lg`}
        size="icon"
      >
        <Bot className="h-6 w-6" />
        
        {/* Animated ring when bot has new messages */}
        {hasUnreadMessages && (
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-white"
            initial={{ scale: 1 }}
            animate={{ scale: 1.15, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        
        {/* Notification badge */}
        {hasUnreadMessages && (
          <motion.div
            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            1
          </motion.div>
        )}
        
        {/* Mode indicator badge */}
        <motion.div
          className="absolute -bottom-1 -right-1 bg-white shadow-md text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
        >
          {sellerMode ? (
            <ShoppingCart className="h-3 w-3 text-amber-500" />
          ) : (
            <MessagesSquare className="h-3 w-3 text-emerald-500" />
          )}
        </motion.div>
      </Button>
    </motion.div>
  );
  
  const renderMessage = (message: Message, index: number) => {
    const isBot = message.sender === 'bot';
    const isHighlighted = searchQuery && message.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Function to highlight search term in text
    const highlightText = (text: string) => {
      if (!searchQuery) return text;
      
      const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
      return (
        <>
          {parts.map((part, i) => 
            part.toLowerCase() === searchQuery.toLowerCase() ? 
              <span key={i} className="bg-yellow-200 font-medium">{part}</span> : 
              part
          )}
        </>
      );
    };
    
    return (
      <motion.div
        key={message.id}
        className={`flex ${isBot ? 'justify-start' : 'justify-end'} message-appear`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isBot && (
          <Avatar className="h-8 w-8 mr-2 mt-1">
            <AvatarFallback className={`${sellerMode ? 'bg-amber-500' : 'bg-emerald-500'} text-white flex items-center justify-center`}>
              <Bot size={14} />
            </AvatarFallback>
          </Avatar>
        )}
        
        <div 
          className={`max-w-[80%] p-3 rounded-lg ${
            isBot
              ? `bg-white border shadow-sm ${isHighlighted ? 'border-yellow-400 bg-yellow-50' : 'border-gray-100'}`
              : `${sellerMode ? 'bg-amber-500' : 'bg-emerald-500'} text-white`
          } ${isBot ? 'rounded-tl-none' : 'rounded-tr-none'}`}
        >
          <p className="text-sm">
            {highlightText(message.content)}
          </p>
          
          {/* Category badge for bot messages */}
          {isBot && message.category && (
            <div className="mt-1 flex items-center justify-between">
              <Badge variant="outline" className="text-xs bg-gray-50">
                {message.category}
              </Badge>
              
              {/* Feedback buttons */}
              <div className="flex space-x-1 ml-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 rounded-full hover:bg-gray-100"
                  onClick={() => handleMessageReaction(message.id, 'like')}
                >
                  <ThumbsUp 
                    size={12} 
                    className={message.reaction === 'like' ? 'text-blue-500 fill-blue-500' : 'text-gray-400'}
                  />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 rounded-full hover:bg-gray-100"
                  onClick={() => handleMessageReaction(message.id, 'dislike')}
                >
                  <ThumbsDown 
                    size={12} 
                    className={message.reaction === 'dislike' ? 'text-red-500 fill-red-500' : 'text-gray-400'}
                  />
                </Button>
              </div>
            </div>
          )}
          
          {/* Processing metadata for bot messages */}
          {isBot && message.metadata?.processingTime && (
            <span className="text-xxs text-gray-400 block mt-1">
              Processed in {Math.round(message.metadata.processingTime / 100) / 10}s
            </span>
          )}
          
          <span className="text-xs mt-1 block opacity-70">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        {!isBot && (
          <Avatar className="h-8 w-8 ml-2 mt-1">
            {currentUser?.photoURL ? (
              <AvatarImage src={currentUser.photoURL} alt={currentUser.displayName || 'User'} />
            ) : (
              <AvatarFallback className="bg-gray-200 text-gray-600">
                {currentUser?.displayName?.[0] || 'U'}
              </AvatarFallback>
            )}
          </Avatar>
        )}
      </motion.div>
    );
  };
  
  const renderStreamingMessage = () => {
    if (!streamedResponse) return null;
    
    return (
      <div className="flex justify-start message-appear">
        <Avatar className="h-8 w-8 mr-2 mt-1">
          <AvatarFallback className={`${sellerMode ? 'bg-amber-500' : 'bg-emerald-500'} text-white flex items-center justify-center`}>
            <Bot size={14} />
          </AvatarFallback>
        </Avatar>
        
        <div className="max-w-[80%] p-3 rounded-lg bg-white border border-gray-100 rounded-tl-none shadow-sm">
          <p className="text-sm whitespace-pre-wrap">
            {streamedResponse}
            <span className="inline-block w-2 h-4 ml-1 bg-gray-400 animate-pulse"></span>
          </p>
          
          <div className="mt-1 flex items-center justify-between">
            <Badge variant="outline" className="text-xs bg-gray-50">
              {currentContext}
            </Badge>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 rounded-full hover:bg-gray-100 text-gray-400"
              onClick={() => ZeroBotAI.cancelCurrentStream()}
            >
              <PauseCircle size={12} />
            </Button>
          </div>
          
          <span className="text-xs mt-1 block opacity-70">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    );
  };

  const renderHelpTab = () => (
    <div className="p-2 space-y-4">
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Frequently Asked Questions</h3>
        <div className="space-y-2">
          {helpTopics.map((topic, i) => (
            <Card key={i} className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-3" onClick={() => handleSendMessage(`Tell me about ${topic.title}`)}>
                <h4 className="font-medium text-sm">{topic.title}</h4>
                <p className="text-xs text-gray-500">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">ZeroBot AI v4.0 Features</h3>
        <ul className="space-y-2 text-xs">
          <li className="flex items-center gap-2">
            <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
              <Sparkles size={10} />
            </Badge>
            <span>Real-time responses with streaming API</span>
          </li>
          <li className="flex items-center gap-2">
            <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
              <Bot size={10} />
            </Badge>
            <span>Context-aware shopping assistance</span>
          </li>
          <li className="flex items-center gap-2">
            <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
              <Mic size={10} />
            </Badge>
            <span>Voice input for hands-free operation</span>
          </li>
          <li className="flex items-center gap-2">
            <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
              <ShoppingCart size={10} />
            </Badge>
            <span>{sellerMode ? 'Seller inventory management' : 'Shopping preferences memory'}</span>
          </li>
        </ul>
      </div>
      
      <Button 
        variant="default" 
        className={`w-full ${sellerMode ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
        onClick={() => {
          setActiveTab('chat');
          handleSendMessage('Help me get started');
        }}
      >
        Get Started
      </Button>
    </div>
  );
  
  const renderAnalyticsTab = () => (
    <div className="p-2 space-y-4">
      <h3 className="text-sm font-medium mb-2">Your ZeroBot Analytics</h3>
      
      <div className="grid grid-cols-2 gap-2">
        <Card>
          <CardContent className="p-3 flex flex-col items-center justify-center">
            <p className="text-xs text-gray-500">Interactions</p>
            <p className="text-xl font-bold">{mockAnalytics.interactions}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 flex flex-col items-center justify-center">
            <p className="text-xs text-gray-500">Avg. Response</p>
            <p className="text-xl font-bold">{mockAnalytics.averageResponseTime}</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="p-3 pb-0">
          <CardTitle className="text-sm">Question Categories</CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="h-20 relative">
            {/* Simple bar chart - would use recharts in production */}
            <div className="absolute inset-0 flex items-end gap-1">
              {Object.entries(mockAnalytics.categoriesDistribution).map(([category, value], i) => (
                <div key={i} className="relative flex-1 group">
                  <div 
                    className={`w-full ${
                      sellerMode 
                        ? 'bg-amber-500' 
                        : 'bg-emerald-500'
                    } rounded-t`}
                    style={{ height: `${value}%` }}
                  ></div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-xs text-center mt-1 truncate cursor-help">{category}</p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{category}: {value}%</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="p-3 pb-0">
          <CardTitle className="text-sm">Top Questions</CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <ul className="text-xs space-y-2">
            {mockAnalytics.topQuestions.map((q, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-gray-400">{i+1}.</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => setActiveTab('chat')}
      >
        Return to Chat
      </Button>
    </div>
  );

  return (
    <>
      {/* Chat button */}
      {!isOpen && renderChatButton()}
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-full sm:w-96 h-[500px] flex flex-col bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className={`p-3 flex justify-between items-center ${
              sellerMode 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600' 
                : 'bg-gradient-to-r from-emerald-500 to-teal-600'
            } text-white`}>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 border-2 border-white/30">
                  <AvatarImage src="/logo-icon.svg" />
                  <AvatarFallback className="bg-white/20 text-white">
                    <Bot size={16} />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-sm flex items-center gap-1">
                    ZeroBot AI
                    <span className="ml-1 bg-white/20 text-white text-xs px-1.5 rounded">v4.0</span>
                  </h3>
                  <p className="text-xs text-white/70">
                    {sellerMode ? 'Seller Assistant' : 'Shopping Assistant'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={toggleRealtimeMode}
                        className={`h-7 w-7 rounded-full text-white/80 hover:text-white hover:bg-white/20 ${realtimeActive ? 'bg-white/20' : ''}`}
                      >
                        <Sparkles size={14} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        {realtimeActive ? 'Disable' : 'Enable'} real-time responses
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 rounded-full text-white/80 hover:text-white hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="border-b">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
                <TabsList className="w-full h-10 bg-gray-50">
                  <TabsTrigger value="chat" className="flex-1 data-[state=active]:bg-white">
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="help" className="flex-1 data-[state=active]:bg-white">
                    Help
                  </TabsTrigger>
                  {showAnalytics && (
                    <TabsTrigger value="analytics" className="flex-1 data-[state=active]:bg-white">
                      Analytics
                    </TabsTrigger>
                  )}
                </TabsList>
              </Tabs>
            </div>
            
            {/* Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <TabsContent value="chat" className="flex-1 overflow-hidden flex flex-col mt-0 p-0">
                {/* Search bar */}
                <AnimatePresence>
                  {isSearching && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-2 bg-gray-50">
                        <Input
                          ref={inputRef}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search conversation..."
                          className="w-full h-8 text-sm"
                        />
                      </div>
                      
                      {searchQuery && (
                        <div className="px-3 py-1 bg-gray-50 border-t border-gray-100">
                          <p className="text-xs text-gray-500">
                            Found {filteredMessages.length} {filteredMessages.length === 1 ? 'result' : 'results'}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Messages */}
                <ScrollArea className="flex-1 p-3 space-y-4">
                  {(searchQuery ? filteredMessages : messages).map((message, index) => (
                    renderMessage(message, index)
                  ))}
                  
                  {/* Streaming message */}
                  {streamedResponse && renderStreamingMessage()}
                  
                  {/* No results message */}
                  {searchQuery && filteredMessages.length === 0 && (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-sm text-gray-500">No messages matching "{searchQuery}"</p>
                    </div>
                  )}
                  
                  {/* Reference for auto-scroll */}
                  <div ref={messagesEndRef} />
                </ScrollArea>
                
                {/* Suggestions */}
                {suggestions.length > 0 && !isSearching && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    className="overflow-hidden bg-gray-50 border-t border-gray-100"
                  >
                    <div className="p-2 overflow-x-auto whitespace-nowrap flex gap-2">
                      {suggestions.map((suggestion, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs bg-white whitespace-nowrap"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* Input area */}
                <div className="p-2 border-t flex items-end gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                    disabled={isSearching || isProcessing}
                  />
                  
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className={`h-9 w-9 ${isSearching ? 'bg-gray-100' : ''}`}
                      onClick={toggleSearch}
                      title={isSearching ? "Close search" : "Search conversation"}
                    >
                      <Search size={16} className={isSearching ? 'text-gray-600' : 'text-gray-400'} />
                    </Button>
                    
                    {enableVoice && (
                      <Button
                        variant="outline"
                        size="icon"
                        className={`h-9 w-9 ${isRecording ? 'bg-red-50 border-red-200' : ''}`}
                        onClick={isRecording ? stopRecording : startRecording}
                        disabled={isProcessing || isSearching}
                      >
                        <Mic size={16} className={isRecording ? 'text-red-500' : 'text-gray-400'} />
                      </Button>
                    )}
                    
                    <Button
                      className={`h-9 w-9 ${
                        sellerMode 
                          ? 'bg-amber-500 hover:bg-amber-600' 
                          : 'bg-emerald-500 hover:bg-emerald-600'
                      }`}
                      size="icon"
                      onClick={() => handleSendMessage()}
                      disabled={!inputValue.trim() || isProcessing || isSearching}
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="help" className="flex-1 overflow-auto mt-0 p-0">
                {renderHelpTab()}
              </TabsContent>
              
              <TabsContent value="analytics" className="flex-1 overflow-auto mt-0 p-0">
                {renderAnalyticsTab()}
              </TabsContent>
            </div>
            
            {/* Settings panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  className="absolute inset-0 bg-white z-10 flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <div className={`p-3 flex justify-between items-center ${
                    sellerMode ? 'bg-amber-500' : 'bg-emerald-500'
                  } text-white`}>
                    <h3 className="font-medium">Settings</h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 rounded-full text-white/80 hover:text-white hover:bg-white/20"
                      onClick={() => setShowSettings(false)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                  
                  <div className="p-3 flex-1 space-y-4">
                    {/* Settings options would go here */}
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={clearChat}
                    >
                      Clear conversation
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ZeroBot4;
