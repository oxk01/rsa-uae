
export interface ChartData {
  date?: string;
  value?: number;
  name?: string;
  source?: string;
  positive?: number;
  neutral?: number;
  negative?: number;
  accuracy?: number;
  confidence?: string;
  aspect?: string;
  count?: number;
  text?: string;
  sentiment?: string;
}

export interface DashboardGraphsProps {
  sentimentOverviewData: ChartData[];
  trendData: ChartData[];
  aspectData: ChartData[];
  wordCloudData: ChartData[];
  sourceData: ChartData[];
  mentionedAspectsData: ChartData[];
  confusionMatrixData: ChartData[];
}

export interface DetailedAnalysisProps {
  aspectData: ChartData[];
  wordCloudData: ChartData[];
}
