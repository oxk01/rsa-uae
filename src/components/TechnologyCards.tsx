
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkles, Database, Brain, BarChart } from 'lucide-react';

interface TechCardProps {
  title: string;
  description: string;
  lineColor?: string;
  bgColor?: string;
  accentColor?: string;
  iconBg?: string;
  className?: string;
  icon?: React.ReactNode;
}

const TechCard = ({ 
  title, 
  description, 
  lineColor = 'bg-blue-500', 
  bgColor = 'bg-blue-50',
  accentColor = 'border-blue-200',
  iconBg = 'bg-blue-100',
  className = '',
  icon = <Sparkles className="h-5 w-5 text-blue-600" />
}: TechCardProps) => {
  return (
    <div className={cn(
      `relative ${bgColor} border ${accentColor} rounded-lg p-8 shadow-md overflow-hidden 
      hover:shadow-lg transition-all duration-300 group`,
      className
    )}>
      {/* Top accent border with gradient */}
      <div className="absolute top-0 left-0 w-full flex justify-center">
        <div className={`h-1.5 w-32 ${lineColor} rounded-b-md transform transition-all duration-300 group-hover:w-40`}></div>
      </div>
      
      {/* Icon with background centered */}
      <div className="flex justify-center items-center mb-6">
        <div className={`${iconBg} p-3 rounded-full transform transition-all duration-300 group-hover:scale-110`}>
          {icon}
        </div>
      </div>
      
      <div className="space-y-4 text-center">
        <h3 className="text-xl font-bold text-gray-800 mt-2 transition-transform duration-300">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
        
        {/* Animated arrow that appears on hover - centered */}
        <div className="pt-2 flex justify-center opacity-0 transform translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
        </div>
      </div>
      
      {/* Decorative dot in corner */}
      <div className={`absolute bottom-3 right-3 h-2 w-2 rounded-full ${lineColor} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
    </div>
  );
};

export const TechnologyCards = () => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
      <TechCard
        title="Data Collection"
        description="Upload reviews from multiple sources or connect to data sources through our automated data collection."
        lineColor="bg-blue-500"
        bgColor="bg-blue-50/60"
        accentColor="border-blue-200"
        iconBg="bg-blue-100"
        icon={<Database className="h-5 w-5 text-blue-600" />}
        className="animate-fade-in"
      />
      
      <TechCard
        title="AI Processing"
        description="Our BERT and ABSA algorithms analyze the data, identifying entities, aspects, sentiment, and relevant keywords."
        lineColor="bg-teal-500"
        bgColor="bg-teal-50/60"
        accentColor="border-teal-200"
        iconBg="bg-teal-100"
        icon={<Brain className="h-5 w-5 text-teal-600" />}
        className="animate-fade-in delay-100"
      />
      
      <TechCard
        title="Insight Generation"
        description="Review the processed data through visual dashboards for actionable business insights."
        lineColor="bg-amber-500"
        bgColor="bg-amber-50/60"
        accentColor="border-amber-200"
        iconBg="bg-amber-100"
        icon={<BarChart className="h-5 w-5 text-amber-600" />}
        className="animate-fade-in delay-200"
      />
    </div>
  );
};
