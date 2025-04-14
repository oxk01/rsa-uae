
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import StatsGrid from '@/components/StatsGrid';
import SentimentOverview from '@/components/SentimentOverview';
import TopKeywords from '@/components/TopKeywords';
import SentimentTrend from '@/components/SentimentTrend';
import ReviewSample from '@/components/ReviewSample';
import GenerateReportButton from '@/components/GenerateReportButton';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const [savedAnalyses, setSavedAnalyses] = useState<any[]>([]);
  const [hasData, setHasData] = useState(false);
  const { t } = useLanguage();
  
  // Load saved analyses from localStorage on component mount
  useEffect(() => {
    const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses');
    if (savedAnalysesStr) {
      const analyses = JSON.parse(savedAnalysesStr);
      setSavedAnalyses(analyses);
      setHasData(analyses.length > 0);
    }
  }, []);
  
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
            <CardContent className="p-4 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
              <p className="text-amber-700 dark:text-amber-300">
                No analysis data available yet. Please run some analyses in the demo section to see your actual data here.
              </p>
            </CardContent>
          </Card>
        )}
        
        <StatsGrid 
          // We'd use real data here based on user's analyses
          totalReviews={hasData ? savedAnalyses.length.toString() : "0"}
          averageRating={hasData ? "4.2/5" : "N/A"}
          responseTime={hasData ? "2.4 hrs" : "N/A"}
          sentimentScore={hasData ? "72/100" : "N/A"}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <SentimentOverview />
          <TopKeywords />
        </div>
        
        <div className="mt-8">
          <SentimentTrend />
        </div>
        
        <div className="mt-8">
          <ReviewSample />
        </div>
      </main>
    </div>
  );
};

export default Index;
