import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from '@/components/DashboardCard';
import StatCard from '@/components/StatCard';
import DashboardCharts from '@/components/DashboardCharts';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart3, Trash2, MessageCircle, Star, Clock, Smile, ChevronUp, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Analysis {
  id: number;
  title: string;
  date: string;
  reviewCount: number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  keywords: {
    word: string;
    sentiment: string;
    count: number;
  }[];
}

const Dashboard = () => {
  const [savedAnalyses, setSavedAnalyses] = useState<Analysis[]>([]);
  const [expandedAnalysis, setExpandedAnalysis] = useState<number | null>(null);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  useEffect(() => {
    const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses');
    if (savedAnalysesStr) {
      const analyses = JSON.parse(savedAnalysesStr);
      setSavedAnalyses(analyses);
    }
  }, []);
  
  const deleteAnalysis = (id: number) => {
    const updatedAnalyses = savedAnalyses.filter(analysis => analysis.id !== id);
    setSavedAnalyses(updatedAnalyses);
    localStorage.setItem('rsa_saved_analyses', JSON.stringify(updatedAnalyses));
    toast({
      title: "Analysis deleted",
      description: "The analysis has been removed from your dashboard.",
    });
  };
  
  const toggleExpand = (id: number) => {
    if (expandedAnalysis === id) {
      setExpandedAnalysis(null);
    } else {
      setExpandedAnalysis(id);
    }
  };
  
  const totalReviewsCount = savedAnalyses.reduce((acc, analysis) => acc + analysis.reviewCount, 0);

  const calculateAvgSentiment = () => {
    if (savedAnalyses.length === 0) return "0%";
    
    const totalPositive = savedAnalyses.reduce((sum, a) => sum + a.sentiment.positive, 0);
    const totalReviews = savedAnalyses.reduce((sum, a) => sum + a.reviewCount, 0);
    
    return totalReviews > 0 ? `${Math.round((totalPositive / totalReviews) * 100)}%` : "0%";
  };

  const rtlClass = language === 'ar' ? 'rtl' : '';
  
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 py-8`}>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-6">{t('dashboard')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title={t('totalReviews')}
            value={totalReviewsCount.toString()}
            icon={<MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          />
          <StatCard 
            title="Average Sentiment" 
            value={calculateAvgSentiment()} 
            icon={<Star className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          />
          <StatCard 
            title="Recent Analyses" 
            value={savedAnalyses.length.toString()}
            icon={<Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          />
          <StatCard 
            title="Sentiment Trend" 
            value={savedAnalyses.length > 0 ? "Based on data" : "No data"} 
            icon={<Smile className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          />
        </div>
        
        {savedAnalyses.length > 0 ? (
          <DashboardCharts />
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center mb-8">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No analysis data available for charts.</p>
          </div>
        )}
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('savedAnalyses')}</h2>
          
          {savedAnalyses.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't saved any analyses yet.</p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link to="/demo">{t('analyzeNewReviews')}</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {savedAnalyses.map((analysis) => (
                <div key={analysis.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                  <div 
                    className="p-4 cursor-pointer flex justify-between items-center"
                    onClick={() => toggleExpand(analysis.id)}
                  >
                    <div>
                      <h3 className="font-semibold">{analysis.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {analysis.date} • {analysis.reviewCount} {t('totalReviews').toLowerCase()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteAnalysis(analysis.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="ml-2">
                        {expandedAnalysis === analysis.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {expandedAnalysis === analysis.id && (
                    <div className="p-4 pt-0 border-t border-gray-100 dark:border-gray-700">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DashboardCard
                          title="Sentiment Distribution"
                          icon={<BarChart3 className="h-4 w-4" />}
                        >
                          <div className="flex h-40 items-end gap-2">
                            <div className="flex flex-col items-center">
                              <div 
                                className="w-16 bg-green-500 rounded-t-md"
                                style={{ height: `${(analysis.sentiment.positive / analysis.reviewCount) * 100}%` }}
                              ></div>
                              <p className="text-xs mt-2">{t('positive')}</p>
                              <p className="font-semibold">{analysis.sentiment.positive}</p>
                            </div>
                            <div className="flex flex-col items-center">
                              <div 
                                className="w-16 bg-gray-300 dark:bg-gray-500 rounded-t-md"
                                style={{ height: `${(analysis.sentiment.neutral / analysis.reviewCount) * 100}%` }}
                              ></div>
                              <p className="text-xs mt-2">{t('neutral')}</p>
                              <p className="font-semibold">{analysis.sentiment.neutral}</p>
                            </div>
                            <div className="flex flex-col items-center">
                              <div 
                                className="w-16 bg-red-500 rounded-t-md"
                                style={{ height: `${(analysis.sentiment.negative / analysis.reviewCount) * 100}%` }}
                              ></div>
                              <p className="text-xs mt-2">{t('negative')}</p>
                              <p className="font-semibold">{analysis.sentiment.negative}</p>
                            </div>
                          </div>
                        </DashboardCard>
                        
                        <DashboardCard 
                          title="Top Keywords" 
                          icon={<BarChart3 className="h-4 w-4" />}
                        >
                          <div className="flex flex-wrap gap-2">
                            {analysis.keywords.map((keyword, index) => (
                              <div
                                key={index}
                                className={`px-3 py-1 rounded-full text-sm ${
                                  keyword.sentiment === 'positive' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                    : keyword.sentiment === 'negative'
                                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                }`}
                              >
                                {keyword.word}{' '}
                                <span className="font-semibold">({keyword.count})</span>
                              </div>
                            ))}
                          </div>
                        </DashboardCard>
                      </div>
                      
                      <div className="flex justify-center mt-4">
                        <Button variant="outline" size="sm">
                          {t('viewFullReport')}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
