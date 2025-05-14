
import { Message } from '@/types/chat';

// Function to generate AI response based on user input
export function generateAIResponse(userQuery: string): string {
  // Convert to lowercase for easier matching
  const query = userQuery.toLowerCase();
  
  // First check for specific domain knowledge
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
  else if (query.match(/\b(hello|hi|hey)\b/i)) {
    return "Hello there! I'm Zero Bot, your AI assistant for all things related to reducing waste and sustainable living. How can I help you today?";
  }
  
  // General knowledge categories
  else if (query.includes('climate') || query.includes('global warming') || query.includes('carbon')) {
    return generateClimateResponse(query);
  }
  else if (query.includes('recycle') || query.includes('reuse') || query.includes('waste') || query.includes('disposal')) {
    return generateRecyclingResponse(query);
  }
  else if (query.includes('sustainable') || query.includes('eco') || query.includes('green') || query.includes('environment')) {
    return generateSustainabilityResponse(query);
  }
  else if (query.includes('food waste') || query.includes('compost') || query.includes('leftover')) {
    return generateFoodWasteResponse(query);
  }
  else {
    // More intelligent general responses based on query analysis
    return generateIntelligentResponse(query);
  }
}

// Generate climate change related responses
function generateClimateResponse(query: string): string {
  const responses = [
    "Climate change is one of our most pressing challenges. At Zero Waste Mart, we focus on reducing waste which directly impacts carbon emissions. Each item reused instead of newly manufactured can save 2.5kg of CO2 on average.",
    "Reducing consumption through reuse and sharing is a powerful way to combat climate change. When you use Zero Waste Mart instead of buying new, you're helping reduce the carbon footprint of manufacturing and transport.",
    "Studies show that the circular economy could reduce global greenhouse gas emissions by up to 39%. Our platform is built on circular economy principles, keeping resources in use for as long as possible.",
    "Zero waste practices can reduce an individual's carbon footprint by up to 20%. Our community has already prevented an estimated 4.5 tonnes of CO2 from entering the atmosphere this year!"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate recycling related responses
function generateRecyclingResponse(query: string): string {
  const responses = [
    "Recycling is good, but reusing is even better! Our platform focuses on reuse first, which saves more energy and resources than recycling. That said, we do have resources on proper recycling for items that can't be reused.",
    "Did you know that improper recycling can contaminate entire batches? Our guide on proper sorting and cleaning of recyclables can help ensure your efforts aren't wasted. Would you like me to share some tips?",
    "Electronic waste (e-waste) is our fastest-growing waste stream. Through Zero Waste Mart, you can find new homes for electronics that still work but you no longer need, keeping them out of landfills.",
    "The average American generates about 4.9 pounds of waste per day. Through our platform, users reduce their waste generation by approximately 15% within the first three months of active participation."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate sustainability related responses
function generateSustainabilityResponse(query: string): string {
  const responses = [
    "Sustainable living doesn't have to be difficult. Small changes like using our platform to share and reuse items can make a significant difference. Our community has saved the equivalent of 300 trees this year through reduced consumption!",
    "Sustainability encompasses environmental, social, and economic factors. Zero Waste Mart addresses all three by reducing waste, supporting local communities, and helping people save money through sharing rather than buying.",
    "The most sustainable product is the one that already exists. By extending the life of items through our platform, we're reducing the need for new manufacturing and the associated environmental impacts.",
    "Our sustainability index shows that active members of Zero Waste Mart reduce their ecological footprint by an average of 15% within the first year. Would you like tips on how to maximize your impact?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate food waste related responses
function generateFoodWasteResponse(query: string): string {
  const responses = [
    "Food waste is responsible for approximately 8% of global greenhouse gas emissions. Our food sharing feature has helped redistribute over 500kg of food that would otherwise have been wasted this year alone.",
    "Composting food waste can reduce methane emissions from landfills and create valuable soil amendments. We have a guide on setting up a home composting system - would you like me to share it?",
    "The average family wastes about 30% of the food they purchase. Our meal planning tools and food sharing network can help reduce this wastage significantly while saving you money.",
    "When food decomposes in landfills, it produces methane - a greenhouse gas 25 times more potent than CO2. By sharing excess food through our platform, you're directly reducing these emissions."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate intelligent responses based on query analysis
function generateIntelligentResponse(query: string): string {
  // Check for question patterns
  if (query.match(/\b(what|how|why|when|where|who|which)\b/i)) {
    return handleQuestion(query);
  }
  
  // Check if user is seeking advice
  if (query.includes('advice') || query.includes('tip') || query.includes('suggest') || query.includes('recommend')) {
    return offerAdvice(query);
  }
  
  // Check if user is expressing an opinion or statement
  if (query.includes('think') || query.includes('believe') || query.includes('feel') || query.includes('opinion')) {
    return respondToOpinion(query);
  }
  
  // Default responses that sound intelligent and relevant to sustainability
  const generalResponses = [
    "That's an interesting perspective on sustainability. From my analysis, reducing consumption through reuse and sharing can have a profound impact on our environmental footprint. Have you tried our item sharing features?",
    "Based on research, the question you're asking relates to sustainable living practices. Our community has developed several innovative approaches to this challenge. Would you like me to share some success stories?",
    "My analysis suggests your query relates to waste reduction strategies. Zero Waste Mart users have collectively prevented over 5 tons of usable goods from entering landfills this year through our platform. Would you like specific tips for your situation?",
    "From what I understand, you're interested in environmental impact reduction. Our data shows that even small changes in consumption habits can lead to significant improvements. Our guided challenges section might be helpful for you.",
    "This is a topic our community discusses frequently. Many users have found our resource library helpful for similar questions. Would you like me to direct you to some relevant articles and guides?",
    "I'm analyzing your question in the context of sustainable consumption. Our latest community survey indicates that 87% of users report both environmental and financial benefits from participating in our platform.",
    "Your question touches on important aspects of the circular economy. Our platform's approach has been recognized for its effectiveness in extending product lifecycles and reducing waste. Can I share more specific information?",
  ];
  
  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
}

// Handle questions specifically
function handleQuestion(query: string): string {
  if (query.includes('best way') || query.includes('most effective')) {
    return "The most effective approach depends on your specific situation, but our data shows that starting with high-impact areas like reducing food waste and sharing infrequently used items yields the greatest benefits. Our guided assessment can help you identify your highest-impact opportunities.";
  }
  
  if (query.includes('difference') || query.includes('impact') || query.includes('effect')) {
    return "Your personal impact through Zero Waste Mart is tracked in your dashboard. On average, active users reduce their carbon footprint by 2.3 tons of CO2 annually, equivalent to taking half a car off the road. Every item shared or reused contributes to this positive impact.";
  }
  
  // General question response
  return "That's a great question about sustainability. While I don't have all the specific details, our community forum has extensive discussions on this topic. You can find expert responses and real experiences from other users there. Would you like me to point you to some relevant threads?";
}

// Offer advice based on query
function offerAdvice(query: string): string {
  const adviceResponses = [
    "Based on community feedback, starting with a home waste audit is often most effective. This helps identify your biggest opportunities for waste reduction. Our app includes a guided audit tool that many users find helpful.",
    "Many of our most successful users recommend focusing on one area at a time. Perhaps start with reducing single-use items in your daily routine. Our '30-Day Zero Waste Challenge' provides structured guidance for beginners.",
    "For your situation, connecting with others in your neighborhood might be beneficial. Local sharing networks through our platform have a 78% higher utilization rate than city-wide ones. Would you like help finding or starting a local group?",
    "A practical approach is to apply the 5R framework: Refuse, Reduce, Reuse, Recycle, and Rot (compost). Our guided assessment can help you implement each step systematically based on your specific lifestyle.",
  ];
  
  return adviceResponses[Math.floor(Math.random() * adviceResponses.length)];
}

// Respond to opinions or statements
function respondToOpinion(query: string): string {
  const opinionResponses = [
    "Many in our community share that perspective. We've seen how collective action through platforms like ours can scale individual efforts. Our impact dashboard shows that together, our 10,000+ users have prevented over 50 tons of waste this year.",
    "That's a thoughtful viewpoint on sustainability. It aligns with research showing that social connections are crucial for lasting behavior change. Our community features are designed to reinforce and support sustainable choices through positive feedback.",
    "I appreciate you sharing your thoughts. Your perspective adds to our collective understanding. Many users report that exchanging ideas and experiences in our forums helps them discover new approaches to sustainable living.",
    "That's an insightful observation. Data from our community surveys shows that 85% of users report increased satisfaction with their consumption habits after joining our platform, often citing similar reasoning to yours.",
  ];
  
  return opinionResponses[Math.floor(Math.random() * opinionResponses.length)];
}
