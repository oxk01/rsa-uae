
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// Define a knowledge base with answers to common questions
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
      ? 'نموذج BERT هو نموذج لغوي متطور يستخدم لفهم السياق العميق للنص، مما يحسن من دقة تحليل المشاعر.'
      : 'BERT is an advanced language model used for deep contextual understanding of text, improving sentiment analysis accuracy.',
    nlp: isArabic 
      ? 'معالجة اللغة الطبيعية (NLP) هي تقنية تمكن الحواسيب من فهم وتحليل اللغة البشرية.'
      : 'Natural Language Processing (NLP) is a technology that enables computers to understand and analyze human language.',
    absa: isArabic 
      ? 'تحليل المشاعر القائم على الجوانب (ABSA) يحدد مشاعر محددة تتعلق بجوانب معينة من المنتج أو الخدمة.'
      : 'Aspect-Based Sentiment Analysis (ABSA) identifies specific sentiments related to particular aspects of a product or service.',
    bigData: isArabic 
      ? 'تقنيات البيانات الضخمة تمكننا من تحليل ملايين المراجعات بسرعة وكفاءة.'
      : 'Big Data technologies allow us to analyze millions of reviews quickly and efficiently.'
  },
  dashboard: {
    overview: isArabic 
      ? 'لوحة التحكم توفر تحليلاً مرئياً للمشاعر من المراجعات، بما في ذلك الاتجاهات والكلمات الرئيسية وأمثلة المراجعات.'
      : 'The dashboard provides visual analysis of sentiment from reviews, including trends, key words, and review examples.'
  },
  general: {
    welcome: isArabic 
      ? 'مرحبًا! أنا المساعد الافتراضي الخاص بك. كيف يمكنني مساعدتك؟'
      : 'Hello! I am your virtual assistant. How can I help you?',
    notUnderstand: isArabic 
      ? 'آسف، لم أفهم سؤالك. هل يمكنك إعادة صياغته؟'
      : 'Sorry, I did not understand your question. Can you rephrase it?',
    functionalities: isArabic 
      ? 'يمكنني مساعدتك في فهم خدماتنا، والتكنولوجيا التي نستخدمها، وكيفية استخدام النظام.'
      : 'I can help you understand our services, the technology we use, and how to use the system.'
  },
  services: {
    content: isArabic 
      ? 'نقدم خدمات تحليل المشاعر للمراجعات، وتحليل الاتجاهات، واستخراج الكلمات الرئيسية، والمزيد.'
      : 'We offer sentiment analysis services for reviews, trend analysis, keyword extraction, and more.'
  },
});

export const useGetAnswer = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage === 'ar';
  
  const getAnswer = async (question: string): Promise<string> => {
    setIsProcessing(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const knowledgeBase = createKnowledgeBase(isArabic);
      const lowerQuestion = question.toLowerCase();
      
      // Process the question and find relevant answers
      if (lowerQuestion.includes('bert') || lowerQuestion.includes('transformer')) {
        return knowledgeBase.technology.bert;
      } 
      else if (lowerQuestion.includes('nlp') || lowerQuestion.includes('natural language')) {
        return knowledgeBase.technology.nlp;
      } 
      else if (lowerQuestion.includes('absa') || lowerQuestion.includes('aspect')) {
        return knowledgeBase.technology.absa;
      }
      else if (lowerQuestion.includes('big data') || lowerQuestion.includes('data processing')) {
        return knowledgeBase.technology.bigData;
      }
      else if (lowerQuestion.includes('dashboard') || lowerQuestion.includes('analytics')) {
        return knowledgeBase.dashboard.overview;
      }
      else if (lowerQuestion.includes('home') || lowerQuestion.includes('main page')) {
        return knowledgeBase.home.content;
      }
      else if (lowerQuestion.includes('about') || lowerQuestion.includes('who are you')) {
        return knowledgeBase.about.content;
      }
      else if (lowerQuestion.includes('services') || lowerQuestion.includes('what do you offer')) {
        return knowledgeBase.services.content;
      }
      else if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('hey')) {
        return knowledgeBase.general.welcome;
      }
      else if (lowerQuestion.includes('help') || lowerQuestion.includes('can you do')) {
        return knowledgeBase.general.functionalities;
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
