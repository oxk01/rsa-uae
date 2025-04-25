
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, RefreshCcw, ArrowDown, ArrowUp, ChartBar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from '@/hooks/use-toast';

interface ResultProps {
  result: any;
  onSave: () => void;
  onStartOver: () => void;
  displayMode?: string;
}

const ReviewResults = ({ result, onSave, onStartOver, displayMode }: ResultProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const sentiment = result?.overallSentiment?.sentiment || 'neutral';
  const score = result?.overallSentiment?.score || 50;
  const keyPhrases = result?.fileAnalysis?.keywords || [];
  const aspects = result?.fileAnalysis?.aspects || [];
  const totalReviews = result?.fileAnalysis?.totalReviews || 1;
  const accuracyScore = result?.fileAnalysis?.accuracyScore || 80;
  const sentimentBreakdown = result?.fileAnalysis?.sentimentBreakdown || { positive: 33, neutral: 33, negative: 34 };
  
  // Generate insights based on data
  const generateInsights = () => {
    const insights = [];
    
    // Overall sentiment insight
    if (sentiment === 'positive') {
      insights.push(`Overall positive sentiment with ${sentimentBreakdown.positive}% of reviews being positive, indicating general customer satisfaction.`);
    } else if (sentiment === 'negative') {
      insights.push(`Overall negative sentiment with ${sentimentBreakdown.negative}% of reviews being negative, suggesting areas for improvement.`);
    } else {
      insights.push(`Mixed sentiment with ${sentimentBreakdown.positive}% positive, ${sentimentBreakdown.negative}% negative, indicating varied customer experiences.`);
    }
    
    // Aspects insights
    if (aspects && aspects.length > 0) {
      const positiveAspects = aspects.filter((a: any) => a.sentiment === 'positive');
      const negativeAspects = aspects.filter((a: any) => a.sentiment === 'negative');
      
      if (positiveAspects.length > 0) {
        const aspectsText = positiveAspects
          .slice(0, 2)
          .map((a: any) => a.aspect || a.name || 'this aspect')
          .map((name: string) => typeof name === 'string' ? name.toLowerCase() : 'this aspect')
          .join(' and ');
        insights.push(`Customers speak highly of ${aspectsText}.`);
      }
      
      if (negativeAspects.length > 0) {
        const aspectsText = negativeAspects
          .slice(0, 2)
          .map((a: any) => a.aspect || a.name || 'this aspect')
          .map((name: string) => typeof name === 'string' ? name.toLowerCase() : 'this aspect')
          .join(' and ');
        insights.push(`Consider improving ${aspectsText} based on negative feedback.`);
      }
    }
    
    // Keywords insights
    if (keyPhrases && keyPhrases.length > 0) {
      const positiveKeywords = keyPhrases.filter((k: any) => k.sentiment === 'positive').slice(0, 3);
      const negativeKeywords = keyPhrases.filter((k: any) => k.sentiment === 'negative').slice(0, 3);
      
      if (positiveKeywords.length > 0) {
        const words = positiveKeywords.map((k: any) => {
          if (typeof k === 'string') return k;
          return k.text || k.word || '';
        }).filter(Boolean).join(', ');
        
        if (words) insights.push(`Positive reviews frequently mention: ${words}.`);
      }
      
      if (negativeKeywords.length > 0) {
        const words = negativeKeywords.map((k: any) => {
          if (typeof k === 'string') return k;
          return k.text || k.word || '';
        }).filter(Boolean).join(', ');
        
        if (words) insights.push(`Negative reviews commonly discuss: ${words}.`);
      }
    }
    
    return insights;
  };
  
  // Generate recommendations based on data
  const generateRecommendations = () => {
    const recommendations = [];
    
    if (aspects && aspects.length > 0) {
      const worstAspects = [...aspects].sort((a: any, b: any) => {
        if (a.sentiment === 'negative' && b.sentiment !== 'negative') return -1;
        if (a.sentiment !== 'negative' && b.sentiment === 'negative') return 1;
        return 0;
      }).slice(0, 2);
      
      worstAspects.forEach((aspect: any) => {
        if (aspect.sentiment === 'negative') {
          const aspectName = aspect.aspect || aspect.name;
          const formattedAspectName = typeof aspectName === 'string' ? aspectName.toLowerCase() : 'this aspect';
          recommendations.push(`Focus on improving ${formattedAspectName} to address customer concerns.`);
        }
      });
    }
    
    // Add general recommendations
    if (sentimentBreakdown.negative > 30) {
      recommendations.push("Implement a customer feedback loop to address recurring negative themes.");
    }
    
    if (sentimentBreakdown.positive < 50) {
      recommendations.push("Consider a product/service enhancement initiative based on customer feedback.");
    }
    
    if (recommendations.length === 0) {
      recommendations.push("Maintain current quality standards while monitoring customer feedback for continuous improvement.");
    }
    
    return recommendations;
  };
  
  const insights = generateInsights();
  const recommendations = generateRecommendations();
  
  // Clears all stored analyses and current analysis
  const clearAllStoredData = () => {
    try {
      localStorage.removeItem('rsa_saved_analyses');
      localStorage.removeItem('rsa_current_analysis');
      return true;
    } catch (error) {
      console.error("Error clearing stored data:", error);
      return false;
    }
  };
  
  // Helper function to trim analysis data to reduce size
  const createCompactSummary = (result: any) => {
    // Create a simplified version with only essential data
    return {
      id: Date.now(),
      date: new Date().toISOString(),
      totalReviews: totalReviews,
      sentimentBreakdown: sentimentBreakdown,
      overallSentiment: {
        sentiment: sentiment,
        score: score
      },
      keywords: (keyPhrases || []).slice(0, 20).map((k: any) => ({
        text: typeof k === 'string' ? k : (k.text || k.word || ''),
        sentiment: k.sentiment || 'neutral',
        value: k.value || k.count || 1
      })),
      aspects: (aspects || []).slice(0, 10).map((a: any) => ({
        aspect: a.aspect || a.name || 'Unnamed aspect',
        sentiment: a.sentiment || 'neutral',
        count: a.count || 1
      })),
      // Include only 5 sample reviews instead of all
      reviews: (result.fileAnalysis.reviews || []).slice(0, 5).map((review: any) => ({
        title: review.title,
        date: review.date,
        sentiment: review.sentiment,
        reviewText: (review.reviewText || '').substring(0, 200), // Limit text length
      })),
      insights: insights,
      recommendations: recommendations
    };
  };
  
  const handleSave = () => {
    try {
      // First try to clear space if needed
      try {
        const existingSize = localStorage.getItem('rsa_saved_analyses') ? 
          JSON.stringify(localStorage.getItem('rsa_saved_analyses')).length : 0;
        
        // If we already have a lot of data, clear some space first
        if (existingSize > 1000000) { // ~1MB
          clearAllStoredData();
          toast({
            title: "Storage cleared",
            description: "Previous analyses were removed to make space for the new one.",
          });
        }
      } catch (e) {
        console.warn("Error checking storage size:", e);
      }
      
      // Create a compact version of the analysis data
      const summary = createCompactSummary(result);
      
      try {
        // Store only the compact summary in localStorage
        localStorage.setItem('rsa_saved_analyses', JSON.stringify([summary]));
        
        // Instead of storing the full analysis, store a reference to it
        localStorage.setItem('rsa_current_analysis', JSON.stringify({
          overallSentiment: result.overallSentiment,
          fileAnalysis: {
            totalReviews: totalReviews,
            sentimentBreakdown: sentimentBreakdown,
            accuracyScore: accuracyScore,
            aspects: aspects.slice(0, 10),
            keywords: keyPhrases.slice(0, 30),
            reviews: (result.fileAnalysis.reviews || []).slice(0, 10)
          }
        }));
        
        onSave();
        
        toast({
          title: "Analysis saved",
          description: "Your analysis has been successfully saved to the dashboard.",
        });
        
        navigate('/dashboard');
      } catch (error: any) {
        // If we still get quota exceeded error, try with even smaller data
        if (error?.name === 'QuotaExceededError' || 
            error?.toString().includes('quota')) {
          
          // Last resort - clear everything and try one more time with minimal data
          clearAllStoredData();
          
          try {
            // Create an extremely minimal summary
            const minimalSummary = {
              id: Date.now(),
              date: new Date().toISOString(),
              totalReviews: totalReviews,
              sentimentBreakdown: sentimentBreakdown,
              overallSentiment: { sentiment, score }
            };
            
            localStorage.setItem('rsa_saved_analyses', JSON.stringify([minimalSummary]));
            localStorage.setItem('rsa_current_analysis', JSON.stringify({
              overallSentiment: { sentiment, score },
              fileAnalysis: {
                totalReviews: totalReviews,
                sentimentBreakdown: sentimentBreakdown,
                accuracyScore: accuracyScore
              }
            }));
            
            onSave();
            
            toast({
              title: "Analysis saved (minimal)",
              description: "Your analysis was saved with reduced details due to storage constraints.",
            });
            
            navigate('/dashboard');
            return;
          } catch (finalError) {
            console.error("Final attempt failed:", finalError);
            throw finalError; // Re-throw to show error message
          }
        }
        throw error; // Re-throw non-quota errors
      }
    } catch (error) {
      console.error("Error in save handler:", error);
      
      toast({
        title: "Save failed",
        description: "There was an error saving your analysis. Please try again or clear previous analyses.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col items-center space-y-2">
        <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
        <h2 className="text-2xl font-semibold text-center">Analysis Complete</h2>
        <p className="text-gray-500 text-center mb-4">
          {totalReviews > 1 
            ? `Successfully analyzed ${totalReviews} reviews with ${accuracyScore}% accuracy`
            : `Your review has been analyzed with ${accuracyScore}% accuracy`
          }
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Sentiment Score</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${sentiment === 'positive' ? 'bg-green-500' : sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'}`}></div>
            <span className="capitalize">{sentiment}</span>
            <span className="ml-auto font-semibold">{score}/100</span>
          </div>
          <Progress 
            value={score} 
            className={`mt-2 ${sentiment === 'positive' ? 'bg-green-100' : sentiment === 'negative' ? 'bg-red-100' : 'bg-gray-100'}`} 
          />
          <div className="flex justify-between mt-3 text-xs text-gray-500">
            <div className="flex items-center">
              <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
              <span>{sentimentBreakdown.positive}% Positive</span>
            </div>
            <div>
              <span>{sentimentBreakdown.neutral}% Neutral</span>
            </div>
            <div className="flex items-center">
              <ArrowDown className="h-3 w-3 mr-1 text-red-500" />
              <span>{sentimentBreakdown.negative}% Negative</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Key Phrases</h3>
          <div className="flex flex-wrap gap-2">
            {keyPhrases && keyPhrases.length > 0 ? (
              keyPhrases.slice(0, 8).map((phrase: any, idx: number) => {
                const text = typeof phrase === 'string' ? phrase : (phrase.text || phrase.word || "");
                if (!text) return null;
                
                return (
                  <span 
                    key={idx} 
                    className={`px-2 py-1 rounded-full text-xs ${
                      sentiment === 'positive' 
                        ? 'bg-green-100 text-green-800' 
                        : sentiment === 'negative'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {text}
                  </span>
                );
              }).filter(Boolean)
            ) : (
              <p className="text-gray-500 text-sm">No key phrases identified</p>
            )}
          </div>
        </Card>
      </div>
      
      <Card className="p-4 mb-6">
        <h3 className="font-semibold mb-2">Aspects Analysis</h3>
        <div className="space-y-3">
          {aspects && aspects.length > 0 ? (
            aspects.slice(0, 5).map((aspect: any, idx: number) => {
              const aspectName = aspect.aspect || aspect.name || 'Unnamed aspect';
              return (
                <div key={idx} className="border-b pb-3 last:border-b-0 last:pb-0">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{aspectName}</span>
                    <span className={
                      aspect.sentiment === 'positive' ? 'text-green-600' : 
                      aspect.sentiment === 'negative' ? 'text-red-600' : 
                      'text-gray-600'
                    }>
                      {aspect.sentiment ? aspect.sentiment.charAt(0).toUpperCase() + aspect.sentiment.slice(1) : 'Neutral'} 
                      {aspect.confidence && `(${aspect.confidence}%)`}
                    </span>
                  </div>
                  {aspect.context && <p className="text-sm text-gray-500">{aspect.context}</p>}
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">No aspects identified</p>
          )}
        </div>
      </Card>
      
      <Card className="p-4 mb-6">
        <h3 className="font-semibold mb-2 flex items-center">
          <ChartBar className="h-4 w-4 mr-2" />
          Key Insights & Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Insights:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              {insights.map((insight, idx) => (
                <li key={idx}>{insight}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              {recommendations.map((recommendation, idx) => (
                <li key={idx}>{recommendation}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
        <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600">
          Save & View Dashboard
        </Button>
        <Button variant="outline" onClick={onStartOver} className="border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20">
          <RefreshCcw className="h-4 w-4 mr-2" />
          Start New Analysis
        </Button>
      </div>
    </div>
  );
};

export default ReviewResults;
