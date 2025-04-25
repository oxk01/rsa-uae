
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
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for storing data from Demo page
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [hasData, setHasData] = useState(false);
  const [sentimentOverview, setSentimentOverview] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [sourceData, setSourceData] = useState<any[]>([]);
  const [aspectsData, setAspectsData] = useState<any[]>([]);
  const [wordCloudData, setWordCloudData] = useState<any[]>([]);
  const [recentReviews, setRecentReviews] = useState<any[]>([]);
  
  useEffect(() => {
    // Try to load data from localStorage
    const storedData = localStorage.getItem('rsa_current_analysis');
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setAnalysisData(parsedData);
        setHasData(true);
        
        // Process data for different chart components
        processData(parsedData);
        
        toast({
          title: "Analysis data loaded",
          description: `Loaded analysis with ${parsedData.fileAnalysis.totalReviews} reviews.`,
        });
      } catch (e) {
        console.error("Error parsing stored data:", e);
        setHasData(false);
      }
    } else {
      setHasData(false);
    }
  }, [toast]);
  
  const processData = (data: any) => {
    if (!data || !data.fileAnalysis) return;
    
    // Process sentiment overview data
    const sentimentData = [
      { name: 'Positive', value: data.fileAnalysis.sentimentBreakdown.positive },
      { name: 'Neutral', value: data.fileAnalysis.sentimentBreakdown.neutral },
      { name: 'Negative', value: data.fileAnalysis.sentimentBreakdown.negative }
    ];
    setSentimentOverview(sentimentData);
    
    // Process trend data
    // Group reviews by date and calculate sentiment counts per date
    const reviewsByDate = data.fileAnalysis.reviews.reduce((acc: any, review: any) => {
      const date = review.date.split('T')[0];
      if (!acc[date]) {
        acc[date] = { date, positive: 0, neutral: 0, negative: 0 };
      }
      
      if (review.sentimentLabel === 'positive') {
        acc[date].positive += 1;
      } else if (review.sentimentLabel === 'negative') {
        acc[date].negative += 1;
      } else {
        acc[date].neutral += 1;
      }
      
      return acc;
    }, {});
    
    // Convert to array and sort by date
    const trendArray = Object.values(reviewsByDate).sort((a: any, b: any) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    
    // Format dates for display
    const formattedTrendData = trendArray.map((item: any) => {
      const dateObj = new Date(item.date);
      const month = dateObj.toLocaleString('default', { month: 'short' });
      return {
        ...item,
        date: month
      };
    });
    
    setTrendData(formattedTrendData);
    
    // Process source data
    const sourceMap: Record<string, {positive: number, neutral: number, negative: number}> = {};
    data.fileAnalysis.reviews.forEach((review: any) => {
      const source = review.source || 'Other';
      if (!sourceMap[source]) {
        sourceMap[source] = { positive: 0, neutral: 0, negative: 0 };
      }
      
      if (review.sentimentLabel === 'positive') {
        sourceMap[source].positive += 1;
      } else if (review.sentimentLabel === 'negative') {
        sourceMap[source].negative += 1;
      } else {
        sourceMap[source].neutral += 1;
      }
    });
    
    const sourceArray = Object.entries(sourceMap).map(([source, counts]) => ({
      source,
      ...counts
    }));
    
    setSourceData(sourceArray);
    
    // Process aspects data
    const aspectMap: Record<string, number> = {};
    data.fileAnalysis.reviews.forEach((review: any) => {
      if (review.aspects && Array.isArray(review.aspects)) {
        review.aspects.forEach((aspect: any) => {
          const aspectName = aspect.name;
          if (!aspectMap[aspectName]) {
            aspectMap[aspectName] = 0;
          }
          aspectMap[aspectName] += 1;
        });
      }
    });
    
    const aspectArray = Object.entries(aspectMap)
      .map(([aspect, count]) => ({ aspect, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    setAspectsData(aspectArray);
    
    // Process word cloud data
    const wordMap: Record<string, {value: number, sentiment: string}> = {};
    data.fileAnalysis.reviews.forEach((review: any) => {
      if (review.keywords && Array.isArray(review.keywords)) {
        review.keywords.forEach((keyword: any) => {
          if (!wordMap[keyword.word]) {
            wordMap[keyword.word] = { value: 0, sentiment: keyword.sentiment };
          }
          wordMap[keyword.word].value += 1;
        });
      }
    });
    
    const wordCloudArray = Object.entries(wordMap)
      .map(([text, details]) => ({ text, ...details }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 50);
    
    setWordCloudData(wordCloudArray);
    
    // Process recent reviews
    const reviews = data.fileAnalysis.reviews.slice(0, 10);
    setRecentReviews(reviews);
  };
  
  const handleDemoClick = () => {
    navigate('/demo');
  };
  
  return (
    <div className="container mx-auto px-4 py-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-xl font-bold mb-1">Dashboard</h1>
          <p className="text-sm text-gray-500">Real-time sentiment analysis insights</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" onClick={handleDemoClick}>
            Upload New Data
          </Button>
        </div>
      </div>
      
      {!hasData ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No analysis data available</h3>
          <p className="text-gray-500 mb-4">Upload and analyze an Excel file in the Demo page to visualize the data here.</p>
          <Button onClick={handleDemoClick}>Go to Demo Page</Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatCard 
              title="Total Reviews" 
              value={analysisData?.fileAnalysis?.totalReviews || 0} 
              icon={<FileBarChart2 size={18} />}
            />
            <StatCard 
              title="Positive Sentiment" 
              value={`${Math.round((analysisData?.fileAnalysis?.sentimentBreakdown?.positive / analysisData?.fileAnalysis?.totalReviews) * 100) || 0}%`}
              valueColor="text-green-600"
              icon={<ThumbsUp size={18} />}
            />
            <StatCard 
              title="Negative Sentiment" 
              value={`${Math.round((analysisData?.fileAnalysis?.sentimentBreakdown?.negative / analysisData?.fileAnalysis?.totalReviews) * 100) || 0}%`}
              valueColor="text-red-600"
              icon={<ThumbsDown size={18} />}
            />
            <StatCard 
              title="Average Accuracy" 
              value={`${analysisData?.fileAnalysis?.accuracyScore || 0}%`}
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
                <SentimentOverview data={sentimentOverview} />
                <SentimentTrendChart data={trendData} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SentimentBySource data={sourceData} />
                <MostMentionedAspects data={aspectsData} />
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <WordCloudCard data={wordCloudData} />
                <RecentReviewsList reviews={recentReviews} />
              </div>
            </TabsContent>
            
            <TabsContent value="aspect" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Aspect-Based Sentiment Analysis</h3>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    {hasData ? (
                      <p>Aspect analysis from your Excel data will appear here</p>
                    ) : (
                      <p>Upload data to see aspect-based analysis</p>
                    )}
                  </div>
                </Card>
                <MostMentionedAspects data={aspectsData} />
              </div>
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Sentiment Trends Over Time</h3>
                  <div className="h-72">
                    <SentimentTrendChart data={trendData} />
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
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default Dashboard;
