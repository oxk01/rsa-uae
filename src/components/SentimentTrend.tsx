import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { AlertCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface SentimentTrendProps {
  trendData?: Array<{
    date: string;
    positive: number;
    neutral: number;
    negative: number;
  }>;
}

const SentimentTrend = ({ trendData }: SentimentTrendProps) => {
  const hasData = trendData && trendData.length > 0;
  const [chartHeight] = useState(300);
  const [showLegend] = useState(true);
  
  const processedData = useMemo(() => {
    if (!hasData) return [];
    
    return trendData.map(item => {
      let formattedDate = item.date;
      try {
        const dateObj = new Date(item.date);
        if (!isNaN(dateObj.getTime())) {
          formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short' });
        }
      } catch (e) {
        console.error("Date parsing error:", e);
      }
      
      return {
        ...item,
        date: formattedDate
      };
    });
  }, [trendData, hasData]);
  
  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      {!hasData ? (
        <div className="bg-amber-50 border border-amber-200 rounded p-4 flex items-center gap-2 text-sm text-amber-700">
          <AlertCircle className="h-4 w-4" />
          <span>Upload a file or enter text to see sentiment trends.</span>
        </div>
      ) : (
        <Tabs defaultValue="sentiment-trends">
          <TabsList className="mb-4 bg-gray-100 p-1 rounded-md w-full">
            <TabsTrigger value="aspect-analysis" className="flex-1">Aspect Analysis</TabsTrigger>
            <TabsTrigger value="sentiment-trends" className="flex-1">Sentiment Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="sentiment-trends">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Sentiment Trends Over Time</h2>
                  <p className="text-sm text-gray-500">How sentiment has changed over the selected time period</p>
                </div>
              </div>
              
              <div className={`h-${chartHeight} mt-8`} style={{ height: `${chartHeight}px` }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={processedData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    {showLegend && <Legend />}
                    <Line 
                      type="monotone" 
                      dataKey="positive" 
                      stroke="#10b981" 
                      strokeWidth={2} 
                      activeDot={{ r: 8 }} 
                      dot={{ r: 4 }}
                      name="Positive"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="neutral" 
                      stroke="#6b7280" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                      name="Neutral"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="negative" 
                      stroke="#ef4444" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                      name="Negative"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#10b981] mr-2"></div>
                  <span className="text-xs">Positive</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#6b7280] mr-2"></div>
                  <span className="text-xs">Neutral</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444] mr-2"></div>
                  <span className="text-xs">Negative</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b] mr-2"></div>
                  <span className="text-xs">Mixed</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="aspect-analysis">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Aspect-Based Analysis</h2>
                  <p className="text-sm text-gray-500">Sentiment breakdown by different aspects of the product or service</p>
                </div>
              </div>
              
              <div className={`h-${chartHeight} mt-8`} style={{ height: `${chartHeight}px` }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={aspectData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="aspect" type="category" />
                    <Tooltip />
                    {showLegend && <Legend />}
                    <Bar dataKey="positive" stackId="a" fill="#10b981" name="Positive" />
                    <Bar dataKey="neutral" stackId="a" fill="#6b7280" name="Neutral" />
                    <Bar dataKey="negative" stackId="a" fill="#ef4444" name="Negative" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#10b981] mr-2"></div>
                  <span className="text-xs">Positive</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#6b7280] mr-2"></div>
                  <span className="text-xs">Neutral</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444] mr-2"></div>
                  <span className="text-xs">Negative</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded shadow-sm">
        <p className="font-semibold mb-1">{label}</p>
        <div className="text-[#10b981]">Positive: {payload[0]?.value || 0}</div>
        <div className="text-[#6b7280]">Neutral: {payload[1]?.value || 0}</div>
        <div className="text-[#ef4444]">Negative: {payload[2]?.value || 0}</div>
      </div>
    );
  }

  return null;
};

export default SentimentTrend;
