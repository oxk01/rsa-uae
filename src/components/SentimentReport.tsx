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
    <div className="p-6 bg-white space-y-8" id="sentiment-report">
      <div id="report-header" className="text-center mb-12 pb-6 border-b">
        <h1 className="text-3xl font-bold mb-4">Sentiment Analysis Report</h1>
        <p className="text-gray-600 text-lg">Generated on {currentDate}</p>
      </div>

      <div className="report-section space-y-6">
        <h2 className="text-2xl font-semibold mb-6 text-blue-800 border-b pb-2">Executive Summary</h2>
        <div className="grid gap-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            This report analyzes customer sentiment across multiple aspects of our product/service.
            The analysis reveals a predominantly positive sentiment (65%), with key strengths in
            product quality (87% positive) and delivery experience (83% positive).
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Key Findings</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">• Quality and Delivery receive the highest positive ratings</li>
                <li className="flex items-center gap-2">• Customer service maintains a strong 78% satisfaction rate</li>
                <li className="flex items-center gap-2">• Shipping experience shows room for improvement at 68% positive</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-green-700">Recommendations</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">• Focus on improving shipping processes</li>
                <li className="flex items-center gap-2">• Address size-related concerns</li>
                <li className="flex items-center gap-2">• Maintain high quality standards</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>

      <div className="report-section space-y-6">
        <h2 className="text-2xl font-semibold mb-6 text-blue-800 border-b pb-2">Sentiment Distribution</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
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
            <h3 className="text-xl font-semibold">Analysis</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              The sentiment distribution shows a strong positive trend with 65% of feedback being
              favorable. Neutral sentiment accounts for 20% of responses, while negative feedback
              represents 15%. This indicates overall customer satisfaction while highlighting
              areas for potential improvement.
            </p>
          </div>
        </div>
      </div>

      <div className="report-section space-y-6">
        <h2 className="text-2xl font-semibold mb-6 text-blue-800 border-b pb-2">Aspect-Based Analysis</h2>
        <div className="space-y-8">
          <div className="h-[400px]">
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
          <p className="text-gray-700 text-lg leading-relaxed">
            The aspect-based analysis reveals that Quality (87%) and Delivery (83%) are our strongest
            performing areas. Service maintains a solid performance at 78% positive feedback.
            Shipping and Size aspects show the most room for improvement.
          </p>
        </div>
      </div>

      <style jsx>{`
        @media print {
          .report-section {
            page-break-inside: avoid;
            break-inside: avoid;
            margin-top: 20px;
            padding-top: 20px;
          }
          
          h2 {
            margin-top: 0;
            padding-top: 0;
          }
          
          .grid {
            break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
};

export default SentimentReport;
