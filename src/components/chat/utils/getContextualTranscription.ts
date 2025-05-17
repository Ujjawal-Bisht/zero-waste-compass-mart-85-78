
import { MessageCategory } from '@/types/chat';

export const getContextualTranscription = (conversationContext: MessageCategory = 'general'): string => {
  // Generate contextual transcription based on current conversation context
  switch(conversationContext) {
    case 'sustainability':
      return "How can I reduce plastic waste in my daily routine?";
    case 'climate':
      return "What's the carbon footprint of recycling compared to composting?";
    case 'tracking':
      return "Where is my package right now?";
    case 'order':
      return "I need to change my delivery address for order ZWM-7829.";
    case 'product':
      return "Are your bamboo products sustainably sourced?";
    case 'invoice':
      return "Can I get a receipt for my last purchase?";
    case 'personal':
      return "How much waste have I saved this month?";
    default:
      return "Tell me more about Zero Waste Mart's sustainability initiatives.";
  }
};
