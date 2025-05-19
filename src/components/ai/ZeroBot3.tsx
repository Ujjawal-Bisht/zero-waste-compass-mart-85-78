
import React from 'react';
import { useChatMessages } from './hooks/zerobot/useChatMessages';
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
  // Use our hook to manage state and behavior
  const {
    messages,
    isTyping,
    sendMessage,
    messagesEndRef,
    inputValue,
    setInputValue,
    isOpen,
    setIsOpen,
    trainingMode, 
    setTrainingMode,
  } = useChatMessages();

  // Handle input submission
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  // Handle pressing Enter to send
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Open the chat on initial render if showInitially is true
  React.useEffect(() => {
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
          className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
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
