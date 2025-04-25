import React, { useState } from 'react';
import { 
  ChartBarIcon, 
  ChartPieIcon, 
  ChartLineIcon, 
  TagIcon, 
  ServerIcon, 
  Hash 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import SentimentOverview from '@/components/SentimentOverview';
import TopKeywords from '@/components/TopKeywords';
import DashboardCard from '@/components/DashboardCard';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const COLORS = {
  positive: '#10b981',
  neutral: '#6b7280',
  negative: '#ef4444',
  blue: '#3b82f6',
  indigo: '#6366f1',
  purple: '#8b5cf6',
  pink: '#ec4899',
  secondary: '#6c757d',
  background: '#f9fafb'
};

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadData = () => {
      try {
        const currentAnalysis = localStorage.getItem('rsa_current_analysis');
        if (currentAnalysis) {
          const parsedData = JSON.parse(currentAnalysis);
          setData(parsedData);
          setLoading(false);
        } else {
          const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses');
          if (savedAnalysesStr) {
            const savedAnalyses = JSON.parse(savedAnalysesStr);
            if (savedAnalyses && savedAnalyses.length > 0) {
              setData(savedAnalyses[0]);
              setLoading(false);
            } else {
              handleNoData();
            }
          } else {
            handleNoData();
          }
        }
      } catch (error) {
        console.error("Error loading analysis data:", error);
        handleNoData();
      }
    };
    
    loadData();
  }, [navigate]);
  
  const handleNoData = () => {
    setLoading(false);
    toast({
      title: "No analysis data found",
      description: "Please complete an analysis in the demo section first.",
      variant: "destructive",
    });
  };
  
  const prepareSentimentData = () => {
    if (!data || !data.fileAnalysis || !data.fileAnalysis.sentimentBreakdown) {
      return [];
    }
    
    const { positive, neutral, negative } = data.fileAnalysis.sentimentBreakdown;
    
    return [
      { name: 'Positive', value: positive, fill: COLORS.positive },
      { name: 'Neutral', value: neutral, fill: COLORS.neutral },
      { name: 'Negative', value: negative, fill: COLORS.negative }
    ];
  };
  
  const prepareAspectData = () => {
    if (!data || !data.aspects) {
      return [];
    }
    
    return data.aspects.map((aspect: any) => {
      const sentiment = aspect.sentiment || 'neutral';
      let confidence = aspect.confidence || 50;
      
      return {
        name: aspect.name,
        positive: sentiment === 'positive' ? confidence : 0,
        neutral: sentiment === 'neutral' ? confidence : 0,
        negative: sentiment === 'negative' ? confidence : 0,
        sentiment
      };
    });
  };
  
  const prepareTimelineData = () => {
    if (!data || !data.fileAnalysis || !data.fileAnalysis.reviews) {
      return [];
    }
    
    const reviews = [...data.fileAnalysis.reviews];
    reviews.sort((a: any, b: any) => {
      const dateA = new Date(a.date || '2023-01-01');
      const dateB = new Date(b.date || '2023-01-01');
      return dateA.getTime() - dateB.getTime();
    });
    
    const groupedByDate: Record<string, { positive: number, neutral: number, negative: number, count: number }> = {};
    
    reviews.forEach((review: any) => {
      if (!review.date) return;
      
      const date = new Date(review.date).toISOString().split('T')[0];
      
      if (!groupedByDate[date]) {
        groupedByDate[date] = { positive: 0, neutral: 0, negative: 0, count: 0 };
      }
      
      if (review.sentiment) {
        groupedByDate[date].positive += review.sentiment.positive || 0;
        groupedByDate[date].neutral += review.sentiment.neutral || 0;
        groupedByDate[date].negative += review.sentiment.negative || 0;
        groupedByDate[date].count += 1;
      }
    });
    
    return Object.entries(groupedByDate).map(([date, values]) => {
      const count = values.count || 1;
      return {
        date,
        positive: Math.round(values.positive / count),
        neutral: Math.round(values.neutral / count),
        negative: Math.round(values.negative / count)
      };
    });
  };
  
  const prepareKeywordsData = () => {
    if (!data || !data.fileAnalysis || !data.fileAnalysis.reviews) {
      return [];
    }
    
    const keywordMap: Record<string, { count: number, sentiment: string }> = {};
    
    data.fileAnalysis.reviews.forEach((review: any) => {
      if (!review.keywords) return;
      
      review.keywords.forEach((keyword: any) => {
        if (!keyword || !keyword.word) return;
        
        const word = keyword.word.toLowerCase();
        
        if (!keywordMap[word]) {
          keywordMap[word] = { count: 0, sentiment: keyword.sentiment || 'neutral' };
        }
        
        keywordMap[word].count += keyword.count || 1;
      });
    });
    
    return Object.entries(keywordMap)
      .map(([word, data]) => ({
        word,
        count: data.count,
        sentiment: data.sentiment
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
  };
  
  const prepareSourceData = () => {
    if (!data || !data.fileAnalysis || !data.fileAnalysis.reviews) {
      return [];
    }
    
    const sourceMap: Record<string, { positive: number, neutral: number, negative: number }> = {};
    
    data.fileAnalysis.reviews.forEach((review: any) => {
      const source = review.source || 'Unknown';
      
      if (!sourceMap[source]) {
        sourceMap[source] = { positive: 0, neutral: 0, negative: 0 };
      }
      
      if (review.sentiment) {
        const { positive, neutral, negative } = review.sentiment;
        if (positive >= neutral && positive >= negative) {
          sourceMap[source].positive += 1;
        } else if (negative >= positive && negative >= neutral) {
          sourceMap[source].negative += 1;
        } else {
          sourceMap[source].neutral += 1;
        }
      }
    });
    
    return Object.entries(sourceMap).map(([source, counts]) => ({
      source: source.charAt(0).toUpperCase() + source.slice(1),
      ...counts
    }));
  };
  
  const prepareMentionedAspectsData = () => {
    if (!data || !data.aspects) {
      return [];
    }
    
    return data.aspects.map((aspect: any) => ({
      name: aspect.name,
      value: aspect.confidence || 50,
      fill: aspect.sentiment === 'positive' ? COLORS.positive : 
            aspect.sentiment === 'negative' ? COLORS.negative : COLORS.neutral
    }));
  };
  
  const sentimentData = prepareSentimentData();
  const aspectData = prepareAspectData();
  const timelineData = prepareTimelineData();
  const keywordsData = prepareKeywordsData();
  const sourceData = prepareSourceData();
  const mentionedAspectsData = prepareMentionedAspectsData();
  
  const handleStartNewAnalysis = () => {
    navigate('/demo');
  };
  
  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>
    );
  }
  
  if (!data) {
    return (
      <div className="container mx-auto p-6">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">No Analysis Data Found</h2>
          <p className="text-gray-600 mb-6">To view the dashboard, please complete an analysis in the demo section first.</p>
          <Button onClick={handleStartNewAnalysis}>
            Go to Analysis Demo
          </Button>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6 bg-background min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Analysis Dashboard</h1>
        <p className="text-muted-foreground">
          Insights from {data.fileAnalysis?.fileName || 'your analysis'} 
          with {data.fileAnalysis?.totalReviews || 0} reviews
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="aspects">Aspects Analysis</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardCard 
              title="Overall Sentiment Distribution" 
              icon={<ChartPieIcon className="h-4 w-4" />}
              className="md:col-span-2"
            >
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      nameKey="name"
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      label={(entry) => `${entry.name}: ${entry.value}`}
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
            
            <TopKeywords keywords={keywordsData} className="md:col-span-1" />
          </div>
          
          <DashboardCard 
            title="Sentiment by Source" 
            icon={<ServerIcon className="h-4 w-4" />}
          >
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sourceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="source" width={100} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="positive" stackId="a" fill={COLORS.positive} name="Positive" />
                  <Bar dataKey="neutral" stackId="a" fill={COLORS.neutral} name="Neutral" />
                  <Bar dataKey="negative" stackId="a" fill={COLORS.negative} name="Negative" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>
          
          <DashboardCard 
            title="Most Mentioned Aspects" 
            icon={<Hash className="h-4 w-4" />}
          >
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mentionedAspectsData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill={COLORS.blue}>
                    {mentionedAspectsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    <LabelList dataKey="value" position="right" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>
        </TabsContent>
        
        <TabsContent value="aspects" className="space-y-6">
          <DashboardCard 
            title="Aspect-Based Sentiment Breakdown" 
            icon={<ChartBarIcon className="h-4 w-4" />}
          >
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={aspectData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="positive" stackId="a" name="Positive" fill={COLORS.positive} />
                  <Bar dataKey="neutral" stackId="a" name="Neutral" fill={COLORS.neutral} />
                  <Bar dataKey="negative" stackId="a" name="Negative" fill={COLORS.negative} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.aspects?.map((aspect: any, index: number) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex justify-between">
                    {aspect.name}
                    <span className={`text-sm font-normal ${
                      aspect.sentiment === 'positive' ? 'text-green-600' : 
                      aspect.sentiment === 'negative' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {aspect.sentiment.charAt(0).toUpperCase() + aspect.sentiment.slice(1)} 
                      ({aspect.confidence || 0}%)
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{aspect.context || 'No context available'}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="timeline" className="space-y-6">
          <DashboardCard 
            title="Sentiment Trends Over Time" 
            icon={<ChartLineIcon className="h-4 w-4" />}
          >
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={timelineData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="positive" 
                    name="Positive" 
                    stroke={COLORS.positive} 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="neutral" 
                    name="Neutral" 
                    stroke={COLORS.neutral} 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="negative" 
                    name="Negative" 
                    stroke={COLORS.negative} 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>
          
          <DashboardCard 
            title="Volume of Reviews Over Time" 
            icon={<ChartBarIcon className="h-4 w-4" />}
          >
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={timelineData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar 
                    dataKey="positive" 
                    name="Positive" 
                    stackId="a" 
                    fill={COLORS.positive} 
                  />
                  <Bar 
                    dataKey="neutral" 
                    name="Neutral" 
                    stackId="a" 
                    fill={COLORS.neutral} 
                  />
                  <Bar 
                    dataKey="negative" 
                    name="Negative" 
                    stackId="a" 
                    fill={COLORS.negative} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>
        </TabsContent>
        
        <TabsContent value="keywords" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard 
              title="Top Keywords" 
              icon={<Hash className="h-4 w-4" />}
              className="col-span-1"
            >
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={keywordsData.slice(0, 10)}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="word" width={120} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" name="Mentions">
                      {keywordsData.slice(0, 10).map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.sentiment === 'positive' ? COLORS.positive : 
                                entry.sentiment === 'negative' ? COLORS.negative : COLORS.neutral} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Keyword Cloud
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 justify-center items-center min-h-[400px]">
                  {keywordsData.map((keyword, index) => (
                    <span 
                      key={index}
                      className={`inline-block px-3 py-1 rounded-full text-white
                        ${keyword.sentiment === 'positive' ? 'bg-green-500' : 
                          keyword.sentiment === 'negative' ? 'bg-red-500' : 'bg-gray-500'}`}
                      style={{
                        fontSize: `${Math.max(0.8, Math.min(2, 0.8 + keyword.count / 20))}rem`,
                        opacity: 0.7 + (keyword.count / 100)
                      }}
                    >
                      {keyword.word}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <DashboardCard 
            title="Sentiment Distribution by Keyword" 
            icon={<ChartBarIcon className="h-4 w-4" />}
          >
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={keywordsData.slice(0, 8)}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="word" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar 
                    dataKey="count" 
                    name="Mentions" 
                    fill={COLORS.blue}
                  >
                    {keywordsData.slice(0, 8).map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.sentiment === 'positive' ? COLORS.positive : 
                              entry.sentiment === 'negative' ? COLORS.negative : COLORS.neutral} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 text-center">
        <Button onClick={handleStartNewAnalysis} className="bg-blue-600 hover:bg-blue-700">
          Start New Analysis
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
