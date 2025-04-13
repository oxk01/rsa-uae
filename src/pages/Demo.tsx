
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { UploadCloud, Save, Trash2, FileText, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock sentiment analysis function
const analyzeSentiment = async (text: string) => {
  // This would be replaced by a real API call to a sentiment analysis model
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
  
  // Generate mock results based on the text
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
  
  // Extract mock keywords
  const keywords = [];
  if (text.toLowerCase().includes('quality')) {
    keywords.push({ word: 'quality', sentiment: hasNegative ? 'negative' : 'positive' });
  }
  if (text.toLowerCase().includes('price')) {
    keywords.push({ word: 'price', sentiment: hasNegative ? 'negative' : 'neutral' });
  }
  if (text.toLowerCase().includes('delivery')) {
    keywords.push({ word: 'delivery', sentiment: hasNegative ? 'negative' : 'positive' });
  }
  if (text.toLowerCase().includes('customer')) {
    keywords.push({ word: 'customer service', sentiment: hasNegative ? 'negative' : 'positive' });
  }
  if (text.toLowerCase().includes('design')) {
    keywords.push({ word: 'design', sentiment: hasNegative ? 'negative' : 'positive' });
  }
  
  // Return the analysis result
  return {
    text,
    sentiment,
    confidenceScore,
    keywords: keywords.length > 0 ? keywords : [{ word: 'general', sentiment }]
  };
};

const Demo = () => {
  const [reviewText, setReviewText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast({
        title: "File uploaded",
        description: `${e.target.files[0].name} has been uploaded.`,
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
    
    setIsAnalyzing(true);
    
    try {
      let result;
      if (file) {
        // In a real app, you'd process the uploaded file here
        // For now, we'll just simulate it
        await new Promise(resolve => setTimeout(resolve, 2000));
        result = {
          text: "Multiple reviews from file",
          sentiment: "mixed",
          confidenceScore: 0.78,
          keywords: [
            { word: 'quality', sentiment: 'positive' },
            { word: 'shipping', sentiment: 'negative' },
            { word: 'price', sentiment: 'neutral' },
            { word: 'customer service', sentiment: 'positive' }
          ],
          fileAnalysis: {
            totalReviews: 25,
            sentimentBreakdown: {
              positive: 14,
              neutral: 6,
              negative: 5
            }
          }
        };
      } else {
        result = await analyzeSentiment(reviewText);
      }
      
      setAnalysisResult(result);
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your input. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleSave = async () => {
    if (!analysisResult) return;
    
    setIsSaving(true);
    
    try {
      // Get existing saved analyses from localStorage
      const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses');
      let savedAnalyses = savedAnalysesStr ? JSON.parse(savedAnalysesStr) : [];
      
      // Create a new analysis entry
      const newAnalysis = {
        id: Date.now(), // Use timestamp as a simple ID
        title: file ? file.name : `Review Analysis ${new Date().toLocaleDateString()}`,
        date: new Date().toISOString().split('T')[0],
        reviewCount: file ? analysisResult.fileAnalysis.totalReviews : 1,
        sentiment: file ? 
          analysisResult.fileAnalysis.sentimentBreakdown : 
          {
            positive: analysisResult.sentiment === 'positive' ? 1 : 0,
            neutral: analysisResult.sentiment === 'neutral' ? 1 : 0,
            negative: analysisResult.sentiment === 'negative' ? 1 : 0
          },
        keywords: analysisResult.keywords.map((k: any) => ({
          word: k.word,
          sentiment: k.sentiment,
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
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleReset = () => {
    setReviewText('');
    setFile(null);
    setAnalysisResult(null);
    
    toast({
      title: "Reset complete",
      description: "Your analysis has been cleared.",
    });
  };
  
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-100';
      case 'negative':
        return 'text-red-600 bg-red-100';
      case 'neutral':
        return 'text-gray-600 bg-gray-100';
      case 'mixed':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };
  
  // Apply RTL class for Arabic
  const rtlClass = language === 'ar' ? 'rtl' : '';
  
  return (
    <div className={`min-h-screen bg-gray-50 py-8 ${rtlClass}`}>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-6">{t('demo')}</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-medium mb-4">{t('inputReview')}</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('reviewText')}
                </label>
                <textarea
                  id="review"
                  rows={6}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder={t('enterReview')}
                  className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${language === 'ar' ? 'text-right' : 'text-left'}`}
                />
              </div>
              
              <div className="flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-sm text-gray-500">{t('or')}</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('uploadFile')}
                </label>
                <div className="mt-1 flex items-center">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 border border-gray-300 py-2 px-3 flex items-center"
                  >
                    <UploadCloud className="h-5 w-5 mr-2" />
                    <span>{file ? file.name : t('chooseFile')}</span>
                    <Input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {t('uploadDescription')}
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing || (!reviewText && !file)}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      {t('analyzing')}
                    </>
                  ) : (
                    t('analyze')
                  )}
                </Button>
                
                <Button variant="outline" onClick={handleReset}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  {t('reset')}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Results Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-medium mb-4">{t('results')}</h2>
            
            {!analysisResult ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">{t('enterReview')}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Overall Sentiment */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500">{t('overallSentiment')}</h3>
                  <div className="mt-2 flex items-center">
                    <div className={`px-3 py-1 rounded-md text-sm font-medium ${getSentimentColor(analysisResult.sentiment)}`}>
                      {t(analysisResult.sentiment)}
                    </div>
                    <div className="ml-3 text-sm text-gray-500">
                      {Math.round(analysisResult.confidenceScore * 100)}% {t('confidence')}
                    </div>
                  </div>
                </div>
                
                {/* File Analysis (if file was uploaded) */}
                {analysisResult.fileAnalysis && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">{t('fileAnalysis')}</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-700 mb-2">
                        {t('totalReviews')}: <span className="font-medium">{analysisResult.fileAnalysis.totalReviews}</span>
                      </p>
                      
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex flex-col items-center">
                          <div className="text-lg font-bold text-green-600">{analysisResult.fileAnalysis.sentimentBreakdown.positive}</div>
                          <div className="text-xs text-gray-500">{t('positive')}</div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="text-lg font-bold text-gray-600">{analysisResult.fileAnalysis.sentimentBreakdown.neutral}</div>
                          <div className="text-xs text-gray-500">{t('neutral')}</div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="text-lg font-bold text-red-600">{analysisResult.fileAnalysis.sentimentBreakdown.negative}</div>
                          <div className="text-xs text-gray-500">{t('negative')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Keywords */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500">{t('keyAspects')}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {analysisResult.keywords.map((keyword: any, index: number) => (
                      <div
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getSentimentColor(keyword.sentiment)}`}
                      >
                        {keyword.word}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Review Highlight */}
                {analysisResult.text !== "Multiple reviews from file" && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">{t('analyzedText')}</h3>
                    <p className={`mt-2 text-sm text-gray-700 p-3 bg-gray-50 rounded-md ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                      {analysisResult.text}
                    </p>
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex gap-3">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        {t('saving')}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        {t('saveToDashboard')}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
