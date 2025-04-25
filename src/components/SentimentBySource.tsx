
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardCard from './DashboardCard';

interface SentimentBySourceProps {
  data?: Array<{
    source: string;
    positive: number;
    neutral: number;
    negative: number;
  }>;
}

const SentimentBySource = ({ data = [] }: SentimentBySourceProps) => {
  const hasData = data && data.length > 0;
  
  return (
    <DashboardCard 
      title="Sentiment by Source"
      className="col-span-1"
    >
      {!hasData ? (
        <div className="h-[260px] flex items-center justify-center text-gray-400">
          No source data available
        </div>
      ) : (
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
              barSize={15}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis 
                dataKey="source" 
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#eee' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#eee' }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '3px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="positive" name="Positive" fill="#42b883" />
              <Bar dataKey="neutral" name="Neutral" fill="#f6c23e" />
              <Bar dataKey="negative" name="Negative" fill="#e64a3b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardCard>
  );
};

export default SentimentBySource;
