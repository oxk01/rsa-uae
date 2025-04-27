
import React from 'react';
import { Card } from '@/components/ui/card';

interface KeyPhrasesProps {
  phrases: Array<string | { text?: string; word?: string }>;
  sentiment: string;
}

const KeyPhrases: React.FC<KeyPhrasesProps> = ({ phrases, sentiment }) => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-2">Key Phrases</h3>
      <div className="flex flex-wrap gap-2">
        {phrases && phrases.length > 0 ? (
          phrases.slice(0, 8).map((phrase, idx) => {
            const text = typeof phrase === 'string' ? phrase : (phrase.text || phrase.word || "");
            if (!text) return null;
            
            return (
              <span 
                key={idx} 
                className={`px-2 py-1 rounded-full text-xs ${
                  sentiment === 'positive' 
                    ? 'bg-green-100 text-green-800' 
                    : sentiment === 'negative'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                }`}
              >
                {text}
              </span>
            );
          }).filter(Boolean)
        ) : (
          <p className="text-gray-500 text-sm">No key phrases identified</p>
        )}
      </div>
    </Card>
  );
};

export default KeyPhrases;
