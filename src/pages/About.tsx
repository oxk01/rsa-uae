
import React from 'react';
import { Layers, Cpu, Terminal, Code, TrendingUp, BookOpen } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">About RSA</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center mb-6">
              <div className="md:w-1/2 md:pr-6 mb-6 md:mb-0">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                  Review Sentiment Analysis (RSA) is dedicated to helping businesses understand customer feedback at a deeper level. 
                  By leveraging cutting-edge AI technology, we transform raw review data into actionable insights that drive 
                  business decisions and product improvements.
                </p>
                <p className="text-gray-700">
                  Our platform makes sentiment analysis accessible to businesses of all sizes, without requiring technical expertise 
                  in natural language processing or machine learning.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
                  alt="Data Analysis" 
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mb-4">Technologies We Use</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Layers className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold">BERT Models</h3>
              </div>
              <p className="text-gray-700">
                Bidirectional Encoder Representations from Transformers (BERT) models enable our system to understand 
                context and nuance in language, leading to more accurate sentiment analysis.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Cpu className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold">ABSA</h3>
              </div>
              <p className="text-gray-700">
                Aspect-Based Sentiment Analysis (ABSA) allows us to identify specific aspects of products or services 
                mentioned in reviews and determine the sentiment toward each aspect.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Terminal className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold">Natural Language Processing</h3>
              </div>
              <p className="text-gray-700">
                Our NLP pipeline includes advanced text preprocessing, tokenization, and entity recognition to extract 
                meaningful information from unstructured text data.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Code className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold">Interactive Visualization</h3>
              </div>
              <p className="text-gray-700">
                We use modern data visualization libraries to present complex sentiment data in intuitive, 
                interactive charts and graphs that make insights immediately apparent.
              </p>
            </div>
          </div>
          
          <div className="mb-8">
            <img 
              src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
              alt="AI Technology" 
              className="w-full h-64 object-cover rounded-lg shadow-md mb-6"
            />
          </div>
          
          <h2 className="text-2xl font-semibold mb-4">Future Improvements</h2>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-start">
                <TrendingUp className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium">Mobile Application</h3>
                  <p className="text-gray-700">
                    We're developing a mobile app that will allow users to scan and analyze reviews on the go, 
                    with push notifications for significant sentiment changes.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <BookOpen className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium">Advanced AI Models</h3>
                  <p className="text-gray-700">
                    Our research team is working on incorporating more sophisticated language models to improve 
                    accuracy and add capabilities like emotion detection and competitor analysis.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Layers className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium">Multilingual Support</h3>
                  <p className="text-gray-700">
                    We're expanding our language capabilities to support sentiment analysis in multiple languages, 
                    making our platform accessible to global businesses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
