import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import ReviewInput from '@/components/ReviewDemo/ReviewInput';
import ReviewLoading from '@/components/ReviewDemo/ReviewLoading';
import ReviewResults from '@/components/ReviewDemo/ReviewResults';
import { parseExcelFile, analyzeSentiment, extractKeywords, extractAspects } from '@/utils/excelParser';

interface Review {
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
  keywords?: Array<{ word: string; sentiment: string; count?: number }>;
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

const analyzeFile = async (file: File, onProgressUpdate?: (progress: number, status: string) => void) => {
  try {
    onProgressUpdate?.(10, "Reading Excel file...");
    
    const reviews = await parseExcelFile(file);
    
    onProgressUpdate?.(30, `Processing ${reviews.length} reviews...`);
    
    let totalPositive = 0;
    let totalNeutral = 0;
    let totalNegative = 0;
    let totalAccuracy = 0;
    
    const processedReviews = [];
    const CHUNK_SIZE = 100;
    
    for (let i = 0; i < reviews.length; i += CHUNK_SIZE) {
      const chunk = reviews.slice(i, Math.min(i + CHUNK_SIZE, reviews.length));
      
      const chunkResults = chunk.map(review => {
        const { sentiment, score, accuracy } = analyzeSentiment(review.reviewText);
        
        if (sentiment === 'positive') totalPositive++;
        else if (sentiment === 'negative') totalNegative++;
        else totalNeutral++;
        
        totalAccuracy += accuracy;
        
        let ratingValue = "0/5";
        if (review.rating) {
          const ratingNum = parseFloat(review.rating);
          if (!isNaN(ratingNum)) {
            if (ratingNum <= 5) {
              ratingValue = `${ratingNum}/5`;
            } else if (ratingNum <= 10) {
              ratingValue = `${(ratingNum / 2).toFixed(1)}/5`;
            } else if (ratingNum <= 100) {
              ratingValue = `${(ratingNum / 20).toFixed(1)}/5`;
            }
          }
        } else {
          const sentimentRating = sentiment === 'positive' ? 
                            Math.floor(Math.random() * 2) + 4 : 
                            sentiment === 'negative' ?
                            Math.floor(Math.random() * 2) + 1 : 
                            3;
          ratingValue = `${sentimentRating}/5`;
        }
        
        const keywords = extractKeywords(review.reviewText, sentiment);
        
        const aspects = extractAspects(review.reviewText, sentiment);
        
        let helpfulnessRatio;
        if (review.helpfulnessNumerator !== undefined && review.helpfulnessDenominator !== undefined) {
          helpfulnessRatio = `${review.helpfulnessNumerator}/${review.helpfulnessDenominator}`;
        }
        
        return {
          id: Date.now() + Math.random(),
          title: review.productId,
          date: review.date || new Date().toISOString().split('T')[0],
          sentiment: {
            positive: sentiment === 'positive' ? score : 10,
            neutral: sentiment === 'neutral' ? score : 10,
            negative: sentiment === 'negative' ? 100 - score : 10
          },
          reviewCount: 1,
          source: 'excel',
          rating: ratingValue,
          reviewText: review.reviewText,
          sentimentLabel: sentiment,
          accuracyScore: accuracy,
          keywords: keywords,
          aspects: aspects,
          helpfulnessRatio,
          verified: review.verified,
          userId: review.userId
        };
      });
      
      processedReviews.push(...chunkResults);
      
      const progress = Math.min(30 + Math.round(60 * ((i + chunk.length) / reviews.length)), 90);
      onProgressUpdate?.(progress, `Analyzed ${i + chunk.length} of ${reviews.length} reviews...`);
      
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    const avgAccuracy = Math.round(totalAccuracy / reviews.length);
    
    const allAspects = processedReviews
      .flatMap((r: any) => r.aspects || [])
      .reduce((acc: Record<string, any[]>, curr: any) => {
        if (!curr || !curr.name) return acc;
        
        if (!acc[curr.name]) {
          acc[curr.name] = [];
        }
        acc[curr.name].push(curr);
        return acc;
      }, {});
    
    const topAspects = Object.entries(allAspects)
      .sort(([, a], [, b]) => (b as any[]).length - (a as any[]).length)
      .slice(0, 5)
      .map(([name, instances]) => {
        const aspectInstances = instances as any[];
        const positive = aspectInstances.filter(a => a.sentiment === 'positive').length;
        const negative = aspectInstances.filter(a => a.sentiment === 'negative').length;
        const neutral = aspectInstances.filter(a => a.sentiment === 'neutral').length;
        
        let sentiment;
        if (positive > negative && positive > neutral) sentiment = 'positive';
        else if (negative > positive && negative > neutral) sentiment = 'negative';
        else sentiment = 'neutral';
        
        const context = aspectInstances[0].context || '';
        
        const total = aspectInstances.length;
        const confidence = Math.round((sentiment === 'positive' ? positive : sentiment === 'negative' ? negative : neutral) / total * 100);
        
        return {
          name,
          sentiment,
          confidence,
          context
        };
      });
    
    const allKeywords = processedReviews
      .flatMap((r: Review) => r.keywords || [])
      .reduce((acc: Record<string, { count: number, sentiment: string }>, curr: KeywordItem) => {
        if (!curr) return acc;
        
        const word = curr.word || '';
        if (!acc[word]) {
          acc[word] = { 
            count: 0, 
            sentiment: curr.sentiment || 'neutral' 
          };
        }
        acc[word].count += 1;
        return acc;
      }, {});
    
    const topKeywords = Object.entries(allKeywords)
      .sort(([, a], [, b]) => {
        const countA = a && typeof a === 'object' && 'count' in a ? (a.count as number) : 0;
        const countB = b && typeof b === 'object' && 'count' in a ? (b.count as number) : 0;
        return countB - countA;
      })
      .slice(0, 5)
      .map(([word]) => word);
    
    onProgressUpdate?.(100, "Analysis complete!");
    
    return {
      text: `Analysis of file: ${file.name}`,
      overallSentiment: {
        sentiment: totalPositive > totalNegative ? "positive" : totalNegative > totalPositive ? "negative" : "neutral",
        score: Math.round(((totalPositive - totalNegative) / reviews.length + 1) * 50)
      },
      aspects: topAspects,
      keyPhrases: topKeywords,
      fileAnalysis: {
        totalReviews: reviews.length,
        sentimentBreakdown: {
          positive: totalPositive,
          neutral: totalNeutral, 
          negative: totalNegative
        },
        isRealData: true,
        fileName: file.name,
        accuracyScore: avgAccuracy,
        reviews: processedReviews,
        dataPoints: reviews.length
      }
    };
  } catch (error) {
    console.error("Error analyzing file:", error);
    throw error;
  }
};

type AnalysisState = 'input' | 'analyzing' | 'results';

const Demo = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysisState, setAnalysisState] = useState<AnalysisState>('input');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  const handleFileChange = (file: File | null) => {
    if (file) {
      setFile(file);
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded for analysis. Ready to process all data points.`,
      });
    }
  };
  
  const handleProgressUpdate = (newProgress: number, newStatus: string) => {
    setProgress(newProgress);
    setStatus(newStatus);
  };
  
  const handleAnalyze = async () => {
    if (!file) {
      toast({
        title: "Input required",
        description: "Please upload a file to analyze.",
        variant: "destructive",
      });
      return;
    }
    
    setAnalysisState('analyzing');
    setProgress(0);
    setStatus('Starting analysis...');
    
    try {
      const result = await analyzeFile(file, handleProgressUpdate);
      
      setAnalysisResult(result);
      setAnalysisState('results');
      
      // Save summary to localStorage instead of all reviews
      try {
        const summary = {
          id: Date.now(),
          fileName: file.name,
          date: new Date().toISOString(),
          totalReviews: result.fileAnalysis.totalReviews,
          sentimentBreakdown: result.fileAnalysis.sentimentBreakdown,
          overallSentiment: result.overallSentiment,
          keyPhrases: result.keyPhrases,
          aspects: result.aspects.slice(0, 5),
          // Sample a small subset of reviews instead of all reviews
          sampleReviews: result.fileAnalysis.reviews.slice(0, 20)
        };
        
        const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses') || '[]';
        const savedAnalyses = JSON.parse(savedAnalysesStr);
        
        // Keep only the most recent analyses to avoid storage quota issues
        const updatedAnalyses = [summary, ...savedAnalyses.slice(0, 9)];
        localStorage.setItem('rsa_saved_analyses', JSON.stringify(updatedAnalyses));
        
        // Also store the current analysis separately for immediate access
        localStorage.setItem('rsa_current_analysis', JSON.stringify(result));
      } catch (storageError) {
        console.warn("Could not save to localStorage:", storageError);
        // Continue without saving to localStorage
      }
      
      toast({
        title: "Analysis complete",
        description: `Successfully analyzed ${result.fileAnalysis.totalReviews} reviews with ${result.fileAnalysis.accuracyScore}% accuracy.`,
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your input. Please try again.",
        variant: "destructive",
      });
      setAnalysisState('input');
    }
  };
  
  const handleStartOver = () => {
    setAnalysisState('input');
    setFile(null);
    setAnalysisResult(null);
    setProgress(0);
    setStatus('');
  };
  
  const rtlClass = language === 'ar' ? 'rtl' : '';
  
  return (
    <div className={`min-h-screen bg-slate-50 py-8 ${rtlClass}`}>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {analysisState === 'input' && (
            <ReviewInput 
              onFileChange={handleFileChange}
              onAnalyze={handleAnalyze}
              file={file}
            />
          )}
          
          {analysisState === 'analyzing' && (
            <ReviewLoading progress={progress} status={status} />
          )}
          
          {analysisState === 'results' && analysisResult && (
            <ReviewResults 
              result={analysisResult}
              onSave={() => {
                toast({
                  title: "Analysis saved",
                  description: "Your analysis has been saved to the dashboard.",
                });
                navigate('/dashboard');
              }} 
              onStartOver={handleStartOver}
              displayMode="table"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Demo;
