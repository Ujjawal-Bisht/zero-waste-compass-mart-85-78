
import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import { generateAIResponse } from '@/utils/chatUtils';

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm Zero Bot, your AI assistant. How can I help you reduce waste today?",
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

    // Simulate AI thinking time and then respond
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      
      setIsTyping(false);
      
      const botMessage: Message = {
        id: messages.length + 2,
        content: aiResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1500);
  };

  return {
    messages,
    isTyping,
    sendMessage,
    messagesEndRef
  };
}
