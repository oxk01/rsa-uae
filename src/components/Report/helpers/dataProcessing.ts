
import { AnalysisData } from '@/components/types';

export const processKeyPhrases = (rawKeyPhrases: any[]) => {
  return Array.isArray(rawKeyPhrases) 
    ? rawKeyPhrases.map(phrase => {
        if (typeof phrase === 'string') {
          return { text: phrase, value: 1, sentiment: 'neutral' };
        }
        return {
          text: phrase.text || '',
          value: phrase.value || 1,
          sentiment: phrase.sentiment || 'neutral'
        };
      })
    : [];
};

export const processAspects = (rawAspects: any[]) => {
  return rawAspects.map(aspect => ({
    aspect: aspect.aspect || aspect.name || 'Unknown',
    sentiment: aspect.sentiment || 'neutral',
    confidence: aspect.confidence || Math.floor(Math.random() * 20) + 60,
    context: aspect.context || '',
    positive: aspect.positive,
    neutral: aspect.neutral,
    negative: aspect.negative
  }));
};

export const processTrendData = (reviews: any[]) => {
  if (!reviews.length) return [];
  
  const reviewsByDate: Record<string, any> = {};
  
  reviews.forEach(review => {
    const date = review.date ? new Date(review.date) : new Date();
    const formattedDate = isNaN(date.getTime()) 
      ? 'Unknown Date' 
      : date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
      
    if (!reviewsByDate[formattedDate]) {
      reviewsByDate[formattedDate] = { positive: 0, neutral: 0, negative: 0, count: 0 };
    }
    
    reviewsByDate[formattedDate].count++;
    const sentiment = review.sentimentLabel || 
      (review.sentiment && review.sentiment.sentiment) || 'neutral';
    reviewsByDate[formattedDate][sentiment.toLowerCase()]++;
  });
  
  return Object.entries(reviewsByDate)
    .map(([date, data]: [string, any]) => ({
      date,
      positive: (data.positive / data.count) * 100,
      neutral: (data.neutral / data.count) * 100,
      negative: (data.negative / data.count) * 100
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
