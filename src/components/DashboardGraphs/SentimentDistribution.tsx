
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { COLORS, getThemeColors } from './constants';
import DashboardCard from '../DashboardCard';
import { PieChart as PieChartIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

interface SentimentDistributionProps {
  data: any[];
}

const SentimentDistribution: React.FC<SentimentDistributionProps> = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = getThemeColors(isDark);

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
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors.overview[index % colors.overview.length]}
                  stroke={isDark ? '#1f2937' : '#ffffff'}
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => [`${value} reviews`, name]}
              wrapperStyle={{ zIndex: 100 }}
              contentStyle={{
                backgroundColor: isDark ? '#1f2937' : '#ffffff',
                borderColor: isDark ? '#374151' : '#e5e7eb',
                color: isDark ? '#f3f4f6' : '#111827'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-2">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.positive }}></div>
          <span className="text-sm ml-2">Positive</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.neutral }}></div>
          <span className="text-sm ml-2">Neutral</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.negative }}></div>
          <span className="text-sm ml-2">Negative</span>
        </div>
      </div>
    </DashboardCard>
  );
};

export default SentimentDistribution;
