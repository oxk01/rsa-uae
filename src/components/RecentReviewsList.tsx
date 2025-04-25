
import React from 'react';
import { ChevronRight } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { Button } from '@/components/ui/button';

interface Review {
  id: string;
  author: string;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  date?: string;
}

interface RecentReviewsListProps {
  reviews?: Review[];
}

const RecentReviewsList = ({ reviews = [] }: RecentReviewsListProps) => {
  const hasReviews = reviews && reviews.length > 0;
  
  return (
    <DashboardCard 
      title="Latest Reviews"
      className="col-span-2"
    >
      {!hasReviews ? (
        <div className="h-40 flex items-center justify-center text-gray-400">
          No recent reviews available
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="border rounded-md p-4"
            >
              <div className="flex justify-between items-start mb-1">
                <p className="font-medium">{review.author}</p>
                <span 
                  className={`px-2 py-0.5 text-xs rounded-full 
                    ${review.sentiment === 'positive' ? 'bg-green-100 text-green-800' : 
                      review.sentiment === 'negative' ? 'bg-red-100 text-red-800' : 
                      'bg-gray-100 text-gray-800'}`}
                >
                  {review.sentiment}
                </span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{review.text}</p>
            </div>
          ))}
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs flex items-center gap-1"
            >
              View All <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}
    </DashboardCard>
  );
};

export default RecentReviewsList;
