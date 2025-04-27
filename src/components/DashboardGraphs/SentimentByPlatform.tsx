
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getThemeColors } from './constants';
import DashboardCard from '../DashboardCard';
import { BarChart3 } from 'lucide-react';
import { useTheme } from 'next-themes';

interface SentimentByPlatformProps {
  data: any[];
}

const SentimentByPlatform: React.FC<SentimentByPlatformProps> = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = getThemeColors(isDark);
  
  return (
    <DashboardCard
      title="Sentiment by Platform/Source"
      icon={<BarChart3 className="h-4 w-4" />}
    >
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 15, left: 0, bottom: 20 }}
            barSize={30}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="source" />
            <YAxis />
            <Tooltip wrapperStyle={{ zIndex: 100 }} />
            <Legend verticalAlign="top" height={36} />
            <Bar 
              dataKey="positive" 
              name="Positive" 
              stackId="a" 
              fill={colors.positive} 
            />
            <Bar 
              dataKey="neutral" 
              name="Neutral" 
              stackId="a" 
              fill={colors.neutral} 
            />
            <Bar 
              dataKey="negative" 
              name="Negative" 
              stackId="a" 
              fill={colors.negative} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

export default SentimentByPlatform;
