
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import DashboardCard from './DashboardCard';

interface AspectData {
  aspect: string;
  count: number;
  positive?: number;
  negative?: number;
  neutral?: number;
  sentiment?: string;
}

interface MostMentionedAspectsProps {
  data?: AspectData[];
}

const MostMentionedAspects = ({ data = [] }: MostMentionedAspectsProps) => {
  const hasData = data && data.length > 0;
  
  // Sort and process data for visualization
  const processedData = [...(data || [])]
    .sort((a, b) => {
      // Sort by positive sentiment percentage if available, otherwise by count
      const aPositive = a.positive || 0;
      const bPositive = b.positive || 0;
      return bPositive - aPositive || b.count - a.count;
    })
    .slice(0, 7) // Keep top 7 aspects
    .map(item => ({
      ...item,
      // Calculate percentages if not provided
      positive: item.positive || 0,
      negative: item.negative || 0,
      neutral: item.neutral || (100 - (item.positive || 0) - (item.negative || 0))
    }));

  return (
    <DashboardCard 
      title="Aspect-Based Sentiment Analysis"
      className="bg-gradient-to-br from-white via-amber-50/30 to-amber-100/20 border-amber-100"
    >
      {!hasData ? (
        <div className="h-[260px] flex items-center justify-center text-gray-400">
          Upload data to see aspect-based analysis
        </div>
      ) : (
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={processedData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
              barSize={20}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
              <XAxis 
                type="number"
                domain={[0, 100]}
                tick={{ fontSize: 11 }}
                tickFormatter={(value) => `${value}%`}
                axisLine={{ stroke: '#eee' }}
                tickLine={false}
              />
              <YAxis 
                type="category" 
                dataKey="aspect"
                tick={{ fontSize: 11 }}
                width={110}
                axisLine={{ stroke: '#eee' }}
                tickLine={false}
                tickFormatter={(value) => value.length > 15 ? `${value.substr(0, 13)}...` : value}
              />
              <Tooltip
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  fontSize: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number, name: string) => {
                  return [`${value}%`, name.charAt(0).toUpperCase() + name.slice(1)];
                }}
              />
              <Bar 
                dataKey="positive" 
                name="Positive" 
                stackId="stack"
                fill="#42b883"
              >
                <LabelList 
                  dataKey="positive" 
                  position="inside"
                  formatter={(value: number) => (value > 15 ? `${value}%` : '')}
                  style={{ fill: 'white', fontSize: '11px' }}
                />
              </Bar>
              <Bar 
                dataKey="neutral" 
                name="Neutral" 
                stackId="stack"
                fill="#f6c23e"
              >
                <LabelList 
                  dataKey="neutral" 
                  position="inside"
                  formatter={(value: number) => (value > 15 ? `${value}%` : '')}
                  style={{ fill: 'white', fontSize: '11px' }}
                />
              </Bar>
              <Bar 
                dataKey="negative" 
                name="Negative" 
                stackId="stack"
                fill="#e64a3b"
              >
                <LabelList 
                  dataKey="negative" 
                  position="inside"
                  formatter={(value: number) => (value > 15 ? `${value}%` : '')}
                  style={{ fill: 'white', fontSize: '11px' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardCard>
  );
};

export default MostMentionedAspects;
