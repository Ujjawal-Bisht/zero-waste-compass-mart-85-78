
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface BotKnowledge {
  question: string;
  answer: string;
}

export function useZeroBotLogic(initialPrompt?: string) {
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

  // Common questions and answers
  const [botKnowledge, setBotKnowledge] = useState<BotKnowledge[]>([
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
  ]);

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

  // Add training pair to knowledge base
  const addTrainingPair = () => {
    if (trainingQuestion.trim() === '' || trainingAnswer.trim() === '') {
      return;
    }

    setBotKnowledge(prevKnowledge => [...prevKnowledge, {
      question: trainingQuestion,
      answer: trainingAnswer
    }]);

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

  return {
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
  };
}
