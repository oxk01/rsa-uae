import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart3, Trash2, Calendar, RefreshCw, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SentimentTrend from '@/components/SentimentTrend';
import RecentReviews from '@/components/RecentReviews';
import GenerateReportButton from '@/components/GenerateReportButton';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from 'recharts';

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
  reviewText?: string;
  source?: string;
}

const Dashboard = () => {
  const [savedAnalyses, setSavedAnalyses] = useState<Analysis[]>([]);
  const { toast } = useToast();
  const { t } = useLanguage();
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short', 
    day: 'numeric', 
    year: 'numeric'
  });
  const [trendData, setTrendData] = useState<any[]>([]);

  useEffect(() => {
    const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses');
    if (savedAnalysesStr) {
      const analyses = JSON.parse(savedAnalysesStr);
      setSavedAnalyses(analyses);
      
      if (analyses.length > 0) {
        generateTrendData(analyses);
      }
    }
  }, []);
  
  const generateTrendData = (analyses: Analysis[]) => {
    if (analyses.length > 1) {
      const sortedAnalyses = [...analyses].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      
      const trend = sortedAnalyses.map(analysis => ({
        date: new Date(analysis.date).toLocaleDateString('en-US', { month: 'short' }),
        positive: analysis.sentiment.positive,
        neutral: analysis.sentiment.neutral,
        negative: analysis.sentiment.negative
      }));
      
      setTrendData(trend);
    } else if (analyses.length === 1) {
      setTrendData([{
        date: new Date(analyses[0].date).toLocaleDateString('en-US', { month: 'short' }),
        positive: analyses[0].sentiment.positive,
        neutral: analyses[0].sentiment.neutral,
        negative: analyses[0].sentiment.negative
      }]);
    }
  };
  
  const deleteAnalysis = (id: number) => {
    const updatedAnalyses = savedAnalyses.filter(analysis => analysis.id !== id);
    setSavedAnalyses(updatedAnalyses);
    localStorage.setItem('rsa_saved_analyses', JSON.stringify(updatedAnalyses));
    toast({
      title: "Analysis deleted",
      description: "The analysis has been removed from your dashboard.",
    });
    generateTrendData(updatedAnalyses);
  };

  const refreshData = () => {
    const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses');
    if (savedAnalysesStr) {
      const analyses = JSON.parse(savedAnalysesStr);
      setSavedAnalyses(analyses);
      generateTrendData(analyses);
      toast({
        title: "Data refreshed",
        description: "Dashboard data has been updated.",
      });
    }
  };

  const deleteLastReview = () => {
    if (savedAnalyses.length > 0) {
      const updatedAnalyses = [...savedAnalyses];
      updatedAnalyses.pop();
      setSavedAnalyses(updatedAnalyses);
      localStorage.setItem('rsa_saved_analyses', JSON.stringify(updatedAnalyses));
      generateTrendData(updatedAnalyses);
      toast({
        title: "Last review deleted",
        description: "The most recent analysis has been removed.",
      });
    }
  };

  const prepareSentimentData = () => {
    if (savedAnalyses.length === 0) return [];
    
    let totalPositive = 0;
    let totalNeutral = 0; 
    let totalNegative = 0;
    
    savedAnalyses.forEach(analysis => {
      totalPositive += analysis.sentiment.positive;
      totalNeutral += analysis.sentiment.neutral;
      totalNegative += analysis.sentiment.negative;
    });
    
    return [
      { name: 'Positive', value: totalPositive },
      { name: 'Neutral', value: totalNeutral },
      { name: 'Negative', value: totalNegative }
    ];
  };
  
  const prepareVolumeData = () => {
    if (savedAnalyses.length === 0) return [];
    
    const monthsMap: { [key: string]: number } = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    savedAnalyses.forEach(analysis => {
      const date = new Date(analysis.date);
      const monthKey = months[date.getMonth()];
      
      if (monthsMap[monthKey]) {
        monthsMap[monthKey] += analysis.reviewCount;
      } else {
        monthsMap[monthKey] = analysis.reviewCount;
      }
    });
    
    return months.map(month => ({
      month,
      reviews: monthsMap[month] || 0
    })).filter(item => item.reviews > 0);
  };
  
  const prepareKeywordsData = () => {
    if (savedAnalyses.length === 0) return [];
    
    const keywordsMap: { [key: string]: number } = {};
    
    savedAnalyses.forEach(analysis => {
      analysis.keywords.forEach(keyword => {
        if (keywordsMap[keyword.word]) {
          keywordsMap[keyword.word] += keyword.count;
        } else {
          keywordsMap[keyword.word] = keyword.count;
        }
      });
    });
    
    return Object.entries(keywordsMap)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const prepareAspectData = () => {
    if (savedAnalyses.length === 0) return [];
    
    const aspects = ['quality', 'price', 'service'];
    const aspectData: { [key: string]: {positive: number, neutral: number, negative: number} } = {
      quality: {positive: 0, neutral: 0, negative: 0},
      price: {positive: 0, neutral: 0, negative: 0},
      service: {positive: 0, neutral: 0, negative: 0}
    };
    
    savedAnalyses.forEach(analysis => {
      analysis.keywords.forEach(keyword => {
        if (keyword.word === 'quality' || keyword.word === 'price' || keyword.word === 'service') {
          if (keyword.sentiment === 'positive') {
            aspectData[keyword.word].positive += keyword.count;
          } else if (keyword.sentiment === 'negative') {
            aspectData[keyword.word].negative += keyword.count;
          } else {
            aspectData[keyword.word].neutral += keyword.count;
          }
        }
      });
    });
    
    return aspects.map(aspect => ({
      aspect,
      positive: aspectData[aspect].positive,
      neutral: aspectData[aspect].neutral,
      negative: aspectData[aspect].negative
    }));
  };
  
  const sentimentData = prepareSentimentData();
  const volumeData = prepareVolumeData();
  const keywordsData = prepareKeywordsData();
  const aspectData = prepareAspectData();
  
  const COLORS = ['#3b82f6', '#6b7280', '#ef4444'];
  const ASPECT_COLORS = ['#3b82f6', '#6b7280', '#ef4444'];
  
  const enhancedReviews = savedAnalyses.map(analysis => {
    let sentimentLabel = "Neutral";
    if (analysis.sentiment.positive > Math.max(analysis.sentiment.neutral, analysis.sentiment.negative)) {
      sentimentLabel = "Positive";
    } else if (analysis.sentiment.negative > Math.max(analysis.sentiment.neutral, analysis.sentiment.positive)) {
      sentimentLabel = "Negative";
    }
    
    const rating = `${Math.max(1, Math.min(5, Math.round(analysis.sentiment.positive * 5 / 100)))}/5`;
    
    const reviewText = analysis.reviewText || `Analysis for ${analysis.title} with ${analysis.reviewCount} reviews.`;
    
    return {
      ...analysis,
      sentimentLabel,
      rating,
      reviewText,
      source: analysis.source || (analysis.title.includes('.') ? 'excel' : 'text')
    };
  });
  
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-blue-900">Sentiment Analysis Dashboard</h1>
              <p className="text-gray-600">Analyze and visualize customer sentiment data</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {currentDate}
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={refreshData}>
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button variant="destructive" size="sm" className="flex items-center gap-1" onClick={deleteLastReview}>
                <XCircle className="h-4 w-4" />
                Delete Last Review
              </Button>
            </div>
          </div>
        </div>

        {savedAnalyses.length === 0 ? (
          <div className="bg-white border rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-4">No analysis data available yet.</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/demo">Analyze New Reviews</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-4 shadow-sm">
                <h2 className="font-semibold mb-1">Overall Sentiment</h2>
                <p className="text-xs text-gray-500 mb-4">Distribution of sentiment in reviews</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={false}
                      >
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                    <span className="text-xs">Positive</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
                    <span className="text-xs">Neutral</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                    <span className="text-xs">Negative</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4 shadow-sm">
                <h2 className="font-semibold mb-1">Review Volume</h2>
                <p className="text-xs text-gray-500 mb-4">Number of reviews over time</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={volumeData}
                      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="reviews" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-4 shadow-sm">
                <h2 className="font-semibold mb-1">Top Keywords</h2>
                <p className="text-xs text-gray-500 mb-4">Most mentioned topics in reviews</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={keywordsData}
                      margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="word" type="category" />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3b82f6" barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="mb-6">
              <SentimentTrend trendData={trendData} />
            </div>

            <div className="mb-6">
              <RecentReviews reviews={enhancedReviews} />
            </div>
            
            <div className="mt-10 pt-6 border-t flex justify-center">
              <GenerateReportButton 
                hasData={savedAnalyses.length > 0}
                variant="default" 
                showReport={false}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md py-3 px-6 text-base"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
