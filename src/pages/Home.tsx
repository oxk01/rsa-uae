
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart3, MessageSquare, Share2, PieChart, TrendingUp, Clock, BarChart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { language } = useLanguage();
  
  return (
    <div className={`min-h-screen bg-white ${language === 'ar' ? 'rtl' : ''}`}>
      {/* Hero section with background */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-950 text-white py-20 relative">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left column with text */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Unlock Customer Insights with <span className="text-amber-400">AI-Powered</span> Sentiment Analysis
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-xl">
              Advanced contextual sentiment analysis for customer reviews
              using BERT and ABSA technology to drive business decisions.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="bg-teal-500 hover:bg-teal-600 text-white px-8">
                <Link to={isAuthenticated ? "/demo" : "/signup"}>Try Demo</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-blue-800">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          
          {/* Right column with dashboard preview */}
          <div className="hidden md:block">
            <div className="bg-blue-800/50 backdrop-blur-sm p-6 rounded-lg border border-blue-700/50">
              <div className="grid grid-cols-2 gap-4">
                {/* Sentiment Distribution Card */}
                <Card className="bg-blue-800/50 border-blue-700/50 p-4 space-y-3">
                  <div className="flex items-center text-teal-300 mb-2">
                    <PieChart className="h-6 w-6 mr-2" />
                    <h3 className="text-xl font-semibold">Sentiment Distribution</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-teal-500 rounded-full w-3/4"></div>
                    <div className="h-2 bg-blue-400 rounded-full w-2/3"></div>
                    <div className="h-2 bg-red-400 rounded-full w-1/5"></div>
                  </div>
                </Card>
                
                {/* Key Aspects Card */}
                <Card className="bg-blue-800/50 border-blue-700/50 p-4">
                  <div className="flex items-center text-amber-300 mb-2">
                    <BarChart3 className="h-6 w-6 mr-2" />
                    <h3 className="text-xl font-semibold">Key Aspects</h3>
                  </div>
                  <div className="flex items-end justify-between h-32 mt-2">
                    <div className="bg-teal-500/80 w-1/6 h-1/2 rounded-t"></div>
                    <div className="bg-teal-500/80 w-1/6 h-2/3 rounded-t"></div>
                    <div className="bg-teal-500/80 w-1/6 h-1/3 rounded-t"></div>
                    <div className="bg-teal-500/80 w-1/6 h-5/6 rounded-t"></div>
                    <div className="bg-teal-500/80 w-1/6 h-2/5 rounded-t"></div>
                    <div className="bg-teal-500/80 w-1/6 h-3/4 rounded-t"></div>
                  </div>
                </Card>
                
                {/* Trend Analysis Card */}
                <Card className="bg-blue-800/50 border-blue-700/50 p-4">
                  <div className="flex items-center text-teal-300 mb-2">
                    <TrendingUp className="h-6 w-6 mr-2" />
                    <h3 className="text-xl font-semibold">Trend Analysis</h3>
                  </div>
                  <div className="h-32 flex items-center justify-center">
                    <svg className="w-full h-20" viewBox="0 0 100 20">
                      <path
                        d="M0,10 Q20,5 30,15 T60,5 T100,10"
                        fill="none"
                        stroke="#2DD4BF"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </Card>
                
                {/* Review Highlights Card */}
                <Card className="bg-blue-800/50 border-blue-700/50 p-4">
                  <div className="flex items-center text-amber-300 mb-2">
                    <MessageSquare className="h-6 w-6 mr-2" />
                    <h3 className="text-xl font-semibold">Review Highlights</h3>
                  </div>
                  <div className="space-y-2 mt-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How RSA Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Review Analysis</h3>
              <p className="text-gray-600">
                Input your customer reviews or upload CSV/Excel files for batch processing.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Share2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Processing</h3>
              <p className="text-gray-600">
                Our advanced BERT and ABSA models analyze sentiment at both document and aspect levels.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Actionable Insights</h3>
              <p className="text-gray-600">
                Get visualized reports highlighting key sentiment trends and areas for improvement.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Image feature section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold mb-4">Powerful Analytics at Your Fingertips</h2>
              <p className="text-gray-600 mb-4">
                RSA provides in-depth sentiment analysis, breaking down customer feedback into actionable insights.
                Track sentiment trends over time and identify key areas for improvement.
              </p>
              <p className="text-gray-600 mb-4">
                With our advanced AI models, you'll understand not just what customers are saying, but how they feel
                about specific aspects of your products or services.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/8522cef6-d858-4b61-a17a-8bf3b1fc6497.png" 
                alt="Data analytics dashboard" 
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose RSA</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <PieChart className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Comprehensive Reports</h3>
              <p className="text-gray-600">
                Get detailed breakdowns of sentiment across different aspects of your product or service.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <TrendingUp className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trend Analysis</h3>
              <p className="text-gray-600">
                Track sentiment changes over time to measure the impact of your improvements.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <MessageSquare className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Keyword Extraction</h3>
              <p className="text-gray-600">
                Identify the most important terms in your reviews and their associated sentiment.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section with updated button colors */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to gain insights from your reviews?</h2>
          <p className="text-xl mb-8">
            Join RSA today and transform your customer feedback into actionable business intelligence.
          </p>
          
          {!isAuthenticated ? (
            <Button asChild size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
              <Link to="/signup">Create an Account</Link>
            </Button>
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

export default Home;
