
import React from 'react';

const ZeroBotTypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 rounded-bl-none">
        <div className="flex space-x-2 items-center h-5">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-150" />
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-300" />
        </div>
      </div>
    </div>
  );
};

export default ZeroBotTypingIndicator;
