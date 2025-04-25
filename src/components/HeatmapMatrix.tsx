
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import DashboardCard from './DashboardCard';

interface HeatmapMatrixProps {
  data: {
    predictedPositive: number;
    predictedNegative: number;
    actualPositive: number;
    actualNegative: number;
  };
}

const COLORS = {
  accurate: '#42b883',
  inaccurate: '#e64a3b',
  neutral: '#f6c23e'
};

const HeatmapMatrix = ({ data }: HeatmapMatrixProps) => {
  const accuracyData = [
    { name: 'Accurate', value: data.actualPositive, color: COLORS.accurate },
    { name: 'Inaccurate', value: data.actualNegative, color: COLORS.inaccurate }
  ];

  return (
    <DashboardCard 
      title="Model Evaluation Matrix" 
      className="bg-gradient-to-br from-white via-green-50/30 to-green-100/20 border-green-100"
    >
      <div className="h-[260px] relative flex flex-col items-center justify-center">
        <ResponsiveContainer width="100%" height="80%">
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <filter id="matrixShadow">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2"/>
              </filter>
            </defs>
            <Pie
              data={accuracyData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              filter="url(#matrixShadow)"
              label={({ name, value }) => (
                <text 
                  x={0} 
                  y={0} 
                  textAnchor="middle" 
                  fill="#374151"
                  className="text-xs font-medium"
                >
                  {`${name}: ${value}%`}
                </text>
              )}
            >
              {accuracyData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  style={{
                    filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))'
                  }}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                padding: '12px',
                fontSize: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value) => [`${value}%`, 'Accuracy']}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute bottom-0 left-0 right-0 text-center text-sm text-gray-600 font-medium pt-2">
          Overall Model Accuracy: {data.actualPositive}%
        </div>
      </div>
    </DashboardCard>
  );
};

export default HeatmapMatrix;

