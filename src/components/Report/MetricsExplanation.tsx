
import React from 'react';
import { Card } from '@/components/ui/card';
import { Percent, Info } from 'lucide-react';

interface MetricsExplanationProps {
  accuracyScore: number;
  totalReviews: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

const MetricsExplanation: React.FC<MetricsExplanationProps> = ({
  accuracyScore,
  totalReviews,
  sentimentBreakdown,
}) => {
  return (
    <Card className="p-4 mb-6">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Percent className="h-4 w-4" />
        Detailed Metrics Analysis
      </h3>
      
      <div className="space-y-4">
        <div className="border-b pb-3">
          <h4 className="font-medium mb-2">Analysis Accuracy</h4>
          <p className="text-sm text-gray-600">
            Model accuracy score: <span className="font-semibold">{accuracyScore}%</span>
            <br />
            <span className="text-xs">
              This indicates the confidence level of our sentiment analysis model in classifying customer feedback.
            </span>
          </p>
        </div>

        <div className="border-b pb-3">
          <h4 className="font-medium mb-2">Review Volume</h4>
          <p className="text-sm text-gray-600">
            Total reviews analyzed: <span className="font-semibold">{totalReviews}</span>
            <br />
            <span className="text-xs">
              The sample size affects the reliability of the analysis - larger samples typically provide more reliable insights.
            </span>
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-2">Sentiment Distribution</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-600">Positive Feedback:</span>
              <span className="font-semibold">{sentimentBreakdown.positive}%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-yellow-600">Neutral Feedback:</span>
              <span className="font-semibold">{sentimentBreakdown.neutral}%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-600">Negative Feedback:</span>
              <span className="font-semibold">{sentimentBreakdown.negative}%</span>
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <Info className="h-3 w-3" />
              These percentages represent the overall sentiment distribution across all analyzed reviews
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MetricsExplanation;
