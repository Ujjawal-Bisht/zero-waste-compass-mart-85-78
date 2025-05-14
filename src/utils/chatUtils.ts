
import { Message } from '@/types/chat';

// Function to generate AI response based on user input
export function generateAIResponse(userQuery: string): string {
  // Convert to lowercase for easier matching
  const query = userQuery.toLowerCase();
  
  // Simple AI response logic based on keywords
  if (query.includes('how to donate') || query.includes('donation')) {
    return "You can donate items by visiting our donation page and filling out the form, or by visiting any of our drop-off locations across the city. We accept food items, clothing, and household goods that are in good condition.";
  } 
  else if (query.includes('drop') || query.includes('location') || query.includes('nearby')) {
    return "We have collection points in over 25 locations across the city. The nearest ones to the city center are at Community Center (123 Main St), Green Park (45 Park Ave), and Central Mall (78 Commerce Blvd). You can see all locations on our interactive map in the app.";
  } 
  else if (query.includes('stat') || query.includes('impact') || query.includes('data')) {
    return "Our community has saved over 1,200kg of food waste so far this year! Together, we've helped reduce carbon emissions by approximately 3,600kg CO2e. Over 450 families have been supported through our donation program.";
  } 
  else if (query.includes('how') && query.includes('work')) {
    return "Zero Waste Mart works by connecting people with excess items to those who need them. You can list items you don't need, search for items you want, or donate to local charities and community groups. Our AI system helps match donors with recipients efficiently.";
  }
  else if (query.includes('benefit') || query.includes('why')) {
    return "By participating in Zero Waste Mart, you're helping reduce landfill waste, lowering greenhouse gas emissions, supporting local communities, and potentially saving money. Every item reused is one less item produced and one less in landfill!";
  }
  else if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
    return "Hello there! I'm Zero Bot, your AI assistant for all things related to reducing waste and sustainable living. How can I help you today?";
  }
  else {
    // Default responses for other queries
    const generalResponses = [
      "That's an interesting question about sustainability. From my data, reducing food waste is one of the most effective ways individuals can combat climate change. Would you like some tips on reducing food waste?",
      "Based on my knowledge base, your question relates to sustainable living. Our community offers workshops and resources on this topic every month. Would you like me to share the schedule?",
      "According to my analysis, this question falls under waste reduction strategies. Our app has a detailed guide on implementing a zero-waste lifestyle. Would you like me to share the link?",
      "My AI processing suggests you're interested in environmental impact. Did you know our marketplace has already prevented over 5 tons of usable goods from entering landfills this year?",
      "I've analyzed similar questions from our community, and many users find our item-sharing feature helpful for this scenario. Have you tried browsing what's available near you?",
      "My algorithms indicate this is related to sustainable consumption. Our blog has an in-depth article addressing this topic that was published last week. Would you like me to summarize it?",
      "Based on pattern recognition from similar queries, I recommend checking out our community forums where this topic has been discussed extensively by sustainability experts.",
    ];
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  }
}
