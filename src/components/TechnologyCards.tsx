
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';

interface TechCardProps {
  title: string;
  description: string;
  lineColor?: string;
  bgGradient?: string;
  iconBg?: string;
  className?: string;
  icon?: React.ReactNode;
}

const TechCard = ({ 
  title, 
  description, 
  lineColor = 'bg-blue-500', 
  bgGradient = 'from-blue-50 to-white',
  iconBg = 'bg-blue-100',
  className = '',
  icon = <Sparkles className="h-5 w-5 text-blue-600" />
}: TechCardProps) => {
  return (
    <div className={cn(
      `relative bg-gradient-to-br ${bgGradient} border border-gray-100 rounded-lg p-8 shadow-md overflow-hidden 
      hover:shadow-lg transition-all duration-300 group`,
      className
    )}>
      {/* Left side accent border */}
      <div className={`absolute left-0 top-0 h-full w-1 ${lineColor} transform transition-all duration-300 group-hover:w-1.5`}></div>
      
      {/* Top tiny accent line */}
      <div className="absolute top-0 left-0 w-full flex justify-center">
        <div className={`h-1 w-24 ${lineColor} rounded-b-md transform transition-all duration-300 group-hover:w-32`}></div>
      </div>
      
      {/* Icon with background */}
      <div className="flex items-center mb-6">
        <div className={`${iconBg} p-3 rounded-full transform transition-all duration-300 group-hover:scale-110`}>
          {icon}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 mt-2 group-hover:translate-x-1 transition-transform duration-300">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
        
        {/* Animated arrow that appears on hover */}
        <div className="pt-2 opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
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
        bgGradient="from-blue-50 to-white"
        iconBg="bg-blue-100"
        icon={<Sparkles className="h-5 w-5 text-blue-600" />}
        className="animate-fade-in"
      />
      
      <TechCard
        title="AI Processing"
        description="Our BERT and ABSA algorithms analyze the data, identifying entities, aspects, sentiment, and relevant keywords."
        lineColor="bg-teal-500"
        bgGradient="from-teal-50 to-white"
        iconBg="bg-teal-100"
        icon={<Sparkles className="h-5 w-5 text-teal-600" />}
        className="animate-fade-in delay-100"
      />
      
      <TechCard
        title="Insight Generation"
        description="Review the processed data through visual dashboards for actionable business insights."
        lineColor="bg-amber-500"
        bgGradient="from-amber-50 to-white"
        iconBg="bg-amber-100"
        icon={<Sparkles className="h-5 w-5 text-amber-600" />}
        className="animate-fade-in delay-200"
      />
    </div>
  );
};
