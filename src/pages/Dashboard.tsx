
import React, { useState } from 'react';
import DashboardCard from '@/components/DashboardCard';
import StatCard from '@/components/StatCard';
import { Button } from '@/components/ui/button';
import TopKeywords from '@/components/TopKeywords';
import { BarChart3, Trash2, MessageCircle, Star, Clock, Smile, ChevronUp, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock saved analysis results
const initialAnalyses = [
  {
    id: 1,
    title: "Product A Reviews Analysis",
    date: "2025-04-10",
    reviewCount: 156,
    sentiment: {
      positive: 62,
      neutral: 23,
      negative: 15
    },
    keywords: [
      { word: 'quality', count: 48, sentiment: 'positive' },
      { word: 'price', count: 35, sentiment: 'neutral' },
      { word: 'design', count: 29, sentiment: 'positive' },
      { word: 'shipping', count: 18, sentiment: 'negative' }
    ]
  },
  {
    id: 2,
    title: "Service Feedback Analysis",
    date: "2025-04-05",
    reviewCount: 93,
    sentiment: {
      positive: 45,
      neutral: 32,
      negative: 16
    },
    keywords: [
      { word: 'support', count: 32, sentiment: 'positive' },
      { word: 'response', count: 26, sentiment: 'positive' },
      { word: 'waiting', count: 17, sentiment: 'negative' },
      { word: 'resolution', count: 12, sentiment: 'neutral' }
    ]
  }
];

const Dashboard = () => {
  const [savedAnalyses, setSavedAnalyses] = useState(initialAnalyses);
  const [expandedAnalysis, setExpandedAnalysis] = useState<number | null>(null);
  const { toast } = useToast();
  
  const deleteAnalysis = (id: number) => {
    setSavedAnalyses(savedAnalyses.filter(analysis => analysis.id !== id));
    toast({
      title: "Analysis deleted",
      description: "The analysis has been removed from your dashboard.",
    });
  };
  
  const toggleExpand = (id: number) => {
    if (expandedAnalysis === id) {
      setExpandedAnalysis(null);
    } else {
      setExpandedAnalysis(id);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Total Reviews Analyzed" 
            value={savedAnalyses.reduce((acc, analysis) => acc + analysis.reviewCount, 0).toString()}
            icon={<MessageCircle className="h-5 w-5 text-blue-600" />}
          />
          <StatCard 
            title="Average Sentiment" 
            value="76%" 
            change="+5%" 
            positive={true}
            icon={<Star className="h-5 w-5 text-blue-600" />}
          />
          <StatCard 
            title="Recent Analyses" 
            value={savedAnalyses.length.toString()}
            icon={<Clock className="h-5 w-5 text-blue-600" />}
          />
          <StatCard 
            title="Sentiment Trend" 
            value="Improving" 
            change="+12%" 
            positive={true}
            icon={<Smile className="h-5 w-5 text-blue-600" />}
          />
        </div>
        
        {/* Saved Analyses */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Saved Analyses</h2>
          
          {savedAnalyses.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500 mb-4">You haven't saved any analyses yet.</p>
              <Button asChild>
                <a href="/demo">Go to Demo to Analyze Reviews</a>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {savedAnalyses.map((analysis) => (
                <div key={analysis.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div 
                    className="p-4 cursor-pointer flex justify-between items-center"
                    onClick={() => toggleExpand(analysis.id)}
                  >
                    <div>
                      <h3 className="font-semibold">{analysis.title}</h3>
                      <p className="text-sm text-gray-500">
                        {analysis.date} • {analysis.reviewCount} reviews
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteAnalysis(analysis.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="ml-2">
                        {expandedAnalysis === analysis.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {expandedAnalysis === analysis.id && (
                    <div className="p-4 pt-0 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DashboardCard
                          title="Sentiment Distribution"
                          icon={<BarChart3 className="h-4 w-4" />}
                        >
                          <div className="flex h-40 items-end gap-2">
                            <div className="flex flex-col items-center">
                              <div 
                                className="w-16 bg-green-500 rounded-t-md"
                                style={{ height: `${(analysis.sentiment.positive / analysis.reviewCount) * 100}%` }}
                              ></div>
                              <p className="text-xs mt-2">Positive</p>
                              <p className="font-semibold">{analysis.sentiment.positive}</p>
                            </div>
                            <div className="flex flex-col items-center">
                              <div 
                                className="w-16 bg-gray-300 rounded-t-md"
                                style={{ height: `${(analysis.sentiment.neutral / analysis.reviewCount) * 100}%` }}
                              ></div>
                              <p className="text-xs mt-2">Neutral</p>
                              <p className="font-semibold">{analysis.sentiment.neutral}</p>
                            </div>
                            <div className="flex flex-col items-center">
                              <div 
                                className="w-16 bg-red-500 rounded-t-md"
                                style={{ height: `${(analysis.sentiment.negative / analysis.reviewCount) * 100}%` }}
                              ></div>
                              <p className="text-xs mt-2">Negative</p>
                              <p className="font-semibold">{analysis.sentiment.negative}</p>
                            </div>
                          </div>
                        </DashboardCard>
                        
                        <DashboardCard 
                          title="Top Keywords" 
                          icon={<BarChart3 className="h-4 w-4" />}
                        >
                          <div className="flex flex-wrap gap-2">
                            {analysis.keywords.map((keyword, index) => (
                              <div
                                key={index}
                                className={`px-3 py-1 rounded-full text-sm ${
                                  keyword.sentiment === 'positive' 
                                    ? 'bg-green-100 text-green-800' 
                                    : keyword.sentiment === 'negative'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {keyword.word}{' '}
                                <span className="font-semibold">({keyword.count})</span>
                              </div>
                            ))}
                          </div>
                        </DashboardCard>
                      </div>
                      
                      <div className="flex justify-center mt-4">
                        <Button variant="outline" size="sm">
                          View Full Report
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="text-center">
          <Button asChild>
            <a href="/demo">Analyze New Reviews</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
