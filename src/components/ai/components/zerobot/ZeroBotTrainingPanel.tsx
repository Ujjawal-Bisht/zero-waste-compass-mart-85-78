
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ZeroBotTrainingPanelProps {
  trainingQuestion: string;
  trainingAnswer: string;
  setTrainingQuestion: (value: string) => void;
  setTrainingAnswer: (value: string) => void;
  addTrainingPair: () => void;
  setTrainingMode: (mode: boolean) => void;
}

const ZeroBotTrainingPanel: React.FC<ZeroBotTrainingPanelProps> = ({
  trainingQuestion,
  trainingAnswer,
  setTrainingQuestion,
  setTrainingAnswer,
  addTrainingPair,
  setTrainingMode
}) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="border-t border-gray-100 bg-indigo-50 overflow-hidden"
    >
      <div className="p-3 space-y-2">
        <div>
          <p className="text-xs font-medium mb-1 text-indigo-700">Question to train:</p>
          <input
            className="w-full p-2 text-sm border rounded bg-white"
            placeholder="What question should I learn?"
            value={trainingQuestion}
            onChange={(e) => setTrainingQuestion(e.target.value)}
          />
        </div>
        <div>
          <p className="text-xs font-medium mb-1 text-indigo-700">Answer to give:</p>
          <textarea
            className="w-full p-2 text-sm border rounded resize-none bg-white"
            placeholder="What answer should I give?"
            rows={2}
            value={trainingAnswer}
            onChange={(e) => setTrainingAnswer(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            onClick={addTrainingPair}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Save Training
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setTrainingMode(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ZeroBotTrainingPanel;
