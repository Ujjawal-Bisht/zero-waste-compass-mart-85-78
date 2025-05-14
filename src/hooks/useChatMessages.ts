
import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import { generateAIResponse } from '@/utils/chatUtils';

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm Zero Bot, your AI assistant for sustainability and zero waste living. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Calculate AI typing time based on question complexity
    const baseTypingTime = 1000; 
    const wordsPerMinute = 300;
    
    // Generate AI response
    const aiResponse = generateAIResponse(content);
    
    // Calculate a more realistic typing time based on response length
    const wordCount = aiResponse.split(' ').length;
    const typingTimeInSeconds = (wordCount / wordsPerMinute) * 60;
    const typingTimeMs = Math.max(
      baseTypingTime, 
      Math.min(3000, typingTimeInSeconds * 1000)
    );

    // Simulate AI thinking time and then respond with variable timing
    setTimeout(() => {      
      setIsTyping(false);
      
      const botMessage: Message = {
        id: messages.length + 2,
        content: aiResponse,
        sender: 'bot',
        timestamp: new Date(),
        isMarkdown: aiResponse.includes('*') || aiResponse.includes('#'),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, typingTimeMs);
  };

  return {
    messages,
    isTyping,
    sendMessage,
    messagesEndRef
  };
}
