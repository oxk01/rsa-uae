
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Code, BrainCircuit, Globe, Sparkles, ArrowRight, Book, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutPage = () => {
  const { isAuthenticated } = useAuth();
  const { language } = useLanguage();

  return (
    <div className={`min-h-screen bg-gray-50 ${language === 'ar' ? 'rtl' : ''}`}>
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
      
      {/* Mission section with updated image */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/fe0e17eb-004e-4730-9171-b309f4655ff0.png" 
                alt="Our Mission" 
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
      
      {/* Our Approach section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Approach</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-900 text-white rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-800 p-3 rounded-full">
                  <BrainCircuit className="h-8 w-8 text-blue-200" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Contextual AI</h3>
              <p className="text-blue-100">
                State-of-the-art language models that understand context and nuance of professional language.
              </p>
            </div>
            
            <div className="bg-teal-700 text-white rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-teal-800 p-3 rounded-full">
                  <BarChart3 className="h-8 w-8 text-teal-200" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Big Data Processing</h3>
              <p className="text-teal-100">
                Distributed infrastructure to handle massive volumes of customer feedback at scale.
              </p>
            </div>
            
            <div className="bg-amber-700 text-white rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-amber-800 p-3 rounded-full">
                  <Sparkles className="h-8 w-8 text-amber-200" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Contextual Understanding</h3>
              <p className="text-amber-100">
                Domain-specific insights provide accurate and precise sentiment analysis.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology section - Updated to match the image */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Technology</h2>
          
          {/* Tab content container - Both in one card as requested */}
          <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden max-w-5xl mx-auto">
            {/* Tabs header */}
            <div className="flex border-b">
              <div className="w-1/2 py-4 px-6 text-center font-medium bg-white text-blue-900 border-b-2 border-blue-900">
                BERT Technology
              </div>
              <div className="w-1/2 py-4 px-6 text-center font-medium text-gray-600 bg-gray-50">
                ABSA Technology
              </div>
            </div>
            
            {/* Main content area */}
            <div className="p-8">
              <div className="flex items-start mb-6">
                <Book className="h-8 w-8 text-blue-900 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">BERT (Bidirectional Encoder Representations from Transformers)</h3>
                  <p className="text-gray-600 mt-2">
                    BERT represents a breakthrough in natural language understanding, allowing AI to grasp context from both directions in text.
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                    <Code className="h-5 w-5 text-blue-700 mr-2" />
                    How BERT Works
                  </h4>
                  <p className="text-gray-700 mb-3">
                    BERT is pre-trained on a massive corpus of text to understand language in context. Unlike previous models that read text sequentially, BERT reads entire sentences simultaneously, understanding words based on their surroundings.
                  </p>
                  <p className="text-gray-700">
                    This bidirectional approach allows BERT to capture nuanced meanings, handle ambiguity, and understand complex linguistic phenomena like sarcasm and implicit sentiment.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-700 mr-2" />
                    Benefits for Sentiment Analysis
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Superior contextual understanding of reviews</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Accurate detection of implicit sentiment</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Recognition of domain-specific language</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Handling of complex sentence structures</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Adaptability to different review styles</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6 mt-8">
                <h4 className="text-lg font-semibold mb-3 text-gray-800">Technical Implementation</h4>
                <p className="text-gray-700">
                  We fine-tune BERT models on industry-specific datasets to optimize performance for particular domains. Our implementation includes careful hyperparameter tuning, domain adaptation techniques, and ensemble methods to maximize accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Future improvements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Future Improvements</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multilingual Support</h3>
              <p className="text-gray-700">
                Expanding our language capabilities to support sentiment analysis across multiple languages, helping businesses 
                with global customer bases.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Analysis</h3>
              <p className="text-gray-700">
                Implementing streaming data processing to provide instant sentiment analysis for social media monitoring 
                and customer support interactions.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
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
      
      {/* CTA section with green buttons */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to see RSA in action?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the power of advanced sentiment analysis and discover insights hidden in your customer feedback.
          </p>
          
          {!isAuthenticated ? (
            <div className="flex justify-center space-x-4">
              <Button asChild size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
                <Link to="/signup">Sign Up Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-blue-700">
                <Link to="/login">Log In <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          ) : (
            <Button asChild size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
              <Link to="/demo">Try Demo Analysis</Link>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
