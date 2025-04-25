
import React from 'react';
import { CloudIcon } from 'lucide-react';
import DashboardCard from './DashboardCard';
import WordCloudVisualization from './WordCloudVisualization';

interface WordCloudCardProps {
  data?: Array<{
    text: string;
    value: number;
    sentiment: string;
  }>;
}

const WordCloudCard = ({ data = [] }: WordCloudCardProps) => {
  const hasData = data && data.length > 0;
  
  return (
    <DashboardCard 
      title="Common Words in Reviews"
      className="col-span-2 bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20 border-blue-100 dark:from-gray-900 dark:via-blue-900/10 dark:to-blue-900/5"
    >
      {!hasData ? (
        <div className="h-[250px] flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
          <CloudIcon className="h-16 w-16 mb-4 animate-pulse text-blue-300 dark:text-blue-600" />
          <p className="text-sm">Upload data to see word cloud visualization</p>
        </div>
      ) : (
        <div className="h-[250px] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/5 dark:to-black/5 pointer-events-none rounded-lg" />
          <WordCloudVisualization data={data} maxWords={100} />
        </div>
      )}
    </DashboardCard>
  );
};

export default WordCloudCard;
