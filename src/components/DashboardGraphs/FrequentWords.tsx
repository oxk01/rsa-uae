import React from 'react';
import DashboardCard from '../DashboardCard';
import { Hash } from 'lucide-react';
import { getThemeColors } from './constants';
import { useTheme } from 'next-themes';

interface FrequentWordsProps {
  data: any[];
}

const getWordSize = (count: number, max: number, min: number) => {
  const minSize = 12;
  const maxSize = 40;
  
  if (max === min) return (minSize + maxSize) / 2;
  
  return minSize + ((count - min) / (max - min)) * (maxSize - minSize);
};

const FrequentWords: React.FC<FrequentWordsProps> = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = getThemeColors(isDark);
  
  return (
    <DashboardCard
      title="Frequent Words in Reviews"
      icon={<Hash className="h-4 w-4" />}
      isChart={true}
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
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.positive }}></div>
          <span className="text-sm ml-2">Positive</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.neutral }}></div>
          <span className="text-sm ml-2">Neutral</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.negative }}></div>
          <span className="text-sm ml-2">Negative</span>
        </div>
      </div>
    </DashboardCard>
  );
};

export default FrequentWords;
