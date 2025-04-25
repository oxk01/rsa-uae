
import React from 'react';
import { CloudIcon } from 'lucide-react';
import DashboardCard from './DashboardCard';

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
        <div className="h-[250px] flex flex-wrap justify-center items-center">
          {data.slice(0, 30).map((word, index) => (
            <span 
              key={index}
              className="inline-block px-2 py-1 m-1 rounded-lg"
              style={{
                fontSize: `${Math.max(0.7, Math.min(2, 0.7 + word.value / 10))}rem`,
                color: word.sentiment === 'positive' ? '#42b883' : 
                       word.sentiment === 'negative' ? '#e64a3b' : '#6b7280'
              }}
            >
              {word.text}
            </span>
          ))}
        </div>
      )}
    </DashboardCard>
  );
};

export default WordCloudCard;
