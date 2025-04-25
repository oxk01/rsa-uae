
import React from 'react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  valueColor?: string;
  icon?: React.ReactNode;
  change?: string;
  positive?: boolean;
}

const StatCard = ({ title, value, valueColor = 'text-black', icon, change, positive }: StatCardProps) => {
  return (
    <Card className="border">
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <div className="flex items-center space-x-2">
          {icon && <span className="text-gray-400">{icon}</span>}
          <h3 className={`text-2xl font-bold ${valueColor}`}>{value}</h3>
        </div>
        {change && (
          <div className="mt-2 text-xs">
            <span className={positive ? 'text-green-600' : 'text-red-600'}>
              {positive ? '↑' : '↓'} {change}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
