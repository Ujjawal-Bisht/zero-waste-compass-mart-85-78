
import React, { useState, useEffect, useRef } from 'react';
import ZeroBotDialog from './components/zerobot/ZeroBotDialog';

export interface ZeroBot3Props {
  initialPrompt?: string;
  showInitially?: boolean;
  sellerMode?: boolean;
  theme?: 'light' | 'dark' | 'auto';
  enableVoice?: boolean;
  enableRealtime?: boolean;
  showAnalytics?: boolean;
}

const ZeroBot3: React.FC<ZeroBot3Props> = ({
  initialPrompt,
  showInitially = false,
  sellerMode = false,
  theme = 'auto',
  enableVoice = true,
  enableRealtime = true,
  showAnalytics = true
}) => {
  // States
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      content: "👋 Hi there! I'm your ZeroBot AI assistant v3.0. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      category: 'general',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [trainingMode, setTrainingMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle input submission
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  // Send message function
  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      content,
      sender: 'user',
      timestamp: new Date(),
      category: 'general',
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        content: `I received your message: "${content}". This is a simulated response.`,
        sender: 'bot',
        timestamp: new Date(),
        category: 'general',
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  // Handle pressing Enter to send
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Open the chat on initial render if showInitially is true
  useEffect(() => {
    if (showInitially) {
      setIsOpen(true);
    }
    
    // Send initial prompt if provided
    if (initialPrompt) {
      setTimeout(() => {
        sendMessage(initialPrompt);
      }, 1000);
    }
  }, []);

  return (
    <>
      {isOpen ? (
        <ZeroBotDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          messages={messages}
          inputValue={inputValue}
          setInputValue={setInputValue}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
          trainingMode={trainingMode}
          setTrainingMode={setTrainingMode}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
        />
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
          aria-label="Open ZeroBot AI"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}
    </>
  );
};

export default ZeroBot3;
