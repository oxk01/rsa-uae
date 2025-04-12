
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart3, MessageSquare, Share2, PieChart, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Review Sentiment Analysis
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Harness the power of AI to analyze customer reviews and extract valuable insights from your feedback data.
          </p>
          
          <div className="flex justify-center gap-4 mt-8">
            {!isAuthenticated ? (
              <>
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-blue-700">
                  <Link to="/about">Learn More</Link>
                </Button>
              </>
            ) : (
              <Button asChild size="lg">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            )}
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-16">
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
      
      {/* CTA section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to gain insights from your reviews?</h2>
          <p className="text-xl mb-8">
            Join RSA today and transform your customer feedback into actionable business intelligence.
          </p>
          
          {!isAuthenticated ? (
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/signup">Create an Account</Link>
            </Button>
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

export default Home;
