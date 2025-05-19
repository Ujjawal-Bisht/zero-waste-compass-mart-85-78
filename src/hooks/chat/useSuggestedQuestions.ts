import { MessageCategory } from '@/types/chat';

export function useSuggestedQuestions() {
  const getSuggestedQuestions = (conversationContext: MessageCategory): string[] => {
    // Return contextual suggested questions based on the current conversation
    switch(conversationContext) {
      case 'tracking':
        return [
          "When will my package arrive?",
          "Is there a delay with my order?",
          "Can I change my delivery address?",
          "How do I track my recent order?"
        ];
      case 'product':
        return [
          "What materials is this made from?",
          "Is this product recyclable?",
          "How long does this product last?",
          "Is there a warranty on this item?"
        ];
      case 'sustainability':
        return [
          "How can I reduce my plastic usage?",
          "What are the best composting methods?",
          "How to start a zero-waste lifestyle?",
          "Which products have the lowest environmental impact?"
        ];
      default:
        return [
          "How does Zero Waste Mart work?",
          "What impact have we made so far?",
          "Tips for sustainable living?",
          "How can I track my environmental impact?"
        ];
    }
  };

  return { getSuggestedQuestions };
}
