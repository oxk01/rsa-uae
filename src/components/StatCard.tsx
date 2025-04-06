
import React, { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon: ReactNode;
}

const StatCard = ({ title, value, change, positive = true, icon }: StatCardProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {change && (
            <p className={`text-xs mt-1 ${positive ? 'text-green-600' : 'text-red-600'}`}>
              {positive ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        <div className="p-3 bg-brand-blue bg-opacity-10 rounded">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
