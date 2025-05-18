
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Lightbulb, Loader2, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ZeroBotProps {
  initialPrompt?: string;
}

const ZeroBot: React.FC<ZeroBotProps> = ({ initialPrompt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Hi there! I'm ZeroBot, your AI shopping assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [trainingMode, setTrainingMode] = useState(false);
  const [trainingQuestion, setTrainingQuestion] = useState('');
  const [trainingAnswer, setTrainingAnswer] = useState('');

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle initial prompt if provided
  useEffect(() => {
    if (initialPrompt && messages.length === 1) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  // Common questions and answers
  const botKnowledge = [
    {
      question: 'How do I track my order?',
      answer: 'You can track your order by going to "My Orders" section and clicking on the tracking button next to your order. You\'ll see real-time updates about your package location.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept credit/debit cards, UPI payments, net banking, and wallet payments like PayTM and PhonePe. Cash on delivery is also available for orders under ₹10,000.'
    },
    {
      question: 'How do I return an item?',
      answer: 'To return an item, go to your order history, find the order containing the item you want to return, and click "Return Item". Follow the instructions to print a return label and schedule a pickup.'
    },
    {
      question: 'Is there a warranty on products?',
      answer: 'Product warranties vary by category and brand. The warranty information is displayed on each product page. You can also check warranty details in your order confirmation email.'
    },
    {
      question: 'Do you offer same-day delivery?',
      answer: 'Yes, we offer same-day delivery in selected metro areas for orders placed before 2 PM. Look for the "Same Day Delivery" tag on eligible products.'
    }
  ];

  // Add training pair to knowledge base
  const addTrainingPair = () => {
    if (trainingQuestion.trim() === '' || trainingAnswer.trim() === '') {
      return;
    }

    botKnowledge.push({
      question: trainingQuestion,
      answer: trainingAnswer
    });

    setMessages(prev => [...prev, {
      id: crypto.randomUUID(),
      text: `Training complete! I've learned how to answer: "${trainingQuestion}"`,
      sender: 'bot',
      timestamp: new Date()
    }]);

    // Reset training fields
    setTrainingQuestion('');
    setTrainingAnswer('');
    setTrainingMode(false);
  };

  const handleSendMessage = (text = inputValue.trim()) => {
    if (text === '') return;

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      // Find answer in knowledge base
      let botResponse = "I don't have information about that yet. Would you like to teach me?";
      const lowerCaseQuestion = text.toLowerCase();
      
      for (const item of botKnowledge) {
        if (lowerCaseQuestion.includes(item.question.toLowerCase())) {
          botResponse = item.answer;
          break;
        }
      }

      // Add bot response
      const botMessage: Message = {
        id: crypto.randomUUID(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, type: 'spring' }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-14 w-14 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg"
          size="icon"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] z-50"
          >
            <Card className="w-full h-full flex flex-col overflow-hidden shadow-xl border-2 border-indigo-100">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium flex items-center">
                    <Bot className="mr-2 h-5 w-5" />
                    ZeroBot Assistant
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-white hover:bg-white/20 rounded-full" 
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow overflow-y-auto p-4 bg-gradient-to-br from-gray-50 to-white">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'user' 
                            ? 'bg-indigo-500 text-white rounded-br-none' 
                            : 'bg-white shadow-sm border border-gray-100 rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1 text-right">
                          {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 rounded-bl-none">
                        <div className="flex space-x-2 items-center h-5">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-150" />
                          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-300" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              
              {/* Training Mode */}
              <AnimatePresence>
                {trainingMode && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-100 bg-indigo-50 overflow-hidden"
                  >
                    <div className="p-3 space-y-2">
                      <div>
                        <p className="text-xs font-medium mb-1 text-indigo-700">Question to train:</p>
                        <input
                          className="w-full p-2 text-sm border rounded bg-white"
                          placeholder="What question should I learn?"
                          value={trainingQuestion}
                          onChange={(e) => setTrainingQuestion(e.target.value)}
                        />
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-1 text-indigo-700">Answer to give:</p>
                        <textarea
                          className="w-full p-2 text-sm border rounded resize-none bg-white"
                          placeholder="What answer should I give?"
                          rows={2}
                          value={trainingAnswer}
                          onChange={(e) => setTrainingAnswer(e.target.value)}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          onClick={addTrainingPair}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Save Training
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => setTrainingMode(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <CardFooter className="p-2 border-t flex items-end">
                {!trainingMode && (
                  <div className="flex items-end w-full gap-2">
                    <Textarea
                      className="min-h-8 resize-none"
                      placeholder="Type your message..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      rows={1}
                    />
                    <div className="flex flex-col gap-2">
                      <Button 
                        size="icon" 
                        className="h-9 w-9 shrink-0 rounded bg-indigo-500 hover:bg-indigo-600"
                        onClick={() => handleSendMessage()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="h-9 w-9 shrink-0 rounded border-indigo-200"
                        onClick={() => setTrainingMode(true)}
                      >
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ZeroBot;
