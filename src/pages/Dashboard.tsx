
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileBarChart2, ThumbsUp, ThumbsDown, BarChart2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import StatCard from '@/components/StatCard';
import SentimentOverview from '@/components/SentimentOverview';
import MostMentionedAspects from '@/components/MostMentionedAspects';
import WordCloudCard from '@/components/WordCloudCard';
import SentimentTrendChart from '@/components/SentimentTrendChart';
import SentimentBySource from '@/components/SentimentBySource';
import RecentReviewsList from '@/components/RecentReviewsList';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hasData, setHasData] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  
  useEffect(() => {
    const storedData = localStorage.getItem('rsa_current_analysis');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setAnalysisData(data);
        setHasData(true);
      } catch (e) {
        console.error("Error parsing stored data:", e);
        setHasData(false);
      }
    }
  }, []);

  const handleDemoClick = () => {
    navigate('/demo');
  };

  // Prepare data for components
  const sentimentOverview = hasData ? [
    { name: 'Positive', value: analysisData.fileAnalysis.sentimentBreakdown.positive },
    { name: 'Neutral', value: analysisData.fileAnalysis.sentimentBreakdown.neutral },
    { name: 'Negative', value: analysisData.fileAnalysis.sentimentBreakdown.negative }
  ] : [];

  return (
    <div className="container mx-auto px-4 py-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-xl font-bold mb-1">Dashboard</h1>
          <p className="text-sm text-gray-500">Real-time sentiment analysis insights</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleDemoClick}>
          Upload New Data
        </Button>
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
              value={analysisData.fileAnalysis.totalReviews}
              icon={<FileBarChart2 className="h-5 w-5" />}
            />
            <StatCard 
              title="Positive Sentiment" 
              value={`${analysisData.fileAnalysis.sentimentBreakdown.positive}%`}
              valueColor="text-green-600"
              icon={<ThumbsUp className="h-5 w-5" />}
            />
            <StatCard 
              title="Negative Sentiment" 
              value={`${analysisData.fileAnalysis.sentimentBreakdown.negative}%`}
              valueColor="text-red-600"
              icon={<ThumbsDown className="h-5 w-5" />}
            />
            <StatCard 
              title="Average Accuracy" 
              value={`${analysisData.fileAnalysis.accuracyScore}%`}
              valueColor="text-blue-600"
              icon={<BarChart2 className="h-5 w-5" />}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <SentimentOverview data={sentimentOverview} />
            <SentimentTrendChart 
              data={analysisData.fileAnalysis.reviews.slice(-10).map((review: any) => ({
                date: review.date,
                positive: review.sentiment.positive,
                neutral: review.sentiment.neutral,
                negative: review.sentiment.negative
              }))} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <MostMentionedAspects data={analysisData.fileAnalysis.aspects} />
            <WordCloudCard data={analysisData.fileAnalysis.keywords} />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <RecentReviewsList reviews={analysisData.fileAnalysis.reviews.slice(0, 10)} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
