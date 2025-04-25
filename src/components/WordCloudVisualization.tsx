
import React, { useMemo } from 'react';
import ReactWordcloud from 'react-wordcloud';

interface WordCloudProps {
  data: Array<{
    text: string;
    value: number;
    sentiment?: string;
  }>;
  maxWords?: number;
}

const WordCloudVisualization = ({ data, maxWords = 100 }: WordCloudProps) => {
  const formattedData = useMemo(() => {
    return data
      .sort((a, b) => b.value - a.value)
      .slice(0, maxWords)
      .map(item => ({
        text: item.text,
        value: item.value,
        color: getSentimentColor(item.sentiment || 'neutral')
      }));
  }, [data, maxWords]);

  const options = {
    colors: ['#3b82f6', '#10b981', '#f43f5e', '#8b5cf6', '#f59e0b'],
    enableTooltip: true,
    deterministic: false,
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSizes: [14, 60] as [number, number],
    fontStyle: 'normal',
    fontWeight: 'bold',
    padding: 3,
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
        <div className="h-full transition-all duration-500 ease-in-out">
          <ReactWordcloud
            words={formattedData}
            options={options}
            callbacks={{
              getWordColor,
              onWordMouseOver: (word: any) => {
                // Add hover effect
                const element = document.getElementById(word.text);
                if (element) {
                  element.style.transform = 'scale(1.1)';
                  element.style.transition = 'transform 0.2s ease';
                }
              },
              onWordMouseOut: (word: any) => {
                // Remove hover effect
                const element = document.getElementById(word.text);
                if (element) {
                  element.style.transform = 'scale(1)';
                }
              }
            }}
          />
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">No keyword data available</p>
        </div>
      )}
    </div>
  );
};

function getSentimentColor(sentiment: string): string {
  switch (sentiment.toLowerCase()) {
    case 'positive':
      return '#10b981'; // Green
    case 'negative':
      return '#f43f5e'; // Red
    case 'neutral':
      return '#6b7280'; // Gray
    default:
      return '#3b82f6'; // Blue
  }
}

export default WordCloudVisualization;
