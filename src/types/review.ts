
export interface KeywordItem {
  word: string;
  sentiment: string;
  count?: number;
}

export interface Review {
  id: number;
  title: string;
  date: string;
  reviewCount: number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  source?: string;
  rating?: string;
  reviewText?: string;
  sentimentLabel?: string;
  accuracyScore?: number;
  keywords?: Array<KeywordItem>;
  aspects?: Array<{ 
    name: string; 
    sentiment: 'positive' | 'negative' | 'neutral';
    confidence: number;
    context: string;
  }>;
  helpfulnessRatio?: string;
  verified?: boolean;
  userId?: string;
}
