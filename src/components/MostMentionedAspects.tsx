
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
    .slice(0, 10);
  
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
              margin={{ top: 5, right: 40, left: 50, bottom: 5 }}
              barSize={20}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#818CF8" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
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
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value, name, props) => {
                  const entry = props.payload;
                  if (entry.positive !== undefined) {
                    return [
                      <div>
                        <div className="font-medium">{`${value} mentions`}</div>
                        <div className="text-green-600">{`Positive: ${entry.positive}%`}</div>
                        <div className="text-gray-600">{`Neutral: ${entry.neutral}%`}</div>
                        <div className="text-red-600">{`Negative: ${entry.negative}%`}</div>
                      </div>,
                      ''
                    ];
                  }
                  return [`${value} mentions`, ''];
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
