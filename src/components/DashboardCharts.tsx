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
  LabelList,
  ReferenceDot
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

const sentimentTrendData = [
  { month: 'Jan', positive: 65, neutral: 25, negative: 10, total: 100, reviewCount: 42 },
  { month: 'Feb', positive: 59, neutral: 22, negative: 19, total: 100, reviewCount: 38 },
  { month: 'Mar', positive: 70, neutral: 20, negative: 10, total: 100, reviewCount: 51 },
  { month: 'Apr', positive: 58, neutral: 27, negative: 15, total: 100, reviewCount: 44 },
  { month: 'May', positive: 63, neutral: 22, negative: 15, total: 100, reviewCount: 47 },
  { month: 'Jun', positive: 75, neutral: 15, negative: 10, total: 100, reviewCount: 53 },
];

const sentimentDistribution = [
  { name: 'Positive', value: 65, color: '#10b981' },
  { name: 'Neutral', value: 20, color: '#6b7280' },
  { name: 'Negative', value: 15, color: '#ef4444' },
];

const reviewSourceData = [
  { name: 'Website', value: 45 },
  { name: 'Mobile App', value: 28 },
  { name: 'Social Media', value: 17 },
  { name: 'Email', value: 10 },
];

const COLORS = ['#93B5FF', '#B0FFBC', '#FFD6E0', '#CAACFF'];
const PASTEL_COLORS = ['#F2FCE2', '#FEF7CD', '#E5DEFF', '#D3E4FD'];

const monthlyAspectData = [
  { month: 'Jan', aspect: 'Product Quality', score: 89, prevScore: 92 },
  { month: 'Feb', aspect: 'Customer Service', score: 75, prevScore: 78 },
  { month: 'Mar', aspect: 'Price', score: 68, prevScore: 65 },
  { month: 'Apr', aspect: 'Delivery', score: 62, prevScore: 64 },
  { month: 'May', aspect: 'Website UX', score: 58, prevScore: 61 },
  { month: 'Jun', aspect: 'Returns Process', score: 55, prevScore: 52 }
];

const capitalizeFirstLetter = (value: string | number): string => {
  if (typeof value === 'string') {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return String(value);
};

const DashboardCharts = () => {
  const { t } = useLanguage();
  
  const aggregatedTrendData = useMemo(() => {
    return sentimentTrendData.map(item => ({
      ...item,
      monthYear: `${item.month} 2025`,
      positive: Math.round(item.positive * (1 + (Math.random() * 0.04 - 0.02))),
      neutral: Math.round(item.neutral * (1 + (Math.random() * 0.04 - 0.02))),
      negative: Math.round(item.negative * (1 + (Math.random() * 0.04 - 0.02))),
    }));
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <Card className="col-span-1 lg:col-span-2 p-4 border-blue-100 bg-gradient-to-r from-[#fdfcfb] via-[#e0f4ff] to-[#f8fbfe]/75">
        <h3 className="text-lg font-medium mb-4">{t('sentimentTrend')}</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={aggregatedTrendData}
              margin={{ top: 35, right: 30, left: 0, bottom: 40 }}
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
              
              <text x="50%" y="15" textAnchor="middle" className="text-sm font-medium text-blue-800">
                Reviews by Month
              </text>
              
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis 
                dataKey="monthYear" 
                tick={{ fontSize: 13, fill: "#2353a2" }}
                axisLine={{ stroke: "#bae6fd", strokeWidth: 1 }}
                textAnchor="end"
                height={60}
                angle={-30}
                minTickGap={0}
                interval={0}
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
                labelFormatter={(label) => `${label}`}
              />
              <Area
                type="monotone"
                dataKey="positive"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPositive)"
                activeDot={{ r: 8, strokeWidth: 2, stroke: '#fff' }}
              />
              <Area
                type="monotone"
                dataKey="neutral"
                stroke="#6b7280"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorNeutral)"
                activeDot={{ r: 8, strokeWidth: 2, stroke: '#fff' }}
              />
              <Area
                type="monotone"
                dataKey="negative"
                stroke="#ef4444"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorNegative)"
                activeDot={{ r: 8, strokeWidth: 2, stroke: '#fff' }}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                iconType="circle"
                iconSize={10}
                formatter={(value) => (
                  <span className="text-sm font-medium">
                    {capitalizeFirstLetter(String(value))}
                  </span>
                )}
              />
              
              {aggregatedTrendData.map((entry, index) => (
                <text
                  key={`review-count-${index}`}
                  x={`${8 + (index * (100 / (aggregatedTrendData.length - 1)))}%`}
                  y={25}
                  textAnchor="middle"
                  className="text-xs font-semibold"
                  fill="#4b5563"
                >
                  {entry.reviewCount} reviews
                </text>
              ))}
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
                label={({ name, percent }) => `${String(name)}: ${(percent * 100).toFixed(0)}%`}
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
                    {String(value)}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

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
                label={({ name, value }) => `${String(name)}: ${value}%`}
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
                    {String(value)}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="col-span-1 lg:col-span-3 p-4 border-blue-100 bg-gradient-to-r from-[#fdfcfb] via-[#f1f7ff] to-[#f8fbfe]/75">
        <h3 className="text-lg font-medium mb-4">{t('sentimentOverTime')}</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={aggregatedTrendData}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
              barGap={0}
              barCategoryGap="10%"
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis 
                dataKey="monthYear" 
                tick={{ fontSize: 13, fill: "#2353a2" }}
                axisLine={{ stroke: "#bae6fd", strokeWidth: 1 }}
                textAnchor="end"
                height={60}
                angle={-30}
                interval={0}
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
                  return [`${value}%`, capitalizeFirstLetter(String(name))];
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
                    {capitalizeFirstLetter(String(value))}
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

      <Card className="col-span-1 lg:col-span-3 p-4 border-amber-100 bg-gradient-to-r from-[#fffbf2] via-[#fff8e6] to-[#fff9ed]/75">
        <h3 className="text-lg font-medium mb-4">{t('aspectTrends')}</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyAspectData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barGap={0}
              barCategoryGap="25%"
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                opacity={0.15} 
                horizontal={true}
                vertical={false}
              />
              <XAxis 
                dataKey="aspect"
                interval={0}
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fontSize: 12, fill: "#374151" }}
                axisLine={{ stroke: "#e5e7eb", strokeWidth: 1 }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 12, fill: "#374151" }}
                axisLine={{ stroke: "#e5e7eb", strokeWidth: 1 }}
                tickLine={{ stroke: "#e5e7eb" }}
              />
              <Tooltip
                cursor={false}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value, name) => {
                  if (name === 'score') return [`${value}%`, 'Current Score'];
                  if (name === 'prevScore') return [`${value}%`, 'Previous Score'];
                  return [value, name];
                }}
              />
              <Bar
                dataKey="score"
                fill="#F97316"
                radius={[4, 4, 0, 0]}
                barSize={40}
                name="Current Score"
              >
                <LabelList
                  dataKey="score"
                  position="top"
                  formatter={(value) => `${value}%`}
                  style={{ 
                    fontSize: '11px', 
                    fill: '#374151',
                    fontWeight: 500 
                  }}
                />
              </Bar>
              {monthlyAspectData.map((entry, index) => (
                <ReferenceDot
                  key={`prev-score-${index}`}
                  x={entry.aspect}
                  y={entry.prevScore}
                  r={5}
                  fill="#000000"
                  stroke="white"
                  strokeWidth={2}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-6 text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#F97316] rounded mr-2"></div>
            <span>Current Month Score</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-black border-2 border-white mr-2 shadow-sm"></div>
            <span>Previous Month Score</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardCharts;
