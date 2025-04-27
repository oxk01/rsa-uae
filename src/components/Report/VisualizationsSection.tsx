
import React from 'react';
import { Card } from '@/components/ui/card';
import SentimentDistribution from '../DashboardGraphs/SentimentDistribution';
import SentimentTrends from '../DashboardGraphs/SentimentTrends';
import MentionedAspects from '../DashboardGraphs/MentionedAspects';
import FrequentWords from '../DashboardGraphs/FrequentWords';
import ModelEvaluation from '../DashboardGraphs/ModelEvaluation';
import HeatmapMatrix from '../HeatmapMatrix';
import { ChartPie, ChartBar, Info } from 'lucide-react';

interface VisualizationsSectionProps {
  distributionData: any[];
  trendData: any[];
  mentionedAspectsData: any[];
  wordCloudData: any[];
  modelEvalData: any[];
  heatmapData: any;
}

const VisualizationsSection: React.FC<VisualizationsSectionProps> = ({
  distributionData,
  trendData,
  mentionedAspectsData,
  wordCloudData,
  modelEvalData,
  heatmapData
}) => {
  return (
    <>
      {/* Sentiment Distribution Section */}
      <Card className="p-4 mb-8 border-t-4 border-t-blue-400">
        <h3 className="font-semibold text-lg mb-3 flex items-center text-blue-600">
          <ChartPie className="h-5 w-5 mr-2" />
          Sentiment Distribution Analysis
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          This section shows the distribution of sentiment across all analyzed reviews and 
          the correlation between different sentiments.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Overall Distribution</h4>
            <SentimentDistribution data={distributionData} />
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Sentiment Correlation</h4>
            <HeatmapMatrix data={heatmapData} />
          </div>
        </div>
      </Card>

      {/* Key Aspects Section */}
      <Card className="p-4 mb-8 border-t-4 border-t-purple-400">
        <h3 className="font-semibold text-lg mb-3 flex items-center text-purple-600">
          <ChartBar className="h-5 w-5 mr-2" />
          Key Aspects Analysis
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Analysis of the most frequently mentioned aspects in customer reviews and their 
          associated sentiment scores.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Mentioned Aspects</h4>
            <MentionedAspects data={mentionedAspectsData} />
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Model Accuracy</h4>
            <ModelEvaluation data={modelEvalData} />
          </div>
        </div>
        <div className="mt-4 flex items-start gap-1 text-xs text-gray-500">
          <Info className="h-3 w-3 mt-0.5" />
          <span>
            The model accuracy shows how confident we are in the sentiment classification for each aspect.
          </span>
        </div>
      </Card>

      {/* Trends Section */}
      <Card className="p-4 mb-8 border-t-4 border-t-green-400">
        <h3 className="font-semibold text-lg mb-3 flex items-center text-green-600">
          <ChartBar className="h-5 w-5 mr-2" />
          Trend Analysis & Common Phrases
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Trends in sentiment over time and the most frequently used words and phrases in reviews.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Sentiment Trends</h4>
            <SentimentTrends data={trendData} />
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Frequent Words</h4>
            <FrequentWords data={wordCloudData} />
          </div>
        </div>
        <div className="mt-4 flex items-start gap-1 text-xs text-gray-500">
          <Info className="h-3 w-3 mt-0.5" />
          <span>
            Word size represents frequency in reviews, while color indicates associated sentiment.
          </span>
        </div>
      </Card>
    </>
  );
};

export default VisualizationsSection;
