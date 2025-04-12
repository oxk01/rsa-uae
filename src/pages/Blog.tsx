
import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Understanding BERT: The AI Behind RSA\'s Sentiment Analysis',
    excerpt: 'An in-depth look at how Bidirectional Encoder Representations from Transformers has revolutionized NLP tasks and sentiment analysis.',
    date: '2025-03-15',
    readTime: '8 min read',
    category: 'AI Technology',
    image: '/placeholder.svg'
  },
  {
    id: 2,
    title: 'Aspect-Based Sentiment Analysis: Extracting Detailed Insights from Reviews',
    excerpt: 'How ABSA allows businesses to understand sentiment toward specific aspects of their products or services.',
    date: '2025-03-01',
    readTime: '6 min read',
    category: 'Research',
    image: '/placeholder.svg'
  },
  {
    id: 3,
    title: 'The Evolution of Sentiment Analysis: From Rule-Based to Deep Learning',
    excerpt: 'Tracing the development of sentiment analysis techniques and how neural networks have transformed the field.',
    date: '2025-02-20',
    readTime: '10 min read',
    category: 'Research History',
    image: '/placeholder.svg'
  },
  {
    id: 4,
    title: 'Fine-tuning BERT Models for Domain-Specific Sentiment Analysis',
    excerpt: 'Technical exploration of how pre-trained BERT models can be optimized for specific industries and use cases.',
    date: '2025-02-10',
    readTime: '12 min read',
    category: 'Technical',
    image: '/placeholder.svg'
  },
  {
    id: 5,
    title: 'Combining NLP and Business Intelligence: From Insights to Action',
    excerpt: 'How businesses can translate sentiment analysis results into concrete improvements and strategic decisions.',
    date: '2025-01-25',
    readTime: '7 min read',
    category: 'Business',
    image: '/placeholder.svg'
  },
  {
    id: 6,
    title: 'Multilingual Sentiment Analysis: Challenges and Solutions',
    excerpt: 'Exploring the complexities of analyzing sentiment across different languages and cultural contexts.',
    date: '2025-01-15',
    readTime: '9 min read',
    category: 'Research',
    image: '/placeholder.svg'
  }
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">RSA Research Blog</h1>
          <p className="text-gray-600 text-center mb-12">
            Insights, research papers, and technical deep dives into the AI technology powering our platform.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                
                <div className="p-5">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  
                  <Link to={`/blog/${post.id}`} className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Read full paper <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
