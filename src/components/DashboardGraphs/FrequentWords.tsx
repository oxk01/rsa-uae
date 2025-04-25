
import React from 'react';
import DashboardCard from '../DashboardCard';
import { Hash } from 'lucide-react';
import { COLORS } from './constants';

interface FrequentWordsProps {
  data: any[];
}

const getWordSize = (count: number, max: number, min: number) => {
  const minSize = 12;
  const maxSize = 40;
  
  if (max === min) return (minSize + maxSize) / 2;
  
  return minSize + ((count - min) / (max - min)) * (maxSize - minSize);
};

const getSentimentColor = (sentiment: string) => {
  switch (sentiment.toLowerCase()) {
    case 'positive': return COLORS.positive;
    case 'negative': return COLORS.negative;
    default: return COLORS.neutral;
  }
};

const FrequentWords: React.FC<FrequentWordsProps> = ({ data }) => {
  let minCount = 0, maxCount = 0;
  
  if (data.length > 0) {
    minCount = Math.min(...data.map(item => item.value));
    maxCount = Math.max(...data.map(item => item.value));
  }

  return (
    <DashboardCard
      title="Frequent Words in Reviews"
      icon={<Hash className="h-4 w-4" />}
    >
      <div className="h-[320px] relative overflow-hidden">
        <div className="absolute inset-0 flex flex-wrap justify-center items-center p-6">
          {data.slice(0, 40).map((word, i) => (
            <div
              key={i}
              className="px-2 py-1 mb-1"
              style={{
                fontSize: `${getWordSize(word.value, maxCount, minCount)}px`,
                color: getSentimentColor(word.sentiment),
                fontWeight: word.value > (maxCount / 2) ? 600 : 400
              }}
            >
              {word.text}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-2">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#10b981] mr-2"></div>
          <span className="text-sm">Positive</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#6b7280] mr-2"></div>
          <span className="text-sm">Neutral</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#ef4444] mr-2"></div>
          <span className="text-sm">Negative</span>
        </div>
      </div>
    </DashboardCard>
  );
};

export default FrequentWords;

