
import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ChartBar, Info } from 'lucide-react';

interface DetailedVisualizationsProps {
  aspects: Array<{
    aspect: string;
    sentiment: string;
    confidence: number;
    positive?: number;
    neutral?: number;
    negative?: number;
  }>;
  trendData: Array<{
    date: string;
    positive: number;
    neutral: number;
    negative: number;
  }>;
}

const DetailedVisualizations: React.FC<DetailedVisualizationsProps> = ({ aspects, trendData }) => {
  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <ChartBar className="h-4 w-4" />
          Detailed Aspect Analysis
        </h3>
        <div className="h-[300px] mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={aspects}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="aspect" type="category" />
              <Tooltip />
              <Bar dataKey="positive" stackId="a" fill="#4ade80" name="Positive" />
              <Bar dataKey="neutral" stackId="a" fill="#fbbf24" name="Neutral" />
              <Bar dataKey="negative" stackId="a" fill="#f87171" name="Negative" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-1">
            <Info className="h-4 w-4" />
            Bar length represents the percentage distribution of sentiments for each aspect
          </p>
          <p>Confidence scores are indicated next to each aspect name</p>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <ChartBar className="h-4 w-4" />
          Sentiment Trends Over Time
        </h3>
        <div className="h-[300px] mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="positive" stroke="#4ade80" name="Positive" />
              <Line type="monotone" dataKey="neutral" stroke="#fbbf24" name="Neutral" />
              <Line type="monotone" dataKey="negative" stroke="#f87171" name="Negative" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-1">
            <Info className="h-4 w-4" />
            Lines show sentiment progression over time
          </p>
          <p>Intersecting lines indicate sentiment shifts in customer feedback</p>
        </div>
      </Card>
    </div>
  );
};

export default DetailedVisualizations;
