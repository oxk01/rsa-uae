
export interface KeywordItem {
  word: string;
  sentiment: string;
  count?: number;
}

export interface AspectItem {
  name: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  context: string;
}

export interface Review {
  id: number;
  title: string;
  date: string;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  reviewCount: number;
  source?: string;
  rating?: string;
  reviewText?: string;
  sentimentLabel?: string;
  accuracyScore?: number;
  keywords?: KeywordItem[];
  aspects?: AspectItem[];
  helpfulnessRatio?: string;
  verified?: boolean;
  userId?: string;
}

export interface RecentReviewsProps {
  reviews?: Review[];
  onExport?: () => void;
  displayMode?: 'cards' | 'table';
}
