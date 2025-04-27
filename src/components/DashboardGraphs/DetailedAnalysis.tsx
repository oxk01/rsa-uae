import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer } from 'recharts';
import DashboardCard from '../DashboardCard';
import { BarChart3, Hash } from 'lucide-react';
import { getThemeColors } from './constants';
import { useTheme } from 'next-themes';

interface DetailedAnalysisProps {
  aspectData: any[];
  wordCloudData: any[];
}

const DetailedAnalysis: React.FC<DetailedAnalysisProps> = ({ aspectData, wordCloudData }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = getThemeColors(isDark);
  
  return (
    <>
      <DashboardCard
        title="Aspect-based Sentiment Breakdown"
        icon={<BarChart3 className="h-4 w-4" />}
        className={isDark ? "bg-gray-900/95" : ""}
      >
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={aspectData}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
              barSize={24}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={isDark ? 0.2 : 0.1} stroke={isDark ? "#374151" : "#e5e7eb"} />
              <XAxis 
                dataKey="aspect" 
                tick={{ fontSize: 12, fill: isDark ? "#e5e7eb" : "#374151" }}
                angle={-30}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fill: isDark ? "#e5e7eb" : "#374151" }} />
              <Tooltip 
                wrapperStyle={{ zIndex: 100 }} 
                contentStyle={{
                  backgroundColor: isDark ? '#1f2937' : 'white',
                  borderColor: isDark ? '#374151' : '#e5e7eb',
                  color: isDark ? '#f3f4f6' : '#111827'
                }}
              />
              <Legend />
              <Bar 
                dataKey="positive" 
                name="Positive" 
                fill={colors.positive} 
                radius={[4, 4, 0, 0]}
              >
                <LabelList 
                  dataKey="positive" 
                  position="top" 
                  fill={isDark ? "#e5e7eb" : "#000000"}
                />
              </Bar>
              <Bar 
                dataKey="neutral" 
                name="Neutral" 
                fill={colors.neutral} 
                radius={[4, 4, 0, 0]}
              >
                <LabelList 
                  dataKey="neutral" 
                  position="top"
                  fill={isDark ? "#e5e7eb" : "#000000"}
                />
              </Bar>
              <Bar 
                dataKey="negative" 
                name="Negative" 
                fill={colors.negative} 
                radius={[4, 4, 0, 0]}
              >
                <LabelList 
                  dataKey="negative" 
                  position="top"
                  fill={isDark ? "#e5e7eb" : "#000000"}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>
      
      <DashboardCard
        title="Top Keywords Analysis"
        icon={<Hash className="h-4 w-4" />}
        className={isDark ? "bg-gray-900/95" : ""}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className={`text-xs uppercase ${isDark ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
              <tr>
                <th className="px-6 py-3">Word</th>
                <th className="px-6 py-3">Count</th>
                <th className="px-6 py-3">Sentiment</th>
                <th className="px-6 py-3">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {wordCloudData.slice(0, 20).map((word, i) => {
                const maxCount = Math.max(...wordCloudData.map(w => w.value));
                return (
                  <tr key={i} className={`${isDark ? "bg-gray-700 border-gray-600 hover:bg-gray-600" : "bg-white border-b hover:bg-gray-50"}`}>
                    <td className="px-6 py-4 font-medium">{word.text}</td>
                    <td className="px-6 py-4">{word.value}</td>
                    <td className="px-6 py-4">
                      <span 
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          word.sentiment === 'positive' 
                            ? isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                            : word.sentiment === 'negative'
                              ? isDark ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
                              : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {word.sentiment}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {((word.value / maxCount) * 100).toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </>
  );
};

export default DetailedAnalysis;
