
import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import WordCloudVisualization from './WordCloudVisualization';
import HeatmapMatrix from './HeatmapMatrix';

interface SentimentReportProps {
  analysisData: any;
}

const SentimentReport = ({ analysisData }: SentimentReportProps) => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const sentimentData = [
    { name: 'Positive', value: 65, color: '#10b981' },
    { name: 'Neutral', value: 20, color: '#6b7280' },
    { name: 'Negative', value: 15, color: '#ef4444' },
  ];

  const aspectData = [
    { aspect: 'Quality', positive: 87, neutral: 8, negative: 5 },
    { aspect: 'Delivery', positive: 83, neutral: 10, negative: 7 },
    { aspect: 'Comfort', positive: 81, neutral: 12, negative: 7 },
    { aspect: 'Service', positive: 78, neutral: 14, negative: 8 },
    { aspect: 'Price', positive: 76, neutral: 15, negative: 9 },
    { aspect: 'Size', positive: 70, neutral: 18, negative: 12 },
    { aspect: 'Shipping', positive: 68, neutral: 22, negative: 10 },
  ];

  const heatmapData = {
    predictedPositive: 68,
    predictedNegative: 10,
    actualPositive: 5,
    actualNegative: 17
  };

  return (
    <div className="p-6 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Sentiment Analysis Report</h1>
        <p className="text-gray-500">Generated on {currentDate}</p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Executive Summary</h2>
        <div className="space-y-4">
          <p className="text-gray-700">
            This report analyzes customer sentiment across multiple aspects of our product/service.
            The analysis reveals a predominantly positive sentiment (65%), with key strengths in
            product quality (87% positive) and delivery experience (83% positive).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 border-l-4 border-l-blue-500">
              <h3 className="font-medium mb-2 text-blue-700">Key Findings:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li>Quality and Delivery receive the highest positive ratings</li>
                <li>Customer service maintains a strong 78% satisfaction rate</li>
                <li>Shipping experience shows room for improvement at 68% positive</li>
              </ul>
            </Card>
            <Card className="p-4 border-l-4 border-l-green-500">
              <h3 className="font-medium mb-2 text-green-700">Recommendations:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                <li>Focus on improving shipping processes</li>
                <li>Address size-related concerns</li>
                <li>Maintain high quality standards</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Distribution of Sentiment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Analysis</h3>
            <p className="text-gray-700">
              The sentiment distribution shows a strong positive trend with 65% of feedback being
              favorable. Neutral sentiment accounts for 20% of responses, while negative feedback
              represents 15%. This indicates overall customer satisfaction while highlighting
              areas for potential improvement.
            </p>
          </div>
        </div>
      </section>

      <Separator className="my-8" />

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Aspect-Based Feedback</h2>
        <div className="h-[400px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={aspectData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="aspect" type="category" width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="positive" name="Positive" stackId="a" fill="#10b981" />
              <Bar dataKey="neutral" name="Neutral" stackId="a" fill="#6b7280" />
              <Bar dataKey="negative" name="Negative" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <p className="text-gray-700">
            The aspect-based analysis reveals that Quality (87%) and Delivery (83%) are our strongest
            performing areas. Service maintains a solid performance at 78% positive feedback.
            Shipping and Size aspects show the most room for improvement, with positive ratings
            of 68% and 70% respectively.
          </p>
        </div>
      </section>

      <Separator className="my-8" />

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Model Evaluation</h2>
        <HeatmapMatrix data={heatmapData} />
        <div className="mt-4 space-y-4">
          <p className="text-gray-700">
            Our sentiment analysis model shows strong performance with:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>68% True Positive rate for correctly identified positive sentiments</li>
            <li>17% True Negative rate for correctly identified negative sentiments</li>
            <li>Only 5% False Positive and 10% False Negative rates, indicating good reliability</li>
          </ul>
        </div>
      </section>

      <Separator className="my-8" />

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Most Mentioned Keywords</h2>
        <div className="h-[300px] border rounded-md p-4 mb-4">
          <WordCloudVisualization data={analysisData?.fileAnalysis?.keywords || []} />
        </div>
        <p className="text-gray-700">
          The word cloud visualization highlights the most frequently mentioned terms in customer
          feedback, with size indicating frequency and color representing sentiment. This helps
          identify key themes and topics that matter most to our customers.
        </p>
      </section>
    </div>
  );
};

export default SentimentReport;
