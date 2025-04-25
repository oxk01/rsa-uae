
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

const formatTimestamp = (timestamp: string | number): string => {
  try {
    // Convert string to number if needed
    const numericTimestamp = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;
    // Convert seconds to milliseconds if needed (Unix timestamps are in seconds)
    const timestampInMs = numericTimestamp > 9999999999 ? numericTimestamp : numericTimestamp * 1000;
    return format(fromUnixTime(timestampInMs / 1000), 'MMM d, yyyy');
  } catch (error) {
    console.error("Error formatting timestamp:", error, "for input:", timestamp);
    return String(timestamp);
  }
};

const SentimentTrendChart = ({ data = [] }: SentimentTrendChartProps) => {
  const hasData = data && data.length > 0;
  
  return (
    <DashboardCard 
      title="Sentiment Trends (Last 6 Months)" 
      className="bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20 border-blue-100"
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
              <defs>
                <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#42b883" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#42b883" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f6c23e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f6c23e" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e64a3b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#e64a3b" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
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
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number, name: string) => {
                  const formattedName = typeof name === 'string' ? name.charAt(0).toUpperCase() + name.slice(1) : name;
                  return [`${value}%`, formattedName];
                }}
                labelFormatter={(label) => `Date: ${formatTimestamp(String(label))}`}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                wrapperStyle={{
                  fontSize: '14px',
                  paddingBottom: '10px'
                }}
              />
              <Line
                type="monotone"
                dataKey="positive"
                stroke="#42b883"
                strokeWidth={2}
                dot={{ stroke: '#42b883', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0, fill: '#42b883' }}
                fillOpacity={1}
                fill="url(#colorPositive)"
              />
              <Line
                type="monotone"
                dataKey="neutral"
                stroke="#f6c23e"
                strokeWidth={2}
                dot={{ stroke: '#f6c23e', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0, fill: '#f6c23e' }}
                fillOpacity={1}
                fill="url(#colorNeutral)"
              />
              <Line
                type="monotone"
                dataKey="negative"
                stroke="#e64a3b"
                strokeWidth={2}
                dot={{ stroke: '#e64a3b', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0, fill: '#e64a3b' }}
                fillOpacity={1}
                fill="url(#colorNegative)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardCard>
  );
};

export default SentimentTrendChart;
