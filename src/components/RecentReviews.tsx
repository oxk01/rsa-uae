
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MessageSquare, AlertCircle } from 'lucide-react';
import DashboardCard from './DashboardCard';

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
}

interface RecentReviewsProps {
  reviews?: Review[];
}

const RecentReviews = ({ reviews }: RecentReviewsProps) => {
  const hasData = reviews && reviews.length > 0;
  
  // Convert reviews to chart data format
  const chartData = hasData ? reviews.slice(0, 5).map(review => ({
    name: review.title,
    positive: review.sentiment.positive,
    neutral: review.sentiment.neutral,
    negative: review.sentiment.negative,
  })) : [
    { name: 'Product Review', positive: 65, neutral: 25, negative: 10 },
    { name: 'Service Review', positive: 45, neutral: 35, negative: 20 },
    { name: 'Website Review', positive: 55, neutral: 30, negative: 15 },
  ];
  
  return (
    <DashboardCard 
      title="Recent Reviews" 
      icon={<MessageSquare className="h-4 w-4" />}
      className="col-span-1 md:col-span-3"
    >
      {!hasData && (
        <div className="bg-amber-50 border border-amber-200 rounded p-2 mb-3 flex items-center gap-2 text-sm text-amber-700">
          <AlertCircle className="h-4 w-4" />
          <span>Using sample data. Analyze reviews to see actual data.</span>
        </div>
      )}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="positive" stackId="a" fill="#2c7a7b" />
            <Bar dataKey="neutral" stackId="a" fill="#4a5568" />
            <Bar dataKey="negative" stackId="a" fill="#e53e3e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-4 mt-2">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#2c7a7b] mr-1"></div>
          <span className="text-xs">Positive</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#4a5568] mr-1"></div>
          <span className="text-xs">Neutral</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#e53e3e] mr-1"></div>
          <span className="text-xs">Negative</span>
        </div>
      </div>
    </DashboardCard>
  );
};

export default RecentReviews;
