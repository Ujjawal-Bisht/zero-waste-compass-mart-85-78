
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useZeroBotLogic } from './components/zerobot/useZeroBotLogic';
import ZeroBotFloatingButton from './components/zerobot/ZeroBotFloatingButton';
import ZeroBotDialog from './components/zerobot/ZeroBotDialog';

interface ZeroBotProps {
  initialPrompt?: string;
}

const ZeroBot: React.FC<ZeroBotProps> = ({ initialPrompt }) => {
  const {
    isOpen,
    setIsOpen,
    messages,
    inputValue,
    setInputValue,
    isTyping,
    messagesEndRef,
    trainingMode,
    setTrainingMode,
    trainingQuestion,
    setTrainingQuestion,
    trainingAnswer,
    setTrainingAnswer,
    addTrainingPair,
    handleSendMessage,
    handleKeyPress
  } = useZeroBotLogic(initialPrompt);

  return (
    <>
      {!isOpen && (
        <ZeroBotFloatingButton onClick={() => setIsOpen(true)} />
      )}

      <AnimatePresence>
        {isOpen && (
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
            trainingQuestion={trainingQuestion}
            setTrainingQuestion={setTrainingQuestion}
            trainingAnswer={trainingAnswer}
            setTrainingAnswer={setTrainingAnswer}
            addTrainingPair={addTrainingPair}
            handleSendMessage={handleSendMessage}
            handleKeyPress={handleKeyPress}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ZeroBot;
