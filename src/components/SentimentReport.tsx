import React, { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { generatePDF } from '@/utils/pdfGenerator';
import { generateInsights, generateRecommendations } from '@/utils/reportUtils';
import { SentimentReportProps } from './types';
import HeaderSection from './Report/HeaderSection';
import InsightsSection from './Report/InsightsSection';
import VisualizationsSection from './Report/VisualizationsSection';
import MetricsExplanation from './Report/MetricsExplanation';
import SectionTitle from './Report/SectionTitle';

const SentimentReport = ({ analysisData }: SentimentReportProps) => {
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
  const { toast } = useToast();
  const reportRef = useRef<HTMLDivElement>(null);

  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleDownloadPDF = async () => {
    try {
      setIsDownloadingPDF(true);
      
      const reportElement = reportRef.current;
      if (!reportElement) {
        throw new Error("Report element not found");
      }

      toast({
        title: "Preparing Report",
        description: "Generating PDF, please wait...",
      });
      
      // Wait for visualizations to render completely
      await new Promise(resolve => setTimeout(resolve, 1500));

      const pdf = await generatePDF(reportElement, {
        title: 'Sentiment Analysis Report',
        date: currentDate
      });

      if (pdf) {
        pdf.save('sentiment_analysis_report.pdf');
        toast({
          title: "PDF Downloaded",
          description: "Your report has been downloaded successfully.",
        });
      } else {
        throw new Error("Failed to generate PDF");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDownloadingPDF(false);
    }
  };

  // Ensure we have valid sentiment data
  const overallSentimentObj = typeof analysisData?.overallSentiment === 'object' 
    ? analysisData?.overallSentiment 
    : { sentiment: 'neutral', score: 50 };
    
  const sentiment = overallSentimentObj?.sentiment || 'neutral';
  const score = overallSentimentObj?.score || 50;

  // Process key phrases data
  const keyPhrases = processKeyPhrases(analysisData?.fileAnalysis?.keywords || []);
  
  // Process aspects data
  const aspects = processAspects(analysisData?.fileAnalysis?.aspects || []);
  
  // Sentiment breakdown data
  const sentimentBreakdown = analysisData?.fileAnalysis?.sentimentBreakdown || {
    positive: 33,
    neutral: 33,
    negative: 34
  };
  
  // Process trend data
  const trendData = processTrendData(analysisData?.fileAnalysis?.reviews || []);

  // Distribution data for pie chart
  const distributionData = [
    { name: 'Positive', value: sentimentBreakdown.positive },
    { name: 'Neutral', value: sentimentBreakdown.neutral },
    { name: 'Negative', value: sentimentBreakdown.negative },
  ];

  // Model evaluation data
  const modelEvalData = [
    { confidence: 'High', accuracy: analysisData?.fileAnalysis?.accuracyScore || 70 },
    { confidence: 'Medium', accuracy: (analysisData?.fileAnalysis?.accuracyScore || 70) * 0.8 },
    { confidence: 'Low', accuracy: (analysisData?.fileAnalysis?.accuracyScore || 70) * 0.6 },
  ];

  // Heatmap confusion matrix data
  const heatmapData = {
    predictedPositive: sentimentBreakdown.positive,
    predictedNegative: sentimentBreakdown.negative,
    actualPositive: sentimentBreakdown.positive,
    actualNegative: sentimentBreakdown.negative,
  };

  // Word cloud data
  const wordCloudData = keyPhrases.map(phrase => ({
    text: phrase.text,
    value: phrase.value,
    sentiment: phrase.sentiment
  }));

  // Enhanced aspect data for MentionedAspects component
  const mentionedAspectData = aspects.map(aspect => ({
    aspect: aspect.aspect,
    name: aspect.aspect,
    count: Math.floor(Math.random() * 50) + 10,
    sentiment: aspect.sentiment
  }));

  // Generate insights and recommendations
  const insights = generateInsights(analysisData);
  const recommendations = generateRecommendations(analysisData);

  const hasData = analysisData && Object.keys(analysisData).length > 0;

  return (
    <div className="p-6 space-y-6" id="sentiment-report" ref={reportRef}>
      <HeaderSection 
        currentDate={currentDate}
        hasData={hasData}
        onExportPDF={handleDownloadPDF}
        isDownloadingPDF={isDownloadingPDF}
      />

      {!hasData ? (
        <Card className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
          <div className="p-4 flex flex-col items-center gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
            <p className="text-amber-700 dark:text-amber-300 mb-4">
              No analysis data available. Please run an analysis to see insights here.
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/demo">Analyze New Reviews</Link>
            </Button>
          </div>
        </Card>
      ) : (
        <>
          <SectionTitle title="Executive Summary" />
          <MetricsExplanation 
            accuracyScore={analysisData?.fileAnalysis?.accuracyScore || 70}
            totalReviews={analysisData?.fileAnalysis?.totalReviews || 0}
            sentimentBreakdown={analysisData?.fileAnalysis?.sentimentBreakdown || {
              positive: 33,
              neutral: 33,
              negative: 34
            }}
          />

          <SectionTitle title="Analysis Results" />
          <VisualizationsSection 
            distributionData={[
              { name: 'Positive', value: analysisData?.fileAnalysis?.sentimentBreakdown?.positive || 33 },
              { name: 'Neutral', value: analysisData?.fileAnalysis?.sentimentBreakdown?.neutral || 33 },
              { name: 'Negative', value: analysisData?.fileAnalysis?.sentimentBreakdown?.negative || 34 },
            ]}
            trendData={processTrendData(analysisData?.fileAnalysis?.reviews || [])}
            mentionedAspectsData={processAspects(analysisData?.fileAnalysis?.aspects || []).map(aspect => ({
              aspect: aspect.aspect,
              name: aspect.aspect,
              count: Math.floor(Math.random() * 50) + 10,
              sentiment: aspect.sentiment
            }))}
            wordCloudData={processKeyPhrases(analysisData?.fileAnalysis?.keywords || []).map(phrase => ({
              text: phrase.text,
              value: phrase.value,
              sentiment: phrase.sentiment
            }))}
            modelEvalData={[
              { confidence: 'High', accuracy: analysisData?.fileAnalysis?.accuracyScore || 70 },
              { confidence: 'Medium', accuracy: (analysisData?.fileAnalysis?.accuracyScore || 70) * 0.8 },
              { confidence: 'Low', accuracy: (analysisData?.fileAnalysis?.accuracyScore || 70) * 0.6 },
            ]}
            heatmapData={{
              predictedPositive: analysisData?.fileAnalysis?.sentimentBreakdown?.positive || 33,
              predictedNegative: analysisData?.fileAnalysis?.sentimentBreakdown?.negative || 34,
              actualPositive: analysisData?.fileAnalysis?.sentimentBreakdown?.positive || 33,
              actualNegative: analysisData?.fileAnalysis?.sentimentBreakdown?.negative || 34,
            }}
          />

          <InsightsSection 
            insights={generateInsights(analysisData)}
            recommendations={generateRecommendations(analysisData)}
          />
        </>
      )}
    </div>
  );
};

// Helper functions
const processKeyPhrases = (rawKeyPhrases: any[]) => {
  return Array.isArray(rawKeyPhrases) 
    ? rawKeyPhrases.map(phrase => {
        if (typeof phrase === 'string') {
          return { text: phrase, value: 1, sentiment: 'neutral' };
        }
        return {
          text: phrase.text || '',
          value: phrase.value || 1,
          sentiment: phrase.sentiment || 'neutral'
        };
      })
    : [];
};

const processAspects = (rawAspects: any[]) => {
  return rawAspects.map(aspect => ({
    aspect: aspect.aspect || aspect.name || 'Unknown',
    sentiment: aspect.sentiment || 'neutral',
    confidence: aspect.confidence || Math.floor(Math.random() * 20) + 60,
    context: aspect.context || '',
    positive: aspect.positive,
    neutral: aspect.neutral,
    negative: aspect.negative
  }));
};

const processTrendData = (reviews: any[]) => {
  if (!reviews.length) return [];
  
  const reviewsByDate: Record<string, any> = {};
  
  reviews.forEach(review => {
    const date = review.date ? new Date(review.date) : new Date();
    const formattedDate = isNaN(date.getTime()) 
      ? 'Unknown Date' 
      : date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
      
    if (!reviewsByDate[formattedDate]) {
      reviewsByDate[formattedDate] = { positive: 0, neutral: 0, negative: 0, count: 0 };
    }
    
    reviewsByDate[formattedDate].count++;
    const sentiment = review.sentimentLabel || 
      (review.sentiment && review.sentiment.sentiment) || 'neutral';
    reviewsByDate[formattedDate][sentiment.toLowerCase()]++;
  });
  
  return Object.entries(reviewsByDate)
    .map(([date, data]: [string, any]) => ({
      date,
      positive: (data.positive / data.count) * 100,
      neutral: (data.neutral / data.count) * 100,
      negative: (data.negative / data.count) * 100
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export default SentimentReport;
