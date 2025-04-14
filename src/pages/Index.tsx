
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import StatsGrid from '@/components/StatsGrid';
import SentimentOverview from '@/components/SentimentOverview';
import TopKeywords from '@/components/TopKeywords';
import SentimentTrend from '@/components/SentimentTrend';
import ReviewSample from '@/components/ReviewSample';
import GenerateReportButton from '@/components/GenerateReportButton';

const Index = () => {
  const [savedAnalyses, setSavedAnalyses] = useState<any[]>([]);
  const [hasData, setHasData] = useState(false);
  
  // Load saved analyses from localStorage on component mount
  useEffect(() => {
    const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses');
    if (savedAnalysesStr) {
      const analyses = JSON.parse(savedAnalysesStr);
      setSavedAnalyses(analyses);
      setHasData(analyses.length > 0);
    }
  }, []);
  
  // In a real app, this would process the user's actual data
  // Here we're just checking if any data exists
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Sentiment Analysis Dashboard</h1>
            <p className="text-gray-500 mt-1">Analyze customer reviews with AI-powered contextual sentiment analysis</p>
          </div>
          
          <GenerateReportButton hasData={hasData} />
        </div>
        
        <StatsGrid 
          // We'd use real data here based on user's analyses
          totalReviews={hasData ? savedAnalyses.length.toString() : "0"}
          averageRating={hasData ? "4.2/5" : "N/A"}
          responseTime={hasData ? "2.4 hrs" : "N/A"}
          sentimentScore={hasData ? "72/100" : "N/A"}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <SentimentOverview />
          <TopKeywords />
        </div>
        
        <div className="mt-6">
          <SentimentTrend />
        </div>
        
        <div className="mt-6">
          <ReviewSample />
        </div>
      </main>
    </div>
  );
};

export default Index;
