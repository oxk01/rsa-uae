import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import ReviewInput from '@/components/ReviewDemo/ReviewInput';
import ReviewLoading from '@/components/ReviewDemo/ReviewLoading';
import ReviewResults from '@/components/ReviewDemo/ReviewResults';
import { 
  parseExcelFile, 
  analyzeSentiment, 
  extractKeywords, 
  extractAspects, 
  ParsedReview 
} from '@/utils/excelParser';
import { KeywordItem, Review } from '@/components/RecentReviews/types';

const analyzeSentimentForText = async (text: string) => {
  await new Promise(resolve => setTimeout(resolve, 1500)); 
  
  const { sentiment, score, accuracy } = analyzeSentiment(text);
  
  // Use the new extractAspects function
  const aspects = extractAspects(text, sentiment);
  
  const keywords = extractKeywords(text, sentiment);
  const keyPhrasesText = keywords.map(keyword => keyword.word);
  
  return {
    text,
    overallSentiment: {
      sentiment,
      score
    },
    aspects: aspects,
    keyPhrases: keyPhrasesText,
    fileAnalysis: {
      totalReviews: 1,
      sentimentBreakdown: {
        positive: sentiment === 'positive' ? 1 : 0,
        neutral: sentiment === 'neutral' ? 1 : 0,
        negative: sentiment === 'negative' ? 1 : 0
      },
      isRealData: true,
      accuracyScore: accuracy
    }
  };
};

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
        
        // Use the new extractAspects function
        const aspects = extractAspects(review.reviewText, sentiment);
        
        // Calculate helpfulness ratio if available
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
    
    // Collect all aspects from reviews and find the most common ones
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
    
    // Get the top 5 most common aspects
    const topAspects = Object.entries(allAspects)
      .sort(([, a], [, b]) => (b as any[]).length - (a as any[]).length)
      .slice(0, 5)
      .map(([name, instances]) => {
        const aspectInstances = instances as any[];
        const positive = aspectInstances.filter(a => a.sentiment === 'positive').length;
        const negative = aspectInstances.filter(a => a.sentiment === 'negative').length;
        const neutral = aspectInstances.filter(a => a.sentiment === 'neutral').length;
        
        // Determine overall sentiment for this aspect
        let sentiment;
        if (positive > negative && positive > neutral) sentiment = 'positive';
        else if (negative > positive && negative > neutral) sentiment = 'negative';
        else sentiment = 'neutral';
        
        // Use the context from the first instance as an example
        const context = aspectInstances[0].context || '';
        
        // Calculate confidence as percentage of dominant sentiment
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
      .flatMap((r: any) => r.keywords || [])
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
  const [reviewText, setReviewText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [analysisState, setAnalysisState] = useState<AnalysisState>('input');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [characterCount, setCharacterCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setReviewText(text);
    setCharacterCount(text.length);
  };
  
  const handleFileChange = (file: File | null) => {
    if (file) {
      setFile(file);
      setReviewText('');
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
    if (!reviewText && !file) {
      toast({
        title: "Input required",
        description: "Please enter a review or upload a file to analyze.",
        variant: "destructive",
      });
      return;
    }
    
    setAnalysisState('analyzing');
    setProgress(0);
    setStatus('Starting analysis...');
    
    try {
      let result;
      
      if (file) {
        result = await analyzeFile(file, handleProgressUpdate);
      } else {
        setProgress(50);
        setStatus('Analyzing review text...');
        result = await analyzeSentimentForText(reviewText);
        setProgress(100);
        setStatus('Analysis complete!');
      }
      
      setAnalysisResult(result);
      setAnalysisState('results');
      
      toast({
        title: "Analysis complete",
        description: file 
          ? `Successfully analyzed ${result.fileAnalysis.totalReviews} reviews with ${result.fileAnalysis.accuracyScore}% accuracy.` 
          : `Review analysis complete with ${result.fileAnalysis.accuracyScore}% accuracy.`,
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
  
  const handleSaveToDashboard = () => {
    try {
      let savedAnalyses = [];
      try {
        const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses');
        if (savedAnalysesStr) {
          savedAnalyses = JSON.parse(savedAnalysesStr);
          
          if (!Array.isArray(savedAnalyses)) {
            console.error("Saved analyses is not an array:", savedAnalyses);
            savedAnalyses = [];
          }
        }
      } catch (parseError) {
        console.error("Error parsing saved analyses from localStorage:", parseError);
        savedAnalyses = [];
      }
      
      const MAX_ANALYSES = 50;  // Maximum number of individual reviews to store
      const MAX_BATCH_SIZE = 10; // Maximum number of reviews to save at once from a file
      
      if (file && analysisResult?.fileAnalysis?.reviews) {
        const fileReviews = analysisResult.fileAnalysis.reviews as Review[];
        const reviewsToSave = fileReviews.slice(0, MAX_BATCH_SIZE);
        
        const newAnalyses = reviewsToSave.map((review: any) => ({
          id: Date.now() + Math.random(),
          title: review.title || file.name,
          date: new Date().toISOString().split('T')[0],
          reviewCount: 1,
          sentiment: review.sentiment || {
            positive: 0,
            neutral: 0,
            negative: 0
          },
          keywords: review.keywords?.slice(0, 5) || [],
          reviewText: review.reviewText?.substring(0, 500) || "",
          source: 'excel',
          rating: review.rating || "0/5",
          sentimentLabel: review.sentimentLabel || "neutral",
          accuracyScore: review.accuracyScore || analysisResult.fileAnalysis.accuracyScore || 0
        }));
        
        const overallAnalysis = {
          id: Date.now(),
          title: file.name,
          date: new Date().toISOString().split('T')[0],
          reviewCount: analysisResult.fileAnalysis.totalReviews || 0,
          dataPoints: analysisResult.fileAnalysis.dataPoints || analysisResult.fileAnalysis.totalReviews || 0,
          sentiment: analysisResult.fileAnalysis.sentimentBreakdown || {
            positive: 0,
            neutral: 0, 
            negative: 0
          },
          keywords: (analysisResult.keyPhrases || []).slice(0, 5).map((phrase: string) => ({
            word: phrase,
            sentiment: analysisResult.overallSentiment?.sentiment || "neutral",
            count: 1
          })),
          accuracyScore: analysisResult.fileAnalysis.accuracyScore || 0
        };
        
        savedAnalyses = [overallAnalysis, ...newAnalyses, ...savedAnalyses.slice(0, MAX_ANALYSES - newAnalyses.length - 1)];
      } else {
        const newAnalysis = {
          id: Date.now(),
          title: file ? file.name : `Review Analysis ${new Date().toLocaleDateString()}`,
          date: new Date().toISOString().split('T')[0],
          reviewCount: analysisResult?.fileAnalysis?.totalReviews || 1,
          sentiment: analysisResult?.fileAnalysis?.sentimentBreakdown || {
            positive: analysisResult?.overallSentiment?.sentiment === 'positive' ? 100 : 0,
            neutral: analysisResult?.overallSentiment?.sentiment === 'neutral' ? 100 : 0,
            negative: analysisResult?.overallSentiment?.sentiment === 'negative' ? 100 : 0
          },
          keywords: (analysisResult?.keyPhrases || []).slice(0, 5).map((phrase: string) => ({
            word: phrase,
            sentiment: analysisResult?.overallSentiment?.sentiment || "neutral",
            count: 1
          })),
          reviewText: reviewText?.substring(0, 500) || "",
          source: 'text',
          accuracyScore: analysisResult?.fileAnalysis?.accuracyScore || 0
        };
        
        savedAnalyses.unshift(newAnalysis);
      }
      
      try {
        const dataString = JSON.stringify(savedAnalyses);
        const estimatedSize = new Blob([dataString]).size;
        
        if (estimatedSize > 4 * 1024 * 1024) {
          const reducedAnalyses = savedAnalyses.slice(0, Math.max(5, Math.floor(savedAnalyses.length / 2)));
          localStorage.setItem('rsa_saved_analyses', JSON.stringify(reducedAnalyses));
          
          toast({
            title: "Storage limit reached",
            description: "Some older analyses were removed to make space for new ones.",
          });
        } else {
          localStorage.setItem('rsa_saved_analyses', dataString);
        }
      } catch (storageError) {
        console.error("Storage error:", storageError);
        
        try {
          const minimalSave = [savedAnalyses[0]];
          localStorage.setItem('rsa_saved_analyses', JSON.stringify(minimalSave));
          
          toast({
            title: "Storage limit reached",
            description: "Only the most recent analysis could be saved. Previous analyses were removed.",
          });
        } catch (finalError) {
          throw new Error("Cannot save any data - storage completely full");
        }
      }
      
      toast({
        title: "Analysis saved",
        description: file ? 
          `${Math.min(MAX_BATCH_SIZE, analysisResult?.fileAnalysis?.totalReviews || 0)} reviews from the file have been saved to your dashboard.` : 
          "Your analysis has been saved to your dashboard.",
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error("Error saving to dashboard:", error);
      
      throw error;
    }
  };
  
  const handleStartOver = () => {
    setAnalysisState('input');
    setReviewText('');
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
              reviewText={reviewText}
              onReviewChange={handleReviewChange}
              characterCount={characterCount}
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
              onSave={handleSaveToDashboard}
              onStartOver={handleStartOver}
              displayMode={file && analysisResult.fileAnalysis.totalReviews > 10 ? 'table' : 'cards'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Demo;
