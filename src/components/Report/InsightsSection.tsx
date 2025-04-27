
import React from 'react';
import { Card } from '@/components/ui/card';
import { FileText, CircleCheck, Info } from 'lucide-react';

interface InsightsSectionProps {
  insights: string[];
  recommendations: string[];
}

const InsightsSection: React.FC<InsightsSectionProps> = ({ insights, recommendations }) => {
  return (
    <Card className="p-6 mb-6 border-l-4 border-l-blue-500">
      <h3 className="font-semibold text-lg mb-4 flex items-center text-blue-700">
        <FileText className="h-5 w-5 mr-2" />
        Key Insights & Recommendations
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-blue-50 p-5 rounded-lg">
          <h4 className="text-md font-medium text-blue-700 mb-4 flex items-center">
            <Info className="h-4 w-4 mr-2" />
            Key Insights:
          </h4>
          <ul className="space-y-3">
            {insights.map((insight, idx) => (
              <li key={idx} className="flex items-start">
                <span className="inline-flex items-center justify-center bg-blue-100 rounded-full h-5 w-5 min-w-5 text-xs text-blue-700 mr-2 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-gray-700">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-green-50 p-5 rounded-lg">
          <h4 className="text-md font-medium text-green-700 mb-4 flex items-center">
            <CircleCheck className="h-4 w-4 mr-2" />
            Recommendations:
          </h4>
          <ul className="space-y-3">
            {recommendations.map((recommendation, idx) => (
              <li key={idx} className="flex items-start">
                <span className="inline-flex items-center justify-center bg-green-100 rounded-full h-5 w-5 min-w-5 text-xs text-green-700 mr-2 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-gray-700">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t text-sm text-gray-500 italic">
        These insights are based on the analysis of customer reviews and feedback. 
        The recommendations are suggested actions to consider based on these insights.
      </div>
    </Card>
  );
};

export default InsightsSection;
