
import React from 'react';
import { Review, RecentReviewsProps } from './types';
import ReviewHeader from './ReviewHeader';
import ReviewCard from './ReviewCard';
import ReviewTable from './ReviewTable';

const RecentReviews = ({ reviews, onExport, displayMode = 'cards' }: RecentReviewsProps) => {
  const hasData = reviews && reviews.length > 0;
  
  // Display empty state when no real data is available
  if (!hasData) {
    return (
      <div className="space-y-6">
        <ReviewHeader 
          totalReviews={0} 
          positiveCount={0} 
          neutralCount={0}
          negativeCount={0}
          averageAccuracy={0}
          hasData={false}
          onExport={onExport}
          displayMode={displayMode}
        />
        <div className="text-center p-8">
          <p className="text-gray-500">No reviews available. Upload a file or enter text to analyze.</p>
        </div>
      </div>
    );
  }
  
  // Calculate statistics from real data only
  const totalReviews = reviews.length;
  const positiveCount = reviews.filter(r => r.sentimentLabel === 'positive').length;
  const neutralCount = reviews.filter(r => r.sentimentLabel === 'neutral').length;
  const negativeCount = reviews.filter(r => r.sentimentLabel === 'negative').length;
  const averageAccuracy = Math.round(reviews.reduce((sum, r) => sum + (r.accuracyScore || 0), 0) / reviews.length);
  
  // Limit the number of reviews displayed based on display mode
  const displayReviews = displayMode === 'cards' ? reviews.slice(0, 5) : reviews.slice(0, 100);
  
  return (
    <div className="space-y-6">
      <ReviewHeader 
        totalReviews={totalReviews} 
        positiveCount={positiveCount} 
        neutralCount={neutralCount}
        negativeCount={negativeCount}
        averageAccuracy={averageAccuracy}
        hasData={hasData}
        onExport={onExport}
        displayMode={displayMode}
      />
      
      {displayMode === 'cards' ? (
        <div className="space-y-6">
          {displayReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <ReviewTable reviews={displayReviews} totalReviews={totalReviews} />
      )}
    </div>
  );
};

export default RecentReviews;
