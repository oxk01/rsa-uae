
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Save, RefreshCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import RecentReviews from '@/components/RecentReviews';
import { useToast } from '@/hooks/use-toast';

interface ResultProps {
  result: any;
  onSave: () => void;
  onStartOver: () => void;
  displayMode?: 'cards' | 'table';
}

const ReviewResults = ({ result, onSave, onStartOver, displayMode = 'cards' }: ResultProps) => {
  const { toast } = useToast();
  const sentiment = result?.overallSentiment?.sentiment || 'neutral';
  const score = result?.overallSentiment?.score || 50;
  const keyPhrases = result?.keyPhrases || [];
  const aspects = result?.aspects || [];
  const totalReviews = result?.fileAnalysis?.totalReviews || 1;
  const accuracyScore = result?.fileAnalysis?.accuracyScore || 80;
  const isFileAnalysis = totalReviews > 1;
  
  const handleSave = () => {
    try {
      // Add a try-catch block around the onSave call to capture errors
      onSave();
      
      // If the save was successful, show a success toast
      toast({
        title: "Analysis saved",
        description: "Your analysis has been successfully saved to the dashboard.",
      });
    } catch (error: any) {
      console.error("Error in save handler:", error);
      
      // Check specifically for localStorage quota exceeded errors
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
  
  // Construct review data to display in RecentReviews component
  const reviewData = isFileAnalysis && result?.fileAnalysis?.reviews
    ? result.fileAnalysis.reviews
    : [{
        id: Date.now(),
        title: "Single Review",
        date: new Date().toISOString().split('T')[0],
        sentiment: {
          positive: sentiment === 'positive' ? score : 10,
          neutral: sentiment === 'neutral' ? score : 10,
          negative: sentiment === 'negative' ? 100 - score : 10
        },
        reviewCount: 1,
        source: isFileAnalysis ? 'excel' : 'text',
        rating: `${Math.max(1, Math.min(5, Math.round(score * 5 / 100)))}/5`,
        reviewText: result.text,
        sentimentLabel: sentiment,
        accuracyScore: accuracyScore,
        keywords: keyPhrases.map((phrase: string) => ({
          word: phrase,
          sentiment: sentiment
        })),
        helpfulnessRatio: result?.helpfulness ? 
          `${result.helpfulness.helpful}/${result.helpfulness.total}` : undefined,
        verified: result?.verified
      }];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col items-center space-y-2">
        <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
        <h2 className="text-2xl font-semibold text-center">Analysis Complete</h2>
        <p className="text-gray-500 text-center mb-4">
          {isFileAnalysis 
            ? `Successfully analyzed ${totalReviews} reviews from file with ${accuracyScore}% accuracy`
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
        </Card>
        
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Key Phrases</h3>
          <div className="flex flex-wrap gap-2">
            {keyPhrases.map((phrase: string, idx: number) => (
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
                {phrase}
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
                <span className="font-medium">{aspect.name}</span>
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
      
      <div className="bg-white rounded-lg border p-6 mb-6">
        <RecentReviews 
          reviews={reviewData} 
          displayMode={displayMode}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
        <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 gap-2">
          <Save className="h-4 w-4" />
          Save to Dashboard
        </Button>
        <Button variant="outline" onClick={onStartOver} className="border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20 gap-2">
          <RefreshCcw className="h-4 w-4" />
          Start New Analysis
        </Button>
      </div>
    </div>
  );
};

export default ReviewResults;
