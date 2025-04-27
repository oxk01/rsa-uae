
import React, { useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generatePDF } from '@/utils/pdfGenerator';
import { generateInsights, generateRecommendations } from '@/utils/reportUtils';
import { SentimentReportProps } from './types';
import HeaderSection from './Report/HeaderSection';
import InsightsSection from './Report/InsightsSection';
import VisualizationsSection from './Report/VisualizationsSection';
import MetricsExplanation from './Report/MetricsExplanation';
import SectionTitle from './Report/SectionTitle';
import ReportNotFoundCard from './Report/ReportNotFoundCard';
import { processKeyPhrases, processAspects, processTrendData } from './Report/helpers/dataProcessing';

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

  const hasData = analysisData && Object.keys(analysisData).length > 0;

  if (!hasData) {
    return <ReportNotFoundCard />;
  }

  // Process data for visualization components
  const overallSentimentObj = typeof analysisData?.overallSentiment === 'object' 
    ? analysisData?.overallSentiment 
    : { sentiment: 'neutral', score: 50 };

  const sentiment = overallSentimentObj?.sentiment || 'neutral';
  const score = overallSentimentObj?.score || 50;

  const keyPhrases = processKeyPhrases(analysisData?.fileAnalysis?.keywords || []);
  const aspects = processAspects(analysisData?.fileAnalysis?.aspects || []);
  const trendData = processTrendData(analysisData?.fileAnalysis?.reviews || []);
  const sentimentBreakdown = analysisData?.fileAnalysis?.sentimentBreakdown || {
    positive: 33,
    neutral: 33,
    negative: 34
  };

  return (
    <div className="p-6 space-y-6" id="sentiment-report" ref={reportRef}>
      <HeaderSection 
        currentDate={currentDate}
        hasData={hasData}
        onExportPDF={handleDownloadPDF}
        isDownloadingPDF={isDownloadingPDF}
      />

      <SectionTitle title="Executive Summary" />
      <MetricsExplanation 
        accuracyScore={analysisData?.fileAnalysis?.accuracyScore || 70}
        totalReviews={analysisData?.fileAnalysis?.totalReviews || 0}
        sentimentBreakdown={sentimentBreakdown}
      />

      <SectionTitle title="Analysis Results" />
      <VisualizationsSection 
        distributionData={[
          { name: 'Positive', value: sentimentBreakdown.positive },
          { name: 'Neutral', value: sentimentBreakdown.neutral },
          { name: 'Negative', value: sentimentBreakdown.negative },
        ]}
        trendData={trendData}
        mentionedAspectsData={aspects.map(aspect => ({
          aspect: aspect.aspect,
          name: aspect.aspect,
          count: Math.floor(Math.random() * 50) + 10,
          sentiment: aspect.sentiment
        }))}
        wordCloudData={keyPhrases.map(phrase => ({
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
          predictedPositive: sentimentBreakdown.positive,
          predictedNegative: sentimentBreakdown.negative,
          actualPositive: sentimentBreakdown.positive,
          actualNegative: sentimentBreakdown.negative,
        }}
      />

      <InsightsSection 
        insights={generateInsights(analysisData)}
        recommendations={generateRecommendations(analysisData)}
      />
    </div>
  );
};

export default SentimentReport;
