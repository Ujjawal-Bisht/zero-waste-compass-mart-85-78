
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/auth';
import { ZeroBotAI } from '@/services/ZeroBotAI';
import { Message, MessageCategory } from '@/types/chat';

export function useZeroBot(initialPrompt?: string, sellerMode = false) {
  // State
  const [isOpen, setIsOpen] = useState(false);
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
  const [realtimeActive, setRealtimeActive] = useState(true);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  
  // References
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAuth();
  
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
      const options = {
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
          (response) => {
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
      setSearchQuery('');
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
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
    setShowSettings(false);
  };
  
  // Handle tab switching and topic selection
  const handleGetStartedClick = () => {
    setActiveTab('chat');
    handleSendMessage('Help me get started');
  };
  
  const handleTopicClick = (title: string) => {
    handleSendMessage(`Tell me about ${title}`);
    setActiveTab('chat');
  };
  
  return {
    // State
    isOpen,
    setIsOpen,
    activeTab,
    setActiveTab,
    messages,
    inputValue,
    setInputValue,
    isProcessing,
    searchQuery,
    setSearchQuery,
    filteredMessages,
    isSearching,
    isRecording,
    currentContext,
    streamedResponse,
    realtimeActive,
    hasUnreadMessages,
    setHasUnreadMessages,
    suggestions,
    showSettings,
    setShowSettings,
    messagesEndRef,
    
    // Handlers
    handleSendMessage,
    handleKeyPress,
    toggleSearch,
    handleSuggestionClick,
    toggleRealtimeMode,
    handleMessageReaction,
    startRecording,
    stopRecording,
    clearChat,
    handleGetStartedClick,
    handleTopicClick,
    cancelCurrentStream: ZeroBotAI.cancelCurrentStream
  };
}
