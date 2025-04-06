
import React from 'react';
import Header from '@/components/Header';
import StatsGrid from '@/components/StatsGrid';
import SentimentOverview from '@/components/SentimentOverview';
import TopKeywords from '@/components/TopKeywords';
import SentimentTrend from '@/components/SentimentTrend';
import ReviewSample from '@/components/ReviewSample';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Sentiment Analysis Dashboard</h1>
          <p className="text-gray-500 mt-1">Analyze customer reviews with AI-powered contextual sentiment analysis</p>
        </div>
        
        <StatsGrid />
        
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
