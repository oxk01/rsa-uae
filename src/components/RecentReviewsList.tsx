
import React from 'react';
import { Card } from "@/components/ui/card";
import DashboardCard from './DashboardCard';

interface Review {
  id?: number;
  title?: string;
  date?: string;
  sentiment?: {
    positive: number;
    neutral: number;
    negative: number;
  };
  reviewCount?: number;
  rating?: string;
  reviewText?: string;
  sentimentLabel?: string;
  accuracyScore?: number;
  keywords?: Array<{
    word: string;
    sentiment: string;
  }>;
}

interface RecentReviewsListProps {
  reviews?: Review[];
}

const RecentReviewsList = ({ reviews = [] }: RecentReviewsListProps) => {
  const hasReviews = reviews && reviews.length > 0;

  // Function to determine the sentiment label based on sentiment object
  const getSentimentLabel = (sentiment?: {positive: number, neutral: number, negative: number}): string => {
    if (!sentiment) return "neutral";
    
    if (sentiment.positive > sentiment.negative && sentiment.positive > sentiment.neutral) {
      return "positive";
    } else if (sentiment.negative > sentiment.positive && sentiment.negative > sentiment.neutral) {
      return "negative";
    } else {
      return "neutral";
    }
  };
  
  // Helper function to render star ratings
  const renderStarRating = (rating: string) => {
    const parts = rating.split('/');
    if (parts.length !== 2) return null;
    
    const ratingValue = parseFloat(parts[0]);
    const maxRating = parseFloat(parts[1]);
    
    if (isNaN(ratingValue) || isNaN(maxRating)) return null;
    
    const filledStars = Math.round(ratingValue);
    const emptyStars = maxRating - filledStars;
    
    return (
      <div className="flex">
        {[...Array(filledStars)].map((_, i) => (
          <span key={`filled-${i}`} className="text-yellow-400">★</span>
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">★</span>
        ))}
      </div>
    );
  };
  
  return (
    <DashboardCard title="Recent Reviews">
      {hasReviews ? (
        <div className="space-y-4">
          {reviews.map((review, idx) => {
            // Get sentiment label safely
            const sentimentLabel = review.sentimentLabel || getSentimentLabel(review.sentiment);
            
            return (
              <Card key={review.id || idx} className="p-4">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      sentimentLabel === 'positive' 
                        ? 'bg-green-100 text-green-800' 
                        : sentimentLabel === 'negative'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {sentimentLabel}
                    </span>
                    {review.rating && renderStarRating(review.rating)}
                  </div>
                  <span className="text-sm text-gray-500">{review.date || 'No date'}</span>
                </div>
                
                <p className="font-medium mb-1">{review.title || 'Untitled Review'}</p>
                <p className="text-sm text-gray-700 mb-3 line-clamp-3">{review.reviewText || 'No review text available.'}</p>
                
                {review.keywords && review.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {review.keywords.map((keyword, kidx) => (
                      <span
                        key={kidx}
                        className={`px-2 py-1 rounded-full text-xs ${
                          keyword.sentiment === "positive"
                            ? "bg-green-100 text-green-800"
                            : keyword.sentiment === "negative"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {keyword.word}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No recent reviews available.</p>
        </div>
      )}
    </DashboardCard>
  );
};

export default RecentReviewsList;
