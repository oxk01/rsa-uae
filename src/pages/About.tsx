
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Code, BrainCircuit, Globe, Sparkles, ArrowRight, Book, CheckCircle, FileText, Network, Database, Cpu, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutPage = () => {
  const { isAuthenticated } = useAuth();
  const { t, language } = useLanguage();

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
      
      {/* Our Technology section - Updated with NLP, ABSA, BERT and Big Data */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Technology</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* NLP Technology Card */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-900 text-white py-4 px-6">
                <h3 className="text-2xl font-bold">{t('nlpTechnology')}</h3>
              </div>
              
              <div className="p-8">
                <div className="flex items-start mb-6">
                  <BrainCircuit className="h-8 w-8 text-blue-900 dark:text-blue-400 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Natural Language Processing</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      Our advanced NLP technology understands human language in all its complexity, enabling precise analysis of customer feedback.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                    <Code className="h-5 w-5 text-blue-700 dark:text-blue-400 mr-2" />
                    How Our NLP Works
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Our NLP models use transformers architecture and contextual embeddings to understand text semantics beyond simple keyword matching. We employ techniques like named entity recognition, part-of-speech tagging, and dependency parsing to extract meaningful information from unstructured text.
                  </p>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-700 dark:text-blue-400 mr-2" />
                    Key NLP Features
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Contextual language understanding</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Sentiment detection with 93% accuracy</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Multilingual support for global businesses</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Integration with domain-specific knowledge</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* ABSA Technology Card */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-900 text-white py-4 px-6">
                <h3 className="text-2xl font-bold">{t('absaTechnology')}</h3>
              </div>
              
              <div className="p-8">
                <div className="flex items-start mb-6">
                  <Network className="h-8 w-8 text-blue-900 dark:text-blue-400 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Aspect-Based Sentiment Analysis</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      ABSA technology allows us to analyze sentiment at a granular level, identifying specific aspects of products or services mentioned in reviews.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                    <Code className="h-5 w-5 text-blue-700 dark:text-blue-400 mr-2" />
                    How ABSA Works
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    ABSA breaks down reviews into specific aspects or features, then determines the sentiment associated with each aspect. This granular approach provides detailed insights into what customers specifically like or dislike about different features of a product or service.
                  </p>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-700 dark:text-blue-400 mr-2" />
                    Benefits of ABSA
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Detailed feature-level sentiment analysis</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Identifies specific improvement areas</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Competitive benchmarking by aspect</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Prioritization of product improvements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* BERT Technology Card */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="bg-purple-900 text-white py-4 px-6">
                <h3 className="text-2xl font-bold">{t('bertTechnology')}</h3>
              </div>
              
              <div className="p-8">
                <div className="flex items-start mb-6">
                  <Cpu className="h-8 w-8 text-purple-900 dark:text-purple-400 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">BERT AI Models</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      Our implementation of Google's BERT (Bidirectional Encoder Representations from Transformers) delivers state-of-the-art contextual understanding.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                    <Code className="h-5 w-5 text-purple-700 dark:text-purple-400 mr-2" />
                    How BERT Enhances Our Analysis
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    BERT understands context bidirectionally—considering both the words that come before and after a target word. This enables superior understanding of nuance, sarcasm, and complex sentiment expressions that older models miss.
                  </p>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                    <CheckCircle className="h-5 w-5 text-purple-700 dark:text-purple-400 mr-2" />
                    BERT Advantages
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Superior contextual understanding</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Pre-trained on 3.3 billion words</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Fine-tuned for sentiment analysis tasks</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Captures complex language patterns</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Big Data Technology Card */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="bg-emerald-900 text-white py-4 px-6">
                <h3 className="text-2xl font-bold">{t('bigDataTechnology')}</h3>
              </div>
              
              <div className="p-8">
                <div className="flex items-start mb-6">
                  <Database className="h-8 w-8 text-emerald-900 dark:text-emerald-400 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Big Data Processing</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      Our distributed data architecture enables processing millions of reviews and feedback points at enterprise scale.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                    <Cloud className="h-5 w-5 text-emerald-700 dark:text-emerald-400 mr-2" />
                    Our Big Data Infrastructure
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    We combine cloud-native technologies like Apache Spark, distributed databases, and containerized microservices to handle data at any scale. This enables real-time processing of continuous customer feedback streams while maintaining high performance.
                  </p>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-700 dark:text-emerald-400 mr-2" />
                    Big Data Capabilities
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Process millions of reviews in minutes</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Auto-scaling infrastructure</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Real-time data processing pipelines</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Enterprise-grade security and compliance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Future improvements - Updated */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{t('futureImprovements')}</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Cpu className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('aiModels')}</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Developing and integrating specialized AI models for different industries, such as healthcare, finance, 
                hospitality, and e-commerce, with focused training for domain-specific terminology.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Network className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('enterpriseIntegration')}</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Creating seamless integrations with enterprise systems like Salesforce, HubSpot, Zendesk, 
                and Microsoft Dynamics to enable sentiment analysis directly within existing workflows.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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
