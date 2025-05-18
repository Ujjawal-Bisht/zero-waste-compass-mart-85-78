
import { useState, useEffect } from 'react';
import { MessageCategory } from '@/types/chat';

export function useConversationContext(messages: any[]) {
  const [conversationContext, setConversationContext] = useState<MessageCategory>('general');

  useEffect(() => {
    // Analyze conversation to determine context for better responses
    if (messages.length > 1) {
      analyzeConversationContext();
    }
  }, [messages]);

  // Analyze conversation context for more relevant responses
  const analyzeConversationContext = () => {
    // Get the last 3 user messages for context
    const recentUserMessages = messages
      .filter(msg => msg.sender === 'user')
      .slice(-3)
      .map(msg => msg.content.toLowerCase());
    
    if (recentUserMessages.length === 0) return;
    
    const combinedText = recentUserMessages.join(' ');
    
    // Check for context keywords
    const contextMap: {[key: string]: MessageCategory} = {
      'track': 'tracking',
      'shipping': 'tracking',
      'delivery': 'tracking', 
      'package': 'tracking',
      'where': 'tracking',
      
      'invoice': 'invoice',
      'receipt': 'invoice',
      'bill': 'invoice',
      'payment': 'invoice',
      
      'order': 'order',
      'purchased': 'order',
      'buy': 'order',
      'cancel': 'order',
      
      'product': 'product',
      'item': 'product', 
      'material': 'product',
      'made': 'product',
      
      'sustainability': 'sustainability',
      'sustainable': 'sustainability',
      'eco': 'sustainability',
      'green': 'sustainability',
      'environment': 'sustainability',
      
      'climate': 'climate',
      'carbon': 'climate',
      'emissions': 'climate',
      'global warming': 'climate',
      
      'my': 'personal',
      'me': 'personal',
      'i': 'personal',
      'account': 'personal',
    };
    
    // Determine primary context from the conversation
    let maxHits = 0;
    let primaryContext: MessageCategory = 'general';
    
    Object.entries(contextMap).forEach(([keyword, category]) => {
      const regex = new RegExp(keyword, 'gi');
      const matches = combinedText.match(regex)?.length || 0;
      
      if (matches > maxHits) {
        maxHits = matches;
        primaryContext = category;
      }
    });
    
    setConversationContext(primaryContext);
  };
  
  return { conversationContext, setConversationContext };
}
