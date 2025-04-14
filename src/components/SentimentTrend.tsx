
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertCircle } from 'lucide-react';
import DashboardCard from './DashboardCard';

interface SentimentTrendProps {
  trendData?: Array<{
    date: string;
    positive: number;
    neutral: number;
    negative: number;
  }>;
}

const SentimentTrend = ({ trendData }: SentimentTrendProps) => {
  // Check if we have actual data
  const hasData = trendData && trendData.length > 0;
  
  // If no data, use sample data for display
  const displayData = hasData ? trendData : [
    { date: 'Jan', positive: 65, neutral: 25, negative: 10 },
    { date: 'Feb', positive: 59, neutral: 22, negative: 19 },
    { date: 'Mar', positive: 70, neutral: 20, negative: 10 },
    { date: 'Apr', positive: 58, neutral: 27, negative: 15 },
    { date: 'May', positive: 63, neutral: 22, negative: 15 },
    { date: 'Jun', positive: 75, neutral: 15, negative: 10 },
  ];
  
  return (
    <DashboardCard 
      title="Sentiment Trend" 
      icon={<TrendingUp className="h-4 w-4" />}
      className="col-span-1 md:col-span-3"
    >
      {!hasData && (
        <div className="bg-amber-50 border border-amber-200 rounded p-2 mb-3 flex items-center gap-2 text-sm text-amber-700">
          <AlertCircle className="h-4 w-4" />
          <span>Using sample data. Analyze reviews to see actual trends.</span>
        </div>
      )}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={displayData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="positive" 
              stroke="#3b82f6" 
              strokeWidth={2} 
              activeDot={{ r: 8 }} 
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="neutral" 
              stroke="#8E9196" 
              strokeWidth={2} 
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="negative" 
              stroke="#F97316" 
              strokeWidth={2} 
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-4 mt-2">
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
        <div className="text-[#3b82f6]">Positive: {payload[0].value}%</div>
        <div className="text-[#8E9196]">Neutral: {payload[1].value}%</div>
        <div className="text-[#F97316]">Negative: {payload[2].value}%</div>
      </div>
    );
  }

  return null;
};

export default SentimentTrend;
