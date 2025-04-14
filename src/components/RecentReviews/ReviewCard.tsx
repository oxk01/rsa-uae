
import React from 'react';
import { FileSpreadsheet, FileText, BarChart3 } from 'lucide-react';
import { Review, KeywordItem } from './types';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  // Helper function to render star ratings
  const renderStarRating = (rating: string) => {
    const ratingValue = parseFloat(rating.split('/')[0]);
    const maxRating = parseFloat(rating.split('/')[1]);
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
  
  // Helper function to determine badge color based on sentiment
  const getBadgeColor = (sentiment: string) => {
    switch(sentiment?.toLowerCase()) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get source icon
  const getSourceIcon = (source?: string) => {
    if (source === 'excel') {
      return <FileSpreadsheet className="h-4 w-4 text-green-600 mr-1" />;
    }
    return <FileText className="h-4 w-4 text-blue-600 mr-1" />;
  };
  
  // Helper function to determine accuracy badge color
  const getAccuracyBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-blue-100 text-blue-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getBadgeColor(review.sentimentLabel || '')}`}>
            {review.sentimentLabel}
          </span>
          {review.rating && renderStarRating(review.rating)}
          <div className="flex items-center ml-2 text-xs text-gray-500">
            {getSourceIcon(review.source)}
            <span>{review.source === 'excel' ? 'From Excel' : 'From Text'}</span>
          </div>
        </div>
        <span className="text-sm text-gray-500">{review.date}</span>
      </div>
      
      <p className="font-medium mb-1 flex justify-between items-center">
        <span>Product ID: {review.title}</span>
        {review.accuracyScore && (
          <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getAccuracyBadgeColor(review.accuracyScore)}`}>
            <BarChart3 className="h-3 w-3" />
            Accuracy: {review.accuracyScore}%
          </span>
        )}
      </p>
      
      <p className="text-sm text-gray-700 mb-4">{review.reviewText}</p>
      
      <div className="flex flex-wrap gap-2">
        {review.keywords?.map((keyword, idx) => (
          <span 
            key={idx} 
            className={`px-2 py-1 rounded-full text-xs ${
              keyword.sentiment === 'positive' 
                ? 'bg-green-100 text-green-800' 
                : keyword.sentiment === 'negative'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
            }`}
          >
            {keyword.word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
