import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Book, CheckCircle, FileText, Cloud, Lightbulb, Package, ChartBar, User, Target, Flag, Award, Brain, Zap, Layers, Shield, Cpu, BarChart3, Globe, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { TechnologyTabs } from '@/components/TechnologyTabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

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
      
      {/* Mission, Vision and Values section - Updated to match image style */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Our Company</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* Mission Column */}
            <div className="flex flex-col items-center">
              <div className="mb-6 p-5 bg-blue-50 dark:bg-blue-900/30 rounded-full border-2 border-blue-500">
                <Target className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">OUR MISSION</h3>
              <Separator className="w-20 h-0.5 bg-blue-500 mb-6" />
              <p className="text-center text-gray-600 dark:text-gray-300">
                Understand customer sentiment at scale and extract actionable insights from feedback to enable data-driven business decisions and drive continuous product improvement.
              </p>
            </div>
            
            {/* Vision Column */}
            <div className="flex flex-col items-center">
              <div className="mb-6 p-5 bg-teal-50 dark:bg-teal-900/30 rounded-full border-2 border-teal-500">
                <Lightbulb className="h-10 w-10 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-center text-teal-600 dark:text-teal-400 mb-4">OUR VISION</h3>
              <Separator className="w-20 h-0.5 bg-teal-500 mb-6" />
              <p className="text-center text-gray-600 dark:text-gray-300">
                Create a world where customer feedback drives growth through AI-powered solutions that understand sentiment, making advanced analytics accessible to businesses of all sizes.
              </p>
            </div>
            
            {/* Values Column */}
            <div className="flex flex-col items-center">
              <div className="mb-6 p-5 bg-amber-50 dark:bg-amber-900/30 rounded-full border-2 border-amber-500">
                <Award className="h-10 w-10 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-center text-amber-600 dark:text-amber-400 mb-4">OUR VALUES</h3>
              <Separator className="w-20 h-0.5 bg-amber-500 mb-6" />
              <p className="text-center text-gray-600 dark:text-gray-300">
                We believe in data-driven insights for better decisions, customer-focused solutions, continuous innovation, and ethical AI development practices that respect privacy.
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
      
      {/* Solutions section with NEW light, attractive styling */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-200 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-teal-200 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-100 blur-3xl"></div>
          
          {/* Decorative patterns */}
          <div className="absolute top-10 right-10">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
              <circle cx="60" cy="60" r="30" stroke="#0284c7" strokeWidth="2" />
              <circle cx="60" cy="60" r="45" stroke="#0284c7" strokeWidth="1.5" />
              <circle cx="60" cy="60" r="60" stroke="#0284c7" strokeWidth="1" />
            </svg>
          </div>
          <div className="absolute bottom-10 left-10">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
              <rect x="10" y="10" width="100" height="100" stroke="#0d9488" strokeWidth="2" />
              <rect x="25" y="25" width="70" height="70" stroke="#0d9488" strokeWidth="1.5" />
              <rect x="40" y="40" width="40" height="40" stroke="#0d9488" strokeWidth="1" />
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-700 rounded-full text-sm font-medium mb-3">
              Our Offerings
            </span>
            <h2 className="text-4xl font-bold mb-4 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600">Innovative Solutions</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto"></div>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1 */}
              <div className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-7 shadow-lg border border-blue-100 h-full hover:shadow-blue-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-shrink-0 p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-all duration-300">
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-600">Sentiment Analysis Dashboard</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-5">
                    Our flagship sentiment analysis dashboard provides real-time insights into customer feedback from multiple sources. 
                    Track sentiment trends, identify key discussion topics, and monitor changes over time.
                  </p>
                  
                  <div className="mt-auto">
                    <Button variant="ghost" asChild className="text-blue-600 group-hover:bg-blue-50 transition-all duration-300">
                      <Link to="/demo" className="flex items-center gap-2">
                        Try Demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-7 shadow-lg border border-teal-100 h-full hover:shadow-teal-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-shrink-0 p-3 bg-teal-500/10 rounded-lg group-hover:bg-teal-500/20 transition-all duration-300">
                      <Star className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-bold text-teal-600">Competitor Sentiment Benchmarking</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-5">
                    Compare your product's sentiment against competitors across key aspects and features. 
                    Identify competitive advantages and areas for improvement with detailed side-by-side analysis.
                  </p>
                  
                  <div className="mt-auto">
                    <Button variant="ghost" asChild className="text-teal-600 group-hover:bg-teal-50 transition-all duration-300">
                      <Link to="/pricing" className="flex items-center gap-2">
                        View Plans <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-7 shadow-lg border border-amber-100 h-full hover:shadow-amber-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-shrink-0 p-3 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-all duration-300">
                      <Zap className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-amber-600">Sentiment Alert System</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-5">
                    Receive real-time alerts when sentiment shifts significantly or when specific topics gain traction in customer feedback. 
                    Our alert system helps you address issues before they escalate and capitalize on positive trends.
                  </p>
                  
                  <div className="mt-auto">
                    <Button variant="ghost" asChild className="text-amber-600 group-hover:bg-amber-50 transition-all duration-300">
                      <Link to="/pricing" className="flex items-center gap-2">
                        View Plans <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Card 4 */}
              <div className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-7 shadow-lg border border-rose-100 h-full hover:shadow-rose-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-shrink-0 p-3 bg-rose-500/10 rounded-lg group-hover:bg-rose-500/20 transition-all duration-300">
                      <Globe className="w-6 h-6 text-rose-600" />
                    </div>
                    <h3 className="text-xl font-bold text-rose-600">Enterprise API Integration</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-5">
                    Integrate our sentiment analysis capabilities directly into your existing systems via our comprehensive API. 
                    Build custom applications and workflows powered by our advanced NLP technology.
                  </p>
                  
                  <div className="mt-auto">
                    <Button variant="ghost" asChild className="text-rose-600 group-hover:bg-rose-50 transition-all duration-300">
                      <Link to="/contact" className="flex items-center gap-2">
                        Contact Sales <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Future improvements - keep existing section */}
      <section className="py-24 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 -left-10 w-40 h-40 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-70"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-100 dark:bg-amber-900/20 rounded-full opacity-70"></div>
          
          <div className="absolute left-1/4 top-1/3">
            <div className="w-2 h-2 rounded-full bg-teal-500"></div>
          </div>
          <div className="absolute right-1/3 bottom-1/4">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          </div>
          <div className="absolute right-1/4 top-1/4">
            <div className="w-1 h-1 rounded-full bg-rose-500"></div>
          </div>
          
          <div className="absolute left-10 bottom-10 grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium mb-3">
              What's Next
            </span>
            <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">{t('futureImprovements')}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
              We're constantly innovating to bring you the best sentiment analysis experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="group hover:z-10">
              <div className="relative overflow-hidden rounded-2xl transform transition-all duration-500 hover:shadow-2xl group-hover:scale-105">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                
                <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-8">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-blue-400 dark:bg-blue-600 blur-xl opacity-20 rounded-full"></div>
                    <div className="bg-blue-100 dark:bg-blue-900/50 relative p-4 rounded-2xl transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                      <Cpu className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">{t('aiModels')}</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Developing and integrating specialized AI models for different industries, such as healthcare, finance, 
                    hospitality, and e-commerce, with focused training for domain-specific terminology.
                  </p>
                  
                  <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-400 to-blue-600 mt-6 transition-all duration-300"></div>
                </div>
              </div>
            </div>
            
            <div className="group hover:z-10">
              <div className="relative overflow-hidden rounded-2xl transform transition-all duration-500 hover:shadow-2xl group-hover:scale-105">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-teal-600"></div>
                
                <div className="bg-gradient-to-b from-teal-50 to-white dark:from-gray-800 dark:to-gray-900 p-8">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-teal-400 dark:bg-teal-600 blur-xl opacity-20 rounded-full"></div>
                    <div className="bg-teal-100 dark:bg-teal-900/50 relative p-4 rounded-2xl transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                      <Layers className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-teal-600 dark:text-teal-400">{t('enterpriseIntegration')}</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Creating seamless integrations with enterprise systems like Salesforce, HubSpot, Zendesk, 
                    and Microsoft Dynamics to enable sentiment analysis directly within existing workflows.
                  </p>
                  
                  <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-teal-400 to-teal-600 mt-6 transition-all duration-300"></div>
                </div>
              </div>
            </div>
            
            <div className="group hover:z-10">
              <div className="relative overflow-hidden rounded-2xl transform transition-all duration-500 hover:shadow-2xl group-hover:scale-105">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 to-amber-600"></div>
                
                <div className="bg-gradient-to-b from-amber-50 to-white dark:from-gray-800 dark:to-gray-900 p-8">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-amber-400 dark:bg-amber-600 blur-xl opacity-20 rounded-full"></div>
                    <div className="bg-amber-100 dark:bg-amber-900/50 relative p-4 rounded-2xl transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                      <Shield className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-amber-600 dark:text-amber-400">{t('customModels')}</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Allowing businesses to train custom sentiment models on their own data, enabling higher accuracy 
                    analysis for specific products, services, and unique industry vocabularies.
                  </p>
                  
                  <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-amber-400 to-amber-600 mt-6 transition-all duration-300"></div>
                </div>
              </div>
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
