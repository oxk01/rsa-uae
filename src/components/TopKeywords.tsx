
import React from 'react';
import { Tag } from 'lucide-react';
import DashboardCard from './DashboardCard';

const keywords = [
  { word: 'quality', count: 324, sentiment: 'positive' },
  { word: 'price', count: 245, sentiment: 'neutral' },
  { word: 'service', count: 198, sentiment: 'positive' },
  { word: 'shipping', count: 156, sentiment: 'negative' },
  { word: 'design', count: 132, sentiment: 'positive' },
  { word: 'features', count: 118, sentiment: 'positive' },
  { word: 'warranty', count: 95, sentiment: 'neutral' },
  { word: 'customer support', count: 87, sentiment: 'negative' },
  { word: 'durability', count: 76, sentiment: 'positive' },
  { word: 'user-friendly', count: 62, sentiment: 'positive' },
];

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case 'positive':
      return 'text-sentiment-positive bg-sentiment-positive';
    case 'neutral':
      return 'text-sentiment-neutral bg-sentiment-neutral';
    case 'negative':
      return 'text-sentiment-negative bg-sentiment-negative';
    default:
      return 'text-gray-700 bg-gray-200';
  }
};

const TopKeywords = () => {
  return (
    <DashboardCard 
      title="Top Keywords" 
      icon={<Tag className="h-4 w-4" />}
      className="col-span-1"
    >
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <div 
            key={index} 
            className={`${getSentimentColor(keyword.sentiment)} bg-opacity-10 px-3 py-1 rounded-full text-sm`}
          >
            {keyword.word} <span className="font-semibold">({keyword.count})</span>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default TopKeywords;
