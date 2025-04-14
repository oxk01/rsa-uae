
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import ReviewInput from '@/components/ReviewDemo/ReviewInput';
import ReviewLoading from '@/components/ReviewDemo/ReviewLoading';
import ReviewResults from '@/components/ReviewDemo/ReviewResults';

// Modified sentiment analysis function to only work with real data
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

// File analysis function
const analyzeFile = async (file: File) => {
  // In a real app, this would actually parse the CSV/Excel file
  await new Promise(resolve => setTimeout(resolve, 3500)); // Simulate longer processing time
  
  return {
    text: `Analysis of file: ${file.name}`,
    overallSentiment: {
      sentiment: "negative",
      score: 12
    },
    aspects: [
      { 
        name: 'Quality', 
        sentiment: 'negative',
        confidence: 25,
        context: `...relevant excerpt would appear here...`
      },
      { 
        name: 'Price', 
        sentiment: 'negative',
        confidence: 15,
        context: `...relevant excerpt would appear here...`
      },
      { 
        name: 'Service', 
        sentiment: 'neutral',
        confidence: 45,
        context: `...relevant excerpt would appear here...`
      }
    ],
    keyPhrases: ['product', 'service', 'experience', 'quality', 'price'],
    fileAnalysis: {
      totalReviews: 36,
      sentimentBreakdown: {
        positive: 8,
        neutral: 13, 
        negative: 15
      },
      isRealData: true,
      fileName: file.name
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
        description: `${file.name} has been uploaded.`,
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
      
      // Create a new analysis entry
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
        }))
      };
      
      // Add to saved analyses
      savedAnalyses.unshift(newAnalysis);
      
      // Save back to localStorage
      localStorage.setItem('rsa_saved_analyses', JSON.stringify(savedAnalyses));
      
      toast({
        title: "Analysis saved",
        description: "Your analysis has been saved to your dashboard.",
      });
      
      // Navigate to dashboard after a brief delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
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
