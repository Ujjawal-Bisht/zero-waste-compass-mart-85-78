
import React from "react";

interface ZeroBotSuggestionsBarProps {
  suggestions: string[];
  isProcessing: boolean;
  onSuggestionClick: (s: string) => void;
  animateSuggestion?: (element: React.ReactNode, i: number) => React.ReactNode;
  animationEnabled?: boolean;
}

const ZeroBotSuggestionsBar: React.FC<ZeroBotSuggestionsBarProps> = ({
  suggestions,
  isProcessing,
  onSuggestionClick,
  animateSuggestion,
  animationEnabled = false,
}) => {
  if (!suggestions?.length || isProcessing) return null;

  return (
    <div className="flex gap-2 px-4 py-2 overflow-x-auto scrollbar-none bg-indigo-50/60 border-b border-indigo-100">
      {suggestions.map((s, i) => {
        const buttonElement = (
          <button
            key={i}
            onClick={() => onSuggestionClick(s)}
            className="px-3 py-1 rounded-full bg-white border border-indigo-200 text-xs text-indigo-800 font-medium hover:bg-indigo-100 whitespace-nowrap transition"
            tabIndex={0}
          >
            {s}
          </button>
        );
        if (animationEnabled && animateSuggestion) {
          return animateSuggestion(buttonElement, i);
        }
        return buttonElement;
      })}
    </div>
  );
};

export default ZeroBotSuggestionsBar;

