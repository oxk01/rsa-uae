
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardCard from './DashboardCard';

interface SentimentTrendChartProps {
  data?: Array<{
    date: string;
    positive: number;
    neutral: number;
    negative: number;
  }>;
}

const SentimentTrendChart = ({ data = [] }: SentimentTrendChartProps) => {
  const hasData = data && data.length > 0;
  
  return (
    <DashboardCard 
      title="Sentiment Trends (Last 6 Months)"
      className="col-span-1"
    >
      {!hasData ? (
        <div className="h-[260px] flex items-center justify-center text-gray-400">
          No trend data available
        </div>
      ) : (
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#eee' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#eee' }}
                tickLine={false}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '3px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: 10, fontSize: 12 }} />
              <Line 
                type="monotone" 
                dataKey="positive" 
                stroke="#42b883" 
                activeDot={{ r: 6 }} 
                strokeWidth={2}
                name="positive"
              />
              <Line 
                type="monotone" 
                dataKey="neutral" 
                stroke="#f6c23e" 
                strokeWidth={2}
                name="neutral"
              />
              <Line 
                type="monotone" 
                dataKey="negative" 
                stroke="#e64a3b" 
                strokeWidth={2}
                name="negative"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardCard>
  );
};

export default SentimentTrendChart;
