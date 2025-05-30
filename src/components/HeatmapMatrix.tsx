
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
  
  return (
    <DashboardCard 
      title="Model Evaluation Matrix" 
      isChart={true}
      className={isDark 
        ? "bg-white border-gray-700" 
        : "bg-gradient-to-br from-white via-green-50/30 to-green-100/20 border-green-100"
      }
    >
      <div className="h-[260px] flex flex-col items-center justify-center p-4">
        <div className="grid grid-cols-[auto,1fr,1fr] gap-2 w-full max-w-md">
          <div className=""></div>
          <div className="text-center font-medium text-sm text-gray-600">Predicted Positive</div>
          <div className="text-center font-medium text-sm text-gray-600">Predicted Negative</div>
          
          <div className="font-medium text-sm text-gray-600 self-center">Actual Positive</div>
          <div className={`bg-green-200 rounded-lg p-4 text-center`}>
            <div className="font-bold text-green-800">{data.predictedPositive}%</div>
            <div className="text-xs text-green-800">True Positive</div>
          </div>
          <div className={`bg-red-200 rounded-lg p-4 text-center`}>
            <div className="font-bold text-red-800">{data.predictedNegative}%</div>
            <div className="text-xs text-red-800">False Negative</div>
          </div>
          
          <div className="font-medium text-sm text-gray-600 self-center">Actual Negative</div>
          <div className={`bg-red-200 rounded-lg p-4 text-center`}>
            <div className="font-bold text-red-800">{data.actualPositive}%</div>
            <div className="text-xs text-red-800">False Positive</div>
          </div>
          <div className={`bg-green-200 rounded-lg p-4 text-center`}>
            <div className="font-bold text-green-800">{data.actualNegative}%</div>
            <div className="text-xs text-green-800">True Negative</div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default HeatmapMatrix;
