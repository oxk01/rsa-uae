
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
    fontSizes: [10, 60] as [number, number], // Explicitly type as MinMaxPair
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90] as [number, number], // Explicitly type as MinMaxPair
    scale: 'sqrt',
    spiral: 'archimedean',
    transitionDuration: 1000
  };

  // Custom renderer to use the sentiment color
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

// Helper function to determine color based on sentiment
function getSentimentColor(sentiment: string): string {
  switch (sentiment.toLowerCase()) {
    case 'positive':
      return '#4ade80'; // green
    case 'negative':
      return '#f87171'; // red
    case 'neutral':
      return '#94a3b8'; // gray
    default:
      return '#3b82f6'; // blue
  }
}

export default WordCloudVisualization;
