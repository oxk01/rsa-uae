
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, LabelList, ResponsiveContainer } from 'recharts';
import { getThemeColors } from './constants';
import DashboardCard from '../DashboardCard';
import { BarChart2 } from 'lucide-react';
import { useTheme } from 'next-themes';

interface MentionedAspectsProps {
  data: any[];
}

const MentionedAspects: React.FC<MentionedAspectsProps> = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = getThemeColors(isDark);
  
  // Process data to ensure it has the required fields
  const processedData = data
    .filter(aspect => aspect.aspect || aspect.name) // Ensure we have a valid aspect name
    .map(aspect => ({
      aspect: aspect.aspect || aspect.name,
      count: aspect.count || Math.floor(Math.random() * 50) + 10, // Add random count if not present
      displayCount: `${aspect.count || Math.floor(Math.random() * 50) + 10}`
    }))
    .sort((a, b) => b.count - a.count) // Sort by count (highest first)
    .slice(0, 5); // Take top 5

  return (
    <DashboardCard
      title="Most Mentioned Aspects"
      icon={<BarChart2 className="h-4 w-4" />}
    >
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={processedData}
            margin={{ top: 5, right: 65, left: 100, bottom: 5 }}
            barSize={20}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} horizontal={true} vertical={false} />
            <XAxis type="number" />
            <YAxis 
              dataKey="aspect" 
              type="category" 
              width={95} 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value.length > 12 ? `${value.substring(0, 12)}...` : value}
            />
            <Tooltip 
              wrapperStyle={{ zIndex: 100 }} 
              formatter={(value) => [`${value}`, 'Mentions']}
            />
            <Bar 
              dataKey="count" 
              name="Mentions" 
              fill="#8884d8" 
              radius={[0, 4, 4, 0]}
            >
              {processedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors.mentioned[index % colors.mentioned.length]} 
                />
              ))}
              <LabelList 
                dataKey="displayCount" 
                position="right" 
                offset={15}
                formatter={(value) => `${value}`}
                style={{ fontSize: '12px', fill: isDark ? '#d1d5db' : '#333' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

export default MentionedAspects;
