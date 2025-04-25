
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import DashboardCard from './DashboardCard';

interface MostMentionedAspectsProps {
  data?: Array<{
    aspect: string;
    count: number;
  }>;
}

const MostMentionedAspects = ({ data = [] }: MostMentionedAspectsProps) => {
  const hasData = data && data.length > 0;
  
  // Sort and limit data to top 5 aspects
  const sortedData = [...(data || [])]
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
    
  return (
    <DashboardCard 
      title="Most Mentioned Aspects"
      className="col-span-1"
    >
      {!hasData ? (
        <div className="h-[260px] flex items-center justify-center text-gray-400">
          No aspect data available
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
                formatter={(value) => [`${value} mentions`, 'Count']}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '3px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="count" 
                fill="#3b82f6" 
                radius={[0, 4, 4, 0]}
              >
                {sortedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#3b82f6" />
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
