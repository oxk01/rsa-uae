import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Book, CheckCircle, FileText, Cloud, Brain, Package, ChartBar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { TechnologyTabs } from '@/components/TechnologyTabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900`}>
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
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                alt="Our Mission" 
                className="rounded-lg shadow-md w-full"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                At RSA, we believe that understanding customer sentiment is key to building better products and services. 
                Our mission is to provide businesses with powerful, accessible tools to analyze and extract meaningful insights 
                from customer feedback.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                We combine state-of-the-art natural language processing technologies with intuitive visualizations 
                to help you make data-driven decisions that improve customer satisfaction and drive business growth.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Approach section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Approach</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-900 text-white rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-800 p-3 rounded-full">
                  <Book className="h-8 w-8 text-blue-200" />
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
                  <FileText className="h-8 w-8 text-teal-200" />
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
      
      {/* Our Technology section - Replaced with the new TechnologyTabs component */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <TechnologyTabs />
        </div>
      </section>
      
      {/* Team members section - Updated to remove images and keep only icons */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Expert Team</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <Card className="bg-white/10 backdrop-blur border-none shadow-xl hover:bg-white/15 transition-all duration-300 text-white overflow-hidden">
              <div className="relative p-6 flex flex-col items-center">
                <div className="absolute right-0 top-0 bg-blue-700/40 w-32 h-32 rounded-full blur-2xl"></div>
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-full mb-5 z-10 ring-4 ring-white/10">
                  <Brain className="h-12 w-12 text-blue-100" />
                </div>
                <h3 className="text-xl font-bold mb-2">Abdallah Rok</h3>
                <p className="text-blue-200 mb-4 font-medium">Chief ML and Data Scientist</p>
                <p className="text-center text-blue-100 text-sm">
                  Leading our AI research initiatives and developing cutting-edge sentiment analysis algorithms.
                </p>
              </div>
            </Card>

            {/* Team Member 2 */}
            <Card className="bg-white/10 backdrop-blur border-none shadow-xl hover:bg-white/15 transition-all duration-300 text-white overflow-hidden">
              <div className="relative p-6 flex flex-col items-center">
                <div className="absolute right-0 top-0 bg-teal-700/40 w-32 h-32 rounded-full blur-2xl"></div>
                <div className="bg-gradient-to-br from-teal-600 to-teal-800 p-8 rounded-full mb-5 z-10 ring-4 ring-white/10">
                  <Package className="h-12 w-12 text-teal-100" />
                </div>
                <h3 className="text-xl font-bold mb-2">Rakkan Abdallah</h3>
                <p className="text-blue-200 mb-4 font-medium">Product Manager</p>
                <p className="text-center text-blue-100 text-sm">
                  Shaping our product roadmap and ensuring our solutions deliver maximum value to customers.
                </p>
              </div>
            </Card>

            {/* Tasneem Abdallah - Updated role */}
            <Card className="bg-white/10 backdrop-blur border-none shadow-xl hover:bg-white/15 transition-all duration-300 text-white overflow-hidden">
              <div className="relative p-6 flex flex-col items-center">
                <div className="absolute right-0 top-0 bg-amber-700/40 w-32 h-32 rounded-full blur-2xl"></div>
                <div className="bg-gradient-to-br from-amber-600 to-amber-800 p-8 rounded-full mb-5 z-10 ring-4 ring-white/10">
                  <ChartBar className="h-12 w-12 text-amber-100" />
                </div>
                <h3 className="text-xl font-bold mb-2 whitespace-nowrap">Tasneem Abdallah</h3>
                <p className="text-blue-200 mb-4 font-medium">Data Analyst</p>
                <p className="text-center text-blue-100 text-sm">
                  Transforming complex data into actionable insights that drive business decisions.
                </p>
              </div>
            </Card>

            {/* Team Member 4 */}
            <Card className="bg-white/10 backdrop-blur border-none shadow-xl hover:bg-white/15 transition-all duration-300 text-white overflow-hidden">
              <div className="relative p-6 flex flex-col items-center">
                <div className="absolute right-0 top-0 bg-indigo-700/40 w-32 h-32 rounded-full blur-2xl"></div>
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-full mb-5 z-10 ring-4 ring-white/10">
                  <Brain className="h-12 w-12 text-indigo-100" />
                </div>
                <h3 className="text-xl font-bold mb-2">Ahmed Rok</h3>
                <p className="text-indigo-200 mb-4 font-medium">AI Research Lead</p>
                <p className="text-center text-indigo-100 text-sm">
                  Driving innovative AI research and developing cutting-edge machine learning strategies.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Solutions section with enhanced styling */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Our Solutions</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We offer a range of solutions to help businesses understand and act on customer sentiment
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden divide-y divide-gray-200 dark:divide-gray-700">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="sentiment-analysis" className="border-0">
                  <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors">
                    Sentiment Analysis Dashboard
                  </AccordionTrigger>
                  <AccordionContent className="bg-blue-50/30 dark:bg-gray-700/30 px-6 py-4">
                    <div className="space-y-3">
                      <p className="text-gray-600 dark:text-gray-300">
                        Our flagship sentiment analysis dashboard provides real-time insights into customer feedback from multiple sources. 
                        Track sentiment trends, identify key discussion topics, and monitor changes over time.
                      </p>
                      <div className="flex items-center mt-3">
                        <Button variant="link" asChild className="p-0 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                          <Link to="/demo">Try Demo <ArrowRight className="ml-1 h-4 w-4" /></Link>
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="competitor-analysis" className="border-0">
                  <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors">
                    Competitor Sentiment Benchmarking
                  </AccordionTrigger>
                  <AccordionContent className="bg-blue-50/30 dark:bg-gray-700/30 px-6 py-4">
                    <div className="space-y-3">
                      <p className="text-gray-600 dark:text-gray-300">
                        Compare your product's sentiment against competitors across key aspects and features. 
                        Identify competitive advantages and areas for improvement with detailed side-by-side analysis.
                      </p>
                      <div className="flex items-center mt-3">
                        <Button variant="link" asChild className="p-0 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                          <Link to="/pricing">View Plans <ArrowRight className="ml-1 h-4 w-4" /></Link>
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="alert-system" className="border-0">
                  <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors">
                    Sentiment Alert System
                  </AccordionTrigger>
                  <AccordionContent className="bg-blue-50/30 dark:bg-gray-700/30 px-6 py-4">
                    <div className="space-y-3">
                      <p className="text-gray-600 dark:text-gray-300">
                        Receive real-time alerts when sentiment shifts significantly or when specific topics gain traction in customer feedback. 
                        Our alert system helps you address issues before they escalate and capitalize on positive trends.
                      </p>
                      <div className="flex items-center mt-3">
                        <Button variant="link" asChild className="p-0 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                          <Link to="/pricing">View Plans <ArrowRight className="ml-1 h-4 w-4" /></Link>
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="custom-integration" className="border-0">
                  <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 transition-colors">
                    Enterprise API Integration
                  </AccordionTrigger>
                  <AccordionContent className="bg-blue-50/30 dark:bg-gray-700/30 px-6 py-4">
                    <div className="space-y-3">
                      <p className="text-gray-600 dark:text-gray-300">
                        Integrate our sentiment analysis capabilities directly into your existing systems via our comprehensive API. 
                        Build custom applications and workflows powered by our advanced NLP technology.
                      </p>
                      <div className="flex items-center mt-3">
                        <Button variant="link" asChild className="p-0 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                          <Link to="/contact">Contact Sales <ArrowRight className="ml-1 h-4 w-4" /></Link>
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
      
      {/* Future improvements - Updated with better spacing */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{t('futureImprovements')}</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Cloud className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('aiModels')}</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Developing and integrating specialized AI models for different industries, such as healthcare, finance, 
                hospitality, and e-commerce, with focused training for domain-specific terminology.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('enterpriseIntegration')}</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Creating seamless integrations with enterprise systems like Salesforce, HubSpot, Zendesk, 
                and Microsoft Dynamics to enable sentiment analysis directly within existing workflows.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('customModels')}</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Allowing businesses to train custom sentiment models on their own data, enabling higher accuracy 
                analysis for specific products, services, and unique industry vocabularies.
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
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-blue-700 bg-transparent">
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
