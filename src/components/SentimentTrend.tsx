import React, { useState, useMemo, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, LabelList, ReferenceDot } from 'recharts';
import { AlertCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Helper: Capitalizes first letter.
const capitalizeFirstLetter = (value: string | number): string => {
  if (typeof value === 'string') {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return String(value);
};

interface SentimentTrendProps {
  trendData?: Array<{
    date: string;
    positive: number;
    neutral: number;
    negative: number;
    originalDate?: string;
    reviewSnippet?: string;
    reviewCount?: number;
  }>;
  aspectData?: Array<{
    aspect: string;
    positive: number;
    neutral: number;
    negative: number;
    prevScore?: number;
  }>;
}

const pastelCardGradient = "bg-gradient-to-r from-[#fdfcfb] via-[#e0f4ff] to-[#e5deff]";
const softShadow = "shadow-2xl hover:shadow-amber-100/30 transition-shadow duration-400";
const pastelBorder = "border border-blue-100";
const sectionPadding = "p-6 md:p-8";

// Returns array of unique month-year between min/max in data (fills blanks)
function getAllMonthLabels(data: { date: string }[]): string[] {
  if (!data || data.length === 0) return [];
  
  // Parse original dates, format to YYYY-MM, sort
  const parsed = data
    .map(d => {
      try {
        const dt = new Date(d.date);
        if (!isNaN(dt.getTime())) {
          return { date: dt, year: dt.getFullYear(), month: dt.getMonth() };
        }
      } catch (e) {
        console.error("Error parsing date:", d.date, e);
      }
      return null;
    })
    .filter(Boolean) as { date: Date; year: number; month: number }[];
  
  if (parsed.length === 0) return data.map(d => d.date); // Fallback to original strings
  
  parsed.sort((a, b) => a.date.getTime() - b.date.getTime());
  const min = parsed[0];
  const max = parsed[parsed.length - 1];

  const res: string[] = [];
  let y = min.year,
    m = min.month;
  
  // Fill in all months between first and last date
  while (y < max.year || (y === max.year && m <= max.month)) {
    res.push(
      new Date(y, m, 1).toLocaleString('en-US', { month: 'short', year: 'numeric' })
    );
    if (++m > 11) {
      m = 0;
      y++;
    }
  }
  
  // Ensure we have at least one entry
  if (res.length === 0) {
    res.push(new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' }));
  }
  
  return res;
}

// Assign each data to its month bucket for aggregation
function aggregateByMonth(trendData: any[]): Record<string, any> {
  const map: Record<string, any> = {};
  
  trendData.forEach(item => {
    // Find "MMM YYYY" for this item
    let dt: Date;
    try {
      dt = item.originalDate ? new Date(item.originalDate) : new Date(item.date);
    } catch {
      dt = new Date();
    }
    
    if (isNaN(dt.getTime())) {
      // Handle invalid dates, use the string as key
      const key = String(item.date);
      if (!map[key]) {
        map[key] = {
          date: key,
          positive: 0,
          neutral: 0,
          negative: 0,
          reviewCount: 0,
          labelDate: key
        };
      }
    } else {
      // Format date as "MMM YYYY"
      const key = dt.toLocaleString('en-US', { month: 'short', year: 'numeric' });
      if (!map[key]) {
        map[key] = {
          date: key,
          positive: 0,
          neutral: 0,
          negative: 0,
          reviewCount: 0,
          labelDate: key
        };
      }
    }
    
    // For the current bucket, add the sentiment values
    const key = isNaN(dt.getTime()) ? 
      String(item.date) : 
      dt.toLocaleString('en-US', { month: 'short', year: 'numeric' });
      
    map[key].positive += item.positive || 0;
    map[key].neutral += item.neutral || 0;
    map[key].negative += item.negative || 0;
    map[key].reviewCount += item.reviewCount || 0;
    map[key].reviewSnippet = item.reviewSnippet || "";
  });
  
  return map;
}

const SentimentTrend = ({ trendData, aspectData: providedAspectData }: SentimentTrendProps) => {
  const hasData = trendData && trendData.length > 0;
  const [chartHeight] = useState(310);
  const [showLegend] = useState(true);
  const [selectedAspect, setSelectedAspect] = useState<string>("all");

  // Normalized and organized data
  const processedData = useMemo(() => {
    if (!hasData) return [];

    // Fill all months between min & max
    const allMonths = getAllMonthLabels(trendData || []);
    const byMonth = aggregateByMonth(trendData || []);
    
    console.log('All months:', allMonths);
    console.log('Aggregated data:', byMonth);
    
    // For each month, fill in the aggregated value (or 0/blank if none)
    return allMonths.map(month => {
      if (byMonth[month]) {
        return {
          ...byMonth[month],
          // Make sure reviewCount & snippets are handled
          reviewCount: byMonth[month].reviewCount,
          reviewSnippet: byMonth[month].reviewSnippet
        };
      }
      return {
        date: month,
        positive: 0,
        neutral: 0,
        negative: 0,
        reviewCount: 0
      };
    });
  }, [trendData, hasData]);

  const aspectData = useMemo(() => {
    if (providedAspectData && providedAspectData.length > 0) return providedAspectData;
    if (!hasData) return [];
    return [
      { aspect: 'Quality', positive: 65, neutral: 20, negative: 15, prevScore: 60 },
      { aspect: 'Price', positive: 40, neutral: 30, negative: 30, prevScore: 50 },
      { aspect: 'Service', positive: 70, neutral: 20, negative: 10, prevScore: 60 },
      { aspect: 'Delivery', positive: 55, neutral: 25, negative: 20, prevScore: 50 },
      { aspect: 'User Interface', positive: 60, neutral: 30, negative: 10, prevScore: 40 }
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
          <TabsList className="mb-4 bg-gradient-to-r from-white via-[#e0f4ff]/90 to-[#e5deff]/80 rounded-xl p-1 w-full shadow-inner backdrop-blur-[2px]">
            <TabsTrigger value="aspect-analysis" className="flex-1 rounded-lg text-sm font-semibold ring-offset-violet-200 data-[state=active]:bg-[#e5deff] data-[state=active]:text-violet-800">
              Aspect Analysis
            </TabsTrigger>
            <TabsTrigger value="sentiment-trends" className="flex-1 rounded-lg text-sm font-semibold ring-offset-blue-200 data-[state=active]:bg-[#d3e4fd] data-[state=active]:text-blue-800">
              Sentiment Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sentiment-trends" className="animate-fade-in">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-extrabold bg-gradient-to-r from-blue-900/90 via-violet-700/70 to-blue-400/75 bg-clip-text text-transparent tracking-tight mb-1 flex items-center gap-2">
                    <span>Sentiment Trends Over Time</span>
                    <span className="bg-[#fef7cd] text-xs font-bold text-yellow-700 px-2 py-1 rounded-full shadow-sm">
                      {processedData.length} {processedData.length === 1 ? "Month" : "Months"}
                    </span>
                  </h2>
                  <p className="text-sm text-gray-500">How sentiment changed over your analysis periods</p>
                </div>
              </div>

              <div className={`mt-8 rounded-2xl overflow-visible ${softShadow} bg-gradient-to-bl from-white via-[#e0f4ff]/90 to-[#f8fbfe]/75 ring-[2.5px] ring-blue-200/80`}>
                <div className="pt-6 pb-8 px-1 relative" style={{height: `${chartHeight}px`}}>
                  {/* Top review counts aligned above each x-axis tick */}
                  <div className="absolute z-10 w-full" style={{top: 2, left: 0, pointerEvents: "none"}}>
                    <div className="flex justify-between px-8">
                      {processedData.map((d, i) =>
                        <div key={i} className="flex flex-col items-center" style={{width: `${100 / processedData.length}%`}}>
                          {d.reviewCount ? (
                            <span className="text-[11px] font-semibold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full shadow hover:shadow-lg animate-fade-in transition-all mb-2">
                              {d.reviewCount} reviews
                            </span>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={processedData}
                      margin={{ top: 40, right: 40, left: 25, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="4 6" stroke="#bae6fd" opacity={0.16} />
                      <XAxis 
                        dataKey="date"
                        tick={{ fontSize: 13, fill: "#2353a2", fontWeight: 600 }}
                        angle={-25}
                        height={56}
                        textAnchor="end"
                        axisLine={{stroke: "#bae6fd", strokeWidth:2}}
                        tickLine={false}
                        interval={0} // Show all months
                      />
                      <YAxis 
                        width={46}
                        tick={{ fontSize: 12, fill: "#234880" }} 
                        axisLine={{stroke: "#bae6fd", strokeWidth:2}} 
                        tickLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      {showLegend && (
                        <Legend wrapperStyle={{ paddingTop: 10 }} iconSize={16} iconType="plainline"
                          formatter={(value) =>
                            <span style={{fontWeight: 700, fontSize:"13px", paddingLeft:'3px'}}>
                              {capitalizeFirstLetter(String(value))}
                            </span>
                          }
                        />
                      )}
                      <Line 
                        type="monotone" 
                        dataKey="positive" 
                        stroke="#22d3ee"
                        fill="url(#linePositiveGrad)"
                        strokeWidth={4}
                        dot={{ r: 8, fill: '#10b981', strokeWidth: 2, stroke: "#f5f7fa" }}
                        name="positive"
                        animationDuration={1200}
                        isAnimationActive
                        
                      >
                        <defs>
                          <linearGradient id="linePositiveGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="20%" stopColor="#10b981" stopOpacity={0.6} />
                            <stop offset="100%" stopColor="#d1fae5" stopOpacity={0.04} />
                          </linearGradient>
                        </defs>
                      </Line>
                      <Line 
                        type="monotone" 
                        dataKey="neutral" 
                        stroke="#818cf8" 
                        fill="url(#lineNeutralGrad)"
                        strokeWidth={4}
                        dot={{ r: 8, fill: '#6b7280', strokeWidth: 2, stroke: "#f5f7fa" }}
                        name="neutral"
                        animationDuration={1200}
                        isAnimationActive
                        
                      >
                        <defs>
                          <linearGradient id="lineNeutralGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="20%" stopColor="#818cf8" stopOpacity={0.6}/>
                            <stop offset="100%" stopColor="#e5e7eb" stopOpacity={0.04}/>
                          </linearGradient>
                        </defs>
                      </Line>
                      <Line 
                        type="monotone" 
                        dataKey="negative" 
                        stroke="#f87171" 
                        fill="url(#lineNegativeGrad)"
                        strokeWidth={4}
                        dot={{ r: 8, fill: '#ef4444', strokeWidth: 2, stroke: "#f5f7fa" }}
                        name="negative"
                        animationDuration={1200}
                        isAnimationActive
                        
                      >
                        <defs>
                          <linearGradient id="lineNegativeGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="20%" stopColor="#ef4444" stopOpacity={0.6}/>
                            <stop offset="100%" stopColor="#fff1f2" stopOpacity={0.04}/>
                          </linearGradient>
                        </defs>
                      </Line>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="flex justify-center gap-8 mt-7 mb-3">
                <LegendDot color="#10b981" label="Positive" />
                <LegendDot color="#6b7280" label="Neutral" />
                <LegendDot color="#ef4444" label="Negative" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="aspect-analysis" className="animate-fade-in">
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <div>
                  <h2 className="text-xl font-extrabold bg-gradient-to-r from-violet-700 via-purple-400 to-blue-400 bg-clip-text text-transparent tracking-tight mb-1 flex items-center gap-2">
                    Aspect-Based Analysis
                    <span className="bg-[#ffd6e0] text-xs font-bold text-pink-700 px-2 py-1 rounded-full shadow-sm">
                      {aspectData.length} Aspects
                    </span>
                  </h2>
                  <p className="text-sm text-gray-500">Monthly sentiment breakdown by different aspects</p>
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
                            {aspect === "all" ? "All Aspects" : capitalizeFirstLetter(aspect)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              
              <div className="mt-8 rounded-2xl overflow-visible bg-gradient-to-r from-[#fff4f9] via-[#fffbf7] to-[#fff9f5] ring-[2.5px] ring-orange-100/80 shadow-xl">
                <div className="pt-6 pb-8 px-2 relative" style={{height: `${chartHeight}px`}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={filteredAspectData}
                      layout="vertical"
                      margin={{ top: 16, right: 60, left: 32, bottom: 16 }}
                      barCategoryGap={18}
                    >
                      <CartesianGrid 
                        strokeDasharray="3 6" 
                        stroke="#fde1d3" 
                        opacity={0.3}
                        horizontal={true}
                        vertical={false}
                      />
                      <XAxis 
                        type="number" 
                        domain={[0, 100]}
                        tick={{ fontSize: 12, fill: "#444" }}
                        axisLine={{ stroke: '#fee2d5', strokeWidth: 1.5 }}
                        tickLine={false}
                      />
                      <YAxis 
                        dataKey="aspect" 
                        type="category"
                        tick={{ 
                          fontSize: 13,
                          fill: "#1e293b",
                          fontWeight: 600
                        }}
                        axisLine={{ stroke: '#fee2d5', strokeWidth: 1.5 }}
                        tickLine={false}
                        width={140}
                      />
                      <Tooltip content={<AspectTooltip />} />
                      <Bar 
                        dataKey="positive" 
                        stackId="a" 
                        name="positive"
                        radius={[8, 8, 8, 8]}
                        barSize={26}
                        animationDuration={950}
                      >
                        <defs>
                          <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#F97316" stopOpacity={0.85} />
                            <stop offset="100%" stopColor="#FB923C" stopOpacity={0.75} />
                          </linearGradient>
                        </defs>
                        {filteredAspectData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill="url(#barGradient)" />
                        ))}
                        <LabelList 
                          dataKey="positive" 
                          position="right"
                          formatter={(value) => `${value}%`}
                          style={{
                            fill: '#1e293b',
                            fontSize: '13px',
                            fontWeight: 600
                          }}
                        />
                      </Bar>
                      {/* Previous month dots */}
                      {filteredAspectData.map((entry, index) => (
                        <ReferenceDot
                          key={`ref-dot-${index}`}
                          x={entry.prevScore || 0}
                          y={entry.aspect}
                          r={5}
                          fill="#000000"
                          stroke="#FFFFFF"
                          strokeWidth={2}
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="flex justify-center items-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-8 rounded bg-gradient-to-r from-[#F97316] to-[#FB923C]" />
                  <span className="text-sm font-medium text-gray-700">Current Month</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-black" />
                  <span className="text-sm font-medium text-gray-700">Previous Month</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

// Update the AspectTooltip component
const AspectTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const currentValue = data.positive;
    const previousValue = data.prevScore || 0;
    const change = currentValue - previousValue;
    
    return (
      <div className="bg-white/95 shadow-xl p-4 border border-orange-100 rounded-xl max-w-xs">
        <p className="font-semibold mb-2 text-gray-900">{label}</p>
        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Current Month:</span>
            <span className="font-mono font-medium text-orange-600">{currentValue}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Previous Month:</span>
            <span className="font-mono font-medium">{previousValue}%</span>
          </div>
          <div className="pt-1.5 border-t border-orange-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Change:</span>
              <span className={`font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? '+' : ''}{change}%
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default SentimentTrend;
