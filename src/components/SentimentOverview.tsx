
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { AlertCircle } from 'lucide-react';
import DashboardCard from './DashboardCard';

const COLORS = ['#2c7a7b', '#4a5568', '#e53e3e'];

interface SentimentOverviewProps {
  data?: Array<{
    name: string;
    value: number;
  }>;
}

const SentimentOverview = ({ data }: SentimentOverviewProps) => {
  const hasData = data && data.length > 0;
  
  return (
    <DashboardCard 
      title="Sentiment Overview" 
      className="col-span-1 md:col-span-2"
    >
      {!hasData ? (
        <div className="bg-amber-50 border border-amber-200 rounded p-2 mb-3 flex items-center gap-2 text-sm text-amber-700">
          <AlertCircle className="h-4 w-4" />
          <span>Upload a file or enter text to see sentiment analysis.</span>
        </div>
      ) : (
        <>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center gap-4 mt-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-sentiment-positive mr-1"></div>
              <span className="text-xs">Positive</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-sentiment-neutral mr-1"></div>
              <span className="text-xs">Neutral</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-sentiment-negative mr-1"></div>
              <span className="text-xs">Negative</span>
            </div>
          </div>
        </>
      )}
    </DashboardCard>
  );
};

export default SentimentOverview;
