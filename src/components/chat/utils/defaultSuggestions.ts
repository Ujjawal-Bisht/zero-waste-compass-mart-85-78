
import { MessageCategory } from '@/types/chat';

export const defaultSuggestions: Record<MessageCategory, string[]> = {
  general: [
    "How does Zero Waste Mart work?", 
    "Where are nearby drop-offs?", 
    "What impact have we made?", 
    "How to donate items?"
  ],
  sustainability: [
    "Tips for sustainable living?",
    "How to start composting?",
    "Zero waste kitchen ideas?",
    "Eco-friendly alternatives?"
  ],
  climate: [
    "How does reusing help climate?",
    "Carbon footprint of recycling?",
    "Climate impact of food waste?",
    "Individual vs corporate impact?"
  ],
  personal: [
    "Track my waste reduction?",
    "Start my zero waste journey?",
    "Find local sustainability groups?",
    "Create sustainable habits?"
  ],
  tracking: [
    "When will my package arrive?",
    "Is there a delay with my order?",
    "Can I change my delivery address?",
    "How do I track my recent order?"
  ],
  product: [
    "What materials is this made from?",
    "Is this product recyclable?",
    "How long does this product last?",
    "Is there a warranty on this item?"
  ],
  order: [
    "How do I change my order?",
    "Can I cancel my recent purchase?",
    "When will my order ship?",
    "How do I return an item?"
  ],
  invoice: [
    "How do I get a receipt?",
    "Can I get a tax invoice?",
    "Where do I find past invoices?",
    "How do I report a billing issue?"
  ]
};
