
import React from 'react';
import { BarChart3, Code, BrainCircuit, Globe, Database, Network, Cpu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TechCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const TechCard = ({ icon, title, description, className = '' }: TechCardProps) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700 shadow-sm ${className}`}>
      <div className="flex items-center gap-4 mb-3">
        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export const TechnologyCards = () => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <TechCard
        icon={<BrainCircuit className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
        title={t('nlpTechnology')}
        description="Natural Language Processing technology that understands context, nuance, and sentiment in human language."
      />
      
      <TechCard
        icon={<Network className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
        title={t('absaTechnology')}
        description="Aspect-Based Sentiment Analysis that identifies specific features and topics in customer feedback."
      />
      
      <TechCard
        icon={<Cpu className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
        title={t('bertTechnology')}
        description="BERT transformer models for deep contextual understanding of text and nuanced sentiment analysis."
      />
      
      <TechCard
        icon={<Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
        title={t('bigDataTechnology')}
        description="Distributed data processing architecture to analyze millions of reviews at enterprise scale."
      />
    </div>
  );
};
