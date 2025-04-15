
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface TechCardProps {
  title: string;
  description: string;
  lineColor?: string;
  className?: string;
}

const TechCard = ({ 
  title, 
  description, 
  lineColor = 'bg-blue-500', 
  className = '' 
}: TechCardProps) => {
  return (
    <div className={`relative bg-white rounded-lg p-6 shadow-md overflow-hidden ${className}`}>
      <div className={`absolute top-0 left-0 w-full flex justify-center`}>
        <div className={`h-1 w-16 ${lineColor} rounded-b-md`}></div>
      </div>
      <div className="space-y-4 text-center">
        <h3 className="text-xl font-bold text-gray-800 mt-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
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
        className="hover:shadow-lg transition-all duration-300"
      />
      
      <TechCard
        title="AI Processing"
        description="Our BERT and ABSA algorithms analyze the data, identifying entities, aspects, sentiment, and relevant keywords."
        lineColor="bg-teal-500"
        className="hover:shadow-lg transition-all duration-300"
      />
      
      <TechCard
        title="Insight Generation"
        description="Review the processed data through visual dashboards for actionable business insights."
        lineColor="bg-amber-500"
        className="hover:shadow-lg transition-all duration-300"
      />
    </div>
  );
};
