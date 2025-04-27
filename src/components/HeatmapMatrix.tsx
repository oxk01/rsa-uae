
import React from 'react';
import DashboardCard from './DashboardCard';
import { useTheme } from 'next-themes';

interface HeatmapMatrixProps {
  data: {
    predictedPositive: number;
    predictedNegative: number;
    actualPositive: number;
    actualNegative: number;
  };
}

const HeatmapMatrix = ({ data }: HeatmapMatrixProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const truePositives = data.predictedPositive;
  const falseNegatives = data.predictedNegative;
  const falsePositives = data.actualNegative;
  const trueNegatives = 100 - (truePositives + falseNegatives + falsePositives);

  return (
    <DashboardCard 
      title="Model Evaluation Matrix" 
      className={isDark 
        ? "bg-gray-900/95 border-gray-700" 
        : "bg-gradient-to-br from-white via-green-50/30 to-green-100/20 border-green-100"
      }
    >
      <div className="h-[260px] flex flex-col items-center justify-center p-4">
        <div className="grid grid-cols-[auto,1fr,1fr] gap-2 w-full max-w-md">
          <div className=""></div>
          <div className={`text-center font-medium text-sm ${isDark ? "text-gray-100" : "text-gray-600"}`}>Predicted Positive</div>
          <div className={`text-center font-medium text-sm ${isDark ? "text-gray-100" : "text-gray-600"}`}>Predicted Negative</div>
          
          <div className={`font-medium text-sm ${isDark ? "text-gray-100" : "text-gray-600"} self-center`}>Actual Positive</div>
          <div className={`${isDark ? "bg-green-800/80" : "bg-green-100"} rounded-lg p-4 text-center`}>
            <div className={`font-bold ${isDark ? "text-green-300" : "text-green-700"}`}>{truePositives}%</div>
            <div className={`text-xs ${isDark ? "text-green-300/90" : "text-green-600"}`}>True Positive</div>
          </div>
          <div className={`${isDark ? "bg-red-800/80" : "bg-red-100"} rounded-lg p-4 text-center`}>
            <div className={`font-bold ${isDark ? "text-red-300" : "text-red-700"}`}>{falseNegatives}%</div>
            <div className={`text-xs ${isDark ? "text-red-300/90" : "text-red-600"}`}>False Negative</div>
          </div>
          
          <div className={`font-medium text-sm ${isDark ? "text-gray-100" : "text-gray-600"} self-center`}>Actual Negative</div>
          <div className={`${isDark ? "bg-red-800/80" : "bg-red-100"} rounded-lg p-4 text-center`}>
            <div className={`font-bold ${isDark ? "text-red-300" : "text-red-700"}`}>{falsePositives}%</div>
            <div className={`text-xs ${isDark ? "text-red-300/90" : "text-red-600"}`}>False Positive</div>
          </div>
          <div className={`${isDark ? "bg-green-800/80" : "bg-green-100"} rounded-lg p-4 text-center`}>
            <div className={`font-bold ${isDark ? "text-green-300" : "text-green-700"}`}>{trueNegatives}%</div>
            <div className={`text-xs ${isDark ? "text-green-300/90" : "text-green-600"}`}>True Negative</div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default HeatmapMatrix;
