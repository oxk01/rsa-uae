
import React from 'react';
import { Card } from '@/components/ui/card';
import DashboardCard from './DashboardCard';
import { Scale } from 'lucide-react';

interface MatrixData {
  predictedPositive: number;
  predictedNegative: number;
  actualPositive: number;
  actualNegative: number;
}

interface HeatmapMatrixProps {
  data: MatrixData;
}

const HeatmapMatrix = ({ data }: HeatmapMatrixProps) => {
  const calculateMetrics = () => {
    const truePositive = data.predictedPositive;
    const falsePositive = data.predictedNegative;
    const falseNegative = data.actualNegative;
    const trueNegative = data.actualPositive;
    
    const total = truePositive + falsePositive + falseNegative + trueNegative;
    
    const accuracy = ((truePositive + trueNegative) / total) * 100;
    const precision = (truePositive / (truePositive + falsePositive)) * 100;
    const recall = (truePositive / (truePositive + falseNegative)) * 100;
    const f1Score = 2 * ((precision * recall) / (precision + recall));
    
    return {
      accuracy: accuracy.toFixed(1),
      precision: precision.toFixed(1),
      recall: recall.toFixed(1),
      f1Score: f1Score.toFixed(1)
    };
  };

  const metrics = calculateMetrics();

  const getColor = (value: number) => {
    if (value >= 90) return 'bg-green-500';
    if (value >= 70) return 'bg-green-400';
    if (value >= 50) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <DashboardCard 
      title="Model Evaluation Matrix" 
      icon={<Scale className="h-4 w-4" />}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Metrics Cards */}
          <Card className="p-3">
            <p className="text-sm text-gray-500">Accuracy</p>
            <p className="text-2xl font-bold">{metrics.accuracy}%</p>
          </Card>
          <Card className="p-3">
            <p className="text-sm text-gray-500">Precision</p>
            <p className="text-2xl font-bold">{metrics.precision}%</p>
          </Card>
          <Card className="p-3">
            <p className="text-sm text-gray-500">Recall</p>
            <p className="text-2xl font-bold">{metrics.recall}%</p>
          </Card>
          <Card className="p-3">
            <p className="text-sm text-gray-500">F1 Score</p>
            <p className="text-2xl font-bold">{metrics.f1Score}%</p>
          </Card>
        </div>

        {/* Confusion Matrix Heatmap */}
        <div className="relative overflow-hidden">
          <div className="grid grid-cols-2 gap-2">
            <div 
              className={`${getColor(data.predictedPositive)} p-4 rounded-lg text-white text-center`}
            >
              <div className="font-medium">True Positive</div>
              <div className="text-2xl font-bold">{data.predictedPositive}%</div>
            </div>
            <div 
              className={`${getColor(data.predictedNegative)} p-4 rounded-lg text-white text-center`}
            >
              <div className="font-medium">False Positive</div>
              <div className="text-2xl font-bold">{data.predictedNegative}%</div>
            </div>
            <div 
              className={`${getColor(data.actualNegative)} p-4 rounded-lg text-white text-center`}
            >
              <div className="font-medium">False Negative</div>
              <div className="text-2xl font-bold">{data.actualNegative}%</div>
            </div>
            <div 
              className={`${getColor(data.actualPositive)} p-4 rounded-lg text-white text-center`}
            >
              <div className="font-medium">True Negative</div>
              <div className="text-2xl font-bold">{data.actualPositive}%</div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            Model performance metrics showing the distribution of predictions vs actual results.
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default HeatmapMatrix;
