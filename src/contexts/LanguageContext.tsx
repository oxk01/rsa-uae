
import React, { createContext, useState, useContext } from 'react';

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
  language: Language;  // Added this property
  setLanguage: (language: Language) => void;  // Added this property
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
  // Technologies
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
  // Footer
  copyright: {
    en: '© {year} All rights reserved.',
    ar: '© {year} جميع الحقوق محفوظة.',
  },
  // Navigation
  features: {
    en: 'Features',
    ar: 'الميزات',
  },
  company: {
    en: 'Company',
    ar: 'الشركة',
  },
  // Home Page
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
  // Stats Grid
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
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<TranslationStrings>({
    ...initialTranslations,
    
    // Add new translations for the chat assistant
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

  // Create alias functions for backward compatibility
  const language = currentLanguage;
  const setLanguage = setCurrentLanguage;

  const value: LanguageContextProps = {
    currentLanguage,
    setCurrentLanguage,
    language,  // Add the language property
    setLanguage,  // Add the setLanguage property
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
