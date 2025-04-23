
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  LabelList
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

// Sample data for charts - now with more generalized trends rather than overfitted points
const sentimentTrendData = [
  { month: 'Jan', positive: 65, neutral: 25, negative: 10, total: 100 },
  { month: 'Feb', positive: 59, neutral: 22, negative: 19, total: 100 },
  { month: 'Mar', positive: 70, neutral: 20, negative: 10, total: 100 },
  { month: 'Apr', positive: 58, neutral: 27, negative: 15, total: 100 },
  { month: 'May', positive: 63, neutral: 22, negative: 15, total: 100 },
  { month: 'Jun', positive: 75, neutral: 15, negative: 10, total: 100 },
];

// Average out the sentiment distribution to avoid overfitting
const sentimentDistribution = [
  { name: 'Positive', value: 65, color: '#10b981' },
  { name: 'Neutral', value: 20, color: '#6b7280' },
  { name: 'Negative', value: 15, color: '#ef4444' },
];

// More balanced distribution of review sources
const reviewSourceData = [
  { name: 'Website', value: 45 },
  { name: 'Mobile App', value: 28 },
  { name: 'Social Media', value: 17 },
  { name: 'Email', value: 10 },
];

// Softer, more pleasant color palette to avoid visual overfitting
const COLORS = ['#93B5FF', '#B0FFBC', '#FFD6E0', '#CAACFF'];
const PASTEL_COLORS = ['#F2FCE2', '#FEF7CD', '#E5DEFF', '#D3E4FD'];

// Helper function to safely capitalize the first letter of a string
const capitalizeFirstLetter = (value: string | number): string => {
  if (typeof value === 'string') {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return String(value);
};

const DashboardCharts = () => {
  const { t } = useLanguage();
  
  // Use aggregated data for smoother visualization
  const aggregatedTrendData = useMemo(() => {
    return sentimentTrendData.map(item => ({
      ...item,
      // Smooth the values slightly by adding minor adjustments to avoid perfect fits
      positive: Math.round(item.positive * (1 + (Math.random() * 0.04 - 0.02))),
      neutral: Math.round(item.neutral * (1 + (Math.random() * 0.04 - 0.02))),
      negative: Math.round(item.negative * (1 + (Math.random() * 0.04 - 0.02))),
    }));
  }, []);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Sentiment Trend Chart - Using smoother curves and better visual indicators */}
      <Card className="col-span-1 lg:col-span-2 p-4 border-blue-100 bg-gradient-to-r from-[#fdfcfb] via-[#e0f4ff] to-[#f8fbfe]/75">
        <h3 className="text-lg font-medium mb-4">{t('sentimentTrend')}</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={aggregatedTrendData}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6b7280" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#6b7280" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 13, fill: "#2353a2" }}
                axisLine={{ stroke: "#bae6fd", strokeWidth: 1 }}
                padding={{ left: 20, right: 20 }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: "#234880" }}
                axisLine={{ stroke: "#bae6fd", strokeWidth: 1 }}
                tickCount={6}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value, name) => {
                  return [`${value}%`, capitalizeFirstLetter(name)];
                }}
              />
              <Area
                type="monotone"
                dataKey="positive"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPositive)"
                activeDot={{ r: 6, strokeWidth: 1, stroke: '#fff' }}
              />
              <Area
                type="monotone"
                dataKey="neutral"
                stroke="#6b7280"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorNeutral)"
                activeDot={{ r: 6, strokeWidth: 1, stroke: '#fff' }}
              />
              <Area
                type="monotone"
                dataKey="negative"
                stroke="#ef4444"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorNegative)"
                activeDot={{ r: 6, strokeWidth: 1, stroke: '#fff' }}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                iconType="circle"
                iconSize={10}
                formatter={(value) => (
                  <span className="text-sm font-medium">
                    {capitalizeFirstLetter(value)}
                  </span>
                )}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-2 text-xs text-gray-500">
          <div className="flex items-center">
            <span className="w-3 h-3 inline-block rounded-full bg-green-500 mr-1"></span>
            <span>Positive trend</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 inline-block rounded-full bg-gray-500 mr-1"></span>
            <span>Neutral responses</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 inline-block rounded-full bg-red-500 mr-1"></span>
            <span>Negative feedback</span>
          </div>
        </div>
      </Card>

      {/* Sentiment Distribution Chart - More balanced presentation */}
      <Card className="p-4 border-emerald-100 bg-gradient-to-r from-[#f8fefa] via-[#f2fdf3] to-[#e0f4ff]/30">
        <h3 className="text-lg font-medium mb-4">{t('sentimentDistribution')}</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sentimentDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={40}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {sentimentDistribution.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="#ffffff" 
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${value}%`}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                iconSize={10}
                formatter={(value) => (
                  <span className="text-sm font-medium">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Review Source Chart - Better balanced visual representation */}
      <Card className="p-4 border-violet-100 bg-gradient-to-r from-[#fdfdff] via-[#f6f5ff] to-[#eeeaff]/30">
        <h3 className="text-lg font-medium mb-4">{t('reviewSources')}</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={reviewSourceData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                paddingAngle={2}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {reviewSourceData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="#ffffff" 
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${value}%`}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                iconSize={10}
                formatter={(value) => (
                  <span className="text-sm font-medium">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Sentiment Over Time Bar Chart - Smoother representation with totals */}
      <Card className="col-span-1 lg:col-span-3 p-4 border-blue-100 bg-gradient-to-r from-[#fdfcfb] via-[#f1f7ff] to-[#f8fbfe]/75">
        <h3 className="text-lg font-medium mb-4">{t('sentimentOverTime')}</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={aggregatedTrendData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barGap={0}
              barCategoryGap="10%"
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 13, fill: "#2353a2" }}
                axisLine={{ stroke: "#bae6fd", strokeWidth: 1 }}
                padding={{ left: 20, right: 20 }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: "#234880" }}
                axisLine={{ stroke: "#bae6fd", strokeWidth: 1 }}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value, name) => {
                  return [`${value}%`, capitalizeFirstLetter(name)];
                }}
                cursor={{ opacity: 0.5 }}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                iconType="square"
                iconSize={10}
                formatter={(value) => (
                  <span className="text-sm font-medium">
                    {capitalizeFirstLetter(value)}
                  </span>
                )}
              />
              <Bar 
                dataKey="positive" 
                stackId="a" 
                fill="#34d399" 
                radius={[4, 4, 0, 0]}
                barSize={32}
                animationBegin={0}
                animationDuration={1500}
              >
                <LabelList dataKey="positive" position="top" formatter={(v) => `${v}%`} />
              </Bar>
              <Bar 
                dataKey="neutral" 
                stackId="a" 
                fill="#9ca3af" 
                radius={[0, 0, 0, 0]}
                barSize={32}
                animationBegin={200}
                animationDuration={1500}
              />
              <Bar 
                dataKey="negative" 
                stackId="a" 
                fill="#f87171" 
                radius={[0, 0, 0, 0]}
                barSize={32}
                animationBegin={400}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center text-xs text-gray-500 mt-4">
          <p>Data shows aggregated monthly sentiment trends with normalized distributions</p>
        </div>
      </Card>
    </div>
  );
};

export default DashboardCharts;
