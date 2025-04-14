
import React from 'react';
import { FileSpreadsheet, FileText, Download } from 'lucide-react';
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
  keywords?: Array<{
    word: string;
    sentiment: string;
  }>;
}

interface RecentReviewsProps {
  reviews?: Review[];
}

const RecentReviews = ({ reviews }: RecentReviewsProps) => {
  const hasData = reviews && reviews.length > 0;
  
  // Sample data for demonstration
  const sampleReviews = [
    {
      id: 1,
      title: "AI-powered Sentiment Analysis Tool",
      date: "2025-04-07",
      sentiment: { positive: 70, neutral: 20, negative: 10 },
      reviewCount: 1,
      source: "text",
      rating: "5/5",
      reviewText: "I've been using this AI-powered sentiment analysis tool for a few months to track customer feedback and it's been a game-changer. The tool processes thousands of reviews in a fraction of the time it would take manually. The sentiment analysis is incredibly accurate, and it breaks down emotions related to different aspects like product quality, service, and price. The user interface is intuitive, and the results are displayed in an easy-to-understand format. It has helped me improve my customer service and fine-tune marketing strategies. I highly recommend it for businesses looking to leverage customer feedback.",
      sentimentLabel: "Negative",
      keywords: [
        { word: "quality", sentiment: "negative" },
        { word: "price", sentiment: "negative" },
        { word: "service", sentiment: "neutral" }
      ]
    },
    {
      id: 2,
      title: "Fitness Tracker Smartwatch",
      date: "2025-04-07",
      sentiment: { positive: 60, neutral: 30, negative: 10 },
      reviewCount: 1,
      source: "excel",
      rating: "4/5",
      reviewText: "I recently purchased this fitness tracker smartwatch to help me track my workouts, sleep patterns, and overall health. The watch is comfortable to wear, and the display is clear even in bright sunlight. The heart rate monitor and step counter are pretty accurate, but the GPS tracking sometimes takes a while to connect, which can be frustrating during runs. Overall, it provides excellent value for the price, and the companion app is very helpful in setting fitness goals and tracking progress. It's definitely helped me stay motivated to exercise regularly.",
      sentimentLabel: "Neutral",
      keywords: [
        { word: "quality", sentiment: "positive" },
        { word: "price", sentiment: "negative" },
        { word: "service", sentiment: "neutral" }
      ]
    },
    {
      id: 3,
      title: "Online Grocery Delivery Service",
      date: "2025-04-07",
      sentiment: { positive: 40, neutral: 20, negative: 40 },
      reviewCount: 1,
      source: "text",
      rating: "3/5",
      reviewText: "I've been using this online grocery delivery service for a few weeks now, and while it has its benefits, I've encountered a few issues. The convenience of having groceries delivered to my door is fantastic, and the website is easy to navigate. However, some items are often out of stock, and the delivery times can sometimes be delayed. Customer service is responsive, but they don't always have clear solutions to fix issues with missing items. I'm satisfied with the overall convenience, but the service could improve in terms of inventory management and delivery reliability.",
      sentimentLabel: "Negative",
      keywords: [
        { word: "quality", sentiment: "negative" },
        { word: "price", sentiment: "negative" },
        { word: "service", sentiment: "neutral" }
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
  
  return (
    <div className="space-y-6">
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
          
          <p className="font-medium mb-1">
            Review for {review.title} Rating: {review.rating}
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
                {keyword.word}: {keyword.sentiment}
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
