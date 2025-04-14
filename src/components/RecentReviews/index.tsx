
import React from 'react';
import { Review, RecentReviewsProps } from './types';
import ReviewHeader from './ReviewHeader';
import ReviewCard from './ReviewCard';
import ReviewTable from './ReviewTable';

const RecentReviews = ({ reviews, onExport, displayMode = 'cards' }: RecentReviewsProps) => {
  const hasData = reviews && reviews.length > 0;
  
  // Sample data for demonstration only when no real data is available
  const sampleReviews = [
    {
      id: 1,
      title: "P1001",
      date: "2025-04-07",
      sentiment: { positive: 70, neutral: 20, negative: 10 },
      reviewCount: 1,
      source: "excel",
      rating: "4/5",
      accuracyScore: 91,
      reviewText: "The build quality is exceptional and it works perfectly with all my devices. Setup was easy and I'm very satisfied with my purchase. Would definitely recommend to others looking for a reliable product.",
      sentimentLabel: "positive",
      keywords: [
        { word: "quality", sentiment: "positive" },
        { word: "setup", sentiment: "positive" },
        { word: "reliable", sentiment: "positive" },
        { word: "recommend", sentiment: "positive" }
      ]
    },
    {
      id: 2,
      title: "P2045",
      date: "2025-04-09",
      sentiment: { positive: 50, neutral: 30, negative: 20 },
      reviewCount: 1,
      source: "excel",
      rating: "3/5",
      accuracyScore: 89,
      reviewText: "Product functions as expected but the battery life is shorter than advertised. Otherwise, it meets basic requirements and performs adequately for daily use. The price is reasonable for what you get.",
      sentimentLabel: "neutral",
      keywords: [
        { word: "battery", sentiment: "negative" },
        { word: "functions", sentiment: "neutral" },
        { word: "price", sentiment: "neutral" },
        { word: "adequate", sentiment: "neutral" }
      ]
    },
    {
      id: 3,
      title: "P3789",
      date: "2025-04-11",
      sentiment: { positive: 20, neutral: 10, negative: 70 },
      reviewCount: 1,
      source: "excel",
      rating: "1/5",
      accuracyScore: 94,
      reviewText: "After just two weeks of use, the product completely stopped working. Customer service was unhelpful and refused to honor the warranty. Complete waste of money - avoid this product at all costs!",
      sentimentLabel: "negative",
      keywords: [
        { word: "stopped", sentiment: "negative" },
        { word: "unhelpful", sentiment: "negative" },
        { word: "warranty", sentiment: "negative" },
        { word: "waste", sentiment: "negative" },
        { word: "avoid", sentiment: "negative" }
      ]
    }
  ];
  
  const displayReviews = hasData ? 
    (displayMode === 'cards' ? reviews.slice(0, 5) : reviews.slice(0, 100)) : 
    sampleReviews;
  
  // Calculate statistics
  const totalReviews = hasData ? reviews.length : 0;
  const positiveCount = hasData ? 
    reviews.filter(r => r.sentimentLabel === 'positive').length : 0;
  const neutralCount = hasData ? 
    reviews.filter(r => r.sentimentLabel === 'neutral').length : 0;
  const negativeCount = hasData ? 
    reviews.filter(r => r.sentimentLabel === 'negative').length : 0;
  const averageAccuracy = hasData ? 
    Math.round(reviews.reduce((sum, r) => sum + (r.accuracyScore || 0), 0) / reviews.length) : 0;
  
  // Card display mode
  const renderCards = () => {
    return (
      <div className="space-y-6">
        {displayReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    );
  };
  
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
      
      {hasData ? (
        displayMode === 'cards' ? renderCards() : <ReviewTable reviews={displayReviews} totalReviews={totalReviews} />
      ) : (
        <div className="text-center p-8">
          <p className="text-gray-500">No reviews available yet.</p>
        </div>
      )}
    </div>
  );
};

export default RecentReviews;
