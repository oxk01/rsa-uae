
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, LabelList, ReferenceLine, ResponsiveContainer } from 'recharts';
import DashboardCard from '../DashboardCard';
import { Activity } from 'lucide-react';

interface ModelEvaluationProps {
  data: any[];
}

const ModelEvaluation: React.FC<ModelEvaluationProps> = ({ data }) => {
  return (
    <DashboardCard
      title="Model Evaluation"
      icon={<Activity className="h-4 w-4" />}
    >
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barSize={30}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis 
              dataKey="confidence"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              label={{ 
                value: 'Accuracy (%)', 
                angle: -90, 
                position: 'insideLeft',
                offset: -5
              }} 
            />
            <Tooltip 
              formatter={(value) => {
                if (typeof value === 'number') {
                  return [`${value.toFixed(1)}%`, 'Accuracy'];
                }
                return [`${value}%`, 'Accuracy'];
              }}
              wrapperStyle={{ zIndex: 100 }}
            />
            <ReferenceLine y={80} label="Excellent" stroke="#10b981" strokeDasharray="3 3" />
            <ReferenceLine y={60} label="Good" stroke="#f59e0b" strokeDasharray="3 3" />
            <Bar dataKey="accuracy" name="Prediction Accuracy">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.accuracy > 80 ? '#10b981' : entry.accuracy > 60 ? '#f59e0b' : '#ef4444'}
                >
                  <LabelList 
                    dataKey="accuracy" 
                    position="top" 
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                  />
                </Cell>
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-sm text-gray-500 mt-2">
        <p>Model accuracy evaluation across different confidence levels</p>
      </div>
    </DashboardCard>
  );
};

export default ModelEvaluation;

