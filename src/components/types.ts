
// Common types for the application

// Report generation related types
export interface SentimentReportProps {
  analysisData: AnalysisData;
}

export interface GenerateReportButtonProps {
  analysisData: AnalysisData;
  hasData: boolean;
}

export interface AnalysisData {
  overallSentiment?: string;
  fileAnalysis?: {
    totalReviews?: number;
    sentimentBreakdown?: {
      positive: number;
      neutral: number;
      negative: number;
    };
    accuracyScore?: number;
    reviews?: ReviewData[];
    aspects?: AspectData[];
    keywords?: KeywordData[];
  };
}

export interface ReviewData {
  id?: string;
  date?: string;
  reviewText?: string;
  sentiment?: {
    sentiment: string;
    score?: number;
  };
  sentimentLabel?: string;
}

export interface AspectData {
  aspect?: string;
  name?: string;
  sentiment?: string;
  count?: number;
  confidence?: number;
  positive?: number;
  neutral?: number;
  negative?: number;
}

export interface KeywordData {
  text?: string;
  value?: number;
  sentiment?: string;
}

export interface HeatmapData {
  predictedPositive: number;
  predictedNegative: number;
  actualPositive: number;
  actualNegative: number;
}
