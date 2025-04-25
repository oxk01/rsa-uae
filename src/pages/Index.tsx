import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import StatsGrid from '@/components/StatsGrid';
import { Card } from '@/components/ui/card';
import { AlertCircle, Download, LayoutDashboard } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { extractAspects } from '@/utils/excelParser';
import DashboardGraphs from '@/components/DashboardGraphs';

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
  keywords: { word: string; sentiment: string; count: number }[];
  sentimentLabel?: string;
  rating?: string;
  reviewText?: string;
  source?: string;
  aspects?: { name: string; sentiment: 'positive' | 'negative' | 'neutral'; confidence: number; context: string; }[];
}

const Index = () => {
  const [savedAnalyses, setSavedAnalyses] = useState<Analysis[]>([]);
  const [hasData, setHasData] = useState(false);
  const [sentimentOverviewData, setSentimentOverviewData] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [aspectData, setAspectData] = useState<any[]>([]);
  const [wordCloudData, setWordCloudData] = useState<any[]>([]);
  const [sourceData, setSourceData] = useState<any[]>([]);
  const [mentionedAspectsData, setMentionedAspectsData] = useState<any[]>([]);
  const [confusionMatrixData, setConfusionMatrixData] = useState<any[]>([]);
  const { t } = useLanguage();
  const { toast } = useToast();
  
  useEffect(() => {
    const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses');
    if (savedAnalysesStr) {
      const analyses = JSON.parse(savedAnalysesStr);
      setSavedAnalyses(analyses);
      setHasData(analyses.length > 0);
      
      if (analyses.length > 0) {
        processDataForCharts(analyses);
      }
    }
  }, []);
  
  const processDataForCharts = (analyses: Analysis[]) => {
    let totalPositive = 0;
    let totalNeutral = 0;
    let totalNegative = 0;
    
    analyses.forEach(analysis => {
      totalPositive += analysis.sentiment.positive;
      totalNeutral += analysis.sentiment.neutral;
      totalNegative += analysis.sentiment.negative;
    });
    
    setSentimentOverviewData([
      { name: 'Positive', value: totalPositive },
      { name: 'Neutral', value: totalNeutral },
      { name: 'Negative', value: totalNegative }
    ]);
    
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
        
        return {
          date: formattedDate,
          originalDate,
          positive: analysis.sentiment.positive,
          neutral: analysis.sentiment.neutral,
          negative: analysis.sentiment.negative,
          reviewSnippet: analysis.reviewText?.substring(0, 100) + '...'
        };
      });
      
      setTrendData(trend);
    }
    
    processAspectData(analyses);
    
    processWordCloudData(analyses);
    
    processSourceData(analyses);
    
    processMentionedAspectsData(analyses);
    
    processConfusionMatrixData(analyses);
  };
  
  const processAspectData = (analyses: Analysis[]) => {
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
          analysis.sentimentLabel?.toLowerCase() || 'neutral'
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
  
  const processWordCloudData = (analyses: Analysis[]) => {
    const wordCount: Record<string, {count: number, sentiment: string}> = {};
    
    analyses.forEach(analysis => {
      if (analysis.keywords && analysis.keywords.length > 0) {
        analysis.keywords.forEach(keyword => {
          const word = keyword.word.toLowerCase();
          
          if (!wordCount[word]) {
            wordCount[word] = { count: 0, sentiment: keyword.sentiment };
          }
          
          wordCount[word].count += keyword.count || 1;
        });
      }
    });
    
    const wordCloudData = Object.entries(wordCount)
      .map(([word, data]) => ({
        text: word,
        value: data.count,
        sentiment: data.sentiment
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 100);
    
    setWordCloudData(wordCloudData);
  };
  
  const processSourceData = (analyses: Analysis[]) => {
    const sourceCounts: Record<string, {positive: number, neutral: number, negative: number}> = {};
    
    analyses.forEach(analysis => {
      const source = analysis.source || 'other';
      
      if (!sourceCounts[source]) {
        sourceCounts[source] = { positive: 0, neutral: 0, negative: 0 };
      }
      
      if (analysis.sentiment.positive > analysis.sentiment.negative && 
          analysis.sentiment.positive > analysis.sentiment.neutral) {
        sourceCounts[source].positive++;
      } else if (analysis.sentiment.negative > analysis.sentiment.positive && 
                 analysis.sentiment.negative > analysis.sentiment.neutral) {
        sourceCounts[source].negative++;
      } else {
        sourceCounts[source].neutral++;
      }
    });
    
    const sourceData = Object.entries(sourceCounts).map(([source, counts]) => ({
      source: source.charAt(0).toUpperCase() + source.slice(1),
      ...counts
    }));
    
    setSourceData(sourceData);
  };
  
  const processMentionedAspectsData = (analyses: Analysis[]) => {
    const aspectMentions: Record<string, number> = {};
    
    analyses.forEach(analysis => {
      if (analysis.aspects && analysis.aspects.length > 0) {
        analysis.aspects.forEach(aspect => {
          const aspectName = aspect.name.toLowerCase();
          
          if (!aspectMentions[aspectName]) {
            aspectMentions[aspectName] = 0;
          }
          
          aspectMentions[aspectName]++;
        });
      }
    });
    
    const mentionedAspectsData = Object.entries(aspectMentions)
      .map(([aspect, count]) => ({
        aspect: aspect.charAt(0).toUpperCase() + aspect.slice(1),
        count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    setMentionedAspectsData(mentionedAspectsData);
  };
  
  const processConfusionMatrixData = (analyses: Analysis[]) => {
    const confidenceBuckets: Record<string, {correct: number, total: number}> = {
      'high': {correct: 0, total: 0},
      'medium': {correct: 0, total: 0},
      'low': {correct: 0, total: 0}
    };
    
    analyses.forEach(analysis => {
      if (analysis.accuracyScore !== undefined) {
        let bucket;
        
        if (analysis.accuracyScore >= 80) {
          bucket = 'high';
        } else if (analysis.accuracyScore >= 60) {
          bucket = 'medium';
        } else {
          bucket = 'low';
        }
        
        confidenceBuckets[bucket].total++;
        
        if (analysis.accuracyScore >= 70) {
          confidenceBuckets[bucket].correct++;
        }
      }
    });
    
    const confusionMatrixData = Object.entries(confidenceBuckets).map(([confidence, data]) => ({
      confidence,
      accuracy: data.total > 0 ? (data.correct / data.total) * 100 : 0,
      total: data.total
    }));
    
    setConfusionMatrixData(confusionMatrixData);
  };
  
  const calculateAverageRating = () => {
    if (!hasData) return "N/A";
    
    let totalPositive = 0;
    let totalReviews = 0;
    
    savedAnalyses.forEach(analysis => {
      totalPositive += analysis.sentiment.positive;
      totalReviews += analysis.reviewCount;
    });
    
    if (totalReviews === 0) return "N/A";
    const score = (totalPositive / totalReviews) * 5;
    return `${score.toFixed(1)}/5`;
  };
  
  const calculateSentimentScore = () => {
    if (!hasData) return "N/A";
    
    let totalPositive = 0;
    let totalNegative = 0;
    let totalReviews = 0;
    
    savedAnalyses.forEach(analysis => {
      totalPositive += analysis.sentiment.positive;
      totalNegative += analysis.sentiment.negative;
      totalReviews += analysis.reviewCount;
    });
    
    if (totalReviews === 0) return "N/A";
    const score = Math.round(((totalPositive - totalNegative) / totalReviews + 1) * 50);
    return `${score}/100`;
  };
  
  const calculateAverageAccuracy = () => {
    if (!hasData) return "N/A";
    
    const analysesWithAccuracy = savedAnalyses.filter(analysis => analysis.accuracyScore !== undefined);
    if (analysesWithAccuracy.length === 0) return "N/A";
    
    const totalAccuracy = analysesWithAccuracy.reduce((sum, analysis) => sum + (analysis.accuracyScore || 0), 0);
    return `${Math.round(totalAccuracy / analysesWithAccuracy.length)}%`;
  };
  
  const getTotalReviews = () => {
    if (!hasData) return "0";
    return savedAnalyses.reduce((total, analysis) => total + analysis.reviewCount, 0).toString();
  };
  
  const getTotalDataPoints = () => {
    if (!hasData) return "0";
    return savedAnalyses.reduce((total, analysis) => total + (analysis.dataPoints || analysis.reviewCount), 0).toString();
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
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Sentiment Analysis Dashboard</h1>
            <p className="text-gray-500 mt-1">Analyze customer reviews with AI-powered contextual sentiment analysis</p>
          </div>
          <div className="flex gap-2">
            {hasData && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExportData}
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                Export to Excel
              </Button>
            )}
            <Button 
              size="sm" 
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
              asChild
            >
              <Link to="/dashboard">
                <LayoutDashboard className="h-4 w-4" />
                New Dashboard
              </Link>
            </Button>
          </div>
        </div>
        
        {!hasData && (
          <Card className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
            <div className="p-4 flex flex-col items-center gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
              <p className="text-amber-700 dark:text-amber-300 mb-4">
                You haven't saved any analyses yet. Please run some analyses in the demo section to see your actual data here.
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link to="/demo">Analyze New Reviews</Link>
              </Button>
            </div>
          </Card>
        )}
        
        <StatsGrid 
          totalReviews={getTotalReviews()}
          averageRating={calculateAverageRating()}
          responseTime={hasData ? "2.4 hrs" : "N/A"}
          sentimentScore={calculateSentimentScore()}
          accuracyScore={calculateAverageAccuracy()}
        />
        
        {hasData ? (
          <DashboardGraphs
            sentimentOverviewData={sentimentOverviewData}
            trendData={trendData}
            aspectData={aspectData}
            wordCloudData={wordCloudData}
            sourceData={sourceData}
            mentionedAspectsData={mentionedAspectsData}
            confusionMatrixData={confusionMatrixData}
          />
        ) : (
          <div className="mt-8 bg-white p-8 rounded-lg shadow-sm text-center">
            <p className="text-gray-500 mb-4">No analysis data available yet.</p>
            <p className="text-gray-500 mb-6">Complete an analysis in the demo section to populate this dashboard with your data.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
