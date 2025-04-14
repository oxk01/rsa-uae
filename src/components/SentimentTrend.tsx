
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, AlertCircle } from 'lucide-react';
import DashboardCard from './DashboardCard';

// This would be replaced by actual data from user analyses
const data = [
  { date: 'Jan', positive: 65, neutral: 25, negative: 10 },
  { date: 'Feb', positive: 59, neutral: 22, negative: 19 },
  { date: 'Mar', positive: 70, neutral: 20, negative: 10 },
  { date: 'Apr', positive: 58, neutral: 27, negative: 15 },
  { date: 'May', positive: 63, neutral: 22, negative: 15 },
  { date: 'Jun', positive: 75, neutral: 15, negative: 10 },
];

interface SentimentTrendProps {
  trendData?: Array<{
    date: string;
    positive: number;
    neutral: number;
    negative: number;
  }>;
}

const SentimentTrend = ({ trendData }: SentimentTrendProps) => {
  // Use provided data if available, otherwise show empty state
  const hasData = trendData && trendData.length > 0;
  const chartData = hasData ? trendData : data;
  
  return (
    <DashboardCard 
      title="Sentiment Trend" 
      icon={<TrendingUp className="h-4 w-4" />}
      className="col-span-1 md:col-span-3"
    >
      {!hasData && (
        <div className="bg-amber-50 border border-amber-200 rounded p-2 mb-3 flex items-center gap-2 text-sm text-amber-700">
          <AlertCircle className="h-4 w-4" />
          <span>Showing sample data. Analyze reviews in the Demo section to see your actual data.</span>
        </div>
      )}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
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
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="positive" stroke="#2c7a7b" strokeWidth={2} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="neutral" stroke="#4a5568" strokeWidth={2} />
            <Line type="monotone" dataKey="negative" stroke="#e53e3e" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

export default SentimentTrend;
