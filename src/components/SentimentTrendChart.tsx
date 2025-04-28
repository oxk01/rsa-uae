
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardCard from './DashboardCard';
import { format, fromUnixTime } from 'date-fns';

interface SentimentTrendChartProps {
  data?: Array<{
    date: string | number;
    positive: number;
    neutral: number;
    negative: number;
  }>;
}

// Format timestamps for chart display
const formatTimestamp = (timestamp: string | number) => {
  if (typeof timestamp === 'number') {
    // If it's a unix timestamp (in seconds)
    try {
      return format(fromUnixTime(timestamp), 'MMM d, yyyy');
    } catch (e) {
      console.error("Error formatting unix timestamp:", e);
      return timestamp.toString();
    }
  } else if (timestamp && timestamp.length > 0) {
    // If it's a string date format
    try {
      return format(new Date(timestamp), 'MMM d, yyyy');
    } catch (e) {
      console.error("Error formatting date string:", e);
      return timestamp;
    }
  }
  return 'Unknown date';
};

const SentimentTrendChart = ({ data = [] }: SentimentTrendChartProps) => {
  const hasData = data && data.length > 0;
  
  return (
    <DashboardCard 
      title="Sentiment Trends (Last 6 Months)" 
      className="border-blue-100"
      isChart={true}
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
              margin={{ top: 10, right: 30, left: 0, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={formatTimestamp}
                height={60}
                angle={-45}
                textAnchor="end"
                interval={0}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#eee' }}
                tickLine={false}
                domain={[0, 100]}
                tickCount={5}
                ticks={[0, 25, 50, 75, 100]}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number) => [`${value}%`]}
                labelFormatter={(label) => `Date: ${formatTimestamp(String(label))}`}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                formatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
              />
              <Line
                type="monotone"
                dataKey="positive"
                name="Positive"
                stroke="#42b883"
                strokeWidth={2}
                dot={{ stroke: '#42b883', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0, fill: '#42b883' }}
              />
              <Line
                type="monotone"
                dataKey="neutral"
                name="Neutral"
                stroke="#f6c23e"
                strokeWidth={2}
                dot={{ stroke: '#f6c23e', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0, fill: '#f6c23e' }}
              />
              <Line
                type="monotone"
                dataKey="negative"
                name="Negative"
                stroke="#e64a3b"
                strokeWidth={2}
                dot={{ stroke: '#e64a3b', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0, fill: '#e64a3b' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardCard>
  );
};

export default SentimentTrendChart;
