
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MessageSquare, AlertCircle, FileSpreadsheet, FileText } from 'lucide-react';
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
  source?: string;
}

interface RecentReviewsProps {
  reviews?: Review[];
}

const RecentReviews = ({ reviews }: RecentReviewsProps) => {
  const hasData = reviews && reviews.length > 0;
  
  // Convert reviews to chart data format
  const chartData = hasData ? reviews.slice(0, 5).map(review => ({
    name: review.title.length > 15 ? review.title.substring(0, 15) + '...' : review.title,
    positive: review.sentiment.positive,
    neutral: review.sentiment.neutral,
    negative: review.sentiment.negative,
    source: review.source || (review.title.includes('.') ? 'excel' : 'text')
  })) : [
    { name: 'Product Review', positive: 65, neutral: 25, negative: 10, source: 'text' },
    { name: 'Service Review', positive: 45, neutral: 35, negative: 20, source: 'text' },
    { name: 'Website Review', positive: 55, neutral: 30, negative: 15, source: 'excel' },
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
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="positive" stackId="a" fill="#3b82f6" />
            <Bar dataKey="neutral" stackId="a" fill="#8E9196" />
            <Bar dataKey="negative" stackId="a" fill="#F97316" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">Review Details</h3>
        <div className="space-y-3">
          {hasData ? (
            reviews.slice(0, 3).map(review => (
              <div key={review.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    {review.title.includes('.') ? (
                      <FileSpreadsheet className="h-4 w-4 mr-2 text-emerald-600" />
                    ) : (
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                    )}
                    <span className="font-medium">{review.title}</span>
                  </div>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <div className="mt-1.5 text-sm">
                  <div className="flex gap-2 text-xs">
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                      Positive: {review.sentiment.positive}%
                    </span>
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 rounded-full bg-gray-500 mr-1"></span>
                      Neutral: {review.sentiment.neutral}%
                    </span>
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 rounded-full bg-orange-500 mr-1"></span>
                      Negative: {review.sentiment.negative}%
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-sm text-gray-500">No review data available yet. Analyze some reviews to see them here.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-center gap-4 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#3b82f6] mr-1"></div>
          <span className="text-xs">Positive</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#8E9196] mr-1"></div>
          <span className="text-xs">Neutral</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#F97316] mr-1"></div>
          <span className="text-xs">Negative</span>
        </div>
      </div>
    </DashboardCard>
  );
};

// Custom tooltip that shows values in a more readable format
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
        <p className="font-semibold">{label}</p>
        <div className="flex items-center mb-1">
          {payload[0].payload.source === 'excel' ? (
            <FileSpreadsheet className="h-3 w-3 mr-1 text-emerald-600" />
          ) : (
            <FileText className="h-3 w-3 mr-1 text-blue-600" />
          )}
          <span className="text-xs">{payload[0].payload.source === 'excel' ? 'Excel Import' : 'Text Input'}</span>
        </div>
        <div className="text-[#3b82f6]">Positive: {payload[0].value}%</div>
        <div className="text-[#8E9196]">Neutral: {payload[1].value}%</div>
        <div className="text-[#F97316]">Negative: {payload[2].value}%</div>
      </div>
    );
  }

  return null;
};

export default RecentReviews;
