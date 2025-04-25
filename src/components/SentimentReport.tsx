
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
          <p className="text-gray-700">
            The most frequently mentioned terms provide insight into what customers care about most. 
            Pay particular attention to terms that appear in negative reviews, as these highlight areas for improvement.
          </p>
        </div>
      </section>
      
      <Separator className="my-6" />
      
      {/* Recommendations */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Actionable Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 bg-green-50 border-green-200">
            <h3 className="text-lg font-medium text-green-800 mb-2">Short-term Actions:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {recommendations.slice(0, Math.ceil(recommendations.length / 2)).map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </Card>
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Long-term Strategy:</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {recommendations.slice(Math.ceil(recommendations.length / 2)).map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
              {recommendations.length <= 2 && (
                <li>Consider implementing a continuous feedback loop to monitor sentiment changes over time.</li>
              )}
            </ul>
          </Card>
        </div>
      </section>
      
      <div className="text-center text-gray-500 text-sm mt-8 pt-4 border-t">
        <p>Generated by Sentiment Analysis Dashboard • {currentDate}</p>
      </div>
    </div>
  );
};

// Helper functions to extract and format data
function getSentimentData(analysisData: any) {
  if (!analysisData?.fileAnalysis?.sentimentBreakdown) {
    return [
      { name: 'Positive', value: 33, color: '#4ade80' },
      { name: 'Neutral', value: 34, color: '#94a3b8' },
      { name: 'Negative', value: 33, color: '#f87171' }
    ];
  }
  
  const breakdown = analysisData.fileAnalysis.sentimentBreakdown;
  
  return [
    { name: 'Positive', value: breakdown.positive || 0, color: '#4ade80' },
    { name: 'Neutral', value: breakdown.neutral || 0, color: '#94a3b8' },
    { name: 'Negative', value: breakdown.negative || 0, color: '#f87171' }
  ];
}

function getAspectData(analysisData: any) {
  if (!analysisData?.fileAnalysis?.aspects || !analysisData.fileAnalysis.aspects.length) {
    return [
      { name: 'Product', positive: 60, neutral: 20, negative: 20 },
      { name: 'Service', positive: 40, neutral: 30, negative: 30 },
      { name: 'Price', positive: 30, neutral: 20, negative: 50 }
    ];
  }
  
  const aspectCounts: Record<string, {positive: number, neutral: number, negative: number}> = {};
  const aspects = analysisData.fileAnalysis.aspects;
  
  // Group by aspect name and count sentiments
  aspects.forEach((aspect: any) => {
    const name = aspect.aspect || aspect.name || 'Other';
    if (!aspectCounts[name]) {
      aspectCounts[name] = {positive: 0, neutral: 0, negative: 0};
    }
    
    if (aspect.sentiment === 'positive') {
      aspectCounts[name].positive += aspect.count || 1;
    } else if (aspect.sentiment === 'negative') {
      aspectCounts[name].negative += aspect.count || 1;
    } else {
      aspectCounts[name].neutral += aspect.count || 1;
    }
  });
  
  // Convert to array and calculate percentages
  return Object.entries(aspectCounts).map(([name, counts]) => {
    const total = counts.positive + counts.neutral + counts.negative;
    return {
      name,
      positive: Math.round((counts.positive / total) * 100),
      neutral: Math.round((counts.neutral / total) * 100),
      negative: Math.round((counts.negative / total) * 100)
    };
  });
}

function getTrendData(analysisData: any) {
  if (!analysisData?.fileAnalysis?.reviews || !analysisData.fileAnalysis.reviews.length) {
    return [];
  }
  
  const reviews = [...analysisData.fileAnalysis.reviews]
    .sort((a: any, b: any) => {
      const dateA = new Date(a.date || 0).getTime();
      const dateB = new Date(b.date || 0).getTime();
      return dateA - dateB;
    });
  
  // Group by date
  const dateGroups: Record<string, {positive: number, neutral: number, negative: number, count: number}> = {};
  
  reviews.forEach((review: any) => {
    const date = review.date || new Date().toISOString().split('T')[0];
    const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    if (!dateGroups[formattedDate]) {
      dateGroups[formattedDate] = {positive: 0, neutral: 0, negative: 0, count: 0};
    }
    
    if (review.sentiment) {
      if (review.sentiment.positive && review.sentiment.positive > review.sentiment.negative) {
        dateGroups[formattedDate].positive++;
      } else if (review.sentiment.negative && review.sentiment.negative > review.sentiment.positive) {
        dateGroups[formattedDate].negative++;
      } else {
        dateGroups[formattedDate].neutral++;
      }
    }
    
    dateGroups[formattedDate].count++;
  });
  
  // Convert to array and calculate percentages
  return Object.entries(dateGroups).map(([date, data]) => {
    return {
      date,
      positive: Math.round((data.positive / data.count) * 100),
      neutral: Math.round((data.neutral / data.count) * 100),
      negative: Math.round((data.negative / data.count) * 100)
    };
  });
}

function getKeywordsData(analysisData: any) {
  if (!analysisData?.fileAnalysis?.keywords || !analysisData.fileAnalysis.keywords.length) {
    return [];
  }
  
  return analysisData.fileAnalysis.keywords
    .map((keyword: any) => {
      if (typeof keyword === 'string') {
        return { text: keyword, value: 10, sentiment: 'neutral' };
      }
      return { 
        text: keyword.text || keyword.word || '', 
        value: keyword.value || keyword.count || 10,
        sentiment: keyword.sentiment || 'neutral'
      };
    })
    .filter((k: any) => k.text && k.text.length > 0);
}

function generateInsights(analysisData: any) {
  const insights = [];
  
  if (!analysisData?.fileAnalysis) {
    return ["No data available for insights."];
  }
  
  // Overall sentiment insight
  const sentimentBreakdown = analysisData.fileAnalysis.sentimentBreakdown || {};
  if (sentimentBreakdown.positive > sentimentBreakdown.negative) {
    insights.push(`Overall positive sentiment with ${sentimentBreakdown.positive || 0}% of reviews being positive, indicating general customer satisfaction.`);
  } else if (sentimentBreakdown.negative > sentimentBreakdown.positive) {
    insights.push(`Overall negative sentiment with ${sentimentBreakdown.negative || 0}% of reviews being negative, suggesting areas for improvement.`);
  } else {
    insights.push(`Mixed sentiment with ${sentimentBreakdown.positive || 0}% positive, ${sentimentBreakdown.negative || 0}% negative, indicating varied customer experiences.`);
  }
  
  // Aspect insights
  const aspects = analysisData.fileAnalysis.aspects || [];
  if (aspects.length > 0) {
    const positiveAspects = aspects.filter((a: any) => a.sentiment === 'positive');
    const negativeAspects = aspects.filter((a: any) => a.sentiment === 'negative');
    
    if (positiveAspects.length > 0) {
      const aspectsText = positiveAspects
        .slice(0, 2)
        .map((a: any) => a.aspect || a.name || 'this aspect')
        .map((name: string) => typeof name === 'string' ? name.toLowerCase() : 'this aspect')
        .join(' and ');
      insights.push(`Customers speak highly of ${aspectsText}.`);
    }
    
    if (negativeAspects.length > 0) {
      const aspectsText = negativeAspects
        .slice(0, 2)
        .map((a: any) => a.aspect || a.name || 'this aspect')
        .map((name: string) => typeof name === 'string' ? name.toLowerCase() : 'this aspect')
        .join(' and ');
      insights.push(`Areas for improvement include ${aspectsText} based on negative feedback.`);
    }
  }
  
  // Add accuracy insight
  const accuracyScore = analysisData.fileAnalysis.accuracyScore || 0;
  if (accuracyScore > 0) {
    insights.push(`The sentiment analysis model achieved ${accuracyScore}% accuracy in detecting sentiment patterns.`);
  }
  
  // Ensure we have at least 3 insights
  if (insights.length < 3) {
    insights.push("Regular monitoring of customer feedback can help identify emerging trends and issues.");
  }
  
  return insights;
}

function generateRecommendations(analysisData: any) {
  const recommendations = [];
  
  if (!analysisData?.fileAnalysis) {
    return ["Collect more customer feedback to generate specific recommendations."];
  }
  
  // Aspect-based recommendations
  const aspects = analysisData.fileAnalysis.aspects || [];
  if (aspects.length > 0) {
    const negativeAspects = aspects
      .filter((a: any) => a.sentiment === 'negative')
      .sort((a: any, b: any) => (b.count || 1) - (a.count || 1));
    
    if (negativeAspects.length > 0) {
      negativeAspects.slice(0, 2).forEach((aspect: any) => {
        const aspectName = aspect.aspect || aspect.name;
        const formattedAspectName = typeof aspectName === 'string' ? aspectName.toLowerCase() : 'this aspect';
        recommendations.push(`Prioritize improvements to ${formattedAspectName} to address recurring negative feedback.`);
      });
    }
  }
  
  // Overall sentiment recommendations
  const sentimentBreakdown = analysisData.fileAnalysis.sentimentBreakdown || {};
  if (sentimentBreakdown.negative > 30) {
    recommendations.push("Implement a customer feedback loop to promptly address concerns and improve satisfaction.");
  }
  
  if (sentimentBreakdown.positive < 50) {
    recommendations.push("Consider a product/service enhancement initiative focusing on most criticized aspects.");
  } else if (sentimentBreakdown.positive > 70) {
    recommendations.push("Leverage positive customer sentiment in marketing materials and testimonials.");
  }
  
  // Ensure we have at least 3 recommendations
  if (recommendations.length < 3) {
    recommendations.push("Establish a regular reporting cadence to track sentiment trends over time.");
    recommendations.push("Implement targeted improvements based on the most frequently mentioned negative aspects.");
  }
  
  return recommendations;
}

export default SentimentReport;
