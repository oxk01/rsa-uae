
import React, { useState } from 'react';
import { BarChart2, BarChartHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardGraphsProps } from './types';
import SentimentDistribution from './SentimentDistribution';
import SentimentTrends from './SentimentTrends';
import FrequentWords from './FrequentWords';
import DetailedAnalysis from './DetailedAnalysis';
import SentimentByPlatform from './SentimentByPlatform';
import MentionedAspects from './MentionedAspects';
import ModelEvaluation from './ModelEvaluation';

const DashboardGraphs: React.FC<DashboardGraphsProps> = ({
  sentimentOverviewData,
  trendData,
  aspectData,
  wordCloudData,
  sourceData,
  mentionedAspectsData,
  confusionMatrixData
}) => {
  const [viewType, setViewType] = useState<'charts' | 'details'>('charts');

  return (
    <div className="mt-8">
      <Tabs defaultValue="charts" className="w-full">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Sentiment Analysis Insights</h2>
          <TabsList>
            <TabsTrigger value="charts" onClick={() => setViewType('charts')}>
              <BarChart2 className="h-4 w-4 mr-2" />
              Charts
            </TabsTrigger>
            <TabsTrigger value="details" onClick={() => setViewType('details')}>
              <BarChartHorizontal className="h-4 w-4 mr-2" />
              Detailed Analysis
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="charts" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SentimentDistribution data={sentimentOverviewData} />
            <SentimentTrends data={trendData} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FrequentWords data={wordCloudData} />
            <SentimentByPlatform data={sourceData} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MentionedAspects data={mentionedAspectsData} />
            <ModelEvaluation data={confusionMatrixData} />
          </div>
        </TabsContent>
        
        <TabsContent value="details" className="space-y-8">
          <DetailedAnalysis 
            aspectData={aspectData}
            wordCloudData={wordCloudData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardGraphs;
