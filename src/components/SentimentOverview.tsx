
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ThumbsUp, Minus, ThumbsDown, AlertCircle } from 'lucide-react';
import DashboardCard from './DashboardCard';

// Sample data only used when no real data is available
const sampleData = [
  { name: 'Positive', value: 65 },
  { name: 'Neutral', value: 20 },
  { name: 'Negative', value: 15 },
];

const COLORS = ['#2c7a7b', '#4a5568', '#e53e3e'];

interface SentimentOverviewProps {
  data?: Array<{
    name: string;
    value: number;
  }>;
}

const SentimentOverview = ({ data }: SentimentOverviewProps) => {
  const hasData = data && data.length > 0;
  const chartData = hasData ? data : sampleData;
  
  // Calculate percentages for display
  const positiveValue = chartData.find(d => d.name === 'Positive')?.value || 0;
  const neutralValue = chartData.find(d => d.name === 'Neutral')?.value || 0;
  const negativeValue = chartData.find(d => d.name === 'Negative')?.value || 0;
  const total = positiveValue + neutralValue + negativeValue;
  
  // Calculate percentages safely (avoid division by zero)
  const positivePercent = total > 0 ? Math.round((positiveValue / total) * 100) : 0;
  const neutralPercent = total > 0 ? Math.round((neutralValue / total) * 100) : 0;
  const negativePercent = total > 0 ? Math.round((negativeValue / total) * 100) : 0;
  
  return (
    <DashboardCard 
      title="Sentiment Overview" 
      className="col-span-1 md:col-span-2"
    >
      {!hasData && (
        <div className="bg-amber-50 border border-amber-200 rounded p-2 mb-3 flex items-center gap-2 text-sm text-amber-700">
          <AlertCircle className="h-4 w-4" />
          <span>No data available. Analyze reviews in the Demo section to see your actual data.</span>
        </div>
      )}
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-sentiment-positive bg-opacity-20 rounded">
              <ThumbsUp className="h-6 w-6 text-sentiment-positive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Positive</p>
              <p className="text-2xl font-semibold">{positivePercent}%</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-sentiment-neutral bg-opacity-20 rounded">
              <Minus className="h-6 w-6 text-sentiment-neutral" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Neutral</p>
              <p className="text-2xl font-semibold">{neutralPercent}%</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-sentiment-negative bg-opacity-20 rounded">
              <ThumbsDown className="h-6 w-6 text-sentiment-negative" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Negative</p>
              <p className="text-2xl font-semibold">{negativePercent}%</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default SentimentOverview;
