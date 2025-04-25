
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileBarChart2, 
  ThumbsUp, 
  ThumbsDown,
  BarChart2 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatCard from '@/components/StatCard';
import SentimentOverview from '@/components/SentimentOverview';
import SentimentTrendChart from '@/components/SentimentTrendChart';
import SentimentBySource from '@/components/SentimentBySource';
import MostMentionedAspects from '@/components/MostMentionedAspects';
import WordCloudCard from '@/components/WordCloudCard';
import RecentReviewsList from '@/components/RecentReviewsList';
import { Button } from '@/components/ui/button';

// Sample data for the dashboard
const sampleData = {
  totalReviews: 1248,
  positivePercentage: 60,
  negativePercentage: 15,
  averageRating: 4.2,
  sentimentOverview: [
    { name: 'Positive', value: 60 },
    { name: 'Neutral', value: 25 },
    { name: 'Negative', value: 15 }
  ],
  trendData: [
    { date: 'Jan', positive: 62, neutral: 25, negative: 13 },
    { date: 'Feb', positive: 58, neutral: 28, negative: 14 },
    { date: 'Mar', positive: 65, neutral: 23, negative: 12 },
    { date: 'Apr', positive: 59, neutral: 24, negative: 17 },
    { date: 'May', positive: 63, neutral: 22, negative: 15 },
    { date: 'Jun', positive: 60, neutral: 25, negative: 15 }
  ],
  sourceData: [
    { source: 'Website', positive: 35, neutral: 15, negative: 5 },
    { source: 'Mobile App', positive: 25, neutral: 10, negative: 10 },
    { source: 'Social Media', positive: 12, neutral: 8, negative: 5 },
    { source: 'Email', positive: 8, neutral: 5, negative: 2 }
  ],
  aspectsData: [
    { aspect: 'Quality', count: 120 },
    { aspect: 'Price', count: 95 },
    { aspect: 'Shipping', count: 80 },
    { aspect: 'Customer Service', count: 65 },
    { aspect: 'Features', count: 55 }
  ],
  wordCloudData: [
    { text: 'great', value: 25, sentiment: 'positive' },
    { text: 'quality', value: 18, sentiment: 'positive' },
    { text: 'excellent', value: 16, sentiment: 'positive' },
    { text: 'service', value: 15, sentiment: 'neutral' },
    { text: 'slow', value: 12, sentiment: 'negative' },
    { text: 'expensive', value: 10, sentiment: 'negative' },
    { text: 'recommend', value: 9, sentiment: 'positive' },
    { text: 'shipping', value: 9, sentiment: 'neutral' },
    { text: 'helpful', value: 8, sentiment: 'positive' },
    { text: 'easy', value: 8, sentiment: 'positive' },
    { text: 'fast', value: 7, sentiment: 'positive' },
    { text: 'difficult', value: 7, sentiment: 'negative' },
    { text: 'price', value: 7, sentiment: 'neutral' },
    { text: 'value', value: 6, sentiment: 'positive' },
    { text: 'reliable', value: 6, sentiment: 'positive' }
  ],
  recentReviews: [
    {
      id: '1',
      author: 'John D.',
      text: 'The product worked exactly as described! Very elegant and quite satisfactory. Fast shipping and great customer service too!',
      sentiment: 'positive',
      date: '2023-06-10'
    },
    {
      id: '2',
      author: 'Sarah M.',
      text: 'Disappointed with the delivery time. The product was good but delivery took more than promised.',
      sentiment: 'negative',
      date: '2023-06-08'
    },
    {
      id: '3',
      author: 'Mike C.',
      text: 'Product is fine but pricing seems high when I found a similar product for less.',
      sentiment: 'neutral',
      date: '2023-06-07'
    }
  ]
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-xl font-bold mb-1">Dashboard</h1>
          <p className="text-sm text-gray-500">Real-time sentiment analysis insights</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm">
            Last 7 Days ▾
          </Button>
          <Button variant="outline" size="sm">
            All Reviews ▾
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Reviews" 
          value={sampleData.totalReviews} 
        />
        <StatCard 
          title="Positive Sentiment" 
          value={`${sampleData.positivePercentage}%`}
          valueColor="text-green-600"
          icon={<ThumbsUp size={18} />}
        />
        <StatCard 
          title="Negative Sentiment" 
          value={`${sampleData.negativePercentage}%`}
          valueColor="text-red-600"
          icon={<ThumbsDown size={18} />}
        />
        <StatCard 
          title="Average Rating" 
          value={sampleData.averageRating}
          valueColor="text-blue-600"
          icon={<BarChart2 size={18} />}
        />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="aspect">Aspect Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SentimentOverview data={sampleData.sentimentOverview} />
            <SentimentTrendChart data={sampleData.trendData} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SentimentBySource data={sampleData.sourceData} />
            <MostMentionedAspects data={sampleData.aspectsData} />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <WordCloudCard data={sampleData.wordCloudData} />
            <RecentReviewsList reviews={sampleData.recentReviews} />
          </div>
        </TabsContent>
        
        <TabsContent value="aspect" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Aspect-Based Sentiment Analysis</h3>
              <div className="h-64 flex items-center justify-center text-gray-500">
                <p>Aspect-based analysis content will appear here</p>
              </div>
            </Card>
            <MostMentionedAspects data={sampleData.aspectsData} />
          </div>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Sentiment Trends Over Time</h3>
              <div className="h-72">
                <SentimentTrendChart data={sampleData.trendData} />
              </div>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Aspect Trends</h3>
              <div className="h-64 flex items-center justify-center text-gray-400">
                <p>Aspect sentiment trends visualization will appear here</p>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Source Trends</h3>
              <div className="h-64 flex items-center justify-center text-gray-400">
                <p>Source review trends visualization will appear here</p>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Generate Custom Report</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Report Options</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="sentiment" className="mr-2" defaultChecked />
                    <label htmlFor="sentiment" className="text-sm">Sentiment Overview</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="aspect" className="mr-2" defaultChecked />
                    <label htmlFor="aspect" className="text-sm">Aspect-Based Analysis</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="trend" className="mr-2" />
                    <label htmlFor="trend" className="text-sm">Trend Analysis</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="recommendations" className="mr-2" />
                    <label htmlFor="recommendations" className="text-sm">Key Insights & Recommendations</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="data" className="mr-2" />
                    <label htmlFor="data" className="text-sm">Include Raw Data</label>
                  </div>
                </div>
                <div className="mt-6">
                  <Button className="bg-blue-600 hover:bg-blue-700">Generate Report</Button>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">Report Format</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="radio" id="pdf" name="format" className="mr-2" defaultChecked />
                    <label htmlFor="pdf" className="text-sm">PDF Report</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="excel" name="format" className="mr-2" />
                    <label htmlFor="excel" className="text-sm">Excel Report</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="csv" name="format" className="mr-2" />
                    <label htmlFor="csv" className="text-sm">CSV Data Export</label>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Saved Reports</h3>
            <div className="space-y-4">
              <div className="border p-4 rounded-md flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Monthly Sentiment Overview</h4>
                  <p className="text-xs text-gray-500">Generated on June 10, 2023</p>
                </div>
                <Button variant="outline" size="sm">Download</Button>
              </div>
              <div className="border p-4 rounded-md flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Quarterly Performance Report</h4>
                  <p className="text-xs text-gray-500">Generated on May 15, 2023</p>
                </div>
                <Button variant="outline" size="sm">Download</Button>
              </div>
              <div className="border p-4 rounded-md flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Competitor Analysis</h4>
                  <p className="text-xs text-gray-500">Generated on April 28, 2023</p>
                </div>
                <Button variant="outline" size="sm">Download</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
