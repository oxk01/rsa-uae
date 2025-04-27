
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardCardProps {
  title: string;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

const DashboardCard = ({ title, icon, className = '', children }: DashboardCardProps) => {
  return (
    <Card className={`shadow-sm dark:bg-gray-800/50 dark:border-gray-700 dark:backdrop-blur-xl ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2 dark:text-gray-300">
            {icon && <span className="dark:text-gray-400">{icon}</span>}
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="dark:text-gray-200">{children}</CardContent>
    </Card>
  );
};

export default DashboardCard;
