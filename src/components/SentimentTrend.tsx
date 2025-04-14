
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertCircle } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
  
  // If no data, use sample data for display
  const displayData = hasData ? trendData : [
    { date: 'Jan', positive: 0, neutral: 0, negative: 0 },
    { date: 'Feb', positive: 0, neutral: 0, negative: 0 },
    { date: 'Mar', positive: 0.2, neutral: 0, negative: 0 },
    { date: 'Apr', positive: 1.0, neutral: 1.0, negative: 2.0 },
    { date: 'May', positive: 0, neutral: 0, negative: 0 },
    { date: 'Jun', positive: 0, neutral: 0, negative: 0 },
  ];
  
  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <Tabs defaultValue="sentiment-trends">
        <TabsList className="mb-4 bg-gray-100 p-1 rounded-md">
          <TabsTrigger value="aspect-analysis">Aspect Analysis</TabsTrigger>
          <TabsTrigger value="sentiment-trends">Sentiment Trends</TabsTrigger>
          <TabsTrigger value="recent-reviews">Recent Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="sentiment-trends">
          <div>
            <h2 className="text-xl font-semibold mb-1">Sentiment Trends Over Time</h2>
            <p className="text-sm text-gray-500 mb-4">How sentiment has changed over the selected time period</p>
            
            {!hasData && (
              <div className="bg-amber-50 border border-amber-200 rounded p-2 mb-3 flex items-center gap-2 text-sm text-amber-700">
                <AlertCircle className="h-4 w-4" />
                <span>Using sample data. Analyze reviews to see actual trends.</span>
              </div>
            )}
            
            <div className="h-64 mt-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={displayData}
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
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="positive" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                    dot={{ r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="neutral" 
                    stroke="#6b7280" 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="negative" 
                    stroke="#ef4444" 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#10b981] mr-2"></div>
                <span className="text-xs">Positive</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#6b7280] mr-2"></div>
                <span className="text-xs">Neutral</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#ef4444] mr-2"></div>
                <span className="text-xs">Negative</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#f59e0b] mr-2"></div>
                <span className="text-xs">Mixed</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Custom tooltip that shows values in a more readable format
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded shadow-sm">
        <p className="font-semibold mb-1">{label}</p>
        <div className="text-[#10b981]">Positive: {payload[0].value}</div>
        <div className="text-[#6b7280]">Neutral: {payload[1].value}</div>
        <div className="text-[#ef4444]">Negative: {payload[2].value}</div>
      </div>
    );
  }

  return null;
};

export default SentimentTrend;
