
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
      className="col-span-1"
    >
      {!hasData ? (
        <div className="bg-amber-50 border border-amber-200 rounded p-2 mb-3 flex items-center gap-2 text-sm text-amber-700">
          <AlertCircle className="h-4 w-4" />
          <span>Upload a file or enter text to see sentiment analysis.</span>
        </div>
      ) : (
        <>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 20, right: 30, bottom: 0, left: 30 }}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={0}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '3px',
                    border: '1px solid #e5e7eb',
                    padding: '8px',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend 
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ paddingTop: 20 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {data.map((item, index) => (
            item.name === "Negative" && typeof item.value === 'number' ? (
              <div key={index} className="text-center mt-2 text-sm font-medium text-red-500">
                Negative: {item.value}%
              </div>
            ) : null
          ))}
        </>
      )}
    </DashboardCard>
  );
};

export default SentimentOverview;
