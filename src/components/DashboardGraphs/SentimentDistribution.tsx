
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { COLORS } from './constants';
import DashboardCard from '../DashboardCard';
import { PieChart as PieChartIcon } from 'lucide-react';

interface SentimentDistributionProps {
  data: any[];
}

const SentimentDistribution: React.FC<SentimentDistributionProps> = ({ data }) => {
  return (
    <DashboardCard
      title="Overall Sentiment Distribution"
      icon={<PieChartIcon className="h-4 w-4" />}
    >
      <div className="h-[320px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%" className="max-w-[500px] mx-auto">
          <PieChart margin={{ top: 15, right: 15, left: 15, bottom: 15 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS.overview[index % COLORS.overview.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => [`${value} reviews`, name]}
              wrapperStyle={{ zIndex: 100 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-2">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#10b981] mr-2"></div>
          <span className="text-sm">Positive</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#6b7280] mr-2"></div>
          <span className="text-sm">Neutral</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#ef4444] mr-2"></div>
          <span className="text-sm">Negative</span>
        </div>
      </div>
    </DashboardCard>
  );
};

export default SentimentDistribution;

