
import React from 'react';
import { Review } from './types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ReviewTableProps {
  reviews: Review[];
  totalReviews: number;
}

const ReviewTable = ({ reviews, totalReviews }: ReviewTableProps) => {
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
  
  // Helper function to determine accuracy badge color
  const getAccuracyBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-blue-100 text-blue-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableCaption>Total Reviews: {totalReviews}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ProductID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Sentiment</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Accuracy</TableHead>
            <TableHead>Keywords</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell className="font-medium">{review.title}</TableCell>
              <TableCell>{review.date}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getBadgeColor(review.sentimentLabel || '')}`}>
                  {review.sentimentLabel}
                </span>
              </TableCell>
              <TableCell>{review.rating && renderStarRating(review.rating)}</TableCell>
              <TableCell>
                {review.accuracyScore && (
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getAccuracyBadgeColor(review.accuracyScore)}`}>
                    {review.accuracyScore}%
                  </span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {review.keywords?.slice(0, 3).map((keyword, idx) => (
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReviewTable;
