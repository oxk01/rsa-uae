
import React, { useMemo } from 'react';
import ReactWordcloud from 'react-wordcloud';

interface WordCloudProps {
  data: Array<{
    text: string;
    value: number;
    sentiment?: string;
  }>;
}

const WordCloudVisualization = ({ data }: WordCloudProps) => {
  const formattedData = useMemo(() => {
    return data.map(item => ({
      text: item.text,
      value: item.value,
      color: getSentimentColor(item.sentiment || 'neutral')
    }));
  }, [data]);

  const options = {
    colors: ['#4ade80', '#94a3b8', '#f87171', '#3b82f6', '#a855f7'],
    enableTooltip: true,
    deterministic: true,
    fontFamily: 'Inter, sans-serif',
    fontSizes: [12, 80] as [number, number],
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 2,
    rotations: 3,
    rotationAngles: [0, 90] as [number, number],
    scale: 'sqrt' as const,
    spiral: 'archimedean' as const,
    transitionDuration: 1000
  };

  const getWordColor = (word: any) => word.color || '#3b82f6';

  return (
    <div className="h-full w-full">
      {formattedData.length > 0 ? (
        <ReactWordcloud
          words={formattedData}
          options={options}
          callbacks={{
            getWordColor
          }}
        />
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">No keyword data available</p>
        </div>
      )}
    </div>
  );
};

function getSentimentColor(sentiment: string): string {
  switch (sentiment.toLowerCase()) {
    case 'positive':
      return '#4ade80';
    case 'negative':
      return '#f87171';
    case 'neutral':
      return '#94a3b8';
    default:
      return '#3b82f6';
  }
}

export default WordCloudVisualization;
