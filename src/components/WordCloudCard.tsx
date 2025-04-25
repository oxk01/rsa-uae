
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
      className="col-span-2"
    >
      {!hasData ? (
        <div className="h-[250px] flex flex-col items-center justify-center text-gray-400">
          <CloudIcon className="h-16 w-16 mb-2 text-blue-300" />
          <p>Upload data to see word cloud visualization</p>
        </div>
      ) : (
        <div className="h-[250px]">
          <WordCloudVisualization data={data} maxWords={100} />
        </div>
      )}
    </DashboardCard>
  );
};

export default WordCloudCard;
