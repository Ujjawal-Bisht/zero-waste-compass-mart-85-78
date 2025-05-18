
import { useState, useEffect } from 'react';
import { Message } from '@/types/chat';

export function useSearch(messages: Message[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
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
  
  const toggleSearch = () => {
    setIsSearching(!isSearching);
    if (!isSearching) {
      setSearchQuery('');
    }
  };
  
  return {
    searchQuery,
    setSearchQuery,
    filteredMessages,
    isSearching,
    setIsSearching,
    toggleSearch,
  };
}
