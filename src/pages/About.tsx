
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Code, BrainCircuit, Globe, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const AboutPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-950 text-white py-20 relative">
        <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl font-bold mb-4">About RSA</h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Using cutting-edge AI to transform customer feedback into actionable business insights
          </p>
        </div>
      </section>
      
      {/* Mission section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"
                alt="Code on computer screen" 
                className="rounded-lg shadow-md w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-4">
                At RSA, we believe that understanding customer sentiment is key to building better products and services. 
                Our mission is to provide businesses with powerful, accessible tools to analyze and extract meaningful insights 
                from customer feedback.
              </p>
              <p className="text-lg text-gray-700">
                We combine state-of-the-art natural language processing technologies with intuitive visualizations 
                to help you make data-driven decisions that improve customer satisfaction and drive business growth.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Technology</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <BrainCircuit className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold ml-4">BERT Technology</h3>
              </div>
              <p className="text-gray-700 mb-4">
                BERT (Bidirectional Encoder Representations from Transformers) is a revolutionary neural network architecture 
                developed by Google that has transformed natural language processing. Unlike previous models, BERT reads text 
                bidirectionally, considering the context from both directions.
              </p>
              <p className="text-gray-700">
                This allows our system to understand nuanced sentiments, detect sarcasm, and interpret context-dependent 
                expressions with remarkable accuracy, providing you with reliable sentiment analysis results.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Code className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold ml-4">ABSA Framework</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Aspect-Based Sentiment Analysis (ABSA) goes beyond traditional sentiment analysis by identifying specific 
                aspects or features mentioned in text and determining the sentiment expressed toward each aspect.
              </p>
              <p className="text-gray-700">
                This granular approach allows businesses to understand precisely which aspects of their products or services 
                are receiving positive or negative feedback, enabling targeted improvements and strategic decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Future improvements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Future Improvements</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multilingual Support</h3>
              <p className="text-gray-700">
                Expanding our language capabilities to support sentiment analysis across multiple languages, helping businesses 
                with global customer bases.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Analysis</h3>
              <p className="text-gray-700">
                Implementing streaming data processing to provide instant sentiment analysis for social media monitoring 
                and customer support interactions.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Mobile Application</h3>
              <p className="text-gray-700">
                Developing a mobile app for on-the-go access to sentiment analysis dashboards and real-time notifications for 
                critical feedback.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to see RSA in action?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the power of advanced sentiment analysis and discover insights hidden in your customer feedback.
          </p>
          
          {!isAuthenticated ? (
            <div className="flex justify-center space-x-4">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link to="/signup">Sign Up Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-blue-700">
                <Link to="/login">Log In <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          ) : (
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/demo">Try Demo Analysis</Link>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
