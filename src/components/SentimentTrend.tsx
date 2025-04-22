
import React, { useState, useMemo, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { AlertCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SentimentTrendProps {
  trendData?: Array<{
    date: string;
    positive: number;
    neutral: number;
    negative: number;
    originalDate?: string;
    reviewSnippet?: string;
  }>;
  aspectData?: Array<{
    aspect: string;
    positive: number;
    neutral: number;
    negative: number;
  }>;
}

const pastelCardGradient = "bg-gradient-to-br from-[#f5f7fa] via-[#e5deff] to-[#e8f0fe]";
const softShadow = "shadow-lg hover:shadow-xl transition-shadow duration-300";
const pastelBorder = "border border-[#e2e8f0]";
const sectionPadding = "p-6 md:p-8";

const SentimentTrend = ({ trendData, aspectData: providedAspectData }: SentimentTrendProps) => {
  const hasData = trendData && trendData.length > 0;
  const [chartHeight] = useState(300);
  const [showLegend] = useState(true);
  const [selectedAspect, setSelectedAspect] = useState<string>("all");
  
  const processedData = useMemo(() => {
    if (!hasData) return [];
    // Map through all data points (real graph, not just one date!)
    return trendData.map(item => {
      let formattedDate = item.date;
      let originalDate = item.originalDate || item.date;
      try {
        const dateObj = new Date(item.date);
        if (!isNaN(dateObj.getTime())) {
          formattedDate = dateObj.toLocaleDateString('en-US', { 
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
          originalDate = item.originalDate || dateObj.toISOString().split('T')[0];
        }
      } catch (e) {
        // use fallback
      }
      return {
        ...item,
        date: formattedDate,
        originalDate,
        reviewSnippet: item.reviewSnippet || "No review snippet available"
      };
    });
  }, [trendData, hasData]);
  
  // Use provided aspect data or generate sample data if not provided
  const aspectData = useMemo(() => {
    if (providedAspectData && providedAspectData.length > 0) return providedAspectData;
    if (!hasData) return [];
    // fallback sample
    return [
      { aspect: 'Quality', positive: 65, neutral: 20, negative: 15 },
      { aspect: 'Price', positive: 40, neutral: 30, negative: 30 },
      { aspect: 'Service', positive: 70, neutral: 20, negative: 10 },
      { aspect: 'Delivery', positive: 55, neutral: 25, negative: 20 },
      { aspect: 'User Interface', positive: 60, neutral: 30, negative: 10 }
    ];
  }, [providedAspectData, hasData]);

  const filteredAspectData = useMemo(() => {
    if (selectedAspect === "all") return aspectData;
    return aspectData.filter(item => item.aspect.toLowerCase() === selectedAspect.toLowerCase());
  }, [aspectData, selectedAspect]);

  const getAvailableAspects = useCallback(() => {
    if (!aspectData || aspectData.length === 0) return [];
    return ["all", ...aspectData.map(item => item.aspect.toLowerCase())];
  }, [aspectData]);

  const availableAspects = getAvailableAspects();

  return (
    <div className={`${pastelCardGradient} ${pastelBorder} ${softShadow} rounded-2xl ${sectionPadding} transition-all relative`}>
      {!hasData ? (
        <div className="bg-amber-50 border border-amber-200 rounded p-4 flex items-center gap-2 text-sm text-amber-700">
          <AlertCircle className="h-4 w-4" />
          <span>Upload a file or enter text to see sentiment trends.</span>
        </div>
      ) : (
        <Tabs defaultValue="sentiment-trends">
          <TabsList className="mb-4 bg-gradient-to-r from-white via-[#ecebfc]/70 to-[#f5f7fa]/95 rounded-xl p-1 w-full shadow-inner backdrop-blur-[2px]">
            <TabsTrigger value="aspect-analysis" className="flex-1 rounded-lg text-sm font-semibold ring-offset-violet-200 data-[state=active]:bg-[#e5deff] data-[state=active]:text-violet-800">
              Aspect Analysis
            </TabsTrigger>
            <TabsTrigger value="sentiment-trends" className="flex-1 rounded-lg text-sm font-semibold ring-offset-blue-200 data-[state=active]:bg-[#e8f0fe] data-[state=active]:text-blue-800">
              Sentiment Trends
            </TabsTrigger>
          </TabsList>

          {/* Sentiment Trends Tab */}
          <TabsContent value="sentiment-trends" className="animate-fade-in">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-extrabold bg-gradient-to-r from-blue-900/90 via-violet-700/70 to-blue-400/75 bg-clip-text text-transparent tracking-tight mb-1">Sentiment Trends Over Time</h2>
                  <p className="text-sm text-gray-500">How sentiment has changed over the selected time period</p>
                </div>
              </div>
              
              {/* Graph Card */}
              <div className={`mt-8 rounded-xl overflow-hidden ${softShadow} bg-gradient-to-bl from-white via-[#d3e4fd]/60 to-[#f1f0fb]/80 ring-1 ring-inset ring-blue-100/70`}>
                <div className="p-2" style={{height: `${chartHeight}px`}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={processedData}
                      margin={{ top: 18, right: 32, left: 12, bottom: 16 }}
                    >
                      <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" opacity={0.25} />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12, fill: "#333" }}
                        angle={-35}
                        height={58}
                        textAnchor="end"
                        axisLine={{stroke: "#e2e8f0"}}
                        tickLine={false}
                      />
                      <YAxis 
                        width={42}
                        tick={{ fontSize: 12, fill: "#333" }} 
                        axisLine={{stroke: "#e2e8f0"}} 
                        tickLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      {showLegend && <Legend wrapperStyle={{ paddingTop: 16 }} iconSize={16} iconType="circle"/>}
                      <Line 
                        type="monotone" 
                        dataKey="positive" 
                        stroke="#10b981"
                        fill="#d1fae5"
                        strokeWidth={3}
                        dot={{ r: 5, fill: '#10b981', strokeWidth: 1, stroke: "#fff"}}
                        name="Positive"
                        animationDuration={900}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="neutral" 
                        stroke="#6b7280" 
                        fill="#e5e7eb"
                        strokeWidth={3}
                        dot={{ r: 5, fill: '#6b7280', strokeWidth: 1, stroke: "#fff" }}
                        name="Neutral"
                        animationDuration={900}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="negative" 
                        stroke="#ef4444" 
                        fill="#fff1f2"
                        strokeWidth={3}
                        dot={{ r: 5, fill: '#ef4444', strokeWidth: 1, stroke: "#fff" }}
                        name="Negative"
                        animationDuration={900}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="flex justify-center gap-6 mt-5 mb-2">
                <LegendDot color="#10b981" label="Positive" />
                <LegendDot color="#6b7280" label="Neutral" />
                <LegendDot color="#ef4444" label="Negative" />
                <LegendDot color="#f59e0b" label="Mixed" />
              </div>
            </div>
          </TabsContent>

          {/* Aspect Analysis Tab */}
          <TabsContent value="aspect-analysis" className="animate-fade-in">
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <div>
                  <h2 className="text-xl font-extrabold bg-gradient-to-r from-violet-700 via-purple-400 to-blue-400 bg-clip-text text-transparent tracking-tight mb-1">Aspect-Based Analysis</h2>
                  <p className="text-sm text-gray-500">Sentiment breakdown by different aspects of the product or service</p>
                </div>
                
                {availableAspects.length > 1 && (
                  <div className="w-full md:w-auto">
                    <Select value={selectedAspect} onValueChange={setSelectedAspect}>
                      <SelectTrigger className="w-full md:w-[200px] font-semibold border-violet-200/70 bg-white/70 backdrop-blur-md shadow-sm">
                        <SelectValue placeholder="Filter by aspect" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableAspects.map((aspect) => (
                          <SelectItem key={aspect} value={aspect}>
                            {aspect === "all" ? "All Aspects" : aspect.charAt(0).toUpperCase() + aspect.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              
              {/* Aspect Chart Card */}
              <div className="mt-8 rounded-xl overflow-hidden bg-gradient-to-br from-[#fff4f9] via-[#e0f4ff]/60 to-[#fdfcfb]/70 ring-1 ring-inset ring-violet-100/80 shadow-lg">
                <div className="p-2" style={{height: `${chartHeight}px`}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={filteredAspectData}
                      layout="vertical"
                      margin={{ top: 12, right: 30, left: 24, bottom: 12 }}
                    >
                      <CartesianGrid strokeDasharray="3 6" stroke="#e3e3e3" opacity={0.16} horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 12, fill: "#444" }} axisLine={{stroke:'#e3e3e3'}}  tickLine={false}/>
                      <YAxis dataKey="aspect" type="category" tick={{ fontWeight: 700, fontSize: 14, fill: "#444" }} axisLine={{stroke:'#e3e3e3'}} tickLine={false}/>
                      <Tooltip content={<AspectTooltip />} />
                      {showLegend && <Legend wrapperStyle={{paddingTop:20}} iconSize={16} iconType="circle"/>}
                      <Bar 
                        dataKey="positive" 
                        stackId="a" 
                        fill="#b1faea" 
                        name="Positive" 
                        animationDuration={900}
                        radius={[10,10,10,10]}
                      />
                      <Bar 
                        dataKey="neutral" 
                        stackId="a" 
                        fill="#deddfa" 
                        name="Neutral" 
                        animationDuration={900}
                        radius={[10,10,10,10]}
                      />
                      <Bar 
                        dataKey="negative" 
                        stackId="a" 
                        fill="#ffd6e0" 
                        name="Negative" 
                        animationDuration={900}
                        radius={[10,10,10,10]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="flex justify-center gap-6 mt-5 mb-2">
                <LegendDot color="#10b981" label="Positive" />
                <LegendDot color="#6b7280" label="Neutral" />
                <LegendDot color="#ef4444" label="Negative" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

const LegendDot = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center">
    <div className="w-3 h-3 rounded-full" style={{ background: color, boxShadow: "0 1px 3px rgba(0,0,0,0.10)" }} />
    <span className="text-xs font-medium ml-1 text-gray-600">{label}</span>
  </div>
);

// Styled tooltip for line chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const originalDate = data.originalDate || label;
    const reviewSnippet = data.reviewSnippet || '';
    return (
      <div className="bg-white/95 shadow-xl p-4 border border-blue-100 rounded-xl max-w-xs ring-1 ring-violet-100">
        <p className="font-semibold mb-1 text-blue-700">{originalDate}</p>
        <div className="flex flex-col gap-0.5">
          <span className="text-[#10b981] flex justify-between text-xs"><span>Positive:</span><span className="font-mono">{payload[0]?.value || 0}</span></span>
          <span className="text-[#6b7280] flex justify-between text-xs"><span>Neutral:</span><span className="font-mono">{payload[1]?.value || 0}</span></span>
          <span className="text-[#ef4444] flex justify-between text-xs"><span>Negative:</span><span className="font-mono">{payload[2]?.value || 0}</span></span>
        </div>
        {reviewSnippet && reviewSnippet !== 'No review snippet available' && (
          <>
            <div className="border-t border-blue-100 my-2"></div>
            <p className="text-xs text-gray-600 italic mt-1 line-clamp-3">{reviewSnippet}</p>
          </>
        )}
      </div>
    );
  }
  return null;
};

// Styled tooltip for aspect chart
const AspectTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);
    return (
      <div className="bg-white/95 shadow-xl p-4 border border-violet-100 rounded-xl ring-1 ring-violet-100">
        <p className="font-semibold mb-2 text-violet-700">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div 
            key={`item-${index}`}
            className="flex justify-between text-xs"
            style={{ color: entry.color }}
          >
            <span>{entry.name}:</span>
            <span className="font-mono ml-4">{entry.value} ({Math.round(entry.value / total * 100)}%)</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default SentimentTrend;

