import React, { useRef } from 'react';
import { generateInsights, generateRecommendations } from '@/utils/reportUtils';
import { SentimentReportProps } from './types';
import { usePDFDownload } from '@/hooks/usePDFDownload';
import HeaderSection from './Report/HeaderSection';
import InsightsSection from './Report/InsightsSection';
import VisualizationsSection from './Report/VisualizationsSection';
import MetricsExplanation from './Report/MetricsExplanation';
import SectionTitle from './Report/SectionTitle';
import ReportNotFoundCard from './Report/ReportNotFoundCard';
import { processKeyPhrases, processAspects, processTrendData } from './Report/helpers/dataProcessing';

const SentimentReport = ({ analysisData }: SentimentReportProps) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const { isDownloading, downloadPDF } = usePDFDownload();

  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleDownloadPDF = async () => {
    if (reportRef.current) {
      await downloadPDF(reportRef.current, {
        title: 'Sentiment Analysis Report',
        date: currentDate
      });
    }
  };

  const hasData = analysisData && Object.keys(analysisData).length > 0;

  if (!hasData) {
    return <ReportNotFoundCard />;
  }

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
        isDownloadingPDF={isDownloading}
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
