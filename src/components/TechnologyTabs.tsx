
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Code, CheckCircle, Database, Network, Cpu, Cloud } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const TechnologyTabs = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-5xl mx-auto mt-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-3">Our Technology</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Dive deeper into the specific technologies that power our sentiment analysis platform.
        </p>
      </div>
      
      <Tabs defaultValue="bert" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger 
            value="bert" 
            className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800 data-[state=active]:shadow-sm dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-100"
          >
            BERT Technology
          </TabsTrigger>
          <TabsTrigger 
            value="absa" 
            className="data-[state=active]:bg-teal-100 data-[state=active]:text-teal-800 data-[state=active]:shadow-sm dark:data-[state=active]:bg-teal-900 dark:data-[state=active]:text-teal-100"
          >
            ABSA Technology
          </TabsTrigger>
          <TabsTrigger 
            value="nlp" 
            className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800 data-[state=active]:shadow-sm dark:data-[state=active]:bg-amber-900 dark:data-[state=active]:text-amber-100"
          >
            NLP Technology
          </TabsTrigger>
          <TabsTrigger 
            value="bigdata" 
            className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-800 data-[state=active]:shadow-sm dark:data-[state=active]:bg-indigo-900 dark:data-[state=active]:text-indigo-100"
          >
            Big Data Technology
          </TabsTrigger>
        </TabsList>
        
        {/* BERT Technology Content */}
        <TabsContent value="bert" className="border border-blue-200 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 dark:border-blue-900">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-800">
              <Book className="h-7 w-7 text-blue-600 dark:text-blue-300" />
            </div>
            <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300">BERT (Bidirectional Encoder Representations from Transformers)</h3>
          </div>
          
          <p className="mb-6 text-gray-700 dark:text-gray-300 border-l-4 border-blue-400 pl-4 italic">
            BERT represents a breakthrough in natural language understanding, allowing AI to grasp context from both 
            directions in text.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900">
              <div className="flex items-center gap-2 mb-3">
                <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-300">How BERT Works</h4>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                BERT is pre-trained on a massive corpus of text to understand language in context. 
                Unlike previous models that read text sequentially, BERT reads entire sentences 
                simultaneously, understanding words based on their surroundings.
              </p>
              
              <p className="text-gray-600 dark:text-gray-300">
                This bidirectional approach allows BERT to capture nuanced meanings, handle ambiguity, 
                and understand complex linguistic phenomena like sarcasm and implicit sentiment.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-blue-100 dark:border-blue-900">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Benefits for Sentiment Analysis</h4>
              </div>
              
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Superior contextual understanding of reviews</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Accurate detection of implicit sentiment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Recognition of domain-specific language</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Handling of complex sentence structures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Adaptability to different review styles</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/30 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">Technical Implementation</h4>
            <p className="text-gray-600 dark:text-gray-300">
              We fine-tune BERT models on industry-specific datasets to optimize performance for particular domains. 
              Our implementation includes careful hyperparameter tuning, domain adaptation techniques, and ensemble 
              methods to maximize accuracy.
            </p>
          </div>
        </TabsContent>
        
        {/* ABSA Technology Content */}
        <TabsContent value="absa" className="border border-teal-200 rounded-lg p-6 bg-gradient-to-br from-teal-50 to-white dark:from-gray-800 dark:to-gray-900 dark:border-teal-900">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-teal-100 dark:bg-teal-800">
              <Network className="h-7 w-7 text-teal-600 dark:text-teal-300" />
            </div>
            <h3 className="text-2xl font-bold text-teal-800 dark:text-teal-300">Aspect-Based Sentiment Analysis (ABSA)</h3>
          </div>
          
          <p className="mb-6 text-gray-700 dark:text-gray-300 border-l-4 border-teal-400 pl-4 italic">
            ABSA technology breaks down reviews to analyze sentiment at the feature or aspect level, 
            providing granular insights into what customers like or dislike about specific product features.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-teal-100 dark:border-teal-900">
              <div className="flex items-center gap-2 mb-3">
                <Code className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                <h4 className="text-lg font-semibold text-teal-800 dark:text-teal-300">How ABSA Works</h4>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300">
                ABSA identifies specific aspects or features mentioned in reviews, then determines the 
                sentiment associated with each aspect. This enables businesses to understand exactly which 
                features customers appreciate and which need improvement.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-teal-100 dark:border-teal-900">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                <h4 className="text-lg font-semibold text-teal-800 dark:text-teal-300">Benefits of ABSA</h4>
              </div>
              
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">•</span>
                  <span>Detailed feature-level sentiment analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">•</span>
                  <span>Identifies specific improvement areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">•</span>
                  <span>Competitive benchmarking by aspect</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 dark:text-teal-400 font-bold">•</span>
                  <span>Prioritization of product improvements</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 bg-teal-50 dark:bg-teal-900/30 p-5 rounded-lg border border-teal-200 dark:border-teal-800">
            <h4 className="text-lg font-semibold text-teal-800 dark:text-teal-300 mb-3">Technical Implementation</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Our ABSA implementation utilizes a combination of supervised learning models and rule-based 
              systems to identify aspects and sentiment polarity. We've developed custom entity extraction 
              models to recognize domain-specific features in different industries.
            </p>
          </div>
        </TabsContent>
        
        {/* NLP Technology Content */}
        <TabsContent value="nlp" className="border border-amber-200 rounded-lg p-6 bg-gradient-to-br from-amber-50 to-white dark:from-gray-800 dark:to-gray-900 dark:border-amber-900">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-800">
              <Book className="h-7 w-7 text-amber-600 dark:text-amber-300" />
            </div>
            <h3 className="text-2xl font-bold text-amber-800 dark:text-amber-300">Natural Language Processing (NLP)</h3>
          </div>
          
          <p className="mb-6 text-gray-700 dark:text-gray-300 border-l-4 border-amber-400 pl-4 italic">
            Our advanced NLP technology understands human language in all its complexity, enabling precise analysis 
            of customer feedback across various contexts and domains.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-amber-100 dark:border-amber-900">
              <div className="flex items-center gap-2 mb-3">
                <Code className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <h4 className="text-lg font-semibold text-amber-800 dark:text-amber-300">How Our NLP Works</h4>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300">
                Our NLP models use transformers architecture and contextual embeddings to understand 
                text semantics beyond simple keyword matching. We employ techniques like named entity recognition, 
                part-of-speech tagging, and dependency parsing to extract meaningful information from unstructured text.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-amber-100 dark:border-amber-900">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <h4 className="text-lg font-semibold text-amber-800 dark:text-amber-300">Key NLP Features</h4>
              </div>
              
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                  <span>Contextual language understanding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                  <span>Sentiment detection with 93% accuracy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                  <span>Multilingual support for global businesses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                  <span>Integration with domain-specific knowledge</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 bg-amber-50 dark:bg-amber-900/30 p-5 rounded-lg border border-amber-200 dark:border-amber-800">
            <h4 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-3">Technical Implementation</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Our NLP pipeline combines state-of-the-art pretrained models with custom fine-tuning for specific domains. 
              We use a modular architecture that allows us to swap components based on specific customer needs 
              and continuously update our models with the latest research advances.
            </p>
          </div>
        </TabsContent>
        
        {/* Big Data Technology Content */}
        <TabsContent value="bigdata" className="border border-indigo-200 rounded-lg p-6 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 dark:border-indigo-900">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-800">
              <Database className="h-7 w-7 text-indigo-600 dark:text-indigo-300" />
            </div>
            <h3 className="text-2xl font-bold text-indigo-800 dark:text-indigo-300">Big Data Processing</h3>
          </div>
          
          <p className="mb-6 text-gray-700 dark:text-gray-300 border-l-4 border-indigo-400 pl-4 italic">
            Our distributed data architecture enables processing millions of reviews and feedback points at enterprise scale,
            allowing businesses to extract insights from massive volumes of customer feedback.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-indigo-100 dark:border-indigo-900">
              <div className="flex items-center gap-2 mb-3">
                <Cloud className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h4 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300">Our Big Data Infrastructure</h4>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300">
                We combine cloud-native technologies like Apache Spark, distributed databases, and containerized 
                microservices to handle data at any scale. This enables real-time processing of continuous customer 
                feedback streams while maintaining high performance.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-indigo-100 dark:border-indigo-900">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <h4 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300">Big Data Capabilities</h4>
              </div>
              
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">•</span>
                  <span>Process millions of reviews in minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">•</span>
                  <span>Auto-scaling infrastructure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">•</span>
                  <span>Real-time data processing pipelines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">•</span>
                  <span>Enterprise-grade security and compliance</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 bg-indigo-50 dark:bg-indigo-900/30 p-5 rounded-lg border border-indigo-200 dark:border-indigo-800">
            <h4 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-3">Technical Implementation</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Our big data platform is built on Kubernetes for orchestration, with Apache Kafka for 
              streaming data ingestion, Spark for distributed processing, and a combination of SQL and NoSQL 
              databases optimized for different query patterns and data types.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
