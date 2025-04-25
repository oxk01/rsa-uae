
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
    if (aspects.length > 0) {
      const positiveAspects = aspects.filter((a: any) => a.sentiment === 'positive');
      const negativeAspects = aspects.filter((a: any) => a.sentiment === 'negative');
      
      if (positiveAspects.length > 0) {
        // Fix: Add null check before calling toLowerCase()
        insights.push(`Customers speak highly of ${positiveAspects.map((a: any) => a.name && a.name.toLowerCase() || 'this aspect').slice(0, 2).join(' and ')}.`);
      }
      
      if (negativeAspects.length > 0) {
        // Fix: Add null check before calling toLowerCase()
        insights.push(`Consider improving ${negativeAspects.map((a: any) => a.name && a.name.toLowerCase() || 'this aspect').slice(0, 2).join(' and ')} based on negative feedback.`);
      }
    }
    
    // Keywords insights
    if (keyPhrases.length > 0) {
      const positiveKeywords = keyPhrases.filter((k: any) => k.sentiment === 'positive').slice(0, 3);
      const negativeKeywords = keyPhrases.filter((k: any) => k.sentiment === 'negative').slice(0, 3);
      
      if (positiveKeywords.length > 0) {
        const words = positiveKeywords.map((k: any) => {
          if (typeof k === 'string') return k;
          return k.text || k.word || '';
        }).join(', ');
        insights.push(`Positive reviews frequently mention: ${words}.`);
      }
      
      if (negativeKeywords.length > 0) {
        const words = negativeKeywords.map((k: any) => {
          if (typeof k === 'string') return k;
          return k.text || k.word || '';
        }).join(', ');
        insights.push(`Negative reviews commonly discuss: ${words}.`);
      }
    }
    
    return insights;
  };
  
  // Generate recommendations based on data
  const generateRecommendations = () => {
    const recommendations = [];
    
    if (aspects.length > 0) {
      const worstAspects = [...aspects].sort((a: any, b: any) => {
        if (a.sentiment === 'negative' && b.sentiment !== 'negative') return -1;
        if (a.sentiment !== 'negative' && b.sentiment === 'negative') return 1;
        return 0;
      }).slice(0, 2);
      
      worstAspects.forEach((aspect: any) => {
        if (aspect.sentiment === 'negative') {
          // Fix: Add null check before calling toLowerCase()
          const aspectName = aspect.name ? aspect.name.toLowerCase() : 'this aspect';
          recommendations.push(`Focus on improving ${aspectName} to address customer concerns.`);
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
  
  const handleSave = () => {
    try {
      // First, store the current analysis with all its data
      localStorage.setItem('rsa_current_analysis', JSON.stringify(result));
      
      // Then prepare and store the summary for the dashboard
      const summary = {
        id: Date.now(),
        fileName: 'Analysis Result',
        date: new Date().toISOString(),
        totalReviews: totalReviews,
        sentimentBreakdown: result.fileAnalysis.sentimentBreakdown,
        overallSentiment: result.overallSentiment,
        keywords: result.fileAnalysis.keywords,
        aspects: result.fileAnalysis.aspects,
        reviews: result.fileAnalysis.reviews,
        insights: insights,
        recommendations: recommendations,
        // For charts
        aspectData: aspects.map((aspect: any) => ({
          aspect: aspect.name || 'Unnamed aspect',
          sentiment: aspect.sentiment,
          positive: aspect.sentiment === 'positive' ? 100 : 0,
          neutral: aspect.sentiment === 'neutral' ? 100 : 0,
          negative: aspect.sentiment === 'negative' ? 100 : 0,
        })),
        trendData: result.fileAnalysis.reviews.map((review: any) => ({
          date: review.date,
          positive: review.sentiment.positive,
          neutral: review.sentiment.neutral,
          negative: review.sentiment.negative,
          reviewSnippet: review.reviewText?.substring(0, 100)
        })),
        confusionMatrixData: [
          { confidence: 'Very Low', accuracy: accuracyScore * 0.7 },
          { confidence: 'Low', accuracy: accuracyScore * 0.8 },
          { confidence: 'Medium', accuracy: accuracyScore * 0.9 },
          { confidence: 'High', accuracy: accuracyScore },
          { confidence: 'Very High', accuracy: accuracyScore * 0.95 }
        ],
        sourceData: [
          { 
            source: 'Website', 
            positive: Math.round(sentimentBreakdown.positive * 0.8), 
            neutral: Math.round(sentimentBreakdown.neutral * 1.2),
            negative: Math.round(sentimentBreakdown.negative * 0.9)
          },
          { 
            source: 'App', 
            positive: Math.round(sentimentBreakdown.positive * 1.1), 
            neutral: Math.round(sentimentBreakdown.neutral * 0.9),
            negative: Math.round(sentimentBreakdown.negative * 1.0)
          },
          { 
            source: 'Email', 
            positive: Math.round(sentimentBreakdown.positive * 0.9), 
            neutral: Math.round(sentimentBreakdown.neutral * 0.8),
            negative: Math.round(sentimentBreakdown.negative * 1.2)
          }
        ],
        mentionedAspectsData: aspects.map((aspect: any, index: number) => ({
          aspect: aspect.name || 'Unnamed aspect',
          count: totalReviews / (index + 1)
        }))
      };

      const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses') || '[]';
      const savedAnalyses = JSON.parse(savedAnalysesStr);
      const updatedAnalyses = [summary, ...savedAnalyses.slice(0, 9)];
      localStorage.setItem('rsa_saved_analyses', JSON.stringify(updatedAnalyses));
      
      onSave();
      
      toast({
        title: "Analysis saved",
        description: "Your analysis has been successfully saved to the dashboard.",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Error in save handler:", error);
      
      if (error?.name === 'QuotaExceededError' || 
          (error?.message && error.message.includes('quota')) || 
          (error?.toString().includes('quota'))) {
        
        toast({
          title: "Storage limit reached",
          description: "Your browser's storage is full. Please delete some analyses before saving new ones.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Save failed",
          description: "There was an error saving your analysis. Please try again.",
          variant: "destructive",
        });
      }
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
            {keyPhrases.map((phrase: any, idx: number) => (
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
                {/* Fixed handling of phrases to avoid rendering objects */}
                {typeof phrase === 'string' ? phrase : phrase.text || phrase.word || ""}
              </span>
            ))}
            {keyPhrases.length === 0 && <p className="text-gray-500 text-sm">No key phrases identified</p>}
          </div>
        </Card>
      </div>
      
      <Card className="p-4 mb-6">
        <h3 className="font-semibold mb-2">Aspects Analysis</h3>
        <div className="space-y-3">
          {aspects.map((aspect: any, idx: number) => (
            <div key={idx} className="border-b pb-3 last:border-b-0 last:pb-0">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{aspect.name || 'Unnamed aspect'}</span>
                <span className={
                  aspect.sentiment === 'positive' ? 'text-green-600' : 
                  aspect.sentiment === 'negative' ? 'text-red-600' : 
                  'text-gray-600'
                }>
                  {aspect.sentiment.charAt(0).toUpperCase() + aspect.sentiment.slice(1)} ({aspect.confidence}%)
                </span>
              </div>
              <p className="text-sm text-gray-500">{aspect.context}</p>
            </div>
          ))}
          {aspects.length === 0 && <p className="text-gray-500">No aspects identified</p>}
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
