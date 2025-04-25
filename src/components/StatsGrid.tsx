
import React from 'react';
import { Card } from '@/components/ui/card';
import { FileText, ThumbsUp, ThumbsDown, BarChart2 } from 'lucide-react';

interface StatsGridProps {
  totalReviews?: string;
  averageRating?: string;
  responseTime?: string;
  sentimentScore?: string;
  accuracyScore?: string;
  reviewsChange?: string;
  ratingChange?: string;
  responseChange?: string;
  sentimentChange?: string;
  accuracyChange?: string;
  reviewsPositive?: boolean;
  ratingPositive?: boolean;
  responsePositive?: boolean;
  sentimentPositive?: boolean;
  accuracyPositive?: boolean;
  totalDataPoints?: string;
  dataPointsChange?: string;
  dataPointsPositive?: boolean;
}

const StatsGrid = ({
  totalReviews = "0",
  averageRating = "N/A",
  responseTime = "N/A",
  sentimentScore = "N/A",
  accuracyScore = "N/A",
  reviewsChange = "No previous data",
  ratingChange = "No previous data",
  responseChange = "No previous data",
  sentimentChange = "No previous data",
  accuracyChange = "No previous data",
  reviewsPositive = true,
  ratingPositive = true,
  responsePositive = true,
  sentimentPositive = true,
  accuracyPositive = true,
  totalDataPoints = "0",
  dataPointsChange = "No previous data",
  dataPointsPositive = true
}: StatsGridProps) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <FileText className="h-6 w-6 text-blue-500" />
          <span className="text-xs text-gray-500">Total Reviews</span>
        </div>
        <div className="text-2xl font-bold text-gray-800">{totalReviews}</div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <ThumbsUp className="h-6 w-6 text-green-500" />
          <span className="text-xs text-gray-500">Positive Sentiment</span>
        </div>
        <div className="text-2xl font-bold text-green-600">{sentimentScore}</div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <ThumbsDown className="h-6 w-6 text-red-500" />
          <span className="text-xs text-gray-500">Negative Sentiment</span>
        </div>
        <div className="text-2xl font-bold text-red-600">10%</div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <BarChart2 className="h-6 w-6 text-blue-600" />
          <span className="text-xs text-gray-500">Average Accuracy</span>
        </div>
        <div className="text-2xl font-bold text-blue-700">{accuracyScore}</div>
      </div>
    </div>
  );
};

export default StatsGrid;
