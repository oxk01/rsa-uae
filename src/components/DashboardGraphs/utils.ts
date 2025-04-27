
import { COLORS } from './constants';

export const getSentimentColor = (sentiment: string, isDarkMode: boolean = false) => {
  const mode = isDarkMode ? 'dark' : 'light';
  switch (sentiment.toLowerCase()) {
    case 'positive':
      return COLORS.positive[mode];
    case 'negative':
      return COLORS.negative[mode];
    default:
      return COLORS.neutral[mode];
  }
};

export const getChartTooltipStyles = {
  contentStyle: { 
    backgroundColor: 'var(--background)',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    padding: '12px',
    fontSize: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  }
};

export const formatPercentage = (value: number) => `${value.toFixed(1)}%`;
