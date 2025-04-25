
import React from 'react';
import DashboardCard from './DashboardCard';

interface HeatmapMatrixProps {
  data: {
    predictedPositive: number;
    predictedNegative: number;
    actualPositive: number;
    actualNegative: number;
  };
}

const HeatmapMatrix = ({ data }: HeatmapMatrixProps) => {
  // Calculate confusion matrix values
  const truePositives = Math.round((data.predictedPositive * data.actualPositive) / 100);
  const falseNegatives = Math.round((data.predictedNegative * data.actualPositive) / 100);
  const falsePositives = Math.round((data.predictedPositive * data.actualNegative) / 100);
  const trueNegatives = Math.round((data.predictedNegative * data.actualNegative) / 100);

  return (
    <DashboardCard 
      title="Model Evaluation Matrix" 
      className="bg-gradient-to-br from-white via-green-50/30 to-green-100/20 border-green-100"
    >
      <div className="h-[260px] flex flex-col items-center justify-center p-4">
        <div className="grid grid-cols-[auto,1fr,1fr] gap-2 w-full max-w-md">
          {/* Headers */}
          <div className=""></div>
          <div className="text-center font-medium text-sm text-gray-600">Predicted Positive</div>
          <div className="text-center font-medium text-sm text-gray-600">Predicted Negative</div>
          
          {/* Actual Positive Row */}
          <div className="font-medium text-sm text-gray-600 self-center">Actual Positive</div>
          <div className="bg-green-100 rounded-lg p-4 text-center">
            <div className="font-bold text-green-700">{truePositives}%</div>
            <div className="text-xs text-green-600">True Positive</div>
          </div>
          <div className="bg-red-100 rounded-lg p-4 text-center">
            <div className="font-bold text-red-700">{falseNegatives}%</div>
            <div className="text-xs text-red-600">False Negative</div>
          </div>
          
          {/* Actual Negative Row */}
          <div className="font-medium text-sm text-gray-600 self-center">Actual Negative</div>
          <div className="bg-red-100 rounded-lg p-4 text-center">
            <div className="font-bold text-red-700">{falsePositives}%</div>
            <div className="text-xs text-red-600">False Positive</div>
          </div>
          <div className="bg-green-100 rounded-lg p-4 text-center">
            <div className="font-bold text-green-700">{trueNegatives}%</div>
            <div className="text-xs text-green-600">True Negative</div>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-600 font-medium mt-4">
          Overall Model Accuracy: {data.actualPositive}%
        </div>
      </div>
    </DashboardCard>
  );
};

export default HeatmapMatrix;
