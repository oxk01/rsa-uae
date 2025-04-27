
import React from 'react';
import { Card } from '@/components/ui/card';

interface AspectProps {
  aspect: string;
  sentiment: string;
  confidence?: number;
  context?: string;
}

interface AspectsAnalysisProps {
  aspects: AspectProps[];
}

const AspectsAnalysis: React.FC<AspectsAnalysisProps> = ({ aspects }) => {
  return (
    <Card className="p-4 mb-6">
      <h3 className="font-semibold mb-2">Aspects Analysis</h3>
      <div className="space-y-3">
        {aspects && aspects.length > 0 ? (
          aspects.slice(0, 5).map((aspect, idx) => (
            <div key={idx} className="border-b pb-3 last:border-b-0 last:pb-0">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{aspect.aspect}</span>
                <span className={
                  aspect.sentiment === 'positive' ? 'text-green-600' : 
                  aspect.sentiment === 'negative' ? 'text-red-600' : 
                  'text-gray-600'
                }>
                  {aspect.sentiment.charAt(0).toUpperCase() + aspect.sentiment.slice(1)} 
                  {aspect.confidence && `(${aspect.confidence}%)`}
                </span>
              </div>
              {aspect.context && <p className="text-sm text-gray-500">{aspect.context}</p>}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No aspects identified</p>
        )}
      </div>
    </Card>
  );
};

export default AspectsAnalysis;
