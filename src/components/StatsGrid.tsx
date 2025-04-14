
import React from 'react';
import StatCard from './StatCard';
import { MessageSquare, Star, Clock, TrendingUp } from 'lucide-react';

interface StatsGridProps {
  // Making the component accept actual data rather than using hardcoded values
  totalReviews?: string;
  averageRating?: string;
  responseTime?: string;
  sentimentScore?: string;
  // Change data for each stat
  reviewsChange?: string;
  ratingChange?: string;
  responseChange?: string;
  sentimentChange?: string;
  // Whether changes are positive or negative
  reviewsPositive?: boolean;
  ratingPositive?: boolean;
  responsePositive?: boolean;
  sentimentPositive?: boolean;
}

const StatsGrid = ({
  totalReviews = "0",
  averageRating = "N/A",
  responseTime = "N/A",
  sentimentScore = "N/A",
  reviewsChange = "No previous data",
  ratingChange = "No previous data",
  responseChange = "No previous data",
  sentimentChange = "No previous data",
  reviewsPositive = true,
  ratingPositive = true,
  responsePositive = true,
  sentimentPositive = true
}: StatsGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard 
        title="Total Reviews" 
        value={totalReviews} 
        change={reviewsChange} 
        positive={reviewsPositive}
        icon={<MessageSquare className="h-5 w-5 text-brand-blue" />}
      />
      <StatCard 
        title="Average Rating" 
        value={averageRating} 
        change={ratingChange} 
        positive={ratingPositive}
        icon={<Star className="h-5 w-5 text-brand-amber" />}
      />
      <StatCard 
        title="Response Time" 
        value={responseTime} 
        change={responseChange} 
        positive={responsePositive}
        icon={<Clock className="h-5 w-5 text-brand-teal" />}
      />
      <StatCard 
        title="Sentiment Score" 
        value={sentimentScore} 
        change={sentimentChange} 
        positive={sentimentPositive}
        icon={<TrendingUp className="h-5 w-5 text-brand-blue" />}
      />
    </div>
  );
};

export default StatsGrid;
