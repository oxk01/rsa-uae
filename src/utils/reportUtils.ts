
import { AnalysisData } from '@/components/types';

/**
 * Generate insights based on sentiment analysis data
 * @param analysisData The analysis data to generate insights from
 * @returns Array of insight strings
 */
export const generateInsights = (analysisData: AnalysisData): string[] => {
  const insights: string[] = [];
  
  // Default insights if no data available
  if (!analysisData || !analysisData.fileAnalysis) {
    return [
      "No data available for insights generation",
      "Upload and analyze data to get meaningful insights",
      "Try using different data sources for more comprehensive analysis"
    ];
  }
  
  const sentiment = analysisData?.overallSentiment?.sentiment || 'neutral';
  const score = analysisData?.overallSentiment?.score || 50;
  const aspects = analysisData?.fileAnalysis?.aspects || [];
  
  // Add sentiment-based insights
  if (sentiment === 'positive') {
    insights.push(`Overall positive sentiment with a score of ${score}/100`);
    insights.push("Customers generally express satisfaction with the product/service");
  } else if (sentiment === 'negative') {
    insights.push(`Overall negative sentiment with a score of ${score}/100`);
    insights.push("Customers express notable concerns with the product/service");
  } else {
    insights.push(`Mixed or neutral sentiment with a score of ${score}/100`);
    insights.push("Customer opinions are varied without strong positive or negative trends");
  }
  
  // Add aspect-based insights
  if (aspects.length > 0) {
    // Find most positive aspect
    const positiveAspects = [...aspects].sort((a, b) => {
      const aPositive = a.positive || 0;
      const bPositive = b.positive || 0;
      return bPositive - aPositive;
    });
    
    if (positiveAspects.length > 0 && positiveAspects[0].aspect) {
      insights.push(`"${positiveAspects[0].aspect}" is the most positively perceived aspect`);
    }
    
    // Find most negative aspect
    const negativeAspects = [...aspects].sort((a, b) => {
      const aNegative = a.negative || 0;
      const bNegative = b.negative || 0;
      return bNegative - aNegative;
    });
    
    if (negativeAspects.length > 0 && negativeAspects[0].aspect) {
      insights.push(`"${negativeAspects[0].aspect}" is the most negatively perceived aspect`);
    }
    
    // Add insight about aspect variety
    if (aspects.length > 3) {
      insights.push(`Analysis identified ${aspects.length} distinct aspects mentioned by customers`);
    }
  }
  
  // Add data quality insight
  if (analysisData.fileAnalysis.accuracyScore) {
    insights.push(`Analysis performed with ${analysisData.fileAnalysis.accuracyScore}% confidence score`);
  }
  
  return insights.slice(0, 5); // Return top 5 insights
};

/**
 * Generate recommendations based on sentiment analysis data
 * @param analysisData The analysis data to generate recommendations from
 * @returns Array of recommendation strings
 */
export const generateRecommendations = (analysisData: AnalysisData): string[] => {
  const recommendations: string[] = [];
  
  // Default recommendations if no data available
  if (!analysisData || !analysisData.fileAnalysis) {
    return [
      "Gather more customer feedback data",
      "Analyze reviews from multiple sources",
      "Consider running sentiment analysis periodically"
    ];
  }
  
  const sentiment = analysisData?.overallSentiment?.sentiment || 'neutral';
  const aspects = analysisData?.fileAnalysis?.aspects || [];
  
  // Add sentiment-based recommendations
  if (sentiment === 'positive') {
    recommendations.push("Highlight your strengths in marketing materials");
    recommendations.push("Encourage satisfied customers to share their positive experiences");
  } else if (sentiment === 'negative') {
    recommendations.push("Address the most common customer concerns as a priority");
    recommendations.push("Develop a response strategy for negative feedback");
  } else {
    recommendations.push("Further segment analysis to identify specific areas for improvement");
    recommendations.push("Conduct follow-up surveys to gain more detailed feedback");
  }
  
  // Add aspect-based recommendations
  if (aspects.length > 0) {
    // Find aspects with highest negative sentiment
    const negativeAspects = [...aspects]
      .filter(aspect => (aspect.negative || 0) > 30)
      .sort((a, b) => {
        const aNegative = a.negative || 0;
        const bNegative = b.negative || 0;
        return bNegative - aNegative;
      });
    
    if (negativeAspects.length > 0 && negativeAspects[0].aspect) {
      recommendations.push(`Focus improvement efforts on "${negativeAspects[0].aspect}"`);
      
      if (negativeAspects.length > 1 && negativeAspects[1].aspect) {
        recommendations.push(`Consider reviewing "${negativeAspects[1].aspect}" as a secondary priority`);
      }
    }
    
    // Find aspects with highest positive sentiment
    const positiveAspects = [...aspects]
      .filter(aspect => (aspect.positive || 0) > 60)
      .sort((a, b) => {
        const aPositive = a.positive || 0;
        const bPositive = b.positive || 0;
        return bPositive - aPositive;
      });
    
    if (positiveAspects.length > 0 && positiveAspects[0].aspect) {
      recommendations.push(`Leverage "${positiveAspects[0].aspect}" as a key strength in communications`);
    }
  } else {
    recommendations.push("Implement a more detailed feedback collection system");
  }
  
  // Add general recommendations
  recommendations.push("Track sentiment trends over time to measure improvement");
  recommendations.push("Share insights with relevant teams for actionable follow-up");
  
  return recommendations.slice(0, 5); // Return top 5 recommendations
};

