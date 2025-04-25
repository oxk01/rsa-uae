
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import DashboardCard from './DashboardCard';

interface MostMentionedAspectsProps {
  data?: Array<{
    aspect: string;
    count: number;
    sentiment?: string;
    positive?: number;
    negative?: number;
    neutral?: number;
  }>;
}

const MostMentionedAspects = ({ data = [] }: MostMentionedAspectsProps) => {
  const hasData = data && data.length > 0;
  
  // Sort and limit data to top 10 aspects
  const sortedData = [...(data || [])]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  const getBarColor = (entry: any) => {
    if (!entry.sentiment) return '#3B82F6';
    return entry.sentiment === 'positive' ? '#10b981' : 
           entry.sentiment === 'negative' ? '#ef4444' : '#6b7280';
  };
    
  return (
    <DashboardCard 
      title="Most Mentioned Aspects"
      className="col-span-1"
    >
      {!hasData ? (
        <div className="h-[260px] flex items-center justify-center text-gray-400">
          Upload Excel file to see aspect data
        </div>
      ) : (
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              layout="vertical"
              margin={{ top: 5, right: 40, left: 50, bottom: 5 }}
              barSize={20}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#eee" />
              <XAxis 
                type="number"
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#eee' }}
                tickLine={false}
              />
              <YAxis 
                type="category" 
                dataKey="aspect"
                tick={{ fontSize: 12 }}
                width={120}
                axisLine={{ stroke: '#eee' }}
                tickLine={false}
                tickFormatter={(value) => value.length > 15 ? `${value.substr(0, 13)}...` : value}
              />
              <Tooltip
                formatter={(value, name, props) => {
                  const entry = props.payload;
                  if (entry.positive !== undefined && entry.negative !== undefined && entry.neutral !== undefined) {
                    return [
                      <div>
                        <div>{`Total: ${value} mentions`}</div>
                        <div>{`Positive: ${entry.positive}%`}</div>
                        <div>{`Neutral: ${entry.neutral}%`}</div>
                        <div>{`Negative: ${entry.negative}%`}</div>
                      </div>,
                      'Mentions'
                    ];
                  }
                  return [`${value} mentions`, 'Count'];
                }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '3px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="count" 
                name="Mentions"
                fill="#3b82f6" 
                radius={[0, 4, 4, 0]}
              >
                {sortedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardCard>
  );
};

export default MostMentionedAspects;
