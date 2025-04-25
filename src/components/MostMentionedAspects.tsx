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
  
  const sortedData = [...(data || [])]
    .sort((a, b) => b.count - a.count)
    .slice(0, 7); // Reduced to 7 items to prevent overlapping
  
  const getBarColor = (entry: any) => {
    if (!entry.sentiment) return '#3B82F6';
    return entry.sentiment === 'positive' ? '#42b883' : 
           entry.sentiment === 'negative' ? '#e64a3b' : '#f6c23e';
  };
    
  return (
    <DashboardCard 
      title="Most Mentioned Aspects"
      className="bg-gradient-to-br from-white via-purple-50/30 to-purple-100/20 border-purple-100"
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
              margin={{ top: 5, right: 60, left: 120, bottom: 5 }}
              barSize={20}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
              <XAxis 
                type="number"
                tick={{ fontSize: 11 }}
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
              />
              <Bar 
                dataKey="count" 
                name="Mentions"
                fill="url(#barGradient)"
                radius={[0, 4, 4, 0]}
              >
                {sortedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getBarColor(entry)}
                    style={{
                      filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))'
                    }}
                  />
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
