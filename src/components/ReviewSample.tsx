
import React from 'react';
import { MessageSquare } from 'lucide-react';
import DashboardCard from './DashboardCard';

type SentimentType = 'positive' | 'neutral' | 'negative';

interface ReviewProps {
  text: string;
  author: string;
  date: string;
  rating: number;
  sentiment: SentimentType;
  highlightedPhrases?: {
    text: string;
    sentiment: SentimentType;
  }[];
}

const reviews: ReviewProps[] = [
  {
    text: "I absolutely love this product! The quality is outstanding and it works exactly as advertised. The customer service was also excellent when I had a question about setup.",
    author: "Sarah J.",
    date: "2023-04-15",
    rating: 5,
    sentiment: "positive",
    highlightedPhrases: [
      { text: "absolutely love", sentiment: "positive" },
      { text: "quality is outstanding", sentiment: "positive" },
      { text: "customer service was also excellent", sentiment: "positive" }
    ]
  },
  {
    text: "The product is okay. Nothing special, but it gets the job done. Shipping took longer than expected, which was disappointing. The price is reasonable for what you get.",
    author: "Michael T.",
    date: "2023-03-28",
    rating: 3,
    sentiment: "neutral",
    highlightedPhrases: [
      { text: "okay", sentiment: "neutral" },
      { text: "Nothing special", sentiment: "neutral" },
      { text: "shipping took longer than expected", sentiment: "negative" },
      { text: "price is reasonable", sentiment: "positive" }
    ]
  },
  {
    text: "Terrible experience with this product. It broke within a week of use and customer support has been unresponsive to my emails. Complete waste of money.",
    author: "David R.",
    date: "2023-04-02",
    rating: 1,
    sentiment: "negative",
    highlightedPhrases: [
      { text: "Terrible experience", sentiment: "negative" },
      { text: "broke within a week", sentiment: "negative" },
      { text: "customer support has been unresponsive", sentiment: "negative" },
      { text: "Complete waste of money", sentiment: "negative" }
    ]
  }
];

const getSentimentColorClass = (sentiment: SentimentType) => {
  switch (sentiment) {
    case 'positive':
      return 'bg-green-100 text-green-800';
    case 'neutral':
      return 'bg-gray-100 text-gray-800';
    case 'negative':
      return 'bg-red-100 text-red-800';
  }
};

const ReviewSample = () => {
  const highlightPhrase = (review: ReviewProps) => {
    if (!review.highlightedPhrases) return <p>{review.text}</p>;

    let result = review.text;
    const elements: JSX.Element[] = [];
    let lastIndex = 0;

    // Sort phrases by their position in the text to process them in order
    const sortedPhrases = [...review.highlightedPhrases].sort((a, b) => {
      return review.text.indexOf(a.text) - review.text.indexOf(b.text);
    });

    for (const phrase of sortedPhrases) {
      const index = review.text.indexOf(phrase.text, lastIndex);
      if (index === -1) continue;

      // Add text before the phrase
      if (index > lastIndex) {
        elements.push(<span key={`text-${lastIndex}-${index}`}>{review.text.substring(lastIndex, index)}</span>);
      }

      // Add highlighted phrase
      elements.push(
        <span 
          key={`phrase-${index}`} 
          className={`${getSentimentColorClass(phrase.sentiment)} px-1 rounded`}
        >
          {phrase.text}
        </span>
      );

      lastIndex = index + phrase.text.length;
    }

    // Add remaining text
    if (lastIndex < review.text.length) {
      elements.push(<span key={`text-${lastIndex}-end`}>{review.text.substring(lastIndex)}</span>);
    }

    return <p className="leading-relaxed">{elements}</p>;
  };

  return (
    <DashboardCard 
      title="Review Samples with Sentiment Analysis" 
      icon={<MessageSquare className="h-4 w-4" />}
      className="col-span-1 md:col-span-3"
    >
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-brand-blue flex items-center justify-center">
                  <span className="text-white font-medium text-sm">{review.author.charAt(0)}</span>
                </div>
                <div className="ml-2">
                  <h3 className="text-sm font-medium">{review.author}</h3>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                review.sentiment === 'positive' 
                  ? 'bg-green-100 text-green-800' 
                  : review.sentiment === 'neutral' 
                    ? 'bg-gray-100 text-gray-800' 
                    : 'bg-red-100 text-red-800'
              }`}>
                {review.sentiment.charAt(0).toUpperCase() + review.sentiment.slice(1)}
              </div>
            </div>
            
            <div className="mt-2">
              {highlightPhrase(review)}
            </div>
            
            <div className="mt-3 flex items-center">
              <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                  <svg 
                    key={i} 
                    className={`h-4 w-4 ${i < review.rating ? 'text-brand-amber' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-1 text-xs text-gray-500">{review.rating}/5</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default ReviewSample;
