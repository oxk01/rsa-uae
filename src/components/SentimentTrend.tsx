
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, AlertCircle, Download } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

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
  
  // Sample aspect data
  const aspectData = [
    { aspect: 'Quality', positive: 65, neutral: 20, negative: 15 },
    { aspect: 'Price', positive: 40, neutral: 25, negative: 35 },
    { aspect: 'Service', positive: 55, neutral: 30, negative: 15 }
  ];
  
  // Sample reviews data
  const reviewsData = [
    {
      id: 1,
      date: '2025-04-10',
      rating: '4/5',
      sentiment: 'Positive',
      text: 'Great product with excellent features. Very satisfied with my purchase.',
      keywords: ['quality', 'features', 'satisfied']
    },
    {
      id: 2,
      date: '2025-04-08',
      rating: '3/5',
      sentiment: 'Neutral',
      text: 'Product is okay but could use some improvements in certain areas.',
      keywords: ['improvements', 'okay']
    },
    {
      id: 3,
      date: '2025-04-05',
      rating: '2/5',
      sentiment: 'Negative',
      text: 'Disappointed with the quality. Not worth the price paid.',
      keywords: ['disappointed', 'quality', 'price']
    }
  ];
  
  // Helper function to render star ratings
  const renderStarRating = (rating: string) => {
    const ratingValue = parseFloat(rating.split('/')[0]);
    const maxRating = parseFloat(rating.split('/')[1]);
    const filledStars = Math.round(ratingValue);
    const emptyStars = maxRating - filledStars;
    
    return (
      <div className="flex">
        {[...Array(filledStars)].map((_, i) => (
          <span key={`filled-${i}`} className="text-yellow-400">★</span>
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">★</span>
        ))}
      </div>
    );
  };
  
  // Helper function to determine badge color based on sentiment
  const getBadgeColor = (sentiment: string) => {
    switch(sentiment.toLowerCase()) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <Tabs defaultValue="sentiment-trends">
        <TabsList className="mb-4 bg-gray-100 p-1 rounded-md w-full">
          <TabsTrigger value="aspect-analysis" className="flex-1">Aspect Analysis</TabsTrigger>
          <TabsTrigger value="sentiment-trends" className="flex-1">Sentiment Trends</TabsTrigger>
          <TabsTrigger value="recent-reviews" className="flex-1">Recent Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="sentiment-trends">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-1">Sentiment Trends Over Time</h2>
                <p className="text-sm text-gray-500">How sentiment has changed over the selected time period</p>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
            
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

        <TabsContent value="aspect-analysis">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-1">Aspect-Based Analysis</h2>
                <p className="text-sm text-gray-500">Sentiment breakdown by different aspects of the product or service</p>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
            
            <div className="h-64 mt-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={aspectData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="aspect" type="category" />
                  <Tooltip />
                  <Bar dataKey="positive" stackId="a" fill="#10b981" name="Positive" />
                  <Bar dataKey="neutral" stackId="a" fill="#6b7280" name="Neutral" />
                  <Bar dataKey="negative" stackId="a" fill="#ef4444" name="Negative" />
                </BarChart>
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
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recent-reviews">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-1">Recent Reviews</h2>
                <p className="text-sm text-gray-500">Latest customer reviews with sentiment analysis</p>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
            
            <div className="space-y-4 mt-4">
              {reviewsData.map(review => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getBadgeColor(review.sentiment)}`}>
                        {review.sentiment}
                      </span>
                      {renderStarRating(review.rating)}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-4">{review.text}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {review.keywords.map((keyword, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
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
