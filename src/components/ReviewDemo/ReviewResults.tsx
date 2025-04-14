import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, RotateCcw, FileChart } from 'lucide-react';
import GenerateReportButton from '@/components/GenerateReportButton';

interface ResultProps {
  result: {
    overallSentiment: {
      sentiment: string;
      score: number;
    };
    aspects: Array<{
      name: string;
      sentiment: string;
      confidence: number;
      context: string;
    }>;
    keyPhrases: string[];
  };
  onSave: () => void;
  onStartOver: () => void;
}

const ReviewResults = ({ result, onSave, onStartOver }: ResultProps) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-600 text-white';
      case 'negative':
        return 'bg-red-600 text-white';
      case 'neutral':
      default:
        return 'bg-gray-600 text-white';
    }
  };
  
  const getSentimentLabel = (sentiment: string) => {
    return sentiment.charAt(0).toUpperCase() + sentiment.slice(1);
  };
  
  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return (
          <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded">
            positive
          </span>
        );
      case 'negative':
        return (
          <span className="bg-red-100 text-red-700 text-xs font-medium px-2.5 py-0.5 rounded">
            negative
          </span>
        );
      case 'neutral':
      default:
        return (
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded">
            neutral
          </span>
        );
    }
  };
  
  const hasSavedAnalyses = () => {
    const savedAnalysesStr = localStorage.getItem('rsa_saved_analyses');
    return savedAnalysesStr ? JSON.parse(savedAnalysesStr).length > 0 : false;
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-2">
        <h2 className="text-xl font-semibold text-gray-800">Analysis Results</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={onSave}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save to Dashboard
          </Button>
          
          {hasSavedAnalyses() && (
            <GenerateReportButton
              hasData={true}
              showReport={true}
              variant="outline"
              className="border-blue-600 text-blue-700 hover:bg-blue-50"
            />
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Overall Sentiment</h3>
          <div className={`py-3 px-4 rounded-md flex items-center mb-2 ${getSentimentColor(result.overallSentiment.sentiment)}`}>
            <span className="text-white font-medium">
              {getSentimentLabel(result.overallSentiment.sentiment)}
            </span>
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold">{result.overallSentiment.score}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className={`h-2 rounded-full ${
                result.overallSentiment.sentiment === 'positive'
                  ? 'bg-green-600'
                  : result.overallSentiment.sentiment === 'negative'
                  ? 'bg-red-600'
                  : 'bg-gray-600'
              }`}
              style={{ width: `${result.overallSentiment.score}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Aspect Analysis</h3>
          <div className="space-y-3">
            {result.aspects.slice(0, 3).map((aspect, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{aspect.name}</span>
                  {getSentimentBadge(aspect.sentiment)}
                </div>
                <div className="w-full bg-blue-900 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: `${aspect.confidence * 2}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Key Phrases</h3>
          <div className="flex flex-wrap gap-2">
            {result.keyPhrases.map((phrase, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
              >
                {phrase}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border p-6 mb-6">
        <h3 className="text-lg font-medium mb-2">ABSA Breakdown</h3>
        <p className="text-sm text-gray-500 mb-4">
          Aspect-Based Sentiment Analysis (ABSA) identifies specific aspects of a product or service mentioned in the review 
          and determines the sentiment expressed toward each aspect.
        </p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aspect
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sentiment
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Confidence
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Context
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {result.aspects.map((aspect, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="font-medium">{aspect.name}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getSentimentBadge(aspect.sentiment)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {aspect.confidence}%
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {aspect.context}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="text-center">
        <Button variant="outline" onClick={onStartOver}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Start Over
        </Button>
      </div>
    </div>
  );
};

export default ReviewResults;
