
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart3, Trash2, Calendar, RefreshCw, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
}

const Dashboard = () => {
  const [savedAnalyses, setSavedAnalyses] = useState<Analysis[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>('sentiment');
  const { toast } = useToast();
  const { t } = useLanguage();
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short', 
    day: 'numeric', 
    year: 'numeric'
  });

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

  const refreshData = () => {
    const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses');
    if (savedAnalysesStr) {
      const analyses = JSON.parse(savedAnalysesStr);
      setSavedAnalyses(analyses);
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
      toast({
        title: "Last review deleted",
        description: "The most recent analysis has been removed.",
      });
    }
  };

  // Prepare sentiment data for pie chart
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
  
  // Prepare review volume data for line chart
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
  
  // Prepare keywords data for horizontal bar chart
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

  // Prepare aspect-based sentiment data
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
  
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">Sentiment Analysis Dashboard</h1>
            <p className="text-gray-600">Analyze and visualize customer sentiment data</p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={refreshData}>
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

        {savedAnalyses.length === 0 ? (
          <div className="bg-white border rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-4">No analysis data available yet.</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/demo">Analyze New Reviews</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Overall Sentiment */}
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

              {/* Review Volume */}
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

              {/* Top Keywords */}
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
              <div className="border-b mb-4">
                <div className="flex gap-4">
                  <button
                    className={`pb-2 px-1 ${selectedTab === 'sentiment' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
                    onClick={() => setSelectedTab('sentiment')}
                  >
                    Aspect Analysis
                  </button>
                  <button
                    className={`pb-2 px-1 ${selectedTab === 'trends' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
                    onClick={() => setSelectedTab('trends')}
                  >
                    Sentiment Trends
                  </button>
                  <button
                    className={`pb-2 px-1 ${selectedTab === 'reviews' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
                    onClick={() => setSelectedTab('reviews')}
                  >
                    Recent Reviews
                  </button>
                </div>
              </div>

              {selectedTab === 'sentiment' && (
                <Card className="p-6 shadow-sm">
                  <h2 className="font-semibold mb-1">Aspect-Based Sentiment Analysis</h2>
                  <p className="text-xs text-gray-500 mb-6">Sentiment breakdown by different aspects of the product or service</p>
                  
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={aspectData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
                        <XAxis type="number" />
                        <YAxis dataKey="aspect" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="positive" stackId="a" fill={ASPECT_COLORS[0]} name="Positive" />
                        <Bar dataKey="neutral" stackId="a" fill={ASPECT_COLORS[1]} name="Neutral" />
                        <Bar dataKey="negative" stackId="a" fill={ASPECT_COLORS[2]} name="Negative" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="flex justify-center gap-4 mt-4">
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
              )}

              {selectedTab === 'trends' && (
                <Card className="p-6 shadow-sm">
                  <h2 className="text-lg font-medium mb-4">Sentiment Trends Over Time</h2>
                  <p>Trend analysis will be shown here.</p>
                </Card>
              )}

              {selectedTab === 'reviews' && (
                <Card className="p-6 shadow-sm">
                  <h2 className="text-lg font-medium mb-4">Recent Reviews</h2>
                  <div className="space-y-4">
                    {savedAnalyses.slice(0, 3).map((analysis) => (
                      <div key={analysis.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{analysis.title}</h3>
                          <span className="text-sm text-gray-500">{analysis.date}</span>
                        </div>
                        <p className="text-sm mt-2">
                          Reviews: {analysis.reviewCount} | 
                          Positive: {analysis.sentiment.positive} | 
                          Negative: {analysis.sentiment.negative}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
