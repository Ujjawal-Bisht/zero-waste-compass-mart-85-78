
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import ZeroBotHeader from './ZeroBotHeader';
import ZeroBotMessageList from './ZeroBotMessageList';
import ZeroBotInputArea from './ZeroBotInputArea';
import ZeroBotTrainingPanel from './ZeroBotTrainingPanel';

interface ZeroBotDialogProps {
  isOpen: boolean;
  onClose: () => void;
  messages: any[];
  inputValue: string;
  setInputValue: (value: string) => void;
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  trainingMode: boolean;
  setTrainingMode: (mode: boolean) => void;
  trainingQuestion: string;
  setTrainingQuestion: (value: string) => void;
  trainingAnswer: string;
  setTrainingAnswer: (value: string) => void;
  addTrainingPair: () => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

const ZeroBotDialog: React.FC<ZeroBotDialogProps> = ({
  isOpen,
  onClose,
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
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] z-50"
    >
      <Card className="w-full h-full flex flex-col overflow-hidden shadow-xl border-2 border-indigo-100">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4">
          <ZeroBotHeader onClose={onClose} />
        </CardHeader>
        
        <CardContent className="flex-grow overflow-y-auto p-4 bg-gradient-to-br from-gray-50 to-white">
          <ZeroBotMessageList 
            messages={messages} 
            isTyping={isTyping} 
            messagesEndRef={messagesEndRef} 
          />
        </CardContent>
        
        <AnimatePresence>
          {trainingMode && (
            <ZeroBotTrainingPanel
              trainingQuestion={trainingQuestion}
              trainingAnswer={trainingAnswer}
              setTrainingQuestion={setTrainingQuestion}
              setTrainingAnswer={setTrainingAnswer}
              addTrainingPair={addTrainingPair}
              setTrainingMode={setTrainingMode}
            />
          )}
        </AnimatePresence>
        
        <CardFooter className="p-2 border-t flex items-end">
          <ZeroBotInputArea
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSendMessage={handleSendMessage}
            handleKeyPress={handleKeyPress}
            setTrainingMode={setTrainingMode}
            trainingMode={trainingMode}
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ZeroBotDialog;
