
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
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
  
  return (
    <DashboardCard 
      title="Sentiment Trend" 
      icon={<TrendingUp className="h-4 w-4" />}
      className="col-span-1 md:col-span-3"
    >
      {!hasData ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Trend Data Available</h3>
          <p className="text-gray-500 max-w-md">
            Analyze multiple files over time in the Demo section to generate sentiment trends. 
            Each analysis will be recorded and used to build this chart.
          </p>
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trendData}
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
      )}
    </DashboardCard>
  );
};

export default SentimentTrend;
