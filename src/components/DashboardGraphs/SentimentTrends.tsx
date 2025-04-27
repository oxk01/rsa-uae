
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getThemeColors } from './constants';
import DashboardCard from '../DashboardCard';
import { LineChart as LineChartIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

interface SentimentTrendsProps {
  data: any[];
}

const SentimentTrends: React.FC<SentimentTrendsProps> = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = getThemeColors(isDark);
  
  return (
    <DashboardCard
      title="Sentiment Trends Over Time"
      icon={<LineChartIcon className="h-4 w-4" />}
    >
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 15, right: 30, left: 0, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis 
              dataKey="date" 
              angle={-45} 
              textAnchor="end"
              height={60}
              fontSize={12}
            />
            <YAxis />
            <Tooltip wrapperStyle={{ zIndex: 100 }} />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="positive"
              name="Positive"
              stroke={colors.positive}
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="neutral"
              name="Neutral"
              stroke={colors.neutral}
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="negative"
              name="Negative"
              stroke={colors.negative}
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

export default SentimentTrends;
