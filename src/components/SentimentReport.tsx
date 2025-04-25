import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import WordCloudVisualization from './WordCloudVisualization';
import { ThumbsUp, ThumbsDown, BarChart2, PieChart as PieChartIcon } from 'lucide-react';

interface SentimentReportProps {
  analysisData: any;
}

const SentimentReport = ({ analysisData }: SentimentReportProps) => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Extract data for charts
  const sentimentData = getSentimentData(analysisData);
  const aspectData = getAspectData(analysisData);
  const trendData = getTrendData(analysisData);
  const keywordsData = getKeywordsData(analysisData);
  const totalReviews = analysisData?.fileAnalysis?.totalReviews || 0;
  const accuracyScore = analysisData?.fileAnalysis?.accuracyScore || 0;
  
  // Generate insights and recommendations
  const insights = generateInsights(analysisData);
  const recommendations = generateRecommendations(analysisData);

  return (
    <div className="p-6 bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Sentiment Analysis Report</h1>
        <p className="text-gray-500">Generated on {currentDate}</p>
      </div>
      
      {/* Executive Summary */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Executive Summary</h2>
        <p className="text-gray-700 mb-4">
          This report provides an analysis of {totalReviews} customer reviews with an accuracy score of {accuracyScore}%. 
          The analysis reveals {sentimentData[0].value}% positive sentiment, {sentimentData[2].value}% negative sentiment, 
          and {sentimentData[1].value}% neutral sentiment across all reviews.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card className="p-4 border-l-4 border-l-blue-500">
            <h3 className="font-medium mb-2 text-blue-700">Key Findings:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              {insights.map((insight, idx) => (
                <li key={idx}>{insight}</li>
              ))}
            </ul>
          </Card>
          <Card className="p-4 border-l-4 border-l-green-500">
            <h3 className="font-medium mb-2 text-green-700">Recommendations:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              {recommendations.map((recommendation, idx) => (
                <li key={idx}>{recommendation}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Sentiment Distribution */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4 flex items-center">
          <PieChartIcon className="h-5 w-5 mr-2 text-blue-600" />
          Overview of Sentiment Distribution
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Sentiment Distribution</h3>
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
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Analysis</h3>
            <p className="text-gray-700 mb-4">
              The sentiment analysis shows that {sentimentData[0].value}% of the reviews express positive sentiments, 
              while {sentimentData[2].value}% express negative sentiments. {sentimentData[1].value}% of reviews have a neutral tone.
            </p>
            {sentimentData[0].value > 50 && (
              <p className="text-green-700 flex items-center">
                <ThumbsUp className="h-4 w-4 mr-2" />
                The majority of reviews are positive, indicating overall customer satisfaction.
              </p>
            )}
            {sentimentData[2].value > 30 && (
              <p className="text-red-700 flex items-center mt-2">
                <ThumbsDown className="h-4 w-4 mr-2" />
                A significant portion of reviews ({sentimentData[2].value}%) are negative, suggesting areas for improvement.
              </p>
            )}
          </div>
        </div>
      </section>
      
      <Separator className="my-6" />
      
      {/* Key Insights */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4 flex items-center">
          <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
          Aspect-Based Feedback
        </h2>
        <p className="text-gray-700 mb-4">
          This section breaks down customer sentiment across different aspects of the product or service.
          Understanding which aspects receive positive or negative feedback can help prioritize improvements.
        </p>
        
        <div className="h-[400px]">
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
        
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Key Findings:</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {aspectData.slice(0, 3).map((aspect, idx) => (
              <li key={idx}>
                <span className="font-medium">{aspect.name}:</span>{' '}
                {aspect.positive > aspect.negative 
                  ? `Received mostly positive feedback (${aspect.positive}% positive).`
                  : `Received mostly negative feedback (${aspect.negative}% negative).`
                }
              </li>
            ))}
          </ul>
        </div>
      </section>
      
      <Separator className="my-6" />
      
      {/* Trends Over Time */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Trends Over Time</h2>
        <p className="text-gray-700 mb-4">
          This chart shows how sentiment has changed over time, helping identify trends and the impact of any changes or events.
        </p>
        
        {trendData.length > 1 ? (
          <div className="h-[300px]">
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
        ) : (
          <Card className="p-4 bg-gray-50">
            <p className="text-gray-500 text-center">Insufficient time-series data for trend analysis.</p>
          </Card>
        )}
        
        {trendData.length > 1 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Trend Analysis:</h3>
            <p className="text-gray-700">
              {trendData[0].positive > trendData[trendData.length-1].positive
                ? "The data shows a decreasing trend in positive sentiment over time, which may indicate emerging issues that need attention."
                : "The data shows an improving trend in positive sentiment over time, suggesting that recent changes have been well-received by customers."
              }
            </p>
          </div>
        )}
      </section>
      
      <Separator className="my-6" />
      
      {/* Word Cloud Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Most Mentioned Keywords</h2>
        <p className="text-gray-700 mb-4">
          This word cloud visualizes the most frequently mentioned terms in customer reviews, with size indicating frequency.
        </p>
        
        <div className="h-[300px] border rounded-md">
          {keywordsData.length > 0 ? (
            <WordCloudVisualization data={keywordsData} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">No keyword data available</p>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Key Term Analysis:</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {keywordsData.slice(0, 5).map((keyword, idx) => (
              <li key={idx}>
                <span className="font-medium">{keyword.text}:</span>{' '}
                Mentioned {keyword.value} times with {keyword.sentiment} sentiment
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

// Helper function to process sentiment data
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

// Helper function to process aspect data
const getAspectData = (analysisData: any) => {
  const aspects = analysisData?.fileAnalysis?.aspects || [];
  return aspects.map((aspect: any) => ({
    name: aspect.name,
    positive: aspect.sentiment === 'positive' ? 100 : 0,
    neutral: aspect.sentiment === 'neutral' ? 100 : 0,
    negative: aspect.sentiment === 'negative' ? 100 : 0
  }));
};

// Helper function to process trend data with improved date handling
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

// Helper function to process keywords data
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

// Helper function to generate insights
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

// Helper function to generate recommendations
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
