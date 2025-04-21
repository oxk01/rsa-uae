import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Trash2, Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SentimentTrend from '@/components/SentimentTrend';
import GenerateReportButton from '@/components/GenerateReportButton';
import RecentReviews from '@/components/RecentReviews';
import { extractAspects } from '@/utils/excelParser';
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
  dataPoints?: number;
  accuracyScore?: number;
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
  aspects?: { 
    name: string; 
    sentiment: 'positive' | 'negative' | 'neutral'; 
    confidence: number; 
    context: string; 
  }[];
}

const Dashboard = () => {
  const [savedAnalyses, setSavedAnalyses] = useState<Analysis[]>([]);
  const { toast } = useToast();
  const { t } = useLanguage();
  const [trendData, setTrendData] = useState<any[]>([]);
  const [aspectData, setAspectData] = useState<any[]>([]);

  useEffect(() => {
    const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses');
    if (savedAnalysesStr) {
      const analyses = JSON.parse(savedAnalysesStr);
      setSavedAnalyses(analyses);
      
      if (analyses.length > 0) {
        generateTrendData(analyses);
        generateAspectData(analyses);
      }
    }
  }, []);
  
  const generateTrendData = (analyses: Analysis[]) => {
    if (analyses.length >= 1) {
      const sortedAnalyses = [...analyses].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      
      const trend = sortedAnalyses.map(analysis => {
        let formattedDate;
        let originalDate = analysis.date;
        
        try {
          const dateObj = new Date(analysis.date);
          if (!isNaN(dateObj.getTime())) {
            formattedDate = dateObj.toLocaleDateString('en-US', { 
              year: 'numeric',
              month: 'short', 
              day: 'numeric'
            });
            originalDate = dateObj.toISOString().split('T')[0];
          } else {
            formattedDate = analysis.date;
          }
        } catch (e) {
          console.error("Error parsing date:", e);
          formattedDate = "Unknown";
        }
        
        const reviewSnippet = analysis.reviewText 
          ? (analysis.reviewText.length > 100 
              ? analysis.reviewText.substring(0, 100) + '...' 
              : analysis.reviewText)
          : undefined;
        
        return {
          date: formattedDate,
          originalDate,
          positive: analysis.sentiment.positive,
          neutral: analysis.sentiment.neutral,
          negative: analysis.sentiment.negative,
          reviewSnippet
        };
      });
      
      setTrendData(trend);
    }
  };

  const generateAspectData = (analyses: Analysis[]) => {
    const aspectMap: Record<string, { positive: number, neutral: number, negative: number }> = {};
    
    analyses.forEach(analysis => {
      if (analysis.aspects && analysis.aspects.length > 0) {
        analysis.aspects.forEach(aspect => {
          const aspectName = aspect.name.toLowerCase();
          
          if (!aspectMap[aspectName]) {
            aspectMap[aspectName] = { positive: 0, neutral: 0, negative: 0 };
          }
          
          aspectMap[aspectName][aspect.sentiment]++;
        });
      } 
      else if (analysis.reviewText) {
        const extractedAspects = extractAspects(
          analysis.reviewText, 
          analysis.sentiment.positive > analysis.sentiment.negative ? 'positive' : 
            analysis.sentiment.negative > analysis.sentiment.positive ? 'negative' : 'neutral'
        );
        
        extractedAspects.forEach(aspect => {
          const aspectName = aspect.name.toLowerCase();
          
          if (!aspectMap[aspectName]) {
            aspectMap[aspectName] = { positive: 0, neutral: 0, negative: 0 };
          }
          
          aspectMap[aspectName][aspect.sentiment]++;
        });
      }
    });
    
    const aspectData = Object.entries(aspectMap).map(([aspect, sentiments]) => ({
      aspect: aspect.charAt(0).toUpperCase() + aspect.slice(1),
      ...sentiments
    }));
    
    setAspectData(aspectData);
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
    generateAspectData(updatedAnalyses);
  };

  const refreshData = () => {
    const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses');
    if (savedAnalysesStr) {
      const analyses = JSON.parse(savedAnalysesStr);
      setSavedAnalyses(analyses);
      generateTrendData(analyses);
      generateAspectData(analyses);
      toast({
        title: "Data refreshed",
        description: "Dashboard data has been updated.",
      });
    }
  };

  const deleteLastReview = () => {
    if (savedAnalyses.length > 0) {
      setSavedAnalyses([]);
      localStorage.setItem('rsa_saved_analyses', JSON.stringify([]));
      setTrendData([]);
      setAspectData([]);
      toast({
        title: "All reviews deleted",
        description: "All analyses have been removed from the dashboard.",
      });
    }
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
  
  const prepareAccuracyData = () => {
    if (savedAnalyses.length === 0) return [];
    
    const accuracyData = savedAnalyses
      .filter(analysis => analysis.accuracyScore !== undefined)
      .slice(0, 10)
      .map(analysis => ({
        name: analysis.title.length > 20 ? analysis.title.substring(0, 20) + '...' : analysis.title,
        score: analysis.accuracyScore
      }));
    
    return accuracyData;
  };
  
  const calculateAverageAccuracy = () => {
    if (savedAnalyses.length === 0) return 0;
    
    const analysesWithAccuracy = savedAnalyses.filter(analysis => analysis.accuracyScore !== undefined);
    if (analysesWithAccuracy.length === 0) return 0;
    
    const totalAccuracy = analysesWithAccuracy.reduce((sum, analysis) => sum + (analysis.accuracyScore || 0), 0);
    return Math.round(totalAccuracy / analysesWithAccuracy.length);
  };
  
  const handleExportData = () => {
    import('xlsx').then(XLSX => {
      const worksheet = XLSX.utils.json_to_sheet(
        savedAnalyses.map(analysis => {
          let sentiment = "Neutral";
          if (analysis.sentiment.positive > analysis.sentiment.negative && analysis.sentiment.positive > analysis.sentiment.neutral) {
            sentiment = "Positive";
          } else if (analysis.sentiment.negative > analysis.sentiment.positive && analysis.sentiment.negative > analysis.sentiment.neutral) {
            sentiment = "Negative";
          }
          
          const rating = `${Math.round((analysis.sentiment.positive / 100) * 5)}/5`;
          
          return {
            Title: analysis.title,
            Date: analysis.date,
            Sentiment: sentiment,
            Rating: rating,
            'Accuracy Score': analysis.accuracyScore || "N/A",
            Keywords: analysis.keywords?.map(k => k.word).join(", ") || "",
            'Review Text': analysis.reviewText || "",
            'Data Points': analysis.dataPoints || analysis.reviewCount || 0
          };
        })
      );
      
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Analysis Results");
      
      XLSX.writeFile(workbook, `sentiment_analysis_export_${new Date().toISOString().split('T')[0]}.xlsx`);
      
      toast({
        title: "Export complete",
        description: `${savedAnalyses.length} reviews exported to Excel.`,
      });
    }).catch(error => {
      console.error("Error generating Excel file:", error);
      
      let csvContent = "data:text/csv;charset=utf-8,";
      
      csvContent += "Title,Date,Sentiment,Rating,Accuracy Score,Review Text\n";
      
      savedAnalyses.forEach(analysis => {
        let sentiment = "Neutral";
        if (analysis.sentiment.positive > analysis.sentiment.negative && analysis.sentiment.positive > analysis.sentiment.neutral) {
          sentiment = "Positive";
        } else if (analysis.sentiment.negative > analysis.sentiment.positive && analysis.sentiment.negative > analysis.sentiment.neutral) {
          sentiment = "Negative";
        }
        
        const rating = `${Math.round((analysis.sentiment.positive / 100) * 5)}/5`;
        
        const rowData = [
          `"${analysis.title}"`,
          analysis.date,
          sentiment,
          rating,
          analysis.accuracyScore || "N/A",
          `"${analysis.reviewText || ""}"`
        ];
        
        csvContent += rowData.join(",") + "\n";
      });
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `sentiment_analysis_export_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export complete",
        description: `${savedAnalyses.length} reviews exported to CSV.`,
      });
    });
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
  
  const sentimentData = prepareSentimentData();
  const volumeData = prepareVolumeData();
  const keywordsData = prepareKeywordsData();
  const chartAspectData = prepareAspectData();
  const accuracyData = prepareAccuracyData();
  const averageAccuracy = calculateAverageAccuracy();
  
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
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleExportData}>
                <FileText className="h-4 w-4" />
                Export to Excel
              </Button>
              <Button variant="destructive" size="sm" className="flex items-center gap-1" onClick={deleteLastReview}>
                <Trash2 className="h-4 w-4" />
                Delete All Reviews
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
              
              <Card className="p-4 shadow-sm">
                <h2 className="font-semibold mb-1">Analysis Accuracy</h2>
                <p className="text-xs text-gray-500 mb-4">Precision score of the analysis</p>
                <div className="flex justify-center items-center mb-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600">{averageAccuracy}%</div>
                    <p className="text-sm text-gray-500">Average Accuracy</p>
                  </div>
                </div>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={accuracyData}
                      margin={{ top: 5, right: 20, left: 10, bottom: 25 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 10 }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#3b82f6" barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="mb-6">
              <SentimentTrend trendData={trendData} aspectData={aspectData} />
            </div>
            
            <div className="mb-6 bg-white rounded-lg border shadow-sm p-6">
              <RecentReviews reviews={savedAnalyses} onExport={handleExportData} />
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
