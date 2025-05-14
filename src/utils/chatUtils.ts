
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
  // New categories for enhanced AI capabilities
  else if (query.includes('energy') || query.includes('solar') || query.includes('renewable')) {
    return generateEnergyResponse(query);
  }
  else if (query.includes('plastic') || query.includes('single-use') || query.includes('packaging')) {
    return generatePlasticResponse(query);
  }
  else if (query.includes('water') || query.includes('ocean') || query.includes('marine')) {
    return generateWaterResponse(query);
  }
  else if (query.includes('clothing') || query.includes('fashion') || query.includes('textile')) {
    return generateFashionResponse(query);
  }
  else if (query.includes('garden') || query.includes('plant') || query.includes('grow')) {
    return generateGardeningResponse(query);
  }
  else if (query.includes('transport') || query.includes('travel') || query.includes('car') || query.includes('flight')) {
    return generateTransportResponse(query);
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
    "Zero waste practices can reduce an individual's carbon footprint by up to 20%. Our community has already prevented an estimated 4.5 tonnes of CO2 from entering the atmosphere this year!",
    "The IPCC reports that we need to reduce global emissions by 45% by 2030 to limit warming to 1.5°C. Every reused item through our platform contributes to this goal by avoiding the emissions associated with production of new goods."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate recycling related responses
function generateRecyclingResponse(query: string): string {
  const responses = [
    "Recycling is good, but reusing is even better! Our platform focuses on reuse first, which saves more energy and resources than recycling. That said, we do have resources on proper recycling for items that can't be reused.",
    "Did you know that improper recycling can contaminate entire batches? Our guide on proper sorting and cleaning of recyclables can help ensure your efforts aren't wasted. Would you like me to share some tips?",
    "Electronic waste (e-waste) is our fastest-growing waste stream. Through Zero Waste Mart, you can find new homes for electronics that still work but you no longer need, keeping them out of landfills.",
    "The average American generates about 4.9 pounds of waste per day. Through our platform, users reduce their waste generation by approximately 15% within the first three months of active participation.",
    "Glass can be recycled indefinitely without loss of quality, while plastic degrades with each recycling cycle. That's why finding ways to reuse plastics through our platform often has a bigger impact than recycling them."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate sustainability related responses
function generateSustainabilityResponse(query: string): string {
  const responses = [
    "Sustainable living doesn't have to be difficult. Small changes like using our platform to share and reuse items can make a significant difference. Our community has saved the equivalent of 300 trees this year through reduced consumption!",
    "Sustainability encompasses environmental, social, and economic factors. Zero Waste Mart addresses all three by reducing waste, supporting local communities, and helping people save money through sharing rather than buying.",
    "The most sustainable product is the one that already exists. By extending the life of items through our platform, we're reducing the need for new manufacturing and the associated environmental impacts.",
    "Our sustainability index shows that active members of Zero Waste Mart reduce their ecological footprint by an average of 15% within the first year. Would you like tips on how to maximize your impact?",
    "True sustainability requires systems thinking. Our platform creates a community ecosystem where resources flow efficiently between members, mimicking natural cycles where 'waste' becomes a resource."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate food waste related responses
function generateFoodWasteResponse(query: string): string {
  const responses = [
    "Food waste is responsible for approximately 8% of global greenhouse gas emissions. Our food sharing feature has helped redistribute over 500kg of food that would otherwise have been wasted this year alone.",
    "Composting food waste can reduce methane emissions from landfills and create valuable soil amendments. We have a guide on setting up a home composting system - would you like me to share it?",
    "The average family wastes about 30% of the food they purchase. Our meal planning tools and food sharing network can help reduce this wastage significantly while saving you money.",
    "When food decomposes in landfills, it produces methane - a greenhouse gas 25 times more potent than CO2. By sharing excess food through our platform, you're directly reducing these emissions.",
    "Food waste occurs at every stage of the supply chain. Our community partnerships with local farms and grocery stores help rescue food that would otherwise be discarded due to cosmetic imperfections or approaching sell-by dates."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate energy related responses - NEW
function generateEnergyResponse(query: string): string {
  const responses = [
    "Renewable energy is crucial for a sustainable future. Our community forum has a dedicated section where members share tips on reducing energy consumption and transitioning to renewables at home.",
    "Many items on Zero Waste Mart help reduce energy consumption, such as shared appliances that are energy efficient, or tools for improving home insulation and efficiency.",
    "The energy embodied in manufacturing new products is often overlooked. By extending product lifespans through reuse, our platform helps save this 'hidden' energy consumption.",
    "Solar power costs have dropped by over 70% in the last decade, making it increasingly accessible. Our marketplace occasionally features second-hand solar equipment that makes adoption even more affordable.",
    "Energy-efficient products typically cost more upfront but save money over time. Our community sharing model allows members to test energy-efficient alternatives before investing in their own."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate plastic waste related responses - NEW
function generatePlasticResponse(query: string): string {
  const responses = [
    "Only about 9% of all plastic ever produced has been recycled. That's why our platform emphasizes reusable alternatives to single-use plastics, many of which are available in our marketplace.",
    "Microplastics have been found everywhere from the deepest oceans to human blood. Our community champions plastic-free alternatives and shares creative solutions for avoiding plastic packaging.",
    "The average person ingests about a credit card's worth of plastic each week. By participating in our plastic-free challenges, members have collectively avoided over 5,000 single-use plastic items this year.",
    "Plastic production is set to triple by 2050 unless we change course. Our marketplace's plastic-free section showcases alternatives that help members transition away from plastic dependence.",
    "Businesses are starting to respond to consumer demand for less packaging. Through our advocacy network, members have successfully petitioned local businesses to adopt more sustainable packaging solutions."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate water conservation related responses - NEW
function generateWaterResponse(query: string): string {
  const responses = [
    "The average American uses about 82 gallons of water per day at home. Our water conservation challenge has helped members reduce their usage by up to 25% through simple behavioral changes.",
    "Ocean plastic pollution affects marine life and eventually humans through the food chain. Our beach cleanup events have removed over 2 tons of waste from local coastlines this year.",
    "Virtual water - the water used to produce goods - is often invisible to consumers. For example, it takes about 650 gallons to produce one hamburger. Our platform's impact calculator helps visualize these hidden water costs.",
    "Rain barrels available through our sharing program can help collect and reuse rainwater for gardening, potentially saving thousands of gallons per household annually.",
    "Water scarcity affects billions worldwide. Our international partnerships support water conservation projects in drought-prone regions, funded in part by a percentage of our marketplace transactions."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate sustainable fashion related responses - NEW
function generateFashionResponse(query: string): string {
  const responses = [
    "The fashion industry produces 10% of global carbon emissions. Our clothing exchange has facilitated over 1,500 swaps this year, extending garment lifecycles and reducing demand for new production.",
    "It takes about 2,700 liters of water to produce one cotton shirt. Our textile reuse initiatives help members find creative ways to upcycle old clothing instead of discarding it.",
    "Fast fashion relies on exploitative labor practices and toxic manufacturing processes. Our marketplace prioritizes ethical, secondhand, and locally-made clothing options.",
    "The average American throws away about 81 pounds of clothing each year. Through our repair workshops, members learn skills to maintain and extend the life of their garments.",
    "Synthetic fabrics release microplastics with every wash. Our community guides share filtering solutions and natural fiber alternatives to reduce this invisible pollution source."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate gardening and growing related responses - NEW
function generateGardeningResponse(query: string): string {
  const responses = [
    "Growing even a small portion of your own food can significantly reduce your carbon footprint. Our seed library and tool-sharing network make it accessible even for beginners or those with limited space.",
    "Composting at home can divert up to 30% of household waste from landfills. Our virtual workshops have taught over 200 members how to start composting this year alone.",
    "Native plant gardening supports local ecosystems and requires less water and maintenance. Our seasonal plant swaps help members transform their yards into wildlife havens.",
    "Indoor plants can improve air quality and mental wellbeing. Our plant-sitting network ensures your green friends stay healthy even when you're away.",
    "Community gardens build social connections while producing local food. Our mapping tool has helped members find over 50 community growing spaces in their neighborhoods."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate sustainable transportation related responses - NEW
function generateTransportResponse(query: string): string {
  const responses = [
    "Transportation accounts for about 29% of greenhouse gas emissions in the US. Our ridesharing network has facilitated over 5,000 shared commutes this year, saving approximately 12 tons of CO2.",
    "A single transatlantic flight can add as much to your carbon footprint as a year of driving. Our 'slow travel' resources help members plan lower-impact vacations.",
    "Biking just 5 miles instead of driving saves about 5 pounds of carbon emissions. Our bike-sharing and repair workshops make cycling more accessible to all community members.",
    "Electric vehicles produce less lifetime emissions than gas-powered cars, even considering battery production. Our EV enthusiast group organizes test drives to help members explore this option.",
    "The 'last mile' of delivery often has the highest environmental cost. Our neighborhood collection points have reduced delivery vehicle trips by consolidating shipments for multiple members."
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
  
  // Check for comparisons
  if (query.includes('better') || query.includes('worse') || query.includes('versus') || query.includes('vs')) {
    return handleComparison(query);
  }
  
  // Check for personal situations
  if (query.includes('my') || query.includes('me') || query.includes('i am') || query.includes("i'm")) {
    return handlePersonalQuery(query);
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
    "This relates to the broader field of environmental sustainability. According to recent research, community-based sharing platforms like ours can reduce household waste by up to 25% while strengthening social connections.",
    "I understand you're curious about sustainable practices. The Zero Waste Mart community has compiled extensive resources on this topic, with practical strategies that have been tested and refined by our members.",
    "That's a thoughtful inquiry about sustainability. Our approach combines traditional wisdom with innovative technology to create systems that benefit both people and planet. Would you like to explore specific aspects of this?"
  ];
  
  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
}

// New function for handling comparisons
function handleComparison(query: string): string {
  const comparisonResponses = [
    "Comparing sustainability options often reveals trade-offs. Our community surveys show that what works best depends on individual circumstances like location, available time, and living situation. Our personalized assessment tool can help you determine which approach might be most effective for you.",
    "When evaluating environmental choices, it's important to consider the full lifecycle impact. For example, a cotton bag needs to be used 131 times to have less climate impact than single-use plastic bags. Our resources include comprehensive lifecycle analyses for common household items.",
    "Different sustainable approaches have different strengths. For instance, composting is excellent for food waste but not suitable for many other materials. Reusing and sharing through our platform can address a wider range of items. The ideal approach combines multiple strategies tailored to your specific situation.",
    "Environmental comparisons often depend on your specific context. Urban dwellers might find our tool-sharing program most impactful, while suburban members often benefit more from our garden exchange. Would you like me to suggest options based on your particular circumstances?",
    "When comparing sustainable options, consider your personal barriers to adoption. Our surveys show that successful changes are ones that fit seamlessly into existing routines. Would you like suggestions that match your lifestyle?"
  ];
  
  return comparisonResponses[Math.floor(Math.random() * comparisonResponses.length)];
}

// New function for handling personal situation queries
function handlePersonalQuery(query: string): string {
  const personalResponses = [
    "Your personal situation is unique, and sustainability journeys are not one-size-fits-all. Our community members with similar circumstances have found success by starting with small, manageable changes. Would you like some personalized suggestions based on your specific situation?",
    "It sounds like you're considering how sustainability fits into your life. Many of our members started with just one new habit, like participating in our monthly item swap events. Over time, 82% reported adopting additional sustainable practices as they saw the benefits.",
    "Your individual actions do make a difference. When combined with our community of over 10,000 members, the impact multiplies significantly. Last year, members in situations similar to yours collectively diverted over 50 tons of items from landfills.",
    "Adapting sustainable practices to your personal circumstances is key to long-term success. Our personalized challenge program can help you identify changes that fit your lifestyle and priorities. Would you like me to suggest a starter challenge?",
    "Many members who were in similar situations have found our peer mentoring program helpful. Being connected with someone who understands your specific challenges can make sustainable transitions much smoother. Would you be interested in learning more about this program?"
  ];
  
  return personalResponses[Math.floor(Math.random() * personalResponses.length)];
}

// Handle questions specifically
function handleQuestion(query: string): string {
  if (query.includes('best way') || query.includes('most effective')) {
    return "The most effective approach depends on your specific situation, but our data shows that starting with high-impact areas like reducing food waste and sharing infrequently used items yields the greatest benefits. Our guided assessment can help you identify your highest-impact opportunities.";
  }
  
  if (query.includes('difference') || query.includes('impact') || query.includes('effect')) {
    return "Your personal impact through Zero Waste Mart is tracked in your dashboard. On average, active users reduce their carbon footprint by 2.3 tons of CO2 annually, equivalent to taking half a car off the road. Every item shared or reused contributes to this positive impact.";
  }
  
  if (query.includes('start') || query.includes('begin') || query.includes('first step')) {
    return "Starting your sustainability journey works best with small, manageable steps. Our 30-day challenge begins with a simple waste audit to identify your biggest impact opportunities. From there, 89% of participants find it easier to make targeted changes that fit their lifestyle.";
  }
  
  if (query.includes('cost') || query.includes('expensive') || query.includes('save money')) {
    return "Contrary to common belief, sustainability often saves money. Our members report average savings of $280 monthly through sharing, borrowing, and reducing consumption. The initial investment in reusable items typically pays off within 2-3 months of consistent use.";
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
    "Based on aggregate data from similar users, focusing on kitchen waste typically yields the fastest results. Our kitchen toolkit includes meal planning templates, food storage guides, and a directory of bulk shopping options in your area.",
    "Analysis of user progress shows that setting concrete goals leads to 3x better outcomes than general intentions. Our goal-setting workshop can help you establish measurable targets for your sustainability journey."
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
    "Your perspective highlights an important aspect of sustainability that resonates with many members. This kind of systems thinking helps us design platform features that address root causes rather than just symptoms of environmental challenges.",
    "That viewpoint contributes to our evolving understanding of sustainability. Recent community discussions have explored similar ideas, examining how individual choices connect to broader systemic change."
  ];
  
  return opinionResponses[Math.floor(Math.random() * opinionResponses.length)];
}
