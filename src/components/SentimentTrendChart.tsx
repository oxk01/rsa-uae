
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardCard from './DashboardCard';

interface SentimentTrendChartProps {
  data?: Array<{
    date: string | number;
    positive: number;
    neutral: number;
    negative: number;
  }>;
}

const formatDate = (timestamp: string | number): string => {
  try {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return String(timestamp);
  }
};

const SentimentTrendChart = ({ data = [] }: SentimentTrendChartProps) => {
  const hasData = data && data.length > 0;
  
  // Ensure all data values are valid numbers and format dates
  const validatedData = hasData ? data.map(item => ({
    date: formatDate(item.date),
    positive: typeof item.positive === 'number' ? item.positive : 0,
    neutral: typeof item.neutral === 'number' ? item.neutral : 0,
    negative: typeof item.negative === 'number' ? item.negative : 0
  })) : [];
  
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
              data={validatedData}
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
                label={{ value: 'Sentiment %', angle: -90, position: 'insideLeft' }}
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
                name="Positive"
              />
              <Line 
                type="monotone" 
                dataKey="neutral" 
                stroke="#f6c23e" 
                strokeWidth={2}
                name="Neutral"
              />
              <Line 
                type="monotone" 
                dataKey="negative" 
                stroke="#e64a3b" 
                strokeWidth={2}
                name="Negative"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardCard>
  );
};

export default SentimentTrendChart;
