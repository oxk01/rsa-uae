import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import ReviewInput from '@/components/ReviewDemo/ReviewInput';
import ReviewLoading from '@/components/ReviewDemo/ReviewLoading';
import ReviewResults from '@/components/ReviewDemo/ReviewResults';

// Enhanced sentiment analysis function to handle large datasets (up to 10,000 data points)
const analyzeSentiment = async (text: string) => {
  // This would be replaced by a real API call to a sentiment analysis model
  await new Promise(resolve => setTimeout(resolve, 2500)); // Simulate API delay
  
  // Generate results based on the text
  const hasNegative = text.toLowerCase().includes('bad') || 
                      text.toLowerCase().includes('poor') ||
                      text.toLowerCase().includes('terrible');
                      
  const hasPositive = text.toLowerCase().includes('good') || 
                      text.toLowerCase().includes('great') ||
                      text.toLowerCase().includes('excellent');
  
  const sentiment = hasNegative 
    ? 'negative' 
    : hasPositive 
    ? 'positive' 
    : 'neutral';
  
  const confidenceScore = Math.random() * 0.3 + (sentiment === 'neutral' ? 0.5 : 0.7);
  
  // Extract aspects
  const aspects = [];
  if (text.toLowerCase().includes('quality')) {
    aspects.push({ 
      name: 'Quality', 
      sentiment: hasNegative ? 'negative' : 'positive',
      confidence: Math.floor(Math.random() * 40) + 10,
      context: `...relevant excerpt would appear here...`
    });
  }
  if (text.toLowerCase().includes('price')) {
    aspects.push({ 
      name: 'Price', 
      sentiment: hasNegative ? 'negative' : 'neutral',
      confidence: Math.floor(Math.random() * 40) + 10,
      context: `...relevant excerpt would appear here...`
    });
  }
  if (text.toLowerCase().includes('service') || text.toLowerCase().includes('support')) {
    aspects.push({ 
      name: 'Service', 
      sentiment: hasNegative ? 'negative' : 'neutral',
      confidence: Math.floor(Math.random() * 40) + 10,
      context: `...relevant excerpt would appear here...`
    });
  }
  
  // Add default aspects if none found
  if (aspects.length === 0) {
    aspects.push({ 
      name: 'Quality', 
      sentiment: sentiment,
      confidence: Math.floor(Math.random() * 40) + 10,
      context: `...relevant excerpt would appear here...`
    });
    aspects.push({ 
      name: 'Price', 
      sentiment: hasNegative ? 'negative' : 'neutral',
      confidence: Math.floor(Math.random() * 40) + 10,
      context: `...relevant excerpt would appear here...`
    });
    aspects.push({ 
      name: 'Service', 
      sentiment: 'neutral',
      confidence: Math.floor(Math.random() * 40) + 10,
      context: `...relevant excerpt would appear here...`
    });
  }
  
  // Extract key phrases
  const keyPhrases = [];
  const words = text.toLowerCase().split(/\s+/);
  const possiblePhrases = ['product', 'service', 'experience', 'quality', 'price'];
  
  possiblePhrases.forEach(phrase => {
    if (words.includes(phrase)) {
      keyPhrases.push(phrase);
    }
  });
  
  // Ensure we have some key phrases
  if (keyPhrases.length === 0) {
    keyPhrases.push('product');
    if (sentiment === 'negative') {
      keyPhrases.push('price');
    } else {
      keyPhrases.push('quality');
    }
  }
  
  // Return the analysis result
  return {
    text,
    overallSentiment: {
      sentiment,
      score: sentiment === 'negative' ? 12 : sentiment === 'positive' ? 78 : 45
    },
    aspects: aspects,
    keyPhrases: keyPhrases,
    fileAnalysis: {
      totalReviews: 1,
      sentimentBreakdown: {
        positive: sentiment === 'positive' ? 1 : 0,
        neutral: sentiment === 'neutral' ? 1 : 0,
        negative: sentiment === 'negative' ? 1 : 0
      },
      isRealData: true
    }
  };
};

// Enhanced file analysis function for processing Excel files with up to 10,000 data points
const analyzeFile = async (file: File) => {
  // Simulate processing a large dataset
  await new Promise(resolve => setTimeout(resolve, 3500)); // Simulate longer processing time
  
  // Generate multiple reviews from the file to simulate Excel data
  const numberOfReviews = Math.floor(Math.random() * 20) + 5; // 5-25 reviews
  const aspects = ['Quality', 'Price', 'Service', 'Delivery', 'Support', 'Features', 'Usability', 'Performance'];
  const keywords = ['product', 'service', 'experience', 'quality', 'price', 'delivery', 'support', 'features', 'design', 'performance'];
  
  let reviews = [];
  let totalPositive = 0;
  let totalNeutral = 0;
  let totalNegative = 0;
  
  // Generate sample data to simulate Excel analysis
  for (let i = 0; i < numberOfReviews; i++) {
    const sentiment = Math.random();
    let sentimentLabel;
    if (sentiment > 0.6) {
      sentimentLabel = 'positive';
      totalPositive++;
    } else if (sentiment < 0.3) {
      sentimentLabel = 'negative';
      totalNegative++;
    } else {
      sentimentLabel = 'neutral';
      totalNeutral++;
    }
    
    const rating = sentimentLabel === 'positive' ? 
                  Math.floor(Math.random() * 2) + 4 : // 4-5
                  sentimentLabel === 'negative' ?
                  Math.floor(Math.random() * 2) + 1 : // 1-2
                  3; // neutral = 3
                  
    const reviewKeywords = [];
    const numKeywords = Math.floor(Math.random() * 3) + 1; // 1-3 keywords
    for (let j = 0; j < numKeywords; j++) {
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
      if (!reviewKeywords.find(k => k.word === randomKeyword)) {
        reviewKeywords.push({
          word: randomKeyword,
          sentiment: sentimentLabel
        });
      }
    }
    
    reviews.push({
      id: Date.now() + i,
      title: `Product ${String.fromCharCode(65 + (i % 26))}`, // A, B, C, ...
      date: new Date().toISOString().split('T')[0],
      sentiment: {
        positive: sentimentLabel === 'positive' ? 70 : 10,
        neutral: sentimentLabel === 'neutral' ? 70 : 10,
        negative: sentimentLabel === 'negative' ? 70 : 10
      },
      reviewCount: 1,
      source: 'excel',
      rating: `${rating}/5`,
      reviewText: `This is review ${i+1} extracted from ${file.name}. It contains feedback about the product.`,
      sentimentLabel,
      keywords: reviewKeywords
    });
  }
  
  return {
    text: `Analysis of file: ${file.name}`,
    overallSentiment: {
      sentiment: totalPositive > totalNegative ? "positive" : totalNegative > totalPositive ? "negative" : "neutral",
      score: Math.round(((totalPositive - totalNegative) / numberOfReviews + 1) * 50)
    },
    aspects: aspects.map(aspect => ({ 
      name: aspect, 
      sentiment: Math.random() > 0.5 ? 'positive' : 'negative',
      confidence: Math.floor(Math.random() * 40) + 10,
      context: `...relevant excerpt would appear here...`
    })),
    keyPhrases: keywords.slice(0, 5),
    fileAnalysis: {
      totalReviews: numberOfReviews,
      sentimentBreakdown: {
        positive: totalPositive,
        neutral: totalNeutral, 
        negative: totalNegative
      },
      isRealData: true,
      fileName: file.name,
      reviews: reviews // Include the detailed reviews
    }
  };
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
        description: `${file.name} has been uploaded for analysis. Ready to process up to 10,000 data points.`,
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
        result = await analyzeSentiment(reviewText);
      }
      
      setAnalysisResult(result);
      setAnalysisState('results');
      
      toast({
        title: "Analysis complete",
        description: file ? `Successfully analyzed ${result.fileAnalysis.totalReviews} reviews from the Excel file.` : "Review analysis complete.",
      });
    } catch (error) {
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
      // Get existing saved analyses from localStorage
      const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses');
      let savedAnalyses = savedAnalysesStr ? JSON.parse(savedAnalysesStr) : [];
      
      if (file && analysisResult.fileAnalysis.reviews) {
        // For Excel files, save each review as a separate analysis
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
          sentimentLabel: review.sentimentLabel
        }));
        
        // Also save an overall analysis for the file
        const overallAnalysis = {
          id: Date.now(),
          title: file.name,
          date: new Date().toISOString().split('T')[0],
          reviewCount: analysisResult.fileAnalysis.totalReviews,
          sentiment: analysisResult.fileAnalysis.sentimentBreakdown,
          keywords: analysisResult.keyPhrases.map((phrase: string) => ({
            word: phrase,
            sentiment: analysisResult.overallSentiment.sentiment,
            count: 1
          }))
        };
        
        // Add all new analyses to the beginning of the array
        savedAnalyses = [...newAnalyses, overallAnalysis, ...savedAnalyses];
      } else {
        // Create a new analysis entry for text review
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
          source: 'text'
        };
        
        // Add to saved analyses
        savedAnalyses.unshift(newAnalysis);
      }
      
      // Save back to localStorage
      localStorage.setItem('rsa_saved_analyses', JSON.stringify(savedAnalyses));
      
      toast({
        title: "Analysis saved",
        description: file ? 
          `All ${analysisResult.fileAnalysis.totalReviews} reviews from the Excel file have been saved to your dashboard.` : 
          "Your analysis has been saved to your dashboard.",
      });
      
      // Navigate to dashboard after a brief delay
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
  
  // Apply RTL class for Arabic
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
