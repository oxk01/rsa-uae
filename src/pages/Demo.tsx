
import React, { useState, useCallback } from 'react';
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
    
    // Increase chunk size for better performance with large datasets
    const CHUNK_SIZE = Math.min(2500, Math.ceil(reviews.length / 10));
    
    // We'll use a worker array to process chunks in parallel
    const workerPromises = [];
    
    const processChunk = async (chunk: Array<any>, chunkIndex: number) => {
      const results = chunk.map(review => {
        const { sentiment, score, accuracy } = analyzeSentiment(review.reviewText);
        
        if (sentiment === 'positive') totalPositive++;
        else if (sentiment === 'negative') totalNegative++;
        else totalNeutral++;
        
        totalAccuracy += accuracy;
        
        // For large datasets, limit keywords and aspects extraction to improve performance
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
      
      const progress = Math.min(30 + Math.round(60 * ((chunkIndex * CHUNK_SIZE + chunk.length) / reviews.length)), 90);
      onProgressUpdate?.(progress, `Analyzed ${chunkIndex * CHUNK_SIZE + chunk.length} of ${reviews.length} reviews...`);
      
      return results;
    };
    
    // Split the reviews into chunks and create promises
    for (let i = 0; i < reviews.length; i += CHUNK_SIZE) {
      const chunk = reviews.slice(i, Math.min(i + CHUNK_SIZE, reviews.length));
      const chunkIndex = Math.floor(i / CHUNK_SIZE);
      
      // Process each chunk with a small delay to prevent UI freezing
      workerPromises.push(
        new Promise<any[]>(resolve => {
          setTimeout(() => {
            resolve(processChunk(chunk, chunkIndex));
          }, chunkIndex * 5); // Small staggered delay to prevent UI freezes
        })
      );
    }
    
    // Wait for all chunks to process
    const allChunkResults = await Promise.all(workerPromises);
    
    // Combine all chunk results
    allChunkResults.forEach(chunkResult => {
      processedReviews.push(...chunkResult);
    });
    
    const avgAccuracy = Math.round(totalAccuracy / reviews.length);
    
    // Process aspects data in a more memory-efficient way
    const aspectsMap = new Map<string, { positive: number, neutral: number, negative: number, total: number }>();
    
    // Process keywords data in a more memory-efficient way
    const keywordsMap = new Map<string, { count: number, sentiment: string }>();
    
    // Process each review for aspects and keywords
    processedReviews.forEach(review => {
      // Process aspects
      (review.aspects || []).forEach((aspect: any) => {
        const name = aspect.name;
        if (!aspectsMap.has(name)) {
          aspectsMap.set(name, { positive: 0, neutral: 0, negative: 0, total: 0 });
        }
        
        const aspectData = aspectsMap.get(name)!;
        aspectData[aspect.sentiment as 'positive' | 'neutral' | 'negative']++;
        aspectData.total++;
      });
      
      // Process keywords
      (review.keywords || []).forEach((keyword: any) => {
        const word = keyword.word;
        if (!keywordsMap.has(word)) {
          keywordsMap.set(word, { count: 0, sentiment: keyword.sentiment });
        }
        
        const keywordData = keywordsMap.get(word)!;
        keywordData.count++;
      });
    });
    
    // Convert maps to arrays
    const formattedAspectsData = Array.from(aspectsMap.entries()).map(([name, data]) => ({
      aspect: name,
      count: data.total,
      sentiment: data.positive > data.negative ? 'positive' : 'negative',
      positive: Math.round((data.positive / data.total) * 100),
      neutral: Math.round((data.neutral / data.total) * 100),
      negative: Math.round((data.negative / data.total) * 100),
    }));
    
    const formattedKeywordsData = Array.from(keywordsMap.entries())
      .map(([word, data]) => ({
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
    
    // For large datasets, we'll limit the number of reviews stored to improve performance
    const maxReviewsToStore = reviews.length > 10000 ? 500 : (reviews.length > 5000 ? 1000 : 2000);
    
    const result = {
      overallSentiment: {
        sentiment: totalPositive > totalNegative ? "positive" : "negative",
        score: Math.round(((totalPositive - totalNegative) / reviews.length + 1) * 50)
      },
      fileAnalysis: {
        totalReviews: reviews.length,
        sentimentBreakdown: sentimentPercentages,
        accuracyScore: avgAccuracy,
        reviews: processedReviews.slice(0, maxReviewsToStore), // Limit number of reviews stored
        aspects: formattedAspectsData,
        keywords: formattedKeywordsData,
        dataPoints: reviews.length
      }
    };
    
    try {
      // For large datasets, store a simplified version in localStorage to prevent quota errors
      if (reviews.length > 5000) {
        const simplifiedResult = {
          overallSentiment: result.overallSentiment,
          fileAnalysis: {
            ...result.fileAnalysis,
            reviews: result.fileAnalysis.reviews.slice(0, 250) // Store even fewer reviews for very large datasets
          }
        };
        localStorage.setItem('rsa_current_analysis', JSON.stringify(simplifiedResult));
      } else {
        localStorage.setItem('rsa_current_analysis', JSON.stringify(result));
      }
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
  
  const handleFileChange = useCallback((file: File | null) => {
    if (file) {
      setFile(file);
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded for analysis. Ready to process all data points.`,
      });
    }
  }, [toast]);
  
  const handleProgressUpdate = useCallback((newProgress: number, newStatus: string) => {
    setProgress(newProgress);
    setStatus(newStatus);
  }, []);
  
  const handleAnalyze = useCallback(async () => {
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
      // For large files, provide a special message
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 10) {
        toast({
          title: "Large File Detected",
          description: `Processing a ${fileSizeMB.toFixed(1)}MB file may take several minutes. Please be patient.`,
        });
      }
      
      const result = await analyzeFile(file, handleProgressUpdate);
      
      setAnalysisResult(result);
      setAnalysisState('results');
      
      try {
        // Create a lightweight summary for localStorage
        const summary = {
          id: Date.now(),
          fileName: file.name,
          date: new Date().toISOString(),
          totalReviews: result.fileAnalysis.totalReviews,
          sentimentBreakdown: result.fileAnalysis.sentimentBreakdown,
          overallSentiment: result.overallSentiment,
          keyPhrases: result.fileAnalysis.keywords.slice(0, 20),
          aspects: result.fileAnalysis.aspects.slice(0, 10),
          sampleReviews: result.fileAnalysis.reviews.slice(0, 10)
        };
        
        const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses') || '[]';
        const savedAnalyses = JSON.parse(savedAnalysesStr);
        
        const updatedAnalyses = [summary, ...savedAnalyses.slice(0, 5)]; // Limit to 6 saved analyses
        localStorage.setItem('rsa_saved_analyses', JSON.stringify(updatedAnalyses));
        
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
  }, [file, toast, handleProgressUpdate]);
  
  const handleStartOver = useCallback(() => {
    setAnalysisState('input');
    setFile(null);
    setAnalysisResult(null);
    setProgress(0);
    setStatus('');
  }, []);
  
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
