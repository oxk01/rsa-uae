
import React from 'react';
import { Tag } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { Badge } from '@/components/ui/badge';

// Default keywords to show if there's no data
const defaultKeywords = [
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

const getSentimentVariant = (sentiment: string) => {
  switch (sentiment) {
    case 'positive':
      return 'default';
    case 'neutral':
      return 'secondary';
    case 'negative':
      return 'destructive';
    default:
      return 'default';
  }
};

interface TopKeywordsProps {
  keywords?: Array<{word: string, count: number, sentiment: string}>;
  className?: string;
}

const TopKeywords = ({ keywords = defaultKeywords, className = "col-span-1" }: TopKeywordsProps) => {
  // Make sure keywords is always an array
  const keywordsToDisplay = Array.isArray(keywords) && keywords.length > 0 ? keywords : defaultKeywords;
  
  return (
    <DashboardCard 
      title="Top Keywords" 
      icon={<Tag className="h-4 w-4" />}
      className={className}
    >
      <div className="flex flex-wrap gap-2">
        {keywordsToDisplay.map((keyword, index) => (
          <Badge 
            key={index} 
            variant={getSentimentVariant(keyword.sentiment)}
            className="text-xs py-1 px-3"
          >
            {keyword.word} <span className="font-semibold ml-1">({keyword.count || 0})</span>
          </Badge>
        ))}
      </div>
    </DashboardCard>
  );
};

export default TopKeywords;
