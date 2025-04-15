
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TechCardProps {
  title: string;
  description: string;
  className?: string;
}

const TechCard = ({ title, description, className = '' }: TechCardProps) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700 shadow-sm ${className} flex flex-col items-center text-center space-y-4`}>
      <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export const TechnologyCards = () => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      <TechCard
        title="Data Collection"
        description="Upload reviews from multiple sources or connect to data sources through our automated data collection."
      />
      
      <TechCard
        title="AI Processing"
        description="Our BERT and ABSA algorithms analyze the data, identifying entities, aspects, sentiment, and relevant keywords."
      />
      
      <TechCard
        title="Insight Generation"
        description="Review the processed data through visual dashboards for actionable business insights."
      />
      
      <TechCard
        title="BERT-Powered Analytics"
        description="Leverage BERT's deep contextual understanding to accurately interpret complex language variations in reviews."
      />
      
      <TechCard
        title="Aspect-Based Sentiment"
        description="Identify specific aspects of your products or services mentioned in reviews and understand the sentiment around them."
      />
      
      <TechCard
        title="Big Data Processing"
        description="Process thousands of reviews quickly and efficiently to help improve business decisions efficiently."
      />
      
      <TechCard
        title="Trend Analysis"
        description="Track sentiment trends over time to gauge the impact of product changes, marketing campaigns, or service improvements."
      />
      
      <TechCard
        title="Interactive Dashboards"
        description="Intuitive dashboards with in-depth customizable visualizations to make data accessible and actionable to all stakeholders."
      />
      
      <TechCard
        title="Automated Reports"
        description="Get auto-generated, comprehensive, actionable reporting for immediate insights and informed business decisions."
      />
    </div>
  );
};
