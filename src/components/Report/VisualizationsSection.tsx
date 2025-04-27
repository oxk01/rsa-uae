
import React from 'react';
import SentimentDistribution from '../DashboardGraphs/SentimentDistribution';
import SentimentTrends from '../DashboardGraphs/SentimentTrends';
import MentionedAspects from '../DashboardGraphs/MentionedAspects';
import FrequentWords from '../DashboardGraphs/FrequentWords';
import ModelEvaluation from '../DashboardGraphs/ModelEvaluation';
import HeatmapMatrix from '../HeatmapMatrix';

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <SentimentDistribution data={distributionData} />
        <HeatmapMatrix data={heatmapData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <MentionedAspects data={mentionedAspectsData} />
        <ModelEvaluation data={modelEvalData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <SentimentTrends data={trendData} />
        <FrequentWords data={wordCloudData} />
      </div>
    </>
  );
};

export default VisualizationsSection;
