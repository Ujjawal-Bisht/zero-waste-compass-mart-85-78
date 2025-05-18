import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TabsContent } from '@/components/ui/tabs';
import { useZeroBot } from './hooks/useZeroBot';
import ZeroBotButton from './components/ZeroBotButton';
import ZeroBotHeader from './components/ZeroBotHeader';
import ZeroBotTabs from './components/ZeroBotTabs';
import ZeroBotChatContent from './components/ZeroBotChatContent';
import HelpTab from './components/HelpTab';
import AnalyticsTab from './components/AnalyticsTab';
import SettingsPanel from './components/SettingsPanel';
import { Bot, MessagesSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ZeroBot5Props {
  initialPrompt?: string;
  showInitially?: boolean;
  enableVoice?: boolean;
  enableRealtime?: boolean;
  showAnalytics?: boolean;
  sellerMode?: boolean;
  theme?: 'light' | 'dark' | 'auto';
  enableAI?: boolean;
}

const ZeroBot5: React.FC<ZeroBot5Props> = ({
  initialPrompt,
  showInitially = false,
  enableVoice = true,
  enableRealtime = true,
  showAnalytics = true,
  sellerMode = false,
  theme = 'auto',
  enableAI = true,
}) => {
  // Using our existing hook with enhanced features
  const bot = useZeroBot(initialPrompt, sellerMode);
  
  // New help topics focused on AI integration
  const helpTopics = sellerMode 
    ? [
        { title: 'AI Product Descriptions', description: 'Generate compelling product descriptions with AI.' },
        { title: 'Market Insights', description: 'Get AI-powered market trend analysis and recommendations.' },
        { title: 'Customer Sentiment', description: 'Analyze customer feedback and reviews automatically.' },
        { title: 'Inventory Optimization', description: 'Use AI to optimize your inventory levels.' },
        { title: 'Competitor Analysis', description: 'Track and analyze competitor pricing and offerings.' }
      ] 
    : [
        { title: 'Personalized Recommendations', description: 'Get AI-powered product recommendations based on your preferences.' },
        { title: 'Sustainability Ratings', description: 'Understanding how our AI calculates product sustainability scores.' },
        { title: 'Virtual Try-On', description: 'Learn how to use our AI virtual try-on feature.' },
        { title: 'Smart Search', description: 'Tips for using natural language to find what you need.' },
        { title: 'Product Comparisons', description: 'Let AI help you compare similar products side by side.' }
      ];
  
  // Enhanced analytics with AI insights
  const mockAnalytics = {
    interactions: bot.messages.length > 1 ? bot.messages.length - 1 : 0,
    topQuestions: [
      'How sustainable is this product?',
      'Can you recommend alternatives?',
      'What materials is this made from?'
    ],
    averageResponseTime: '0.8 seconds',
    satisfactionRate: '94%',
    categoriesDistribution: {
      product: 40,
      sustainability: 25,
      order: 20,
      tracking: 10,
      other: 5
    },
    aiInsights: {
      sentimentScore: 0.78,
      commonConcerns: ['product durability', 'shipping speed', 'material sourcing'],
      suggestedImprovements: ['Add more sustainability details', 'Improve tracking updates']
    }
  };

  return (
    <>
      {/* Floating button with previous style restored */}
      {!bot.isOpen && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <Button
            onClick={() => {
              bot.setIsOpen(true);
              bot.setHasUnreadMessages(false);
            }}
            className={`rounded-full h-14 w-14 relative ${
              sellerMode 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700' 
                : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700'
            } shadow-lg`}
            size="icon"
          >
            <Bot className="h-6 w-6" />
            
            {/* Animated ring when bot has new messages */}
            {bot.hasUnreadMessages && (
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-white"
                initial={{ scale: 1 }}
                animate={{ scale: 1.15, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            
            {/* Notification badge */}
            {bot.hasUnreadMessages && (
              <motion.div
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                1
              </motion.div>
            )}
            
            {/* Mode indicator badge */}
            <motion.div
              className="absolute -bottom-1 -right-1 bg-white shadow-md text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 }}
            >
              {sellerMode ? (
                <span className="text-amber-500 font-bold">S</span>
              ) : (
                <MessagesSquare className="h-3 w-3 text-emerald-500" />
              )}
            </motion.div>
          </Button>
        </motion.div>
      )}
      
      {/* Chat window with enhanced UI */}
      <AnimatePresence>
        {bot.isOpen && (
          <motion.div 
            className="fixed bottom-6 right-6 z-50 w-full sm:w-96 h-[500px] flex flex-col bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {/* Header with "v5" indicator */}
            <div className={`p-3 flex justify-between items-center ${
              sellerMode 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600' 
                : 'bg-gradient-to-r from-emerald-500 to-teal-600'
            } text-white`}>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-sm flex items-center gap-1">
                    ZeroBot AI
                    <span className="ml-1 bg-white/20 text-white text-xs px-1.5 rounded">v5.0</span>
                  </h3>
                  <p className="text-xs text-white/70">
                    {sellerMode ? 'Seller Assistant' : 'Shopping Assistant'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                {/* Keep existing controls */}
                {bot.showSettings && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 rounded-full text-white/80 hover:text-white hover:bg-white/20"
                    onClick={() => bot.setShowSettings(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            
            {/* Tabs */}
            <ZeroBotTabs
              activeTab={bot.activeTab}
              setActiveTab={bot.setActiveTab}
              showAnalytics={showAnalytics}
            />
            
            {/* Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <TabsContent value="chat" className="flex-1 overflow-hidden flex flex-col mt-0 p-0">
                <ZeroBotChatContent
                  messages={bot.messages}
                  filteredMessages={bot.filteredMessages}
                  searchQuery={bot.searchQuery}
                  setSearchQuery={bot.setSearchQuery}
                  isSearching={bot.isSearching}
                  toggleSearch={bot.toggleSearch}
                  isProcessing={bot.isProcessing}
                  streamedResponse={bot.streamedResponse}
                  currentContext={bot.currentContext}
                  sellerMode={sellerMode}
                  inputValue={bot.inputValue}
                  setInputValue={bot.setInputValue}
                  suggestions={bot.suggestions}
                  messagesEndRef={bot.messagesEndRef}
                  currentUser={bot.currentUser}
                  handleSendMessage={bot.handleSendMessage}
                  handleKeyPress={bot.handleKeyPress}
                  handleMessageReaction={bot.handleMessageReaction}
                  cancelCurrentStream={bot.cancelCurrentStream}
                  startRecording={enableVoice ? bot.startRecording : () => {}}
                  stopRecording={bot.stopRecording}
                  isRecording={bot.isRecording}
                  handleSuggestionClick={bot.handleSuggestionClick}
                />
              </TabsContent>
              
              <TabsContent value="help" className="flex-1 overflow-auto mt-0 p-0">
                <HelpTab
                  helpTopics={helpTopics}
                  sellerMode={sellerMode}
                  onGetStartedClick={bot.handleGetStartedClick}
                  onTopicClick={bot.handleTopicClick}
                />
              </TabsContent>
              
              <TabsContent value="analytics" className="flex-1 overflow-auto mt-0 p-0">
                <AnalyticsTab
                  mockAnalytics={mockAnalytics}
                  sellerMode={sellerMode}
                  onReturn={() => bot.setActiveTab('chat')}
                />
              </TabsContent>
            </div>
            
            {/* Settings panel - enhanced with v5 features */}
            <AnimatePresence>
              {bot.showSettings && (
                <SettingsPanel 
                  showSettings={bot.showSettings}
                  sellerMode={sellerMode}
                  onClose={() => bot.setShowSettings(false)}
                  clearChat={bot.clearChat}
                  theme={theme}
                  enableAI={enableAI}
                  enableVoice={enableVoice}
                  enableRealtime={enableRealtime}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ZeroBot5;
