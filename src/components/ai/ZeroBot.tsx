import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Lightbulb, Settings } from 'lucide-react';
import ZeroBotDialog from './components/zerobot/ZeroBotDialog';
import ZeroBotSuggestionsBar from './components/zerobot/ZeroBotSuggestionsBar';
import ZeroBotTypingIndicatorV5 from './components/zerobot/ZeroBotTypingIndicatorV5';

const ZeroBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi, I'm ZeroBot! How can I help you shop more sustainably today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [trainingMode, setTrainingMode] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    setMessages([...messages, { text: inputValue, sender: 'user' }]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { text: "This is a simulated response from ZeroBot.", sender: 'bot' }]);
      setIsTyping(false);
      setSuggestions(['Suggest 1', 'Suggest 2', 'Suggest 3']);
    }, 1500);
  };

  const handleSuggestionClick = (s: string) => {
    setInputValue(s);
    handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <ZeroBotDialog
            isOpen={isOpen}
            onClose={handleClose}
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
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <ZeroBotSuggestionsBar
              suggestions={suggestions}
              isProcessing={isTyping}
              onSuggestionClick={handleSuggestionClick}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <ZeroBotTypingIndicatorV5 isTyping={isTyping} />
        )}
      </AnimatePresence>

      <motion.button
        className="rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 p-3 relative overflow-hidden"
        onClick={handleToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        layout
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>
    </div>
  );
};

export default ZeroBot;
