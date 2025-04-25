
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { AlertCircle } from 'lucide-react';
import DashboardCard from './DashboardCard';

const COLORS = ['#42b883', '#f6c23e', '#e64a3b'];

interface SentimentOverviewProps {
  data?: Array<{
    name: string;
    value: number;
  }>;
}

const SentimentOverview = ({ data }: SentimentOverviewProps) => {
  const hasData = data && data.length > 0;

  return (
    <DashboardCard 
      title="Overall Sentiment Distribution" 
      className="bg-gradient-to-br from-white via-gray-50 to-gray-100 border-blue-100"
    >
      {!hasData ? (
        <div className="bg-amber-50 border border-amber-200 rounded p-2 mb-3 flex items-center gap-2 text-sm text-amber-700">
          <AlertCircle className="h-4 w-4" />
          <span>Upload a file or enter text to see sentiment analysis.</span>
        </div>
      ) : (
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 20, right: 30, bottom: 0, left: 30 }}>
              <defs>
                <filter id="shadow">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2"/>
                </filter>
              </defs>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={2}
                filter="url(#shadow)"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    style={{ filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))' }}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value}%`, name]}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  padding: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              />
              <Legend 
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ 
                  paddingTop: 20,
                  fontSize: '14px',
                }}
                formatter={(value) => <span className="text-gray-700">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </DashboardCard>
  );
};

export default SentimentOverview;
