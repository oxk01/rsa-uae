
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ThumbsUp, Minus, ThumbsDown } from 'lucide-react';
import DashboardCard from './DashboardCard';

const data = [
  { name: 'Positive', value: 65 },
  { name: 'Neutral', value: 20 },
  { name: 'Negative', value: 15 },
];

const COLORS = ['#2c7a7b', '#4a5568', '#e53e3e'];

const SentimentOverview = () => {
  return (
    <DashboardCard 
      title="Sentiment Overview" 
      className="col-span-1 md:col-span-2"
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-64">
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
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
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
              <p className="text-2xl font-semibold">65%</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-sentiment-neutral bg-opacity-20 rounded">
              <Minus className="h-6 w-6 text-sentiment-neutral" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Neutral</p>
              <p className="text-2xl font-semibold">20%</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-sentiment-negative bg-opacity-20 rounded">
              <ThumbsDown className="h-6 w-6 text-sentiment-negative" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Negative</p>
              <p className="text-2xl font-semibold">15%</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default SentimentOverview;
