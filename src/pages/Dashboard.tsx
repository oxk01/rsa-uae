import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Trash2, Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LabelList, ReferenceLine } from 'recharts';
import SentimentTrend from '@/components/SentimentTrend';
import RecentReviews from '@/components/RecentReviews';
import GenerateReportButton from '@/components/GenerateReportButton';
import { extractAspects } from '@/utils/excelParser';

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

const COLORS_PASTEL = ['#A5EDC5', '#FFDDC1', '#C1DFFF'];
const KEYWORD_COLORS = ['#93B5FF', '#B0FFBC', '#FFD6E0', '#FFD6A5', '#CAACFF'];

function AnimatedAccuracy({ value }: { value: number }) {
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    if (value === 0) return;
    const step = () => {
      start += 2;
      if (start < value) {
        setDisplay(start);
        requestAnimationFrame(step);
      } else {
        setDisplay(value);
      }
    };
    step();
  }, [value]);
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-5xl font-extrabold text-primary transition-all">{display}%</span>
      <span className="text-sm text-gray-500">Avg. Accuracy</span>
    </div>
  );
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
      try {
        const analyses = JSON.parse(savedAnalysesStr);
        setSavedAnalyses(analyses);
        
        if (analyses.length > 0) {
          generateTrendData(analyses);
          generateAspectData(analyses);
        }
      } catch (error) {
        console.error("Error parsing saved analyses:", error);
        toast({
          title: "Error loading data",
          description: "There was an error loading your saved analyses. The data might be corrupted.",
          variant: "destructive",
        });
      }
    }
  }, [toast]);
  
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
        
        const sentiment = analysis.sentiment || { positive: 0, neutral: 0, negative: 0 };
        
        const reviewSnippet = analysis.reviewText 
          ? (analysis.reviewText.length > 100 
              ? analysis.reviewText.substring(0, 100) + '...' 
              : analysis.reviewText)
          : undefined;
        
        return {
          date: formattedDate,
          originalDate,
          positive: sentiment.positive || 0,
          neutral: sentiment.neutral || 0,
          negative: sentiment.negative || 0,
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
        const sentiment = analysis.sentiment || { positive: 0, neutral: 0, negative: 0 };
        const sentimentLabel = sentiment.positive > sentiment.negative ? 'positive' : 
          sentiment.negative > sentiment.positive ? 'negative' : 'neutral';
        
        const extractedAspects = extractAspects(
          analysis.reviewText, 
          sentimentLabel
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
      if (analysis.keywords && Array.isArray(analysis.keywords)) {
        analysis.keywords.forEach(keyword => {
          if (keywordsMap[keyword.word]) {
            keywordsMap[keyword.word] += keyword.count || 1;
          } else {
            keywordsMap[keyword.word] = keyword.count || 1;
          }
        });
      }
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
      if (analysis.keywords && Array.isArray(analysis.keywords)) {
        analysis.keywords.forEach(keyword => {
          if (keyword.word === 'quality' || keyword.word === 'price' || keyword.word === 'service') {
            if (keyword.sentiment === 'positive') {
              aspectData[keyword.word].positive += keyword.count || 1;
            } else if (keyword.sentiment === 'negative') {
              aspectData[keyword.word].negative += keyword.count || 1;
            } else {
              aspectData[keyword.word].neutral += keyword.count || 1;
            }
          }
        });
      }
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
      const sentiment = analysis.sentiment || { positive: 0, neutral: 0, negative: 0 };
      totalPositive += sentiment.positive || 0;
      totalNeutral += sentiment.neutral || 0;
      totalNegative += sentiment.negative || 0;
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

  const enhancedReviews = savedAnalyses.map(analysis => {
    const sentiment = analysis.sentiment || { positive: 0, neutral: 0, negative: 0 };
    
    let sentimentLabel = "Neutral";
    if (sentiment.positive > Math.max(sentiment.neutral || 0, sentiment.negative || 0)) {
      sentimentLabel = "Positive";
    } else if (sentiment.negative > Math.max(sentiment.neutral || 0, sentiment.positive || 0)) {
      sentimentLabel = "Negative";
    }
    
    const rating = `${Math.max(1, Math.min(5, Math.round((sentiment.positive || 0) * 5 / 100)))}/5`;
    
    const reviewText = analysis.reviewText || `Analysis for ${analysis.title} with ${analysis.reviewCount} reviews.`;
    
    const source = analysis.source || (analysis.title && typeof analysis.title === 'string' && analysis.title.includes('.') 
      ? 'excel' 
      : 'text');
    
    return {
      ...analysis,
      sentimentLabel,
      rating,
      reviewText,
      source
    };
  });

  return (
    <div className="min-h-screen bg-[#f9fafb] p-4 md:p-8">
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
          <div className="bg-white border rounded-2xl p-8 text-center">
            <p className="text-gray-500 mb-4">No analysis data available yet.</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/demo">Analyze New Reviews</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl duration-200 p-6 transition-card group">
                <h2 className="font-bold text-lg mb-2 tracking-tight">Overall Sentiment</h2>
                <p className="text-xs text-gray-500 mb-4">Distribution of sentiment in reviews</p>
                <div className="h-64 flex flex-col justify-center items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={50}
                        labelLine={false}
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                        fill="#8884d8"
                        dataKey="value"
                        animationDuration={1000}
                        isAnimationActive
                      >
                        {sentimentData.map((entry, idx) => (
                          <Cell key={entry.name} fill={COLORS_PASTEL[idx % COLORS_PASTEL.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value} (${Math.round((Number(value)/(sentimentData.reduce((a,b)=>a+b.value,0)))*100)}%)`, name]}
                        contentStyle={{
                          background: "#fff",
                          borderRadius: "8px",
                          border: "1px solid #eee",
                          fontSize: "0.95em"
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 mt-4">
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ background: COLORS_PASTEL[0] }}></span>
                      <span className="text-xs font-medium">Positive</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ background: COLORS_PASTEL[1] }}></span>
                      <span className="text-xs font-medium">Neutral</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ background: COLORS_PASTEL[2] }}></span>
                      <span className="text-xs font-medium">Negative</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl duration-200 p-6 transition-card group">
                <h2 className="font-bold text-lg mb-2 tracking-tight">Top Keywords</h2>
                <p className="text-xs text-gray-500 mb-4">Most mentioned topics in reviews</p>
                <div className="h-64 flex items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={keywordsData}
                      margin={{ top: 16, right: 28, left: 60, bottom: 16 }}
                      barCategoryGap={12}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.12} vertical={false} />
                      <XAxis type="number" tick={{ fontSize: 13 }} axisLine={false} />
                      <YAxis 
                        dataKey="word" 
                        type="category" 
                        tick={{ fontWeight: 700, fontSize: 14 }}
                        axisLine={false}
                      />
                      <Tooltip
                        formatter={value => `${value} mentions`}
                        contentStyle={{ background: '#fff', borderRadius: '8px', border: '1px solid #eee' }}
                      />
                      <Bar 
                        dataKey="count" 
                        fill="#93B5FF" 
                        barSize={28}
                        radius={[12,12,12,12]}
                        isAnimationActive
                      >
                        {keywordsData.map((entry, idx) =>
                          <Cell key={entry.word} fill={KEYWORD_COLORS[idx % KEYWORD_COLORS.length]} />
                        )}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl duration-200 p-6 transition-card group flex flex-col justify-between">
                <h2 className="font-bold text-lg mb-2 tracking-tight">Analysis Accuracy</h2>
                <p className="text-xs text-gray-500 mb-4">Precision score of the analyses</p>
                <div className="flex-1 flex flex-col items-center justify-center mb-3">
                  <AnimatedAccuracy value={averageAccuracy} />
                </div>
                <div className="h-28 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={accuracyData}
                      margin={{ top: 5, right: 16, left: 10, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis 
                        dataKey="name"
                        tick={{ fontSize: 10 }}
                        angle={-30}
                        textAnchor="end"
                        height={50}
                        axisLine={false}
                      />
                      <YAxis domain={[0, 100]} axisLine={false} />
                      <Tooltip contentStyle={{ background: "#fff", borderRadius: "8px", border: "1px solid #eee" }} />
                      <Bar dataKey="score" fill="#A5EDC5" barSize={18} radius={[8,8,0,0]} isAnimationActive />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
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
