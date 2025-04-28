
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes';

interface DashboardCardProps {
  title: string;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
  isChart?: boolean;
}

const DashboardCard = ({ title, icon, className = '', children, isChart = false }: DashboardCardProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card className={`shadow-sm ${
      isDark 
        ? isChart 
          ? 'bg-white border-gray-700'  // White background for charts in dark mode
          : 'bg-gray-900/90 border-gray-700 backdrop-blur-xl'
        : 'bg-white border-gray-200'
      } ${className}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className={`text-sm font-medium flex items-center gap-2 ${
            isDark && !isChart ? 'text-gray-100' : 'text-muted-foreground'
          }`}>
            {icon && <span className={isDark && !isChart ? "text-gray-100" : ""}>{icon}</span>}
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className={isDark && !isChart ? "text-gray-100" : "text-gray-900"}>{children}</CardContent>
    </Card>
  );
};

export default DashboardCard;
