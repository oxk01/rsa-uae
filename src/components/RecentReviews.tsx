import React from 'react';
import { FileSpreadsheet, FileText, Download, BarChart3 } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

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
}

const RecentReviews = ({ reviews, onExport }: RecentReviewsProps) => {
  const hasData = reviews && reviews.length > 0;
  
  // Sample data for demonstration
  const sampleReviews = [
    {
      id: 1,
      title: "Smart Home Assistant",
      date: "2025-04-07",
      sentiment: { positive: 70, neutral: 20, negative: 10 },
      reviewCount: 1,
      source: "excel",
      rating: "4/5",
      accuracyScore: 91,
      reviewText: "This Smart Home Assistant exceeds expectations in many ways. The voice recognition is incredibly accurate even in noisy environments, and it integrates seamlessly with my existing smart home devices. Setup was straightforward and took less than 10 minutes. The only minor issue is that it occasionally has trouble with complex commands that involve multiple actions. Overall, great value for the price point.",
      sentimentLabel: "positive",
      keywords: [
        { word: "voice recognition", sentiment: "positive" },
        { word: "integration", sentiment: "positive" },
        { word: "setup", sentiment: "positive" }
      ]
    },
    {
      id: 2,
      title: "Wireless Earbuds Pro",
      date: "2025-04-09",
      sentiment: { positive: 50, neutral: 30, negative: 20 },
      reviewCount: 1,
      source: "excel",
      rating: "3/5",
      accuracyScore: 91,
      reviewText: "The Wireless Earbuds Pro have decent sound quality and the battery life is acceptable at about 5 hours per charge. The case provides an additional 15 hours which is standard for this price range. Comfort is average - they stay in during light activities but tend to slip during intense workouts. Noise cancellation is mediocre at best. They're good enough for casual listening but audiophiles will want to look elsewhere.",
      sentimentLabel: "neutral",
      keywords: [
        { word: "sound quality", sentiment: "neutral" },
        { word: "battery life", sentiment: "neutral" },
        { word: "comfort", sentiment: "neutral" },
        { word: "noise cancellation", sentiment: "negative" }
      ]
    },
    {
      id: 3,
      title: "Ultra HD Gaming Monitor",
      date: "2025-04-11",
      sentiment: { positive: 20, neutral: 10, negative: 70 },
      reviewCount: 1,
      source: "excel",
      rating: "1/5",
      accuracyScore: 91,
      reviewText: "Extremely disappointed with this Ultra HD Gaming Monitor. The display arrived with dead pixels in the corner, and customer support has been unhelpful in resolving the issue. Despite the advertised 1ms response time, there's noticeable ghosting during fast-paced games. The color accuracy is also way off compared to what was promised in the specifications. Save your money and look for alternatives from more reliable brands.",
      sentimentLabel: "negative",
      keywords: [
        { word: "dead pixels", sentiment: "negative" },
        { word: "customer support", sentiment: "negative" },
        { word: "response time", sentiment: "negative" },
        { word: "color accuracy", sentiment: "negative" }
      ]
    }
  ];
  
  const displayReviews = hasData ? reviews.slice(0, 5) : sampleReviews;
  
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
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Recent Reviews</h3>
        {hasData && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExport}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Export to Excel
          </Button>
        )}
      </div>
      
      {displayReviews.map((review) => (
        <div key={review.id} className="border rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getBadgeColor(review.sentimentLabel || '')}`}>
                {review.sentimentLabel}
              </span>
              {renderStarRating(review.rating || "0/5")}
              <div className="flex items-center ml-2 text-xs text-gray-500">
                {getSourceIcon(review.source)}
                <span>{review.source === 'excel' ? 'From Excel' : 'From Text'}</span>
              </div>
            </div>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
          
          <p className="font-medium mb-1 flex justify-between items-center">
            <span>Review for {review.title}</span>
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
      
      {!hasData && displayReviews.length === 0 && (
        <div className="text-center p-8">
          <p className="text-gray-500">No reviews available yet.</p>
        </div>
      )}
    </div>
  );
};

export default RecentReviews;
