
import { MessageCategory } from '@/types/chat';

// Response data organized by category
const responseData = {
  tracking: [
    "I've located your package! It's currently at the local distribution center and will be delivered tomorrow between 9 AM and 12 PM. You'll receive real-time updates on your app.",
    "Your package is out for delivery today! The delivery window is between 2 PM and 6 PM. The driver will send you a notification when they're about 30 minutes away.",
    "According to our tracking system, your package has cleared customs and is now in transit domestically. Expected delivery is within 2-3 business days.",
    "I've checked your tracking details, and your order was picked up by our courier at 10:15 AM today. It's en route to the regional sorting facility and remains on schedule.",
    "The latest tracking shows your package was loaded onto the delivery vehicle at 8:30 AM. It's part of today's route, so you should receive it before 8 PM tonight.",
    "There's a slight delay with your package due to weather conditions affecting shipping routes. The updated delivery date is Monday, and you'll get automatic updates."
  ],
  invoice: [
    "Your invoice is ready! You can download a detailed breakdown of all charges directly from your order details page. Would you like me to email you a copy as well?",
    "I've generated an updated invoice with the recent discount applied to your order. Check your email inbox within the next 5 minutes or access it from your account dashboard.",
    "For tax purposes, all invoices include our company registration details. Your recent purchase invoice is available in both PDF and CSV formats for your accounting needs.",
    "The invoice for your 'out for delivery' order is now available for immediate download. It includes all warranty information and return policy details.",
    "Since your order was marked as delivered, the final invoice has been automatically generated. You'll find it in your account under 'Order History'."
  ],
  order: [
    "Your order #ZWM-7829 is being processed and will ship within 24 hours. I've added a complimentary eco-friendly tote bag to your package as a thank you!",
    "I've checked your order status - it shipped this morning and will arrive by Wednesday. The carrier will send you a text message with a 2-hour delivery window.",
    "Great news! Your order is out for delivery today. Our driver will take a photo of the package at your doorstep once it's delivered for added security.",
    "I found your order details. Your sustainable kitchenware items are being prepared for shipping from our closest zero-waste facility to minimize carbon footprint.",
    "Your payment was successfully processed, and your order is confirmed. Would you like to track your carbon offset for this purchase?",
    "I've notified our fulfillment center about your inquiry. Your order is being prioritized, and we've updated your delivery preference to 'plastic-free packaging'."
  ],
  product: [
    "This product is made from 100% post-consumer recycled materials and is completely biodegradable. It comes with a 2-year warranty against defects.",
    "The reusable container you're asking about is dishwasher safe, microwave safe, and free from BPA, phthalates, and other harmful chemicals.",
    "Our bamboo utensil set is sustainably harvested and treated with food-safe natural oils. Each set prevents approximately 730 plastic utensils from entering landfills annually.",
    "The dimensions are 10\" x 12\" x 5\", and the product weighs just 1.2 pounds, making it perfect for everyday use or travel. It's designed to replace 4-6 single-use items.",
    "This zero-waste starter kit includes 8 essential items to begin your sustainability journey: reusable bags, beeswax wraps, bamboo toothbrush, shampoo bar, safety razor, cloth napkins, stainless steel straws, and a coffee thermos.",
    "The ingredient list includes only plant-derived components: coconut oil, shea butter, essential oils, and natural colorants. It's certified cruelty-free and vegan."
  ],
  sustainability: [
    "Reducing food waste is one of the most effective climate actions! Try meal planning, proper food storage, and composting to minimize your environmental impact.",
    "The average American uses 156 plastic water bottles annually. Switching to a reusable bottle can save money while preventing plastic pollution.",
    "Clothing swaps are a fantastic way to refresh your wardrobe sustainably. They create community connections while extending the lifecycle of garments.",
    "Indoor plants like snake plants and pothos not only beautify your space but also naturally filter air pollutants, reducing the need for air purifiers.",
    "Creating a 'no junk mail' system can save up to 100 pounds of paper waste per household annually. Try digital subscriptions and opt-out of catalog mailings.",
    "Implementing 'Meatless Mondays' can reduce your carbon footprint by approximately 8 pounds of emissions weekly - that's over 400 pounds per year!"
  ],
  climate: [
    "Every reused item prevents approximately 4.4 pounds of carbon emissions on average. Last year, Zero Waste Mart users collectively prevented over 2.3 million pounds of CO2!",
    "The carbon footprint of recycling varies widely: aluminum recycling saves 95% of the energy needed for virgin production, while paper saves about 60%.",
    "Food waste produces methane in landfills - a greenhouse gas 25 times more potent than CO2. Composting instead can reduce your climate impact significantly.",
    "While individual actions matter, corporate and policy changes create the biggest impact. Our community activism section connects you with local climate initiatives.",
    "Thrift shopping for clothing can reduce the carbon footprint of your wardrobe by up to 82% compared to buying new fast fashion items.",
    "Our local climate impact calculator shows your ecosystem's specific vulnerabilities and suggests targeted actions for your region."
  ],
  personal: [
    "Based on your purchase history, you've prevented approximately 267 single-use items from entering landfills this year! Would you like to set a new goal for next quarter?",
    "I notice you're building a zero-waste kitchen collection. Have you tried our silicone food storage bags? They're particularly compatible with your existing purchases.",
    "Your sustainability score is in the top 15% of our community! Would you like to share your journey and tips with other members?",
    "Looking at your previous questions, I think you might enjoy our upcoming workshop on home composting systems for small spaces. Should I send you details?",
    "Your search history suggests interest in zero-waste personal care. Our newly added bamboo razor with replaceable blades has received excellent reviews from similar users.",
    "Based on your location, there's a community garden within 2 miles of you that accepts compost contributions. Would you like information about getting involved?"
  ]
};

// General responses for any topic
const generalResponses = [
  "I appreciate your question! Here's what I can tell you about that...",
  "That's an excellent topic. Based on the latest sustainability research...",
  "I'd be happy to help with that! Here's what our zero waste experts recommend...",
  "Great question! From an environmental perspective...",
  "Thanks for asking about that! Here's what sustainable practices suggest...",
  "I understand how important this is. The most eco-friendly approach would be..."
];

export function useResponseGeneration() {
  const generateAIResponse = (userMessage: string, conversationContext: MessageCategory): string => {
    // Select appropriate response based on conversation context
    let responseArray = generalResponses;
    
    switch(conversationContext) {
      case 'tracking':
        responseArray = responseData.tracking;
        break;
      case 'invoice':
        responseArray = responseData.invoice;
        break; 
      case 'order':
        responseArray = responseData.order;
        break;
      case 'product':
        responseArray = responseData.product;
        break;
      case 'sustainability':
        responseArray = responseData.sustainability;
        break;
      case 'climate':
        responseArray = responseData.climate;
        break;
      case 'personal':
        responseArray = responseData.personal;
        break;
      default:
        responseArray = generalResponses;
    }

    // For personalized responses, check for name reference
    if (conversationContext === 'personal' && userMessage.toLowerCase().includes('name')) {
      return "I see you're asking about personal information. While I don't have access to your full profile, you can update your name and other details in the Profile section of your account settings.";
    }

    return responseArray[Math.floor(Math.random() * responseArray.length)];
  };
  
  return { generateAIResponse };
}
