import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'en' | 'ar';

interface TranslationStrings {
  [key: string]: {
    en: string;
    ar: string;
  };
}

interface LanguageContextProps {
  currentLanguage: Language;
  setCurrentLanguage: (language: Language) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

interface LanguageProviderProps {
  children: React.ReactNode;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const initialTranslations: TranslationStrings = {
  home: {
    en: 'Home',
    ar: 'الرئيسية',
  },
  about: {
    en: 'About',
    ar: 'حول',
  },
  services: {
    en: 'Services',
    ar: 'خدمات',
  },
  contact: {
    en: 'Contact',
    ar: 'اتصل بنا',
  },
  login: {
    en: 'Login',
    ar: 'تسجيل الدخول',
  },
  signup: {
    en: 'Sign Up',
    ar: 'اشتراك',
  },
  dashboard: {
    en: 'Dashboard',
    ar: 'لوحة التحكم',
  },
  demo: {
    en: 'Demo',
    ar: 'عرض',
  },
  blog: {
    en: 'Blog',
    ar: 'مدونة',
  },
  terms: {
    en: 'Terms & Conditions',
    ar: 'الشروط والأحكام',
  },
  privacy: {
    en: 'Privacy Policy',
    ar: 'سياسة الخصوصية',
  },
  pricing: {
    en: 'Pricing',
    ar: 'التسعير',
  },
  notFound: {
    en: 'Page Not Found',
    ar: 'الصفحة غير موجودة',
  },
  
  nlpTechnology: {
    en: 'Natural Language Processing',
    ar: 'معالجة اللغة الطبيعية',
  },
  absaTechnology: {
    en: 'Aspect-Based Sentiment Analysis',
    ar: 'تحليل المشاعر القائم على الجوانب',
  },
  bertTechnology: {
    en: 'BERT Transformer Models',
    ar: 'نماذج BERT المحولة',
  },
  bigDataTechnology: {
    en: 'Big Data Processing',
    ar: 'معالجة البيانات الضخمة',
  },
  
  copyright: {
    en: '© {year} All rights reserved.',
    ar: '© {year} جميع الحقوق محفوظة.',
  },
  
  features: {
    en: 'Features',
    ar: 'الميزات',
  },
  company: {
    en: 'Company',
    ar: 'الشركة',
  },
  
  heroTitle: {
    en: 'Unlock the Power of Sentiment Analysis',
    ar: 'أطلق العنان لقوة تحليل المشاعر',
  },
  heroSubtitle: {
    en: 'Analyze customer reviews with AI-powered contextual sentiment analysis',
    ar: 'تحليل مراجعات العملاء باستخدام تحليل المشاعر السياقي المدعوم بالذكاء الاصطناعي',
  },
  getStarted: {
    en: 'Get Started',
    ar: 'ابدأ الآن',
  },
  learnMore: {
    en: 'Learn More',
    ar: 'اعرف المزيد',
  },
  
  reviewsAnalyzed: {
    en: 'Reviews Analyzed',
    ar: 'المراجعات التي تم تحليلها',
  },
  positiveSentiment: {
    en: 'Positive Sentiment',
    ar: 'المشاعر الإيجابية',
  },
  negativeSentiment: {
    en: 'Negative Sentiment',
    ar: 'المشاعر السلبية',
  },
  neutralSentiment: {
    en: 'Neutral Sentiment',
    ar: 'المشاعر المحايدة',
  },
  
  sentimentAnalysis: {
    en: 'Sentiment Analysis',
    ar: 'تحليل المشاعر',
  },
  aiEthics: {
    en: 'AI Ethics',
    ar: 'أخلاقيات الذكاء الاصطناعي',
  },
  machineLearning: {
    en: 'Machine Learning',
    ar: 'التعلم الآلي',
  },
  nlp: {
    en: 'Natural Language Processing',
    ar: 'معالجة اللغة الطبيعية',
  },
  bigData: {
    en: 'Big Data',
    ar: 'البيانات الضخمة',
  },
  
  readPaper: {
    en: 'Read Paper',
    ar: 'قراءة البحث',
  },
  researchInsights: {
    en: 'Research & Insights',
    ar: 'البحوث والرؤى',
  },
  latestDevelopments: {
    en: 'Latest Developments',
    ar: 'أحدث التطورات',
  },
  ourTechnology: {
    en: 'Our Technology',
    ar: 'تقنيتنا',
  },
  researchPapers: {
    en: 'Research Papers',
    ar: 'الأوراق البحثية',
  },
  filterBy: {
    en: 'Filter by category',
    ar: 'تصفية حسب الفئة',
  },
  allCategories: {
    en: 'All Categories',
    ar: 'جميع الفئات',
  },
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<TranslationStrings>({
    ...initialTranslations,
    
    openChat: {
      en: 'Open Chat',
      ar: 'فتح المحادثة'
    },
    closeChat: {
      en: 'Close Chat',
      ar: 'إغلاق المحادثة'
    },
    virtualAssistant: {
      en: 'Virtual Assistant',
      ar: 'المساعد الافتراضي'
    },
    askMe: {
      en: 'Ask me anything about our services',
      ar: 'اسألني أي شيء عن خدماتنا'
    },
    typeMessage: {
      en: 'Type your message...',
      ar: 'اكتب رسالتك...'
    },
  });

  const t = (key: string): string => {
    return translations[key]?.[currentLanguage] || key;
  };

  const language = currentLanguage;
  const setLanguage = setCurrentLanguage;

  useEffect(() => {
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const value: LanguageContextProps = {
    currentLanguage,
    setCurrentLanguage,
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
