
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TechCardProps {
  title: string;
  description: string;
  className?: string;
}

const TechCard = ({ title, description, className = '' }: TechCardProps) => {
  return (
    <div className={`text-center space-y-4 p-6 ${className}`}>
      <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
};

export const TechnologyCards = () => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-3 gap-8 mt-8">
      <TechCard
        title="Data Collection"
        description="Upload reviews from multiple sources or connect to data sources through our automated data collection."
        className="bg-blue-50/50 rounded-lg hover:shadow-lg transition-all duration-300"
      />
      
      <TechCard
        title="AI Processing"
        description="Our BERT and ABSA algorithms analyze the data, identifying entities, aspects, sentiment, and relevant keywords."
        className="bg-blue-100/50 rounded-lg hover:shadow-lg transition-all duration-300"
      />
      
      <TechCard
        title="Insight Generation"
        description="Review the processed data through visual dashboards for actionable business insights."
        className="bg-blue-150/50 rounded-lg hover:shadow-lg transition-all duration-300"
      />
    </div>
  );
};
