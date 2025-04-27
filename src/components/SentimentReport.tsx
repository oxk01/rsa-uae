
import React from 'react';
import SentimentScore from './Report/SentimentScore';
import KeyPhrases from './Report/KeyPhrases';
import AspectsAnalysis from './Report/AspectsAnalysis';
import { ChartBar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { generateInsights, generateRecommendations } from '@/utils/reportUtils';
import { SentimentReportProps } from './types';

const SentimentReport = ({ analysisData }: SentimentReportProps) => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Extract sentiment data with proper type checking
  const overallSentimentObj = typeof analysisData?.overallSentiment === 'object' 
    ? analysisData?.overallSentiment 
    : { sentiment: 'neutral', score: 50 };
    
  const sentiment = overallSentimentObj?.sentiment || 'neutral';
  const score = overallSentimentObj?.score || 50;
  const keyPhrases = analysisData?.fileAnalysis?.keywords || [];
  const aspects = analysisData?.fileAnalysis?.aspects || [];
  const sentimentBreakdown = analysisData?.fileAnalysis?.sentimentBreakdown || {
    positive: 33,
    neutral: 33,
    negative: 34
  };

  // Generate insights and recommendations
  const insights = generateInsights(analysisData);
  const recommendations = generateRecommendations(analysisData);

  // Convert AspectData[] to AspectProps[] by ensuring required properties
  const formattedAspects = aspects.map(aspect => ({
    aspect: aspect.aspect || aspect.name || 'Unknown',
    sentiment: aspect.sentiment || 'neutral',
    confidence: aspect.confidence,
    // Add safe access for context property which might not exist in AspectData
    context: aspect.context || undefined
  }));

  return (
    <div className="p-6 space-y-6" id="sentiment-report">
      <div className="text-center mb-8" id="report-header">
        <h1 className="text-2xl font-bold mb-2">Sentiment Analysis Report</h1>
        <p className="text-gray-500">Generated on {currentDate}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <SentimentScore 
          sentiment={sentiment}
          score={score}
          breakdown={sentimentBreakdown}
        />
        <KeyPhrases phrases={keyPhrases} sentiment={sentiment} />
      </div>

      <AspectsAnalysis aspects={formattedAspects} />

      <Card className="p-4 mb-6">
        <h3 className="font-semibold mb-2 flex items-center">
          <ChartBar className="h-4 w-4 mr-2" />
          Key Insights & Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Insights:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              {insights.map((insight, idx) => (
                <li key={idx}>{insight}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              {recommendations.map((recommendation, idx) => (
                <li key={idx}>{recommendation}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SentimentReport;
