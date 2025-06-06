import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileBarChart2, ThumbsUp, ThumbsDown, BarChart2, Trash2 } from 'lucide-react';
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
import HeatmapMatrix from '@/components/HeatmapMatrix';
import GenerateReportButton from '@/components/GenerateReportButton';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hasData, setHasData] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [savedAnalyses, setSavedAnalyses] = useState<any[]>([]);
  
  useEffect(() => {
    loadAnalysisData();
  }, []);
  
  const loadAnalysisData = () => {
    try {
      let data = null;
      
      // First try to get current analysis
      const storedData = localStorage.getItem('rsa_current_analysis');
      if (storedData) {
        try {
          data = JSON.parse(storedData);
          console.log("Loaded current analysis with data points:", 
            data?.fileAnalysis?.reviews?.length || 0);
        } catch (e) {
          console.error("Error parsing current analysis:", e);
        }
      }
      
      // If no current analysis, try to get from saved analyses
      if (!data) {
        const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses');
        if (savedAnalysesStr) {
          try {
            const analyses = JSON.parse(savedAnalysesStr);
            setSavedAnalyses(analyses);
            
            if (analyses.length > 0) {
              console.log("Using saved analysis with data points:", 
                analyses[0]?.reviews?.length || 0);
              
              // Create a valid analysis data structure from the saved analysis
              data = {
                overallSentiment: analyses[0].overallSentiment,
                fileAnalysis: {
                  totalReviews: analyses[0].totalReviews || 0,
                  sentimentBreakdown: analyses[0].sentimentBreakdown || { positive: 33, neutral: 33, negative: 34 },
                  accuracyScore: analyses[0].accuracyScore || 80,
                  reviews: analyses[0].reviews || [],
                  aspects: analyses[0].aspects || [],
                  keywords: analyses[0].keywords || []
                }
              };
            }
          } catch (e) {
            console.error("Error parsing saved analyses:", e);
          }
        }
      } else {
        // We have current analysis data, let's also load saved analyses
        const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses');
        if (savedAnalysesStr) {
          try {
            const analyses = JSON.parse(savedAnalysesStr);
            setSavedAnalyses(analyses);
          } catch (e) {
            console.error("Error parsing saved analyses:", e);
          }
        }
      }
      
      if (data) {
        console.log("Analysis data loaded successfully with", 
          data.fileAnalysis?.reviews?.length, "reviews,",
          data.fileAnalysis?.aspects?.length, "aspects, and",
          data.fileAnalysis?.keywords?.length);
        setAnalysisData(data);
        setHasData(true);
      } else {
        setHasData(false);
      }
    } catch (e) {
      console.error("Error loading analysis data:", e);
      setHasData(false);
      toast({
        title: "Error loading data",
        description: "There was a problem loading your analysis data.",
        variant: "destructive"
      });
    }
  };

  const handleDemoClick = () => {
    navigate('/demo');
  };
  
  const handleDeleteAllAnalyses = () => {
    try {
      localStorage.removeItem('rsa_saved_analyses');
      localStorage.removeItem('rsa_current_analysis');
      setSavedAnalyses([]);
      setAnalysisData(null);
      setHasData(false);
      toast({
        title: "Storage cleared",
        description: "All analyses have been deleted from storage.",
      });
    } catch (e) {
      console.error("Error deleting analyses:", e);
      toast({
        title: "Delete failed",
        description: "There was an error deleting the analyses.",
        variant: "destructive"
      });
    }
  };

  const getSentimentData = () => {
    if (!hasData || !analysisData?.fileAnalysis?.sentimentBreakdown) {
      return [
        { name: 'Positive', value: 33 },
        { name: 'Neutral', value: 34 },
        { name: 'Negative', value: 33 }
      ];
    }
    
    const positiveValue = typeof analysisData.fileAnalysis.sentimentBreakdown.positive === 'number' 
      ? analysisData.fileAnalysis.sentimentBreakdown.positive 
      : 33;
    
    const neutralValue = typeof analysisData.fileAnalysis.sentimentBreakdown.neutral === 'number' 
      ? analysisData.fileAnalysis.sentimentBreakdown.neutral 
      : 34;
    
    const negativeValue = typeof analysisData.fileAnalysis.sentimentBreakdown.negative === 'number' 
      ? analysisData.fileAnalysis.sentimentBreakdown.negative 
      : 33;
    
    console.log("Sentiment distribution:", positiveValue, neutralValue, negativeValue);
    
    return [
      { name: 'Positive', value: positiveValue },
      { name: 'Neutral', value: neutralValue },
      { name: 'Negative', value: negativeValue }
    ];
  };

  const getTrendData = () => {
    if (!hasData || !analysisData?.fileAnalysis?.reviews || !analysisData.fileAnalysis.reviews.length) {
      return [];
    }
    
    // Group reviews by date to show sentiment trend over time
    const reviewsByDate: Record<string, { positive: number, neutral: number, negative: number, count: number }> = {};
    
    analysisData.fileAnalysis.reviews.forEach((review: any) => {
      const date = review.date || new Date().toISOString().split('T')[0];
      
      if (!reviewsByDate[date]) {
        reviewsByDate[date] = { positive: 0, neutral: 0, negative: 0, count: 0 };
      }
      
      reviewsByDate[date].count++;
      
      if (review.sentimentLabel === 'positive') {
        reviewsByDate[date].positive++;
      } else if (review.sentimentLabel === 'negative') {
        reviewsByDate[date].negative++;
      } else {
        reviewsByDate[date].neutral++;
      }
    });
    
    // Convert to percentages and format for chart
    return Object.entries(reviewsByDate)
      .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
      .slice(-10) // Last 10 dates
      .map(([date, data]) => {
        const total = data.count;
        return {
          date,
          positive: Math.round((data.positive / total) * 100),
          neutral: Math.round((data.neutral / total) * 100),
          negative: Math.round((data.negative / total) * 100)
        };
      });
  };

  const getMatrixData = () => {
    if (!hasData || !analysisData?.fileAnalysis) {
      return {
        predictedPositive: 85,
        predictedNegative: 15,
        actualPositive: 82,
        actualNegative: 18
      };
    }

    // Calculate matrix data from analysis
    return {
      predictedPositive: Math.round(analysisData.fileAnalysis.sentimentBreakdown?.positive || 85),
      predictedNegative: Math.round(analysisData.fileAnalysis.sentimentBreakdown?.negative || 15),
      actualPositive: Math.round(analysisData.fileAnalysis.accuracyScore || 82),
      actualNegative: 100 - Math.round(analysisData.fileAnalysis.accuracyScore || 82)
    };
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-xl font-bold mb-1">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Real-time sentiment analysis insights
            {hasData && analysisData?.fileAnalysis?.totalReviews && (
              <span> - Analyzing {analysisData.fileAnalysis.totalReviews} reviews</span>
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          {hasData && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDeleteAllAnalyses}
              className="flex items-center gap-1 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Clear Storage
            </Button>
          )}
          <GenerateReportButton analysisData={analysisData} hasData={hasData} />
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
              icon={<FileBarChart2 className="h-5 w-5" />}
            />
            <StatCard 
              title="Positive Sentiment" 
              value={`${analysisData?.fileAnalysis?.sentimentBreakdown?.positive || 0}%`}
              valueColor="text-green-600"
              icon={<ThumbsUp className="h-5 w-5" />}
            />
            <StatCard 
              title="Negative Sentiment" 
              value={`${analysisData?.fileAnalysis?.sentimentBreakdown?.negative || 0}%`}
              valueColor="text-red-600"
              icon={<ThumbsDown className="h-5 w-5" />}
            />
            <StatCard 
              title="Average Accuracy" 
              value={`${analysisData?.fileAnalysis?.accuracyScore || 80}%`}
              valueColor="text-blue-600"
              icon={<BarChart2 className="h-5 w-5" />}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <SentimentOverview data={getSentimentData()} />
            <SentimentTrendChart data={getTrendData()} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <MostMentionedAspects data={analysisData?.fileAnalysis?.aspects || []} />
            <HeatmapMatrix data={getMatrixData()} />
          </div>

          <div className="grid grid-cols-1 gap-6 mb-6">
            <WordCloudCard data={analysisData?.fileAnalysis?.keywords || []} />
            <RecentReviewsList reviews={(analysisData?.fileAnalysis?.reviews || []).slice(0, 10)} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
