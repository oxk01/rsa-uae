
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// Define a more extensive knowledge base with answers to common questions
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
    bert: isArabic 
      ? 'نموذج BERT هو نموذج لغوي متطور طورته Google يستخدم لفهم السياق العميق للنص. يستخدم تقنية الترميز الثنائي للمحولات وهو مدرب على مجموعة بيانات نصية ضخمة، مما يجعله فعالاً جداً في تحليل المشاعر ومهام معالجة اللغة الطبيعية الأخرى.'
      : 'BERT (Bidirectional Encoder Representations from Transformers) is an advanced language model developed by Google that\'s used for deep contextual understanding of text. It uses bidirectional transformer encoding and is trained on massive text datasets, making it highly effective for sentiment analysis and other NLP tasks.',
    nlp: isArabic 
      ? 'معالجة اللغة الطبيعية (NLP) هي فرع من الذكاء الاصطناعي يركز على تفاعل الكمبيوتر مع اللغة البشرية. تتضمن تقنياتنا خوارزميات متقدمة للتعلم الآلي التي تحلل النص لاستخراج المعنى والمشاعر والسياق.'
      : 'Natural Language Processing (NLP) is a branch of AI focused on computer interaction with human language. Our techniques involve advanced machine learning algorithms that analyze text to extract meaning, sentiment, and context.',
    absa: isArabic 
      ? 'تحليل المشاعر القائم على الجوانب (ABSA) هو تقنية متقدمة تحدد المشاعر المتعلقة بجوانب محددة من المنتج أو الخدمة. على سبيل المثال، يمكننا تحديد أن العميل راضٍ عن جودة المنتج ولكنه غير راضٍ عن خدمة العملاء.'
      : 'Aspect-Based Sentiment Analysis (ABSA) is an advanced technique that identifies sentiments related to specific aspects of a product or service. For example, we can determine that a customer is satisfied with product quality but dissatisfied with customer service.',
    bigData: isArabic 
      ? 'تقنيات البيانات الضخمة تمكننا من معالجة ملايين المراجعات بسرعة وكفاءة. نستخدم أطر عمل مثل Hadoop وSpark لتوزيع المعالجة وتقديم تحليلات في الوقت الحقيقي تقريباً.'
      : 'Big Data technologies allow us to process millions of reviews quickly and efficiently. We use frameworks like Hadoop and Spark for distributed processing and deliver near real-time analytics.'
  },
  dashboard: {
    overview: isArabic 
      ? 'لوحة التحكم توفر تحليلاً مرئياً للمشاعر من المراجعات، بما في ذلك الاتجاهات والكلمات الرئيسية وأمثلة المراجعات. يمكنك تخصيص العروض وتصدير التقارير بتنسيقات مختلفة.'
      : 'The dashboard provides visual analysis of sentiment from reviews, including trends, key words, and review examples. You can customize views and export reports in various formats.',
    metrics: isArabic
      ? 'نقدم مقاييس متعددة مثل درجة المشاعر الإجمالية، ونسب المشاعر الإيجابية/السلبية/المحايدة، والكلمات الرئيسية، والاتجاهات بمرور الوقت.'
      : 'We provide multiple metrics such as overall sentiment score, positive/negative/neutral sentiment ratios, key topics, and trends over time.'
  },
  features: {
    realtime: isArabic
      ? 'يوفر نظامنا تحليلات في الوقت الحقيقي تقريباً، مما يتيح لك الاستجابة بسرعة للتغييرات في آراء العملاء.'
      : 'Our system provides near real-time analytics, allowing you to respond quickly to changes in customer opinions.',
    customization: isArabic
      ? 'يمكن تخصيص نظامنا ليناسب احتياجات عملك المحددة، بما في ذلك الصناعات والأسواق المستهدفة.'
      : 'Our system can be customized to fit your specific business needs, including specific industries and target markets.',
    integration: isArabic
      ? 'يتكامل نظامنا مع العديد من منصات التجارة الإلكترونية وأنظمة CRM ومنصات التواصل الاجتماعي.'
      : 'Our system integrates with many e-commerce platforms, CRM systems, and social media platforms.',
    languages: isArabic
      ? 'يدعم نظامنا تحليل المشاعر في لغات متعددة، بما في ذلك العربية والإنجليزية وغيرها.'
      : 'Our system supports sentiment analysis in multiple languages, including Arabic, English, and more.'
  },
  pricing: {
    plans: isArabic
      ? 'نقدم خطط أسعار مرنة تناسب الشركات من جميع الأحجام، بدءاً من الشركات الناشئة وحتى المؤسسات الكبيرة.'
      : 'We offer flexible pricing plans that suit businesses of all sizes, from startups to large enterprises.',
    trial: isArabic
      ? 'نقدم فترة تجريبية مجانية لمدة 14 يوماً للمستخدمين الجدد لتجربة خدماتنا بدون مخاطر.'
      : 'We offer a 14-day free trial for new users to experience our services risk-free.'
  },
  general: {
    welcome: isArabic 
      ? 'مرحبًا! أنا المساعد الافتراضي الخاص بك. كيف يمكنني مساعدتك اليوم؟'
      : 'Hello! I am your virtual assistant. How can I help you today?',
    notUnderstand: isArabic 
      ? 'آسف، لم أفهم سؤالك. هل يمكنك إعادة صياغته بطريقة مختلفة؟'
      : 'Sorry, I did not understand your question. Can you rephrase it in a different way?',
    functionalities: isArabic 
      ? 'يمكنني مساعدتك في فهم خدماتنا وتقنياتنا وكيفية استخدام النظام. يمكنني أيضاً توجيهك إلى الموارد ذات الصلة وتقديم دعم أساسي.'
      : 'I can help you understand our services, technologies, and how to use the system. I can also direct you to relevant resources and provide basic support.'
  },
  services: {
    content: isArabic 
      ? 'نقدم مجموعة من خدمات تحليل المشاعر، بما في ذلك تحليل مراجعات المنتجات، وتعليقات وسائل التواصل الاجتماعي، والاستبيانات، والمزيد. يمكننا أيضاً تقديم تحليلات مخصصة لاحتياجات عملك المحددة.'
      : 'We offer a range of sentiment analysis services, including product review analysis, social media comment analysis, survey analysis, and more. We can also provide customized analytics for your specific business needs.'
  },
  support: {
    contact: isArabic
      ? 'يمكنك الاتصال بفريق الدعم لدينا عبر البريد الإلكتروني على support@example.com أو عبر الهاتف على +1-234-567-8900.'
      : 'You can contact our support team via email at support@example.com or by phone at +1-234-567-8900.',
    hours: isArabic
      ? 'ساعات عمل فريق الدعم لدينا هي من الاثنين إلى الجمعة، من الساعة 9 صباحاً إلى 5 مساءً بالتوقيت المركزي.'
      : 'Our support team hours are Monday through Friday, 9 AM to 5 PM Central Time.',
    faq: isArabic
      ? 'يمكنك العثور على إجابات للأسئلة الشائعة في قسم الأسئلة المتكررة على موقعنا.'
      : 'You can find answers to common questions in the FAQ section on our website.'
  }
});

export const useGetAnswer = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage === 'ar';
  
  // Process the query to extract keywords and topics
  const processQuery = (query: string): string[] => {
    const lowerQuery = query.toLowerCase();
    const words = lowerQuery.split(/\s+/);
    
    // Extract key terms that might indicate topic
    return words.filter(word => 
      word.length > 2 && 
      !['and', 'the', 'for', 'what', 'how', 'when', 'who', 'where', 'why', 'can', 'you', 'about', 'with', 'this', 'that'].includes(word)
    );
  };
  
  // Calculate relevance score between query keywords and potential answer
  const calculateRelevance = (queryKeywords: string[], potentialAnswer: string): number => {
    if (!potentialAnswer) return 0;
    const lowerAnswer = potentialAnswer.toLowerCase();
    
    let score = 0;
    queryKeywords.forEach(keyword => {
      if (lowerAnswer.includes(keyword)) {
        score += 1;
        
        // Bonus points for exact keyword matches
        const regex = new RegExp('\\b' + keyword + '\\b', 'i');
        if (regex.test(lowerAnswer)) {
          score += 0.5;
        }
      }
    });
    
    return score;
  };
  
  const getAnswer = async (question: string): Promise<string> => {
    setIsProcessing(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const knowledgeBase = createKnowledgeBase(isArabic);
      const lowerQuestion = question.toLowerCase();
      
      // Direct pattern matching for common questions
      if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('hey')) {
        return knowledgeBase.general.welcome;
      }
      
      // Extract keywords from the question
      const keywords = processQuery(question);
      
      // Map of all possible answers with their sections
      const possibleAnswers = [
        { topic: 'bert', content: knowledgeBase.technology.bert },
        { topic: 'nlp', content: knowledgeBase.technology.nlp },
        { topic: 'absa', content: knowledgeBase.technology.absa },
        { topic: 'big data', content: knowledgeBase.technology.bigData },
        { topic: 'dashboard', content: knowledgeBase.dashboard.overview },
        { topic: 'metrics', content: knowledgeBase.dashboard.metrics },
        { topic: 'home', content: knowledgeBase.home.content },
        { topic: 'about', content: knowledgeBase.about.content },
        { topic: 'services', content: knowledgeBase.services.content },
        { topic: 'realtime', content: knowledgeBase.features.realtime },
        { topic: 'customization', content: knowledgeBase.features.customization },
        { topic: 'integration', content: knowledgeBase.features.integration },
        { topic: 'languages', content: knowledgeBase.features.languages },
        { topic: 'pricing', content: knowledgeBase.pricing.plans },
        { topic: 'trial', content: knowledgeBase.pricing.trial },
        { topic: 'contact', content: knowledgeBase.support.contact },
        { topic: 'hours', content: knowledgeBase.support.hours },
        { topic: 'faq', content: knowledgeBase.support.faq },
        { topic: 'help', content: knowledgeBase.general.functionalities }
      ];
      
      // Some direct topic matches that have priority
      if (lowerQuestion.includes('bert') || lowerQuestion.includes('transformer')) {
        return knowledgeBase.technology.bert;
      } 
      else if (lowerQuestion.includes('nlp') || lowerQuestion.includes('natural language')) {
        return knowledgeBase.technology.nlp;
      } 
      else if (lowerQuestion.includes('absa') || lowerQuestion.includes('aspect')) {
        return knowledgeBase.technology.absa;
      }
      else if (lowerQuestion.includes('big data')) {
        return knowledgeBase.technology.bigData;
      }
      
      // Calculate relevance scores for each possible answer
      const scoredAnswers = possibleAnswers.map(answer => ({
        ...answer,
        score: calculateRelevance(keywords, answer.content)
      }));
      
      // Sort by relevance score (highest first)
      scoredAnswers.sort((a, b) => b.score - a.score);
      
      // If we have a reasonably good match, return it
      if (scoredAnswers[0]?.score > 0.5) {
        return scoredAnswers[0].content;
      }
      
      // Fallback for general questions
      if (lowerQuestion.includes('what') && lowerQuestion.includes('do') && lowerQuestion.includes('you')) {
        return knowledgeBase.general.functionalities;
      }
      else if (lowerQuestion.includes('contact') || lowerQuestion.includes('support') || lowerQuestion.includes('help')) {
        return knowledgeBase.support.contact;
      }
      
      // Default response if no pattern matched
      return knowledgeBase.general.notUnderstand;
    } catch (error) {
      console.error('Error processing question:', error);
      return isArabic 
        ? 'عذرا، حدث خطأ أثناء معالجة سؤالك. يرجى المحاولة مرة أخرى.'
        : 'Sorry, there was an error processing your question. Please try again.';
    } finally {
      setIsProcessing(false);
    }
  };
  
  return { getAnswer, isProcessing };
};
