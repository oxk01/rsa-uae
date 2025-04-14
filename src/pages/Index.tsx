
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import StatsGrid from '@/components/StatsGrid';
import SentimentOverview from '@/components/SentimentOverview';
import TopKeywords from '@/components/TopKeywords';
import SentimentTrend from '@/components/SentimentTrend';
import RecentReviews from '@/components/RecentReviews';
import ReviewSources from '@/components/ReviewSources';
import GenerateReportButton from '@/components/GenerateReportButton';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Interface for saved analyses
interface Analysis {
  id: number;
  title: string;
  date: string;
  reviewCount: number;
  sentiment: {
    positive: number;
    neutral: number; 
    negative: number;
  };
  keywords: { word: string; sentiment: string; count: number }[];
  sentimentLabel?: string;
  rating?: string;
  reviewText?: string;
  source?: string;
}

const Index = () => {
  const [savedAnalyses, setSavedAnalyses] = useState<Analysis[]>([]);
  const [hasData, setHasData] = useState(false);
  const [sentimentOverviewData, setSentimentOverviewData] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  const { t } = useLanguage();
  
  // Load saved analyses from localStorage on component mount
  useEffect(() => {
    const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses');
    if (savedAnalysesStr) {
      const analyses = JSON.parse(savedAnalysesStr);
      setSavedAnalyses(analyses);
      setHasData(analyses.length > 0);
      
      if (analyses.length > 0) {
        // Process data for charts
        processDataForCharts(analyses);
      }
    }
  }, []);
  
  // Process the saved analyses data for chart components
  const processDataForCharts = (analyses: Analysis[]) => {
    // Calculate overall sentiment for pie chart
    let totalPositive = 0;
    let totalNeutral = 0;
    let totalNegative = 0;
    
    analyses.forEach(analysis => {
      totalPositive += analysis.sentiment.positive;
      totalNeutral += analysis.sentiment.neutral;
      totalNegative += analysis.sentiment.negative;
    });
    
    setSentimentOverviewData([
      { name: 'Positive', value: totalPositive },
      { name: 'Neutral', value: totalNeutral },
      { name: 'Negative', value: totalNegative }
    ]);
    
    // Generate trend data if we have multiple analyses
    if (analyses.length > 1) {
      // Sort analyses by date
      const sortedAnalyses = [...analyses].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      
      // Map to trend data format
      const trend = sortedAnalyses.map(analysis => ({
        date: analysis.date,
        positive: analysis.sentiment.positive,
        neutral: analysis.sentiment.neutral,
        negative: analysis.sentiment.negative
      }));
      
      setTrendData(trend);
    }
  };
  
  // Calculate metrics based on actual data
  const calculateAverageRating = () => {
    if (!hasData) return "N/A";
    
    let totalPositive = 0;
    let totalReviews = 0;
    
    savedAnalyses.forEach(analysis => {
      totalPositive += analysis.sentiment.positive;
      totalReviews += analysis.reviewCount;
    });
    
    if (totalReviews === 0) return "N/A";
    const score = (totalPositive / totalReviews) * 5; // Scale to 5-star rating
    return `${score.toFixed(1)}/5`;
  };
  
  // Calculate sentiment score from 0-100
  const calculateSentimentScore = () => {
    if (!hasData) return "N/A";
    
    let totalPositive = 0;
    let totalNegative = 0;
    let totalReviews = 0;
    
    savedAnalyses.forEach(analysis => {
      totalPositive += analysis.sentiment.positive;
      totalNegative += analysis.sentiment.negative;
      totalReviews += analysis.reviewCount;
    });
    
    if (totalReviews === 0) return "N/A";
    const score = Math.round(((totalPositive - totalNegative) / totalReviews + 1) * 50); // Scale to 0-100
    return `${score}/100`;
  };
  
  // Calculate total review count
  const getTotalReviews = () => {
    if (!hasData) return "0";
    return savedAnalyses.reduce((total, analysis) => total + analysis.reviewCount, 0).toString();
  };
  
  // Enhance savedAnalyses with additional properties for RecentReviews
  const enhancedAnalyses = savedAnalyses.map(analysis => {
    // Derive sentiment label from sentiment percentages
    let sentimentLabel = "Neutral";
    if (analysis.sentiment.positive > Math.max(analysis.sentiment.neutral, analysis.sentiment.negative)) {
      sentimentLabel = "Positive";
    } else if (analysis.sentiment.negative > Math.max(analysis.sentiment.neutral, analysis.sentiment.positive)) {
      sentimentLabel = "Negative";
    }
    
    // Calculate rating based on positive sentiment (1-5 scale)
    const rating = `${Math.max(1, Math.min(5, Math.round(analysis.sentiment.positive * 5 / 100)))}/5`;
    
    // Add placeholder review text if not present
    const reviewText = analysis.reviewText || `This is a sample review for ${analysis.title}.`;
    
    return {
      ...analysis,
      sentimentLabel,
      rating,
      reviewText,
      source: analysis.source || (analysis.title.includes('.') ? 'excel' : 'text')
    };
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Sentiment Analysis Dashboard</h1>
            <p className="text-gray-500 mt-1">Analyze customer reviews with AI-powered contextual sentiment analysis</p>
          </div>
          
          <GenerateReportButton 
            hasData={hasData} 
            variant="default"
            size="default"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          />
        </div>
        
        {!hasData && (
          <Card className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
            <CardContent className="p-4 flex flex-col items-center gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
              <p className="text-amber-700 dark:text-amber-300 mb-4">
                You haven't saved any analyses yet. Please run some analyses in the demo section to see your actual data here.
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link to="/demo">Analyze New Reviews</Link>
              </Button>
            </CardContent>
          </Card>
        )}
        
        <StatsGrid 
          totalReviews={getTotalReviews()}
          averageRating={calculateAverageRating()}
          responseTime={hasData ? "2.4 hrs" : "N/A"}
          sentimentScore={calculateSentimentScore()}
        />
        
        {hasData ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <SentimentOverview data={sentimentOverviewData} />
              <ReviewSources />
              <TopKeywords />
            </div>
            
            <div className="mt-8">
              <SentimentTrend trendData={trendData} />
            </div>

            <div className="mt-8">
              <RecentReviews reviews={enhancedAnalyses} />
            </div>
          </>
        ) : (
          <div className="mt-8 bg-white p-8 rounded-lg shadow-sm text-center">
            <p className="text-gray-500 mb-4">No analysis data available yet.</p>
            <p className="text-gray-500 mb-6">Complete an analysis in the demo section to populate this dashboard with your data.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
