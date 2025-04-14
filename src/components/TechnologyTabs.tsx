
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
          <TabsTrigger value="bert">BERT Technology</TabsTrigger>
          <TabsTrigger value="absa">ABSA Technology</TabsTrigger>
          <TabsTrigger value="nlp">NLP Technology</TabsTrigger>
          <TabsTrigger value="bigdata">Big Data Technology</TabsTrigger>
        </TabsList>
        
        {/* BERT Technology Content */}
        <TabsContent value="bert" className="border rounded-lg p-6 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <Book className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            <h3 className="text-2xl font-bold">BERT (Bidirectional Encoder Representations from Transformers)</h3>
          </div>
          
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            BERT represents a breakthrough in natural language understanding, allowing AI to grasp context from both 
            directions in text.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="text-lg font-semibold">How BERT Works</h4>
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
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="text-lg font-semibold">Benefits for Sentiment Analysis</h4>
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
          
          <div className="mt-8 bg-blue-50 dark:bg-gray-700 p-5 rounded-lg">
            <h4 className="text-lg font-semibold mb-3">Technical Implementation</h4>
            <p className="text-gray-600 dark:text-gray-300">
              We fine-tune BERT models on industry-specific datasets to optimize performance for particular domains. 
              Our implementation includes careful hyperparameter tuning, domain adaptation techniques, and ensemble 
              methods to maximize accuracy.
            </p>
          </div>
        </TabsContent>
        
        {/* ABSA Technology Content */}
        <TabsContent value="absa" className="border rounded-lg p-6 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <Network className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            <h3 className="text-2xl font-bold">Aspect-Based Sentiment Analysis (ABSA)</h3>
          </div>
          
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            ABSA technology breaks down reviews to analyze sentiment at the feature or aspect level, 
            providing granular insights into what customers like or dislike about specific product features.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="text-lg font-semibold">How ABSA Works</h4>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300">
                ABSA identifies specific aspects or features mentioned in reviews, then determines the 
                sentiment associated with each aspect. This enables businesses to understand exactly which 
                features customers appreciate and which need improvement.
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="text-lg font-semibold">Benefits of ABSA</h4>
              </div>
              
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Detailed feature-level sentiment analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Identifies specific improvement areas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Competitive benchmarking by aspect</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Prioritization of product improvements</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 bg-blue-50 dark:bg-gray-700 p-5 rounded-lg">
            <h4 className="text-lg font-semibold mb-3">Technical Implementation</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Our ABSA implementation utilizes a combination of supervised learning models and rule-based 
              systems to identify aspects and sentiment polarity. We've developed custom entity extraction 
              models to recognize domain-specific features in different industries.
            </p>
          </div>
        </TabsContent>
        
        {/* NLP Technology Content */}
        <TabsContent value="nlp" className="border rounded-lg p-6 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <Book className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            <h3 className="text-2xl font-bold">Natural Language Processing (NLP)</h3>
          </div>
          
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Our advanced NLP technology understands human language in all its complexity, enabling precise analysis 
            of customer feedback across various contexts and domains.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="text-lg font-semibold">How Our NLP Works</h4>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300">
                Our NLP models use transformers architecture and contextual embeddings to understand 
                text semantics beyond simple keyword matching. We employ techniques like named entity recognition, 
                part-of-speech tagging, and dependency parsing to extract meaningful information from unstructured text.
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="text-lg font-semibold">Key NLP Features</h4>
              </div>
              
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Contextual language understanding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Sentiment detection with 93% accuracy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Multilingual support for global businesses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Integration with domain-specific knowledge</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 bg-blue-50 dark:bg-gray-700 p-5 rounded-lg">
            <h4 className="text-lg font-semibold mb-3">Technical Implementation</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Our NLP pipeline combines state-of-the-art pretrained models with custom fine-tuning for specific domains. 
              We use a modular architecture that allows us to swap components based on specific customer needs 
              and continuously update our models with the latest research advances.
            </p>
          </div>
        </TabsContent>
        
        {/* Big Data Technology Content */}
        <TabsContent value="bigdata" className="border rounded-lg p-6 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <Database className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            <h3 className="text-2xl font-bold">Big Data Processing</h3>
          </div>
          
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Our distributed data architecture enables processing millions of reviews and feedback points at enterprise scale,
            allowing businesses to extract insights from massive volumes of customer feedback.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Cloud className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="text-lg font-semibold">Our Big Data Infrastructure</h4>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300">
                We combine cloud-native technologies like Apache Spark, distributed databases, and containerized 
                microservices to handle data at any scale. This enables real-time processing of continuous customer 
                feedback streams while maintaining high performance.
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="text-lg font-semibold">Big Data Capabilities</h4>
              </div>
              
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Process millions of reviews in minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Auto-scaling infrastructure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Real-time data processing pipelines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  <span>Enterprise-grade security and compliance</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 bg-blue-50 dark:bg-gray-700 p-5 rounded-lg">
            <h4 className="text-lg font-semibold mb-3">Technical Implementation</h4>
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
