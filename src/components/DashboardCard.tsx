
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes';

interface DashboardCardProps {
  title: string;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

const DashboardCard = ({ title, icon, className = '', children }: DashboardCardProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card className={`shadow-sm ${isDark 
      ? 'bg-gray-800/50 border-gray-700 backdrop-blur-xl' 
      : 'bg-white border-gray-200'} ${className}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className={`text-sm font-medium flex items-center gap-2 ${
            isDark ? 'text-gray-300' : 'text-muted-foreground'
          }`}>
            {icon && <span className={isDark ? "text-gray-400" : ""}>{icon}</span>}
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className={isDark ? "text-gray-200" : ""}>{children}</CardContent>
    </Card>
  );
};

export default DashboardCard;
