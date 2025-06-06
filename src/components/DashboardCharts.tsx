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
  { aspect: 'Customer Support', score: 89, prevScore: 92 },
  { aspect: 'Product Quality', score: 82, prevScore: 85 },
  { aspect: 'Ease of Use', score: 75, prevScore: 78 },
  { aspect: 'Value for Money', score: 72, prevScore: 70 },
  { aspect: 'Feature Set', score: 68, prevScore: 71 },
  { aspect: 'Documentation', score: 65, prevScore: 63 },
  { aspect: 'Performance', score: 61, prevScore: 64 },
  { aspect: 'Reliability', score: 58, prevScore: 60 }
].sort((a, b) => b.score - a.score);

const capitalizeFirstLetter = (value: string | number): string => {
  if (typeof value === 'string') {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return String(value);
};

const Dashboard = () => {
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h3 className="text-xl font-extrabold bg-gradient-to-r from-violet-700 via-purple-400 to-blue-400 bg-clip-text text-transparent tracking-tight mb-1 flex items-center gap-2">
              Monthly Aspect Analysis
              <span className="bg-[#ffd6e0] text-xs font-bold text-pink-700 px-2 py-1 rounded-full shadow-sm">
                {monthlyAspectData.length} Aspects
              </span>
            </h3>
            <p className="text-sm text-gray-500">Comparison with previous month's scores</p>
          </div>
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyAspectData}
              layout="vertical"
              margin={{ top: 20, right: 60, left: 40, bottom: 5 }}
              barCategoryGap={25}
            >
              <CartesianGrid 
                strokeDasharray="3 6" 
                horizontal={true}
                vertical={false}
                stroke="#e5e7eb"
                opacity={0.4}
              />
              <XAxis 
                type="number" 
                domain={[0, 100]}
                tick={{ fontSize: 12, fill: "#374151" }}
                axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                tickLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                dataKey="aspect"
                type="category"
                tick={{ fontSize: 13, fill: "#111827", fontWeight: 500 }}
                axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                tickLine={false}
                width={120}
              />
              <Tooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white/95 shadow-xl p-3 border border-gray-200 rounded-lg">
                        <p className="font-semibold text-gray-900 mb-1">{data.aspect}</p>
                        <p className="text-sm text-orange-600">Current: {data.score}%</p>
                        <p className="text-sm text-gray-600">Previous: {data.prevScore}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="score"
                fill="url(#gradientBar)"
                radius={[4, 4, 4, 4]}
                barSize={24}
              >
                <defs>
                  <linearGradient id="gradientBar" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#F97316" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#FB923C" stopOpacity={0.9} />
                  </linearGradient>
                </defs>
                <LabelList 
                  dataKey="score" 
                  position="right" 
                  formatter={(value) => `${value}%`}
                  style={{ 
                    fill: '#374151',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                />
              </Bar>
              {monthlyAspectData.map((entry, index) => (
                <ReferenceDot
                  key={`ref-dot-${index}`}
                  x={entry.prevScore}
                  y={entry.aspect}
                  r={4}
                  fill="#000000"
                  stroke="white"
                  strokeWidth={2}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-8 rounded bg-gradient-to-r from-[#F97316] to-[#FB923C]"></div>
            <span className="text-gray-600 font-medium">Current Month</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-black"></div>
            <span className="text-gray-600 font-medium">Previous Month</span>
          </div>
        </div>
      </Card>
      
    </div>
  );
};

export default Dashboard;
