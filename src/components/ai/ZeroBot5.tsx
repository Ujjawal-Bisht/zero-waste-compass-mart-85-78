
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useZeroBot } from './hooks/useZeroBot';
import ZeroBotV5Header from './components/zerobot/ZeroBotV5Header';
import ZeroBotTabs from './components/ZeroBotTabs';
import ZeroBotChatContent from './components/ZeroBotChatContent';
import HelpTab from './components/HelpTab';
import AnalyticsTab from './components/AnalyticsTab';
import SettingsPanel from './components/SettingsPanel';
import ZeroBotTypingIndicatorV5 from './components/zerobot/ZeroBotTypingIndicatorV5';
import ZeroBotSuggestionsBar from './components/zerobot/ZeroBotSuggestionsBar';
import { Bot } from 'lucide-react';
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
  // Pull out our state/logic hook
  const bot = useZeroBot(initialPrompt, sellerMode);

  // New help topics focused on AI integration
  const helpTopics = sellerMode
    ? [
        { title: 'AI Product Descriptions', description: 'Generate compelling product descriptions with AI.' },
        { title: 'Market Insights', description: 'Get AI-powered market trend analysis and recommendations.' },
        { title: 'Customer Sentiment', description: 'Analyze customer feedback and reviews automatically.' },
        { title: 'Inventory Optimization', description: 'Use AI to optimize your inventory levels.' },
        { title: 'Competitor Analysis', description: 'Track and analyze competitor pricing and offerings.' },
      ]
    : [
        { title: 'Personalized Recommendations', description: 'Get AI-powered product recommendations based on your preferences.' },
        { title: 'Sustainability Ratings', description: 'Understanding how our AI calculates product sustainability scores.' },
        { title: 'Virtual Try-On', description: 'Learn how to use our AI virtual try-on feature.' },
        { title: 'Smart Search', description: 'Tips for using natural language to find what you need.' },
        { title: 'Product Comparisons', description: 'Let AI help you compare similar products side by side.' },
      ];

  // Enhanced analytics with AI insights
  const mockAnalytics = {
    interactions: bot.messages.length > 1 ? bot.messages.length - 1 : 0,
    topQuestions: [
      'How sustainable is this product?',
      'Can you recommend alternatives?',
      'What materials is this made from?',
    ],
    averageResponseTime: '0.8 seconds',
    satisfactionRate: '94%',
    categoriesDistribution: {
      product: 40,
      sustainability: 25,
      order: 20,
      tracking: 10,
      other: 5,
    },
    aiInsights: {
      sentimentScore: 0.78,
      commonConcerns: ['product durability', 'shipping speed', 'material sourcing'],
      suggestedImprovements: ['Add more sustainability details', 'Improve tracking updates'],
    },
  };

  return (
    <>
      {/* Floating bot button */}
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
            className={`rounded-full h-14 w-14 relative flex items-center justify-center shadow-lg 
            ${sellerMode
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700'
            }`}
            size="icon"
            aria-label="Open ZeroBot AI"
          >
            <Bot className="h-7 w-7 text-white" />
            {bot.hasUnreadMessages && (
              <motion.div
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ring-2 ring-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                1
              </motion.div>
            )}
          </Button>
        </motion.div>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {bot.isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-full sm:w-96 h-[580px] flex flex-col rounded-2xl shadow-xl border border-gray-200 glass-morphism"
            initial={{ opacity: 0, scale: 0.94, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 28 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          >
            {/* V5 Header with AI Bot icon and theme */}
            <ZeroBotV5Header
              sellerMode={sellerMode}
              showSettings={bot.showSettings}
              onClose={() => bot.setIsOpen(false)}
              onSettings={() => bot.setShowSettings(true)}
              badgeVersion="v5"
            />

            {/* Tabs */}
            <ZeroBotTabs
              activeTab={bot.activeTab}
              setActiveTab={bot.setActiveTab}
              showAnalytics={showAnalytics}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-gray-50/90 to-white/80 dark:from-gray-900/70 dark:to-gray-800/90">
              {/* Wrap TabsContent components within a Tabs component - this is what fixes the error */}
              <Tabs value={bot.activeTab} className="flex-1 flex flex-col overflow-hidden">
                <TabsContent value="chat" className="flex-1 overflow-hidden flex flex-col p-0">
                  {/* Modern suggestions bar */}
                  <ZeroBotSuggestionsBar
                    suggestions={bot.suggestions}
                    isProcessing={bot.isProcessing}
                    onSuggestionClick={bot.handleSuggestionClick}
                  />

                  {/* Chat content */}
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
                  <ZeroBotTypingIndicatorV5 isTyping={bot.isProcessing} sellerMode={sellerMode} />
                </TabsContent>

                {/* Help Tab */}
                <TabsContent value="help" className="flex-1 overflow-auto mt-0 p-0">
                  <HelpTab
                    helpTopics={helpTopics}
                    sellerMode={sellerMode}
                    onGetStartedClick={bot.handleGetStartedClick}
                    onTopicClick={bot.handleTopicClick}
                  />
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="flex-1 overflow-auto mt-0 p-0">
                  <AnalyticsTab
                    mockAnalytics={mockAnalytics}
                    sellerMode={sellerMode}
                    onReturn={() => bot.setActiveTab('chat')}
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Settings panel */}
            <AnimatePresence>
              {bot.showSettings && (
                <SettingsPanel
                  showSettings={bot.showSettings}
                  sellerMode={sellerMode}
                  onClose={() => bot.setShowSettings(false)}
                  clearChat={bot.clearChat}
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
