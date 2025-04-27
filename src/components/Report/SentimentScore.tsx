
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface SentimentScoreProps {
  sentiment: string;
  score: number;
  breakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

const SentimentScore: React.FC<SentimentScoreProps> = ({ sentiment, score, breakdown }) => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-2">Sentiment Score</h3>
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${
          sentiment === 'positive' ? 'bg-green-500' : 
          sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'
        }`} />
        <span className="capitalize">{sentiment}</span>
        <span className="ml-auto font-semibold">{score}/100</span>
      </div>
      <Progress 
        value={score} 
        className={`mt-2 ${
          sentiment === 'positive' ? 'bg-green-100' : 
          sentiment === 'negative' ? 'bg-red-100' : 'bg-gray-100'
        }`} 
      />
      <div className="flex justify-between mt-3 text-xs text-gray-500">
        <div className="flex items-center">
          <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
          <span>{breakdown.positive}% Positive</span>
        </div>
        <div>
          <span>{breakdown.neutral}% Neutral</span>
        </div>
        <div className="flex items-center">
          <ArrowDown className="h-3 w-3 mr-1 text-red-500" />
          <span>{breakdown.negative}% Negative</span>
        </div>
      </div>
    </Card>
  );
};

export default SentimentScore;
