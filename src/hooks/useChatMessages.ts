
import { useState, useRef, useEffect } from 'react';
import { Message, MessageCategory } from '@/types/chat';
import { useConversationContext } from './chat/useConversationContext';
import { useResponseGeneration } from './chat/useResponseGeneration';
import { useSuggestedQuestions } from './chat/useSuggestedQuestions';
import { useTypingSimulation } from './chat/useTypingSimulation';

export function useChatMessages() {
  // State for messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "👋 Hi there! I'm your ZeroBot AI assistant v3.0. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      category: 'general',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Import modular hooks
  const { conversationContext, setConversationContext } = useConversationContext(messages);
  const { generateAIResponse } = useResponseGeneration();
  const { getSuggestedQuestions } = useSuggestedQuestions();
  const { calculateTypingTime } = useTypingSimulation();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      content,
      sender: 'user',
      timestamp: new Date(),
      category: 'general',
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Generate response text
    const responseContent = generateAIResponse(content, conversationContext);
    
    // Calculate typing time based on message length
    const thinkingTime = 500; // Base thinking time
    const typingTime = calculateTypingTime(responseContent);
    
    // Simulate AI thinking then typing with variable response time
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        content: responseContent,
        sender: 'bot',
        timestamp: new Date(),
        category: conversationContext,
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, thinkingTime + typingTime);
  };

  const searchMessages = (query: string) => {
    if (!query.trim()) return messages;
    
    const lowerCaseQuery = query.toLowerCase();
    return messages.filter(message => 
      message.content.toLowerCase().includes(lowerCaseQuery)
    );
  };

  return { 
    messages, 
    isTyping, 
    sendMessage, 
    messagesEndRef,
    conversationContext,
    getSuggestedQuestions,
    searchQuery,
    setSearchQuery,
    searchMessages
  };
}
