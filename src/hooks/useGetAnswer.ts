
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from "@/components/ui/use-toast";

// Define a more extensive and structured knowledge base with answers to common questions
const createKnowledgeBase = (isArabic: boolean) => ({
  home: {
    title: isArabic ? 'الصفحة الرئيسية' : 'Home Page',
    content: isArabic 
      ? 'الصفحة الرئيسية تقدم نظرة عامة على التطبيق وخدماتنا لتحليل المشاعر من المراجعات.'
      : 'The home page provides an overview of our application and services for sentiment analysis of reviews.'
  },
  about: {
    title: isArabic ? 'من نحن' : 'About Us',
    content: isArabic 
      ? 'نحن شركة متخصصة في تحليل المشاعر باستخدام الذكاء الاصطناعي لمساعدة الشركات على فهم آراء العملاء بشكل أفضل.'
      : 'We are a company specialized in sentiment analysis using AI to help businesses better understand customer opinions.'
  },
  technology: {
    bert: {
      title: isArabic ? 'تقنية BERT' : 'BERT Technology',
      content: isArabic 
        ? 'نموذج BERT هو نموذج لغوي متطور طورته Google يستخدم لفهم السياق العميق للنص. يستخدم تقنية الترميز الثنائي للمحولات وهو مدرب على مجموعة بيانات نصية ضخمة، مما يجعله فعالاً جداً في تحليل المشاعر ومهام معالجة اللغة الطبيعية الأخرى.'
        : 'BERT (Bidirectional Encoder Representations from Transformers) is an advanced language model developed by Google that\'s used for deep contextual understanding of text. It uses bidirectional transformer encoding and is trained on massive text datasets, making it highly effective for sentiment analysis and other NLP tasks.',
      keywords: ['bert', 'transformer', 'google', 'language model', 'bidirectional', 'encoding']
    },
    nlp: {
      title: isArabic ? 'معالجة اللغة الطبيعية' : 'Natural Language Processing',
      content: isArabic 
        ? 'معالجة اللغة الطبيعية (NLP) هي فرع من الذكاء الاصطناعي يركز على تفاعل الكمبيوتر مع اللغة البشرية. تتضمن تقنياتنا خوارزميات متقدمة للتعلم الآلي التي تحلل النص لاستخراج المعنى والمشاعر والسياق.'
        : 'Natural Language Processing (NLP) is a branch of AI focused on computer interaction with human language. Our techniques involve advanced machine learning algorithms that analyze text to extract meaning, sentiment, and context.',
      keywords: ['nlp', 'natural language', 'processing', 'ai', 'machine learning', 'text analysis']
    },
    absa: {
      title: isArabic ? 'تحليل المشاعر القائم على الجوانب' : 'Aspect-Based Sentiment Analysis',
      content: isArabic 
        ? 'تحليل المشاعر القائم على الجوانب (ABSA) هو تقنية متقدمة تحدد المشاعر المتعلقة بجوانب محددة من المنتج أو الخدمة. على سبيل المثال، يمكننا تحديد أن العميل راضٍ عن جودة المنتج ولكنه غير راضٍ عن خدمة العملاء.'
        : 'Aspect-Based Sentiment Analysis (ABSA) is an advanced technique that identifies sentiments related to specific aspects of a product or service. For example, we can determine that a customer is satisfied with product quality but dissatisfied with customer service.',
      keywords: ['absa', 'aspect', 'sentiment', 'analysis', 'product', 'service', 'specific']
    },
    bigData: {
      title: isArabic ? 'تقنيات البيانات الضخمة' : 'Big Data Technologies',
      content: isArabic 
        ? 'تقنيات البيانات الضخمة تمكننا من معالجة ملايين المراجعات بسرعة وكفاءة. نستخدم أطر عمل مثل Hadoop وSpark لتوزيع المعالجة وتقديم تحليلات في الوقت الحقيقي تقريباً.'
        : 'Big Data technologies allow us to process millions of reviews quickly and efficiently. We use frameworks like Hadoop and Spark for distributed processing and deliver near real-time analytics.',
      keywords: ['big data', 'hadoop', 'spark', 'distributed', 'processing', 'real-time', 'analytics']
    },
    ai: {
      title: isArabic ? 'الذكاء الاصطناعي' : 'Artificial Intelligence',
      content: isArabic
        ? 'نستخدم تقنيات الذكاء الاصطناعي المتقدمة لفهم وتحليل مراجعات العملاء. تشمل نماذجنا شبكات عصبية عميقة وتعلم آلي متقدم لفهم سياق النص والمشاعر بدقة عالية.'
        : 'We use advanced AI techniques to understand and analyze customer reviews. Our models include deep neural networks and sophisticated machine learning to understand text context and sentiment with high accuracy.',
      keywords: ['ai', 'artificial intelligence', 'machine learning', 'deep learning', 'neural networks']
    }
  },
  dashboard: {
    overview: {
      title: isArabic ? 'لوحة التحكم' : 'Dashboard Overview',
      content: isArabic 
        ? 'لوحة التحكم توفر تحليلاً مرئياً للمشاعر من المراجعات، بما في ذلك الاتجاهات والكلمات الرئيسية وأمثلة المراجعات. يمكنك تخصيص العروض وتصدير التقارير بتنسيقات مختلفة.'
        : 'The dashboard provides visual analysis of sentiment from reviews, including trends, key words, and review examples. You can customize views and export reports in various formats.',
      keywords: ['dashboard', 'visualization', 'reports', 'analytics', 'metrics', 'insights']
    },
    metrics: {
      title: isArabic ? 'المقاييس والتحليلات' : 'Metrics and Analytics',
      content: isArabic
        ? 'نقدم مقاييس متعددة مثل درجة المشاعر الإجمالية، ونسب المشاعر الإيجابية/السلبية/المحايدة، والكلمات الرئيسية، والاتجاهات بمرور الوقت.'
        : 'We provide multiple metrics such as overall sentiment score, positive/negative/neutral sentiment ratios, key topics, and trends over time.',
      keywords: ['metrics', 'analytics', 'sentiment score', 'trends', 'data visualization']
    },
    reports: {
      title: isArabic ? 'التقارير والتصدير' : 'Reports and Export',
      content: isArabic
        ? 'يمكن تصدير التقارير في تنسيقات متعددة مثل PDF و Excel و CSV، مما يسمح بالتحليل الإضافي ومشاركة البيانات مع أصحاب المصلحة.'
        : 'Reports can be exported in multiple formats including PDF, Excel, and CSV, allowing for additional analysis and sharing data with stakeholders.',
      keywords: ['reports', 'export', 'pdf', 'excel', 'csv', 'data sharing']
    }
  },
  features: {
    realtime: {
      title: isArabic ? 'التحليلات في الوقت الحقيقي' : 'Real-time Analytics',
      content: isArabic
        ? 'يوفر نظامنا تحليلات في الوقت الحقيقي تقريباً، مما يتيح لك الاستجابة بسرعة للتغييرات في آراء العملاء.'
        : 'Our system provides near real-time analytics, allowing you to respond quickly to changes in customer opinions.',
      keywords: ['real-time', 'analytics', 'responsive', 'immediate', 'quick']
    },
    customization: {
      title: isArabic ? 'التخصيص' : 'Customization',
      content: isArabic
        ? 'يمكن تخصيص نظامنا ليناسب احتياجات عملك المحددة، بما في ذلك الصناعات والأسواق المستهدفة.'
        : 'Our system can be customized to fit your specific business needs, including specific industries and target markets.',
      keywords: ['customization', 'tailored', 'specific', 'industry', 'market']
    },
    integration: {
      title: isArabic ? 'التكامل' : 'Integration',
      content: isArabic
        ? 'يتكامل نظامنا مع العديد من منصات التجارة الإلكترونية وأنظمة CRM ومنصات التواصل الاجتماعي.'
        : 'Our system integrates with many e-commerce platforms, CRM systems, and social media platforms.',
      keywords: ['integration', 'e-commerce', 'crm', 'social media', 'platforms', 'api']
    },
    languages: {
      title: isArabic ? 'دعم اللغات المتعددة' : 'Multi-language Support',
      content: isArabic
        ? 'يدعم نظامنا تحليل المشاعر في لغات متعددة، بما في ذلك العربية والإنجليزية وغيرها.'
        : 'Our system supports sentiment analysis in multiple languages, including Arabic, English, and more.',
      keywords: ['languages', 'multilingual', 'arabic', 'english', 'translation']
    },
    accuracy: {
      title: isArabic ? 'دقة عالية' : 'High Accuracy',
      content: isArabic
        ? 'تحقق خوارزمياتنا دقة تتجاوز 90% في تحليل المشاعر، مما يضمن أن تكون البيانات التي تتلقاها موثوقة وقابلة للتنفيذ.'
        : 'Our algorithms achieve over 90% accuracy in sentiment analysis, ensuring that the data you receive is reliable and actionable.',
      keywords: ['accuracy', 'reliable', 'precision', 'confidence', 'performance']
    }
  },
  pricing: {
    plans: {
      title: isArabic ? 'خطط الأسعار' : 'Pricing Plans',
      content: isArabic
        ? 'نقدم خطط أسعار مرنة تناسب الشركات من جميع الأحجام، بدءاً من الشركات الناشئة وحتى المؤسسات الكبيرة.'
        : 'We offer flexible pricing plans that suit businesses of all sizes, from startups to large enterprises.',
      keywords: ['pricing', 'plans', 'subscription', 'cost', 'payment']
    },
    trial: {
      title: isArabic ? 'النسخة التجريبية المجانية' : 'Free Trial',
      content: isArabic
        ? 'نقدم فترة تجريبية مجانية لمدة 14 يوماً للمستخدمين الجدد لتجربة خدماتنا بدون مخاطر.'
        : 'We offer a 14-day free trial for new users to experience our services risk-free.',
      keywords: ['trial', 'free', '14 days', 'demo', 'test', 'evaluation']
    },
    enterprise: {
      title: isArabic ? 'حلول المؤسسات' : 'Enterprise Solutions',
      content: isArabic
        ? 'تقدم خطة المؤسسات الخاصة بنا مزايا متقدمة مثل الدعم المخصص، والتكامل المخصص، وتحليل البيانات المتقدم.'
        : 'Our enterprise plan offers advanced features like dedicated support, custom integrations, and advanced data analytics.',
      keywords: ['enterprise', 'advanced', 'custom', 'dedicated', 'business', 'corporate']
    }
  },
  general: {
    welcome: {
      content: isArabic 
        ? 'مرحبًا! أنا المساعد الافتراضي الخاص بك. كيف يمكنني مساعدتك اليوم؟'
        : 'Hello! I am your virtual assistant. How can I help you today?'
    },
    notUnderstand: {
      content: isArabic 
        ? 'آسف، لم أفهم سؤالك. هل يمكنك إعادة صياغته بطريقة مختلفة؟'
        : 'Sorry, I did not understand your question. Can you rephrase it in a different way?'
    },
    functionalities: {
      content: isArabic 
        ? 'يمكنني مساعدتك في فهم خدماتنا وتقنياتنا وكيفية استخدام النظام. يمكنني أيضاً توجيهك إلى الموارد ذات الصلة وتقديم دعم أساسي.'
        : 'I can help you understand our services, technologies, and how to use the system. I can also direct you to relevant resources and provide basic support.'
    }
  },
  services: {
    overview: {
      title: isArabic ? 'خدماتنا' : 'Our Services',
      content: isArabic 
        ? 'نقدم مجموعة من خدمات تحليل المشاعر، بما في ذلك تحليل مراجعات المنتجات، وتعليقات وسائل التواصل الاجتماعي، والاستبيانات، والمزيد. يمكننا أيضاً تقديم تحليلات مخصصة لاحتياجات عملك المحددة.'
        : 'We offer a range of sentiment analysis services, including product review analysis, social media comment analysis, survey analysis, and more. We can also provide customized analytics for your specific business needs.',
      keywords: ['services', 'sentiment analysis', 'review analysis', 'social media', 'surveys']
    },
    productReviews: {
      title: isArabic ? 'تحليل مراجعات المنتجات' : 'Product Review Analysis',
      content: isArabic
        ? 'خدمة تحليل مراجعات المنتجات تساعد الشركات على فهم ما يقوله العملاء عن منتجاتهم، وتحديد نقاط القوة والضعف، واكتشاف فرص التحسين.'
        : 'Our product review analysis service helps businesses understand what customers are saying about their products, identify strengths and weaknesses, and discover opportunities for improvement.',
      keywords: ['product reviews', 'customer feedback', 'e-commerce', 'ratings', 'improvement']
    },
    socialMedia: {
      title: isArabic ? 'تحليل وسائل التواصل الاجتماعي' : 'Social Media Analysis',
      content: isArabic
        ? 'نقدم تحليلاً شاملاً لتعليقات وسائل التواصل الاجتماعي لفهم مشاعر العملاء ومراقبة سمعة العلامة التجارية عبر جميع المنصات الرئيسية.'
        : 'We provide comprehensive analysis of social media comments to understand customer sentiment and monitor brand reputation across all major platforms.',
      keywords: ['social media', 'comments', 'facebook', 'twitter', 'instagram', 'brand monitoring']
    }
  },
  support: {
    contact: {
      title: isArabic ? 'اتصل بنا' : 'Contact Us',
      content: isArabic
        ? 'يمكنك الاتصال بفريق الدعم لدينا عبر البريد الإلكتروني على support@example.com أو عبر الهاتف على +1-234-567-8900.'
        : 'You can contact our support team via email at support@example.com or by phone at +1-234-567-8900.',
      keywords: ['contact', 'support', 'email', 'phone', 'help', 'assistance']
    },
    hours: {
      title: isArabic ? 'ساعات العمل' : 'Support Hours',
      content: isArabic
        ? 'ساعات عمل فريق الدعم لدينا هي من الاثنين إلى الجمعة، من الساعة 9 صباحاً إلى 5 مساءً بالتوقيت المركزي.'
        : 'Our support team hours are Monday through Friday, 9 AM to 5 PM Central Time.',
      keywords: ['hours', 'support', 'schedule', 'availability', 'time']
    },
    faq: {
      title: isArabic ? 'الأسئلة المتكررة' : 'FAQ',
      content: isArabic
        ? 'يمكنك العثور على إجابات للأسئلة الشائعة في قسم الأسئلة المتكررة على موقعنا.'
        : 'You can find answers to common questions in the FAQ section on our website.',
      keywords: ['faq', 'questions', 'answers', 'help', 'common questions']
    }
  },
  blog: {
    title: isArabic ? 'المدونة' : 'Blog',
    content: isArabic
      ? 'تقدم مدونتنا رؤى صناعية ودراسات حالة وأفضل الممارسات في تحليل المشاعر وتحليلات العملاء وتحسين الأعمال.'
      : 'Our blog provides industry insights, case studies, and best practices in sentiment analysis, customer analytics, and business improvement.',
    keywords: ['blog', 'insights', 'case studies', 'best practices', 'articles', 'research']
  },
  demo: {
    title: isArabic ? 'العرض التوضيحي' : 'Demo',
    content: isArabic
      ? 'يتيح لك العرض التوضيحي الخاص بنا تجربة تحليل المشاعر في الوقت الفعلي. ما عليك سوى إدخال بعض النصوص وسترى على الفور تحليلًا لمشاعرها.'
      : 'Our demo allows you to experience real-time sentiment analysis. Simply input some text and you\'ll instantly see an analysis of its sentiment.',
    keywords: ['demo', 'try', 'test', 'example', 'sentiment analysis', 'real-time']
  }
});

export const useGetAnswer = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const isArabic = currentLanguage === 'ar';
  
  // Advanced text processing: tokenize, remove stop words, normalize
  const processQuery = (query: string): string[] => {
    const stopWords = ['and', 'the', 'for', 'what', 'how', 'when', 'who', 'where', 'why', 'can', 'you', 
                      'about', 'with', 'this', 'that', 'tell', 'me', 'please', 'would', 'could', 'should'];
    
    // Lowercase and remove punctuation
    const normalizedText = query.toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .replace(/\s{2,}/g, ' ');
    
    // Tokenize and filter stop words
    const tokens = normalizedText.split(' ')
      .filter(word => word.length > 2 && !stopWords.includes(word));
    
    // Extract n-grams (phrases of 2-3 words) that might be important
    const ngrams: string[] = [];
    for (let i = 0; i < tokens.length - 1; i++) {
      ngrams.push(`${tokens[i]} ${tokens[i+1]}`);
      if (i < tokens.length - 2) {
        ngrams.push(`${tokens[i]} ${tokens[i+1]} ${tokens[i+2]}`);
      }
    }
    
    return [...tokens, ...ngrams];
  };
  
  // Improved relevance calculation with context awareness
  const calculateRelevance = (queryTerms: string[], topic: any): number => {
    if (!topic || !topic.content) return 0;
    
    const content = topic.content.toLowerCase();
    const keywords = topic.keywords || [];
    
    let score = 0;
    let keywordMatches = 0;
    let exactMatches = 0;
    
    queryTerms.forEach(term => {
      // Check content match
      if (content.includes(term)) {
        score += 1;
        
        // Bonus for exact word matches
        const regex = new RegExp('\\b' + term + '\\b', 'i');
        if (regex.test(content)) {
          score += 0.5;
          exactMatches++;
        }
      }
      
      // Check keyword match (higher weight)
      if (keywords.some((keyword: string) => keyword.includes(term) || term.includes(keyword))) {
        score += 2;
        keywordMatches++;
      }
      
      // Title match has highest weight
      if (topic.title && topic.title.toLowerCase().includes(term)) {
        score += 3;
      }
    });
    
    // Bonus for multiple matches - indicates higher relevance
    if (exactMatches > 1) score += exactMatches * 0.5;
    if (keywordMatches > 1) score += keywordMatches;
    
    return score;
  };

  // Extract all topics from the knowledge base
  const getAllTopics = (kb: any) => {
    const topics: any[] = [];
    
    // Helper function to recursively extract topics
    const extractTopics = (obj: any, parentKey = '') => {
      if (!obj) return;
      
      Object.entries(obj).forEach(([key, value]: [string, any]) => {
        if (value && typeof value === 'object') {
          if (value.content) {
            // This is a topic with content
            topics.push({
              id: parentKey ? `${parentKey}.${key}` : key,
              ...value
            });
          } else {
            // This is a category, recurse
            extractTopics(value, parentKey ? `${parentKey}.${key}` : key);
          }
        }
      });
    };
    
    extractTopics(kb);
    return topics;
  };
  
  // Get combined answer from multiple topics
  const getCombinedAnswer = (matchedTopics: any[], query: string, isArabic: boolean) => {
    if (matchedTopics.length === 0) {
      return isArabic 
        ? 'عذراً، لم أتمكن من العثور على معلومات حول استفسارك. هل يمكنك إعادة صياغة سؤالك بطريقة مختلفة؟'
        : 'Sorry, I couldn\'t find information about your query. Could you rephrase your question?';
    }

    // If we have just one topic with high relevance, return it directly
    if (matchedTopics.length === 1 && matchedTopics[0].score > 5) {
      return matchedTopics[0].content;
    }
    
    // Check for specific query types
    const lowerQuery = query.toLowerCase();
    
    // Check if this is a comparison question
    const comparisonTerms = ['versus', 'vs', 'compared to', 'difference between', 'better than'];
    const isComparison = comparisonTerms.some(term => lowerQuery.includes(term));
    
    if (isComparison && matchedTopics.length >= 2) {
      // Format a comparison answer
      const [topic1, topic2] = matchedTopics;
      return isArabic
        ? `عند مقارنة ${topic1.title} و${topic2.title}: \n\n- ${topic1.title}: ${topic1.content}\n\n- ${topic2.title}: ${topic2.content}`
        : `When comparing ${topic1.title} and ${topic2.title}: \n\n- ${topic1.title}: ${topic1.content}\n\n- ${topic2.title}: ${topic2.content}`;
    }
    
    // For general queries with multiple matches, combine the most relevant information
    if (matchedTopics.length > 1) {
      // Take top 2-3 matches maximum to avoid too much text
      const topMatches = matchedTopics.slice(0, 2); 
      
      if (isArabic) {
        return `${topMatches[0].content}\n\nبالإضافة إلى ذلك: ${topMatches[1].content}`;
      } else {
        return `${topMatches[0].content}\n\nAdditionally: ${topMatches[1].content}`;
      }
    }
    
    // Default to returning the best match
    return matchedTopics[0].content;
  };

  const getAnswer = async (question: string): Promise<string> => {
    setIsProcessing(true);
    
    try {
      // Simulate API delay for realistic feel
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const knowledgeBase = createKnowledgeBase(isArabic);
      const lowerQuestion = question.toLowerCase();

      // Handle greeting patterns directly
      const greetings = ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
      if (greetings.some(g => lowerQuestion.includes(g))) {
        return knowledgeBase.general.welcome.content;
      }
      
      // Process the query to extract meaningful terms
      const queryTerms = processQuery(question);
      
      // Get all topics from the knowledge base
      const allTopics = getAllTopics(knowledgeBase);
      
      // Calculate relevance for each topic
      const scoredTopics = allTopics.map(topic => ({
        ...topic,
        score: calculateRelevance(queryTerms, topic)
      }));
      
      // Sort by relevance score (highest first)
      scoredTopics.sort((a, b) => b.score - a.score);
      
      // Get top relevant topics (those with non-zero scores)
      const relevantTopics = scoredTopics.filter(topic => topic.score > 0);
      
      // Generate appropriate answer based on matched topics and query context
      return getCombinedAnswer(relevantTopics, question, isArabic);
    } catch (error) {
      console.error('Error processing question:', error);
      
      toast({
        title: "Error",
        description: "Failed to process your question",
        variant: "destructive"
      });
      
      return isArabic 
        ? 'عذرا، حدث خطأ أثناء معالجة سؤالك. يرجى المحاولة مرة أخرى.'
        : 'Sorry, there was an error processing your question. Please try again.';
    } finally {
      setIsProcessing(false);
    }
  };
  
  return { getAnswer, isProcessing };
};
