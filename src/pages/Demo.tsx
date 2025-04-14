import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import ReviewInput from '@/components/ReviewDemo/ReviewInput';
import ReviewLoading from '@/components/ReviewDemo/ReviewLoading';
import ReviewResults from '@/components/ReviewDemo/ReviewResults';
import { parseExcelFile, analyzeSentiment, extractKeywords, ParsedReview } from '@/utils/excelParser';
import { KeywordItem } from '@/components/RecentReviews/types';

// Analysis for single text reviews
const analyzeSentimentForText = async (text: string) => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500)); 
  
  const { sentiment, score, accuracy } = analyzeSentiment(text);
  
  // Identify aspects in the review
  const aspects = [];
  
  if (text.toLowerCase().includes('quality')) {
    aspects.push({ 
      name: 'Quality', 
      sentiment: sentiment,
      confidence: accuracy,
      context: text.substring(Math.max(0, text.toLowerCase().indexOf('quality') - 30), 
                 Math.min(text.length, text.toLowerCase().indexOf('quality') + 30))
    });
  }
  
  if (text.toLowerCase().includes('price')) {
    aspects.push({ 
      name: 'Price', 
      sentiment: sentiment,
      confidence: accuracy,
      context: text.substring(Math.max(0, text.toLowerCase().indexOf('price') - 30), 
                 Math.min(text.length, text.toLowerCase().indexOf('price') + 30))
    });
  }
  
  if (text.toLowerCase().includes('service') || text.toLowerCase().includes('support')) {
    aspects.push({ 
      name: 'Service', 
      sentiment: sentiment,
      confidence: accuracy,
      context: text.substring(Math.max(0, text.toLowerCase().indexOf('service') - 30), 
                 Math.min(text.length, text.toLowerCase().indexOf('service') + 30))
    });
  }
  
  // Always include an "Overall" aspect
  if (aspects.length === 0) {
    aspects.push({ 
      name: 'Overall', 
      sentiment: sentiment,
      confidence: accuracy,
      context: text.substring(0, Math.min(60, text.length))
    });
  }
  
  // Extract keywords from the text
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

// Analysis function for Excel files - optimized for large datasets
const analyzeFile = async (file: File, onProgressUpdate?: (progress: number, status: string) => void) => {
  try {
    // Progress update
    onProgressUpdate?.(10, "Reading Excel file...");
    
    // Parse the Excel file
    const reviews = await parseExcelFile(file);
    
    onProgressUpdate?.(30, `Processing ${reviews.length} reviews...`);
    
    let totalPositive = 0;
    let totalNeutral = 0;
    let totalNegative = 0;
    let totalAccuracy = 0;
    
    // Process reviews in chunks to avoid blocking the UI
    const processedReviews = [];
    const CHUNK_SIZE = 100; // Process 100 reviews at a time
    
    for (let i = 0; i < reviews.length; i += CHUNK_SIZE) {
      const chunk = reviews.slice(i, Math.min(i + CHUNK_SIZE, reviews.length));
      
      // Process each review in the chunk
      const chunkResults = chunk.map(review => {
        const { sentiment, score, accuracy } = analyzeSentiment(review.reviewText);
        
        if (sentiment === 'positive') totalPositive++;
        else if (sentiment === 'negative') totalNegative++;
        else totalNeutral++;
        
        totalAccuracy += accuracy;
        
        // Calculate rating
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
          // Generate rating based on sentiment
          const sentimentRating = sentiment === 'positive' ? 
                            Math.floor(Math.random() * 2) + 4 : // 4-5
                            sentiment === 'negative' ?
                            Math.floor(Math.random() * 2) + 1 : // 1-2
                            3; // neutral = 3
          ratingValue = `${sentimentRating}/5`;
        }
        
        // Extract keywords
        const keywords = extractKeywords(review.reviewText, sentiment);
        
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
          keywords: keywords
        };
      });
      
      processedReviews.push(...chunkResults);
      
      // Update progress
      const progress = Math.min(30 + Math.round(60 * ((i + chunk.length) / reviews.length)), 90);
      onProgressUpdate?.(progress, `Analyzed ${i + chunk.length} of ${reviews.length} reviews...`);
      
      // Pause briefly to allow UI updates
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    // Calculate the average accuracy
    const avgAccuracy = Math.round(totalAccuracy / reviews.length);
    
    // Create overall aspects
    const aspects = [
      {
        name: 'Overall',
        sentiment: totalPositive > totalNegative ? 'positive' : 'negative',
        confidence: 70,
        context: `Analysis of ${reviews.length} reviews from file ${file.name}`
      }
    ];
    
    // Compile all keywords and find the most frequent ones
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
    
    // Get top keywords
    const topKeywords = Object.entries(allKeywords)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, 5)
      .map(([word]) => word);
    
    onProgressUpdate?.(100, "Analysis complete!");
    
    // Return the final analysis result
    return {
      text: `Analysis of file: ${file.name}`,
      overallSentiment: {
        sentiment: totalPositive > totalNegative ? "positive" : totalNegative > totalPositive ? "negative" : "neutral",
        score: Math.round(((totalPositive - totalNegative) / reviews.length + 1) * 50)
      },
      aspects: aspects,
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
      const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses');
      let savedAnalyses = savedAnalysesStr ? JSON.parse(savedAnalysesStr) : [];
      
      if (file && analysisResult.fileAnalysis.reviews) {
        const newAnalyses = analysisResult.fileAnalysis.reviews.map((review: any) => ({
          id: Date.now() + Math.random(),
          title: review.title || file.name,
          date: review.date || new Date().toISOString().split('T')[0],
          reviewCount: 1,
          sentiment: review.sentiment,
          keywords: review.keywords,
          reviewText: review.reviewText,
          source: 'excel',
          rating: review.rating,
          sentimentLabel: review.sentimentLabel,
          accuracyScore: review.accuracyScore || analysisResult.fileAnalysis.accuracyScore
        }));
        
        // Compile all keywords and find the most frequent ones
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
        
        const overallAnalysis = {
          id: Date.now(),
          title: file.name,
          date: new Date().toISOString().split('T')[0],
          reviewCount: analysisResult.fileAnalysis.totalReviews,
          dataPoints: analysisResult.fileAnalysis.dataPoints,
          sentiment: analysisResult.fileAnalysis.sentimentBreakdown,
          keywords: analysisResult.keyPhrases.map((phrase: string) => ({
            word: phrase,
            sentiment: analysisResult.overallSentiment.sentiment,
            count: 1
          })),
          accuracyScore: analysisResult.fileAnalysis.accuracyScore
        };
        
        savedAnalyses = [...newAnalyses, overallAnalysis, ...savedAnalyses];
      } else {
        const newAnalysis = {
          id: Date.now(),
          title: file ? file.name : `Review Analysis ${new Date().toLocaleDateString()}`,
          date: new Date().toISOString().split('T')[0],
          reviewCount: analysisResult.fileAnalysis.totalReviews,
          sentiment: analysisResult.fileAnalysis.sentimentBreakdown,
          keywords: analysisResult.keyPhrases.map((phrase: string) => ({
            word: phrase,
            sentiment: analysisResult.overallSentiment.sentiment,
            count: 1
          })),
          reviewText: reviewText,
          source: 'text',
          accuracyScore: analysisResult.fileAnalysis.accuracyScore
        };
        
        savedAnalyses.unshift(newAnalysis);
      }
      
      localStorage.setItem('rsa_saved_analyses', JSON.stringify(savedAnalyses));
      
      toast({
        title: "Analysis saved",
        description: file ? 
          `All ${analysisResult.fileAnalysis.totalReviews} reviews from the file have been saved to your dashboard.` : 
          "Your analysis has been saved to your dashboard.",
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error("Error saving to dashboard:", error);
      toast({
        title: "Save failed",
        description: "There was an error saving your analysis. Please try again.",
        variant: "destructive",
      });
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
