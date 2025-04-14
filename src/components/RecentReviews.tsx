
import React from 'react';
import { FileSpreadsheet, FileText, Download, BarChart3 } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Review {
  id: number;
  title: string;
  date: string;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  reviewCount: number;
  source?: string;
  rating?: string;
  reviewText?: string;
  sentimentLabel?: string;
  accuracyScore?: number;
  keywords?: Array<{
    word: string;
    sentiment: string;
  }>;
}

interface RecentReviewsProps {
  reviews?: Review[];
  onExport?: () => void;
  displayMode?: 'cards' | 'table';
}

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
          <div key={review.id} className="border rounded-lg p-4">
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
        ))}
      </div>
    );
  };
  
  // Table display mode
  const renderTable = () => {
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
            {displayReviews.map((review) => (
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
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h3 className="text-lg font-medium">Reviews Analysis</h3>
          {hasData && (
            <div className="text-sm text-gray-500 mt-1">
              {totalReviews} reviews analyzed: {positiveCount} positive, {neutralCount} neutral, {negativeCount} negative 
              • Average accuracy: {averageAccuracy}%
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {hasData && (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onExport?.()}
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                Export to Excel
              </Button>
              {reviews && reviews.length > 5 && (
                <div className="flex items-center gap-2">
                  <Button 
                    variant={displayMode === 'cards' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => displayMode !== 'cards' && window.location.reload()}
                  >
                    Cards
                  </Button>
                  <Button 
                    variant={displayMode === 'table' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => displayMode !== 'table' && window.location.reload()}
                  >
                    Table
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {hasData ? (
        displayMode === 'cards' ? renderCards() : renderTable()
      ) : (
        <div className="text-center p-8">
          <p className="text-gray-500">No reviews available yet.</p>
        </div>
      )}
    </div>
  );
};

export default RecentReviews;
