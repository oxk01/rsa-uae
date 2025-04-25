
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import ReviewInput from '@/components/ReviewDemo/ReviewInput';
import ReviewLoading from '@/components/ReviewDemo/ReviewLoading';
import ReviewResults from '@/components/ReviewDemo/ReviewResults';
import { parseExcelFile, analyzeSentiment, extractKeywords, extractAspects } from '@/utils/excelParser';
import { Review, KeywordItem } from '@/types/review';

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
        
        const keywords = extractKeywords(review.reviewText, sentiment);
        const aspects = extractAspects(review.reviewText, sentiment);
        
        return {
          id: Date.now() + Math.random(),
          title: review.productId || 'Unknown Product',
          date: review.date || new Date().toISOString().split('T')[0],
          sentiment: {
            positive: sentiment === 'positive' ? score : 10,
            neutral: sentiment === 'neutral' ? score : 10,
            negative: sentiment === 'negative' ? score : 10
          },
          reviewCount: 1,
          rating: review.rating || '0/5',
          reviewText: review.reviewText,
          sentimentLabel: sentiment,
          accuracyScore: accuracy,
          keywords,
          aspects,
          helpfulnessRatio: review.helpfulnessNumerator && review.helpfulnessDenominator ? 
            `${review.helpfulnessNumerator}/${review.helpfulnessDenominator}` : undefined,
          verified: review.verified,
          userId: review.userId
        };
      });
      
      processedReviews.push(...chunkResults);
      
      const progress = Math.min(30 + Math.round(60 * ((i + chunk.length) / reviews.length)), 90);
      onProgressUpdate?.(progress, `Analyzed ${i + chunk.length} of ${reviews.length} reviews...`);
    }
    
    const avgAccuracy = Math.round(totalAccuracy / reviews.length);
    
    const aspectsData = processedReviews.reduce((acc: Record<string, any>, review) => {
      (review.aspects || []).forEach(aspect => {
        if (!acc[aspect.name]) {
          acc[aspect.name] = { positive: 0, neutral: 0, negative: 0, total: 0 };
        }
        acc[aspect.name][aspect.sentiment]++;
        acc[aspect.name].total++;
      });
      return acc;
    }, {});
    
    const keywordsData = processedReviews.reduce((acc: Record<string, any>, review) => {
      (review.keywords || []).forEach(keyword => {
        if (!acc[keyword.word]) {
          acc[keyword.word] = { count: 0, sentiment: keyword.sentiment };
        }
        acc[keyword.word].count++;
      });
      return acc;
    }, {});
    
    const formattedAspectsData = Object.entries(aspectsData).map(([name, data]: [string, any]) => ({
      aspect: name,
      count: data.total,
      sentiment: data.positive > data.negative ? 'positive' : 'negative',
      positive: Math.round((data.positive / data.total) * 100),
      neutral: Math.round((data.neutral / data.total) * 100),
      negative: Math.round((data.negative / data.total) * 100),
    }));
    
    const formattedKeywordsData = Object.entries(keywordsData)
      .map(([word, data]: [string, any]) => ({
        text: word,
        value: data.count,
        sentiment: data.sentiment
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 100);
    
    const total = totalPositive + totalNeutral + totalNegative;
    const sentimentPercentages = {
      positive: Math.round((totalPositive / total) * 100),
      neutral: Math.round((totalNeutral / total) * 100),
      negative: Math.round((totalNegative / total) * 100)
    };
    
    const result = {
      overallSentiment: {
        sentiment: totalPositive > totalNegative ? "positive" : "negative",
        score: Math.round(((totalPositive - totalNegative) / reviews.length + 1) * 50)
      },
      fileAnalysis: {
        totalReviews: reviews.length,
        sentimentBreakdown: sentimentPercentages,
        accuracyScore: avgAccuracy,
        reviews: processedReviews,
        aspects: formattedAspectsData,
        keywords: formattedKeywordsData,
        dataPoints: reviews.length
      }
    };
    
    try {
      localStorage.setItem('rsa_current_analysis', JSON.stringify(result));
    } catch (storageError) {
      console.warn("Could not save to localStorage:", storageError);
    }
    
    onProgressUpdate?.(100, "Analysis complete!");
    return result;
    
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
      
      try {
        const summary = {
          id: Date.now(),
          fileName: file.name,
          date: new Date().toISOString(),
          totalReviews: result.fileAnalysis.totalReviews,
          sentimentBreakdown: result.fileAnalysis.sentimentBreakdown,
          overallSentiment: result.overallSentiment,
          // Fix: Use fileAnalysis.keywords instead of keyPhrases which doesn't exist
          keyPhrases: result.fileAnalysis.keywords,
          // Fix: Use fileAnalysis.aspects which is where aspects are stored
          aspects: result.fileAnalysis.aspects,
          sampleReviews: result.fileAnalysis.reviews.slice(0, 20)
        };
        
        const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses') || '[]';
        const savedAnalyses = JSON.parse(savedAnalysesStr);
        
        const updatedAnalyses = [summary, ...savedAnalyses.slice(0, 9)];
        localStorage.setItem('rsa_saved_analyses', JSON.stringify(updatedAnalyses));
        
        localStorage.setItem('rsa_current_analysis', JSON.stringify(result));
      } catch (storageError) {
        console.warn("Could not save to localStorage:", storageError);
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
