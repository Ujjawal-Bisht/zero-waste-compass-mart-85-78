
import React, { Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useZeroBot } from './hooks/useZeroBot';
import ChatBotButton from '../chat/ChatBotButton';
import ZeroBotTypingIndicatorV5 from './components/zerobot/ZeroBotTypingIndicatorV5';
import { Bot } from 'lucide-react';

// Lazy loaded components to improve performance
const ZeroBotChatContent = lazy(() => import('./components/ZeroBotChatContent'));
const ZeroBotHeader = lazy(() => import('./components/zerobot/ZeroBotV5Header'));
const ZeroBotTabs = lazy(() => import('./components/ZeroBotTabs'));
const HelpTab = lazy(() => import('./components/HelpTab'));
const AnalyticsTab = lazy(() => import('./components/AnalyticsTab'));
const SettingsPanel = lazy(() => import('./components/SettingsPanel'));
const ZeroBotSuggestionsBar = lazy(() => import('./components/zerobot/ZeroBotSuggestionsBar'));

interface ZeroBot5Props {
  initialPrompt?: string;
  showInitially?: boolean;
  enableVoice?: boolean;
  enableRealtime?: boolean;
  showAnalytics?: boolean;
  sellerMode?: boolean;
  theme?: 'light' | 'dark' | 'auto';
  enableAI?: boolean;
  isMobile?: boolean;
}

const gradientBackground =
  "bg-gradient-to-br from-purple-50/90 via-white/90 to-emerald-50/80 dark:from-purple-900/70 dark:via-gray-900/80 dark:to-emerald-900/70";

const animatedPanelClass =
  "shadow-xl border border-gray-200 rounded-2xl ";

const ZeroBot5: React.FC<ZeroBot5Props> = ({
  initialPrompt,
  showInitially = false,
  enableVoice = true,
  enableRealtime = true,
  showAnalytics = true,
  sellerMode = false,
  theme = 'auto',
  enableAI = true,
  isMobile = false,
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

  // Responsive container classes based on device type
  const botWindowClasses = isMobile
    ? "fixed bottom-0 left-0 right-0 z-50 flex flex-col " +
      `${animatedPanelClass} glass-morphism rounded-t-2xl h-[85vh] ` +
      gradientBackground
    : "fixed bottom-6 right-6 w-full sm:w-96 h-[600px] z-50 flex flex-col " +
      `${animatedPanelClass} glass-morphism rounded-2xl overflow-hidden ` +
      gradientBackground;

  // Animation variant for chat bubbles
  const bubbleVariants = {
    initial: { opacity: 0, y: 14, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20, mass: 0.6 } },
    exit: { opacity: 0, y: 12, scale: 0.88, transition: { duration: 0.22 } },
  };

  // Animation variant for suggestion pill interaction
  const suggestionVariants = {
    hover: { scale: 1.07, backgroundColor: "#f6e1ff" },
    tap: { scale: 0.96 },
  };

  return (
    <>
      {/* Floating bot button - modernized */}
      {!bot.isOpen && (
        <ChatBotButton
          onClick={() => {
            bot.setIsOpen(true);
            bot.setHasUnreadMessages(false);
          }}
          isOpen={bot.isOpen}
          hasUnread={bot.hasUnreadMessages}
          isMobile={isMobile}
        />
      )}

      {/* Chat window */}
      <AnimatePresence>
        {bot.isOpen && (
          <motion.div
            className={botWindowClasses}
            initial={isMobile ? { opacity: 0, y: 70, scale: 0.96 }
                              : { opacity: 0, scale: 0.95, y: 28 }}
            animate={isMobile ? { opacity: 1, y: 0, scale: 1 }
                              : { opacity: 1, scale: 1, y: 0 }}
            exit={isMobile ? { opacity: 0, y: 80, scale: 0.96 }
                            : { opacity: 0, scale: 0.9, y: 28 }}
            transition={{ type: 'spring', damping: 26, stiffness: 240, mass: 0.8 }}
            style={{ boxShadow: "0 8px 48px 0 rgba(156, 130, 255, 0.17)" }}
          >
            {/* V5 Header with animated gradient */}
            <Suspense fallback={<div className="h-14 bg-gradient-to-r from-purple-400 to-indigo-500 animate-pulse"></div>}>
              <ZeroBotHeader
                sellerMode={sellerMode}
                showSettings={bot.showSettings}
                onClose={() => bot.setIsOpen(false)}
                onSettings={() => bot.setShowSettings(true)}
                badgeVersion="v5"
              />
            </Suspense>

            {/* Animated Tabs */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42 }}
            >
              <Suspense fallback={<div className="h-10 bg-white border-b animate-pulse"></div>}>
                <ZeroBotTabs
                  activeTab={bot.activeTab}
                  setActiveTab={bot.setActiveTab}
                  showAnalytics={showAnalytics}
                />
              </Suspense>
            </motion.div>

            {/* Main Content with enhanced background */}
            <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-gray-50/90 via-white/90 to-emerald-50/70 dark:from-gray-900/65 dark:via-gray-800/85 dark:to-purple-900/70 relative">
              <Tabs value={bot.activeTab} className="flex-1 flex flex-col overflow-hidden">
                <TabsContent value="chat" className="flex-1 overflow-hidden flex flex-col p-0 m-0">
                  {/* Suggestions Bar - with motion */}
                  <Suspense fallback={<div className="h-12 bg-gray-100/50 animate-pulse"></div>}>
                    <ZeroBotSuggestionsBar
                      suggestions={bot.suggestions}
                      isProcessing={bot.isProcessing}
                      onSuggestionClick={bot.handleSuggestionClick}
                      animateSuggestion={(element, i) => (
                        <motion.div
                          key={i}
                          variants={suggestionVariants}
                          whileHover="hover"
                          whileTap="tap"
                          className="cursor-pointer"
                        >
                          {element}
                        </motion.div>
                      )}
                      animationEnabled={true}
                    />
                  </Suspense>

                  {/* Chat content - chat bubble animation */}
                  <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading chat...</div>}>
                    <motion.div
                      className="flex-1 flex flex-col"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={bubbleVariants}
                    >
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
                        isMobile={isMobile}
                      />
                    </motion.div>
                  </Suspense>
                  {/* Animated typing indicator */}
                  <motion.div
                    key={bot.isProcessing ? "typing-on" : "typing-off"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: bot.isProcessing ? 1 : 0, y: bot.isProcessing ? 0 : 12 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 18 }}
                  >
                    <ZeroBotTypingIndicatorV5 isTyping={bot.isProcessing} sellerMode={sellerMode} />
                  </motion.div>
                </TabsContent>

                {/* Help Tab */}
                <TabsContent value="help" className="flex-1 overflow-auto mt-0 p-0">
                  <Suspense fallback={<div className="p-4">Loading help content...</div>}>
                    <HelpTab
                      helpTopics={helpTopics}
                      sellerMode={sellerMode}
                      onGetStartedClick={bot.handleGetStartedClick}
                      onTopicClick={bot.handleTopicClick}
                    />
                  </Suspense>
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="flex-1 overflow-auto mt-0 p-0">
                  <Suspense fallback={<div className="p-4">Loading analytics...</div>}>
                    <AnalyticsTab
                      mockAnalytics={mockAnalytics}
                      sellerMode={sellerMode}
                      onReturn={() => bot.setActiveTab('chat')}
                    />
                  </Suspense>
                </TabsContent>
              </Tabs>
              {/* Floating animated effect as background */}
              <motion.div
                className="absolute pointer-events-none right-5 bottom-12 w-20 h-20 opacity-40 blur-2xl rounded-full bg-gradient-to-br from-indigo-300 via-purple-400 to-emerald-200 z-0"
                animate={{ scale: [1, 1.18, 1], rotate: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                style={{filter: "blur(16px)"}}
              />
            </div>

            {/* Settings panel */}
            <AnimatePresence>
              {bot.showSettings && (
                <Suspense fallback={<div className="absolute inset-0 bg-black/20"></div>}>
                  <SettingsPanel
                    showSettings={bot.showSettings}
                    sellerMode={sellerMode}
                    onClose={() => bot.setShowSettings(false)}
                    clearChat={bot.clearChat}
                  />
                </Suspense>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ZeroBot5;
