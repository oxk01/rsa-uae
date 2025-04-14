import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import ReviewInput from '@/components/ReviewDemo/ReviewInput';
import ReviewLoading from '@/components/ReviewDemo/ReviewLoading';
import ReviewResults from '@/components/ReviewDemo/ReviewResults';
import { parseExcelFile, analyzeSentiment, extractKeywords, ParsedReview } from '@/utils/excelParser';

const analyzeSentimentForText = async (text: string) => {
  await new Promise(resolve => setTimeout(resolve, 1500)); 
  
  const { sentiment, score, accuracy } = analyzeSentiment(text);
  
  const aspects = [];
  
  if (text.toLowerCase().includes('quality')) {
    aspects.push({ 
      name: 'Quality', 
      sentiment: sentiment,
      confidence: Math.floor(Math.random() * 40) + 10,
      context: text.substring(Math.max(0, text.toLowerCase().indexOf('quality') - 30), 
                 Math.min(text.length, text.toLowerCase().indexOf('quality') + 30))
    });
  }
  
  if (text.toLowerCase().includes('price')) {
    aspects.push({ 
      name: 'Price', 
      sentiment: sentiment,
      confidence: Math.floor(Math.random() * 40) + 10,
      context: text.substring(Math.max(0, text.toLowerCase().indexOf('price') - 30), 
                 Math.min(text.length, text.toLowerCase().indexOf('price') + 30))
    });
  }
  
  if (text.toLowerCase().includes('service') || text.toLowerCase().includes('support')) {
    aspects.push({ 
      name: 'Service', 
      sentiment: sentiment === 'positive' ? 'positive' : 'negative',
      confidence: Math.floor(Math.random() * 40) + 10,
      context: text.substring(Math.max(0, text.toLowerCase().indexOf('service') - 30), 
                 Math.min(text.length, text.toLowerCase().indexOf('service') + 30))
    });
  }
  
  if (aspects.length === 0) {
    aspects.push({ 
      name: 'Overall', 
      sentiment: sentiment,
      confidence: Math.floor(Math.random() * 40) + 10,
      context: text.substring(0, Math.min(60, text.length))
    });
  }
  
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

const analyzeFile = async (file: File) => {
  try {
    const reviews = await parseExcelFile(file);
    let totalPositive = 0;
    let totalNeutral = 0;
    let totalNegative = 0;
    let totalAccuracy = 0;
    
    const processedReviews = reviews.map(review => {
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
                          Math.floor(Math.random() * 2) + 4 : // 4-5
                          sentiment === 'negative' ?
                          Math.floor(Math.random() * 2) + 1 : // 1-2
                          3; // neutral = 3
        ratingValue = `${sentimentRating}/5`;
      }
      
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
    
    const avgAccuracy = Math.round(totalAccuracy / reviews.length);
    
    const aspects = [
      {
        name: 'Overall',
        sentiment: totalPositive > totalNegative ? 'positive' : 'negative',
        confidence: 70,
        context: `Analysis of ${reviews.length} reviews from file ${file.name}`
      }
    ];
    
    const allKeywords = processedReviews
      .flatMap(r => r.keywords)
      .reduce((acc: Record<string, { count: number, sentiment: string }>, curr) => {
        if (!acc[curr.word]) {
          acc[curr.word] = { count: 0, sentiment: curr.sentiment };
        }
        acc[curr.word].count++;
        return acc;
      }, {});
    
    const topKeywords = Object.entries(allKeywords)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, 5)
      .map(([word, data]) => word);
    
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
    
    try {
      let result;
      
      if (file) {
        result = await analyzeFile(file);
      } else {
        result = await analyzeSentimentForText(reviewText);
      }
      
      setAnalysisResult(result);
      setAnalysisState('results');
      
      toast({
        title: "Analysis complete",
        description: file 
          ? `Successfully analyzed ${result.fileAnalysis.totalReviews} reviews and ${result.fileAnalysis.dataPoints || 0} data points with ${result.fileAnalysis.accuracyScore}% accuracy.` 
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
            <ReviewLoading />
          )}
          
          {analysisState === 'results' && analysisResult && (
            <ReviewResults 
              result={analysisResult}
              onSave={handleSaveToDashboard}
              onStartOver={handleStartOver}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Demo;
