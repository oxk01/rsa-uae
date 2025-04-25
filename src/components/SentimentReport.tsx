import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import WordCloudVisualization from './WordCloudVisualization';
import { ThumbsUp, ThumbsDown, BarChart2, PieChart as PieChartIcon, TrendingUp, MessageSquare } from 'lucide-react';

interface SentimentReportProps {
  analysisData: any;
}

const SentimentReport = ({ analysisData }: SentimentReportProps) => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const sentimentData = getSentimentData(analysisData);
  const aspectData = getAspectData(analysisData);
  const trendData = getTrendData(analysisData);
  const keywordsData = getKeywordsData(analysisData);
  const totalReviews = analysisData?.fileAnalysis?.totalReviews || 0;
  const accuracyScore = analysisData?.fileAnalysis?.accuracyScore || 0;
  
  const insights = generateInsights(analysisData);
  const recommendations = generateRecommendations(analysisData);

  const generateSentimentAnalysis = () => {
    const positive = sentimentData[0].value;
    const negative = sentimentData[2].value;
    const trend = positive > negative ? 'positive' : 'negative';
    const difference = Math.abs(positive - negative);
    
    return {
      mainTrend: trend,
      difference,
      analysis: `The sentiment analysis reveals a ${trend} overall trend, with a ${difference}% difference between positive and negative sentiments. ${
        trend === 'positive' 
          ? 'This indicates generally favorable customer satisfaction levels.' 
          : 'This suggests areas requiring attention and improvement.'
      }`
    };
  };

  const generateAspectAnalysis = () => {
    const topAspects = aspectData.slice(0, 3);
    const positiveAspects = topAspects.filter(a => a.positive > a.negative);
    const negativeAspects = topAspects.filter(a => a.negative > a.positive);
    
    return {
      positiveHighlights: positiveAspects.map(a => a.name),
      negativeHighlights: negativeAspects.map(a => a.name),
      analysis: `Analysis of specific aspects reveals that ${
        positiveAspects.length > 0 
          ? `${positiveAspects.map(a => a.name).join(', ')} received notably positive feedback` 
          : 'no aspects stood out as particularly positive'
      }. ${
        negativeAspects.length > 0 
          ? `However, ${negativeAspects.map(a => a.name).join(', ')} may need attention.`
          : 'No aspects showed significant negative sentiment.'
      }`
    };
  };

  const generateTrendAnalysis = () => {
    if (trendData.length < 2) return null;
    
    const latestPositive = trendData[trendData.length - 1].positive;
    const earliestPositive = trendData[0].positive;
    const trend = latestPositive > earliestPositive ? 'improving' : 'declining';
    
    return {
      trend,
      analysis: `Sentiment trends over time show an ${trend} pattern. ${
        trend === 'improving'
          ? 'This positive trajectory suggests that recent changes and improvements are being well-received.'
          : 'This declining trend indicates a need for immediate attention to address growing customer concerns.'
      }`
    };
  };

  return (
    <div className="p-6 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Comprehensive Sentiment Analysis Report</h1>
        <p className="text-gray-500">Generated on {currentDate}</p>
      </div>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Executive Summary</h2>
        <div className="space-y-4">
          <p className="text-gray-700">
            This report analyzes {totalReviews} customer reviews with an accuracy score of {accuracyScore}%. 
            The analysis reveals {sentimentData[0].value}% positive sentiment, {sentimentData[2].value}% negative sentiment, 
            and {sentimentData[1].value}% neutral sentiment across all reviews.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 border-l-4 border-l-blue-500">
              <h3 className="font-medium mb-2 text-blue-700">Key Findings:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                {insights.map((insight, idx) => (
                  <li key={idx}>{insight}</li>
                ))}
              </ul>
            </Card>
            <Card className="p-4 border-l-4 border-l-green-500">
              <h3 className="font-medium mb-2 text-green-700">Strategic Recommendations:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                {recommendations.map((recommendation, idx) => (
                  <li key={idx}>{recommendation}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4 flex items-center">
          <PieChartIcon className="h-5 w-5 mr-2 text-blue-600" />
          Detailed Sentiment Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Overall Sentiment Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Sentiment Analysis Insights</h3>
            <p className="text-gray-700">
              {generateSentimentAnalysis().analysis}
            </p>
            <div className="space-y-2">
              {sentimentData[0].value > 50 && (
                <p className="text-green-700 flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Strong positive sentiment indicates successful customer satisfaction initiatives.
                </p>
              )}
              {sentimentData[2].value > 30 && (
                <p className="text-red-700 flex items-center">
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  Significant negative sentiment ({sentimentData[2].value}%) requires attention.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4 flex items-center">
          <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
          Aspect-Based Sentiment Analysis
        </h2>
        <p className="text-gray-700 mb-6">
          This section provides a detailed breakdown of customer sentiment across different aspects 
          of the product or service, helping identify specific areas of strength and opportunity.
        </p>
        
        <div className="h-[400px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={aspectData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="positive" stackId="a" fill="#4ade80" name="Positive" />
              <Bar dataKey="neutral" stackId="a" fill="#94a3b8" name="Neutral" />
              <Bar dataKey="negative" stackId="a" fill="#f87171" name="Negative" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Detailed Aspect Analysis</h3>
          <p className="text-gray-700">{generateAspectAnalysis().analysis}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aspectData.map((aspect, index) => (
              <Card key={index} className="p-4">
                <h4 className="font-medium mb-2">{aspect.name}</h4>
                <p className="text-sm text-gray-600">
                  {aspect.positive > aspect.negative
                    ? `Shows strong positive sentiment (${aspect.positive}% positive)`
                    : aspect.negative > aspect.positive
                    ? `Requires attention (${aspect.negative}% negative)`
                    : `Neutral performance (${aspect.neutral}% neutral)`}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
          Sentiment Trends Over Time
        </h2>
        <p className="text-gray-700 mb-6">
          This visualization tracks sentiment changes over time, helping identify patterns
          and the impact of implemented changes or external events.
        </p>
        
        {trendData.length > 1 ? (
          <>
            <div className="h-[300px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="positive" stroke="#4ade80" name="Positive" />
                  <Line type="monotone" dataKey="neutral" stroke="#94a3b8" name="Neutral" />
                  <Line type="monotone" dataKey="negative" stroke="#f87171" name="Negative" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Trend Analysis</h3>
              <p className="text-gray-700">
                {generateTrendAnalysis()?.analysis || 'Insufficient data for trend analysis.'}
              </p>
            </div>
          </>
        ) : (
          <Card className="p-4 bg-gray-50">
            <p className="text-gray-500 text-center">Insufficient time-series data for trend analysis.</p>
          </Card>
        )}
      </section>

      <Separator className="my-8" />

      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
          Key Terms Analysis
        </h2>
        <p className="text-gray-700 mb-6">
          The word cloud visualization highlights frequently mentioned terms in customer feedback,
          with size indicating frequency and color representing sentiment.
        </p>
        
        <div className="h-[300px] border rounded-md mb-6">
          {keywordsData.length > 0 ? (
            <WordCloudVisualization data={keywordsData} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">No keyword data available</p>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Top Keywords Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keywordsData.slice(0, 6).map((keyword, idx) => (
              <Card key={idx} className="p-4">
                <p className="text-sm">
                  <span className="font-medium">{keyword.text}:</span>{' '}
                  Mentioned {keyword.value} times with {keyword.sentiment} sentiment
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const getSentimentData = (analysisData: any) => {
  const sentimentBreakdown = analysisData?.fileAnalysis?.sentimentBreakdown || {
    positive: 33,
    neutral: 34,
    negative: 33
  };
  
  return [
    { name: 'Positive', value: sentimentBreakdown.positive, color: '#4ade80' },
    { name: 'Neutral', value: sentimentBreakdown.neutral, color: '#94a3b8' },
    { name: 'Negative', value: sentimentBreakdown.negative, color: '#f87171' }
  ];
};

const getAspectData = (analysisData: any) => {
  const aspects = analysisData?.fileAnalysis?.aspects || [];
  return aspects.map((aspect: any) => ({
    name: aspect.name,
    positive: aspect.sentiment === 'positive' ? 100 : 0,
    neutral: aspect.sentiment === 'neutral' ? 100 : 0,
    negative: aspect.sentiment === 'negative' ? 100 : 0
  }));
};

const getTrendData = (analysisData: any) => {
  if (!analysisData?.fileAnalysis?.reviews) return [];
  
  const reviews = analysisData.fileAnalysis.reviews;
  const dateMap = new Map();
  
  reviews.forEach((review: any) => {
    let dateStr = "";
    try {
      if (review.date) {
        const reviewDate = new Date(review.date);
        if (!isNaN(reviewDate.getTime())) {
          dateStr = reviewDate.toISOString().split('T')[0];
        } else {
          dateStr = String(review.date).substring(0, 10) || "Unknown";
        }
      } else {
        dateStr = "Unknown";
      }
    } catch (e) {
      console.error("Error processing date:", e, review.date);
      dateStr = "Unknown";
    }
    
    if (!dateMap.has(dateStr)) {
      dateMap.set(dateStr, { positive: 0, neutral: 0, negative: 0, total: 0 });
    }
    
    const stats = dateMap.get(dateStr);
    stats.total++;
    
    if (review.sentimentLabel === 'positive') stats.positive++;
    else if (review.sentimentLabel === 'negative') stats.negative++;
    else stats.neutral++;
  });
  
  return Array.from(dateMap.entries())
    .map(([date, stats]) => ({
      date,
      positive: stats.total > 0 ? Math.round((stats.positive / stats.total) * 100) : 0,
      neutral: stats.total > 0 ? Math.round((stats.neutral / stats.total) * 100) : 0,
      negative: stats.total > 0 ? Math.round((stats.negative / stats.total) * 100) : 0
    }))
    .sort((a, b) => {
      if (a.date === "Unknown") return -1;
      if (b.date === "Unknown") return 1;
      
      try {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } catch (e) {
        console.error("Error sorting dates:", e, a.date, b.date);
        return 0;
      }
    });
};

const getKeywordsData = (analysisData: any) => {
  return (analysisData?.fileAnalysis?.keywords || [])
    .map((keyword: any) => ({
      text: keyword.word,
      value: keyword.count || 1,
      sentiment: keyword.sentiment
    }))
    .sort((a: any, b: any) => b.value - a.value)
    .slice(0, 50);
};

const generateInsights = (analysisData: any) => {
  const insights = [];
  const sentimentBreakdown = analysisData?.fileAnalysis?.sentimentBreakdown;
  
  if (sentimentBreakdown?.positive > 50) {
    insights.push('Majority of customers express satisfaction with the product/service.');
  }
  
  if (sentimentBreakdown?.negative > 30) {
    insights.push('Significant number of negative reviews require attention.');
  }
  
  if (analysisData?.fileAnalysis?.accuracyScore > 80) {
    insights.push('High confidence in sentiment analysis results.');
  }
  
  return insights.length > 0 ? insights : ['No significant insights available.'];
};

const generateRecommendations = (analysisData: any) => {
  const recommendations = [];
  const sentimentBreakdown = analysisData?.fileAnalysis?.sentimentBreakdown;
  
  if (sentimentBreakdown?.negative > 20) {
    recommendations.push('Address common concerns in negative feedback.');
  }
  
  if (sentimentBreakdown?.neutral > 30) {
    recommendations.push('Implement strategies to convert neutral sentiment to positive.');
  }
  
  if (analysisData?.fileAnalysis?.aspects) {
    const negativeAspects = analysisData.fileAnalysis.aspects
      .filter((aspect: any) => aspect.sentiment === 'negative');
      
    if (negativeAspects.length > 0) {
      recommendations.push('Focus on improving aspects with negative sentiment.');
    }
  }
  
  return recommendations.length > 0 ? recommendations : ['Continue monitoring customer feedback.'];
};

export default SentimentReport;
