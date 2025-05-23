import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Legend, LabelList, ReferenceLine
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardCard from './DashboardCard';
import { 
  PieChart as PieChartIcon, BarChart2, BarChart3, LineChart as LineChartIcon, 
  Hash, BarChartHorizontal, Activity
} from 'lucide-react';

interface DashboardGraphsProps {
  sentimentOverviewData: any[];
  trendData: any[];
  aspectData: any[];
  wordCloudData: any[];
  sourceData: any[];
  mentionedAspectsData: any[];
  confusionMatrixData: any[];
}

const COLORS = {
  positive: '#10b981',
  neutral: '#6b7280',
  negative: '#ef4444',
  overview: ['#10b981', '#6b7280', '#ef4444'],
  aspects: ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6'],
  wordcloud: {
    positive: '#22c55e',
    neutral: '#6b7280',
    negative: '#ef4444'
  },
  sources: ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'],
  mentioned: ['#67e8f9', '#818cf8', '#a78bfa', '#c084fc', '#e879f9', '#f472b6', '#fb7185'],
  confusionMatrix: ['#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#e11d48', '#be123c', '#881337']
};

const getWordSize = (count: number, max: number, min: number) => {
  const minSize = 12;
  const maxSize = 40;
  
  if (max === min) return (minSize + maxSize) / 2;
  
  return minSize + ((count - min) / (max - min)) * (maxSize - minSize);
};

const getSentimentColor = (sentiment: string) => {
  switch (sentiment.toLowerCase()) {
    case 'positive': return COLORS.positive;
    case 'negative': return COLORS.negative;
    default: return COLORS.neutral;
  }
};

const DashboardGraphs: React.FC<DashboardGraphsProps> = ({
  sentimentOverviewData,
  trendData,
  aspectData,
  wordCloudData,
  sourceData,
  mentionedAspectsData,
  confusionMatrixData
}) => {
  const [viewType, setViewType] = useState<'charts' | 'details'>('charts');
  
  let minCount = 0, maxCount = 0;
  
  if (wordCloudData.length > 0) {
    minCount = Math.min(...wordCloudData.map(item => item.value));
    maxCount = Math.max(...wordCloudData.map(item => item.value));
  }
  
  const CustomizedLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    return (
      <text 
        x={x + width / 2} 
        y={y + height / 2} 
        fill="#fff" 
        textAnchor="middle" 
        dominantBaseline="middle"
        fontSize={12}
        fontWeight={500}
      >
        {value}%
      </text>
    );
  };
  
  const processedMentionedAspects = mentionedAspectsData
    .slice(0, 5)
    .map(aspect => ({
      ...aspect,
      displayCount: `${aspect.count}`
    }));
  
  return (
    <div className="mt-8">
      <Tabs defaultValue="charts" className="w-full">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Sentiment Analysis Insights</h2>
          <TabsList>
            <TabsTrigger value="charts" onClick={() => setViewType('charts')}>
              <BarChart2 className="h-4 w-4 mr-2" />
              Charts
            </TabsTrigger>
            <TabsTrigger value="details" onClick={() => setViewType('details')}>
              <BarChartHorizontal className="h-4 w-4 mr-2" />
              Detailed Analysis
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="charts" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DashboardCard
              title="Overall Sentiment Distribution"
              icon={<PieChartIcon className="h-4 w-4" />}
            >
              <div className="h-[320px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%" className="max-w-[500px] mx-auto">
                  <PieChart margin={{ top: 15, right: 15, left: 15, bottom: 15 }}>
                    <Pie
                      data={sentimentOverviewData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {sentimentOverviewData.map((entry, index) => (
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
            
            <DashboardCard
              title="Sentiment Trends Over Time"
              icon={<LineChartIcon className="h-4 w-4" />}
            >
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={trendData}
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
                      stroke={COLORS.positive}
                      activeDot={{ r: 6 }}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="neutral"
                      name="Neutral"
                      stroke={COLORS.neutral}
                      activeDot={{ r: 6 }}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="negative"
                      name="Negative"
                      stroke={COLORS.negative}
                      activeDot={{ r: 6 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DashboardCard
              title="Frequent Words in Reviews"
              icon={<Hash className="h-4 w-4" />}
            >
              <div className="h-[320px] relative overflow-hidden">
                <div className="absolute inset-0 flex flex-wrap justify-center items-center p-6">
                  {wordCloudData.slice(0, 40).map((word, i) => (
                    <div
                      key={i}
                      className="px-2 py-1 mb-1"
                      style={{
                        fontSize: `${getWordSize(word.value, maxCount, minCount)}px`,
                        color: getSentimentColor(word.sentiment),
                        fontWeight: word.value > (maxCount / 2) ? 600 : 400
                      }}
                    >
                      {word.text}
                    </div>
                  ))}
                </div>
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
            
            <DashboardCard
              title="Sentiment by Platform/Source"
              icon={<BarChart3 className="h-4 w-4" />}
            >
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sourceData}
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
                      fill={COLORS.positive} 
                    />
                    <Bar 
                      dataKey="neutral" 
                      name="Neutral" 
                      stackId="a" 
                      fill={COLORS.neutral} 
                    />
                    <Bar 
                      dataKey="negative" 
                      name="Negative" 
                      stackId="a" 
                      fill={COLORS.negative} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DashboardCard
              title="Most Mentioned Aspects"
              icon={<BarChart2 className="h-4 w-4" />}
            >
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={processedMentionedAspects}
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
                      {processedMentionedAspects.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS.mentioned[index % COLORS.mentioned.length]} 
                        />
                      ))}
                      <LabelList 
                        dataKey="displayCount" 
                        position="right" 
                        offset={15}
                        formatter={(value) => `${value}`}
                        style={{ fontSize: '12px', fill: '#333' }}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
            
            <DashboardCard
              title="Model Evaluation"
              icon={<Activity className="h-4 w-4" />}
            >
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={confusionMatrixData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    barSize={30}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis 
                      dataKey="confidence"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      label={{ 
                        value: 'Accuracy (%)', 
                        angle: -90, 
                        position: 'insideLeft',
                        offset: -5
                      }} 
                    />
                    <Tooltip 
                      formatter={(value) => {
                        if (typeof value === 'number') {
                          return [`${value.toFixed(1)}%`, 'Accuracy'];
                        }
                        return [`${value}%`, 'Accuracy'];
                      }}
                      wrapperStyle={{ zIndex: 100 }}
                    />
                    <ReferenceLine y={80} label="Excellent" stroke="#10b981" strokeDasharray="3 3" />
                    <ReferenceLine y={60} label="Good" stroke="#f59e0b" strokeDasharray="3 3" />
                    <Bar dataKey="accuracy" name="Prediction Accuracy">
                      {confusionMatrixData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.accuracy > 80 ? '#10b981' : entry.accuracy > 60 ? '#f59e0b' : '#ef4444'}
                        >
                          <LabelList 
                            dataKey="accuracy" 
                            position="top" 
                            formatter={(value: number) => `${value.toFixed(1)}%`}
                          />
                        </Cell>
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                <p>Model accuracy evaluation across different confidence levels</p>
              </div>
            </DashboardCard>
          </div>
        </TabsContent>
        
        <TabsContent value="details" className="space-y-8">
          <DashboardCard
            title="Aspect-based Sentiment Breakdown"
            icon={<BarChart3 className="h-4 w-4" />}
          >
            <div className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={aspectData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                  barSize={24}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis 
                    dataKey="aspect" 
                    tick={{ fontSize: 12 }}
                    angle={-30}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis />
                  <Tooltip wrapperStyle={{ zIndex: 100 }} />
                  <Legend />
                  <Bar 
                    dataKey="positive" 
                    name="Positive" 
                    fill={COLORS.positive} 
                    radius={[4, 4, 0, 0]}
                  >
                    <LabelList dataKey="positive" position="top" />
                  </Bar>
                  <Bar 
                    dataKey="neutral" 
                    name="Neutral" 
                    fill={COLORS.neutral} 
                    radius={[4, 4, 0, 0]}
                  >
                    <LabelList dataKey="neutral" position="top" />
                  </Bar>
                  <Bar 
                    dataKey="negative" 
                    name="Negative" 
                    fill={COLORS.negative} 
                    radius={[4, 4, 0, 0]}
                  >
                    <LabelList dataKey="negative" position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>
          
          <DashboardCard
            title="Top Keywords Analysis"
            icon={<Hash className="h-4 w-4" />}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Word</th>
                    <th className="px-6 py-3">Count</th>
                    <th className="px-6 py-3">Sentiment</th>
                    <th className="px-6 py-3">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {wordCloudData.slice(0, 20).map((word, i) => (
                    <tr key={i} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{word.text}</td>
                      <td className="px-6 py-4">{word.value}</td>
                      <td className="px-6 py-4">
                        <span 
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            word.sentiment === 'positive' ? 'bg-green-100 text-green-800' : 
                            word.sentiment === 'negative' ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {word.sentiment}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {((word.value / maxCount) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashboardCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardGraphs;
