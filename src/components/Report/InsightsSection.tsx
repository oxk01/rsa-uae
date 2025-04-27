
import React from 'react';
import { Card } from '@/components/ui/card';
import { ChartBar } from 'lucide-react';

interface InsightsSectionProps {
  insights: string[];
  recommendations: string[];
}

const InsightsSection: React.FC<InsightsSectionProps> = ({ insights, recommendations }) => {
  return (
    <Card className="p-4 mb-6">
      <h3 className="font-semibold mb-2 flex items-center">
        <ChartBar className="h-4 w-4 mr-2" />
        Key Insights & Recommendations
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Insights:</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
            {insights.map((insight, idx) => (
              <li key={idx}>{insight}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations:</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
            {recommendations.map((recommendation, idx) => (
              <li key={idx}>{recommendation}</li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default InsightsSection;
