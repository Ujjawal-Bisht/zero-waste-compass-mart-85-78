
import React from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";

interface ZeroBotTypingIndicatorV5Props {
  isTyping: boolean;
  sellerMode?: boolean;
}

const dotColors = {
  default: 'bg-emerald-400',
  seller: 'bg-amber-400'
};

const ZeroBotTypingIndicatorV5: React.FC<ZeroBotTypingIndicatorV5Props> = ({
  isTyping,
  sellerMode = false,
}) => {
  if (!isTyping) return null;
  const dotClass = sellerMode ? dotColors.seller : dotColors.default;
  return (
    <motion.div
      className="w-full flex items-center gap-2 px-4 py-2 z-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <span className={`h-9 w-9 flex items-center justify-center rounded-full bg-white/80 border border-gray-100 shadow`}>
        <Bot className={`h-5 w-5 ${sellerMode ? "text-amber-500" : "text-emerald-500"}`} />
      </span>
      <div className="flex items-center">
        <span className={`w-2 h-2 rounded-full mx-0.5 ${dotClass} animate-bounce`} />
        <span className={`w-2 h-2 rounded-full mx-0.5 ${dotClass} animate-bounce delay-100`} />
        <span className={`w-2 h-2 rounded-full mx-0.5 ${dotClass} animate-bounce delay-200`} />
      </div>
      <span className="text-xs text-gray-500 ml-3">ZeroBot is typing...</span>
    </motion.div>
  );
};
export default ZeroBotTypingIndicatorV5;
