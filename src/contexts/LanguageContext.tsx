
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'ar';

// Define the translations interface
export interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

// Common translations
export const translations: Translations = {
  // Navigation
  home: { en: 'Home', ar: 'الرئيسية' },
  dashboard: { en: 'Dashboard', ar: 'لوحة التحكم' },
  demo: { en: 'Demo', ar: 'تجريبي' },
  blog: { en: 'Blog', ar: 'المدونة' },
  contact: { en: 'Contact', ar: 'اتصل بنا' },
  solutions: { en: 'Solutions', ar: 'الحلول' },
  login: { en: 'Log in', ar: 'تسجيل الدخول' },
  signup: { en: 'Sign Up', ar: 'إنشاء حساب' },
  logout: { en: 'Logout', ar: 'تسجيل الخروج' },
  pricing: { en: 'Pricing', ar: 'التسعير' },
  
  // Dashboard Charts
  sentimentTrend: { en: 'Sentiment Trend', ar: 'اتجاه المشاعر' },
  sentimentDistribution: { en: 'Sentiment Distribution', ar: 'توزيع المشاعر' },
  reviewSources: { en: 'Review Sources', ar: 'مصادر التقييمات' },
  sentimentOverTime: { en: 'Sentiment Over Time', ar: 'المشاعر عبر الزمن' },
  
  // Demo page
  inputReview: { en: 'Input Review', ar: 'إدخال التقييم' },
  reviewText: { en: 'Review Text', ar: 'نص التقييم' },
  enterReview: { en: 'Enter a review to analyze sentiment...', ar: 'أدخل تقييمًا لتحليل المشاعر...' },
  or: { en: 'OR', ar: 'أو' },
  uploadFile: { en: 'Upload CSV/Excel File', ar: 'تحميل ملف CSV/Excel' },
  chooseFile: { en: 'Choose file', ar: 'اختر ملفًا' },
  uploadDescription: { en: 'Upload a CSV or Excel file containing multiple reviews', ar: 'قم بتحميل ملف CSV أو Excel يحتوي على مراجعات متعددة' },
  analyze: { en: 'Analyze', ar: 'تحليل' },
  analyzing: { en: 'Analyzing...', ar: 'جاري التحليل...' },
  reset: { en: 'Reset', ar: 'إعادة تعيين' },
  
  // Results
  results: { en: 'Results', ar: 'النتائج' },
  overallSentiment: { en: 'OVERALL SENTIMENT', ar: 'التقييم العام' },
  confidence: { en: 'confidence', ar: 'الثقة' },
  positive: { en: 'Positive', ar: 'إيجابي' },
  negative: { en: 'Negative', ar: 'سلبي' },
  neutral: { en: 'Neutral', ar: 'محايد' },
  fileAnalysis: { en: 'FILE ANALYSIS', ar: 'تحليل الملف' },
  totalReviews: { en: 'Total Reviews', ar: 'إجمالي التقييمات' },
  keyAspects: { en: 'KEY ASPECTS', ar: 'الجوانب الرئيسية' },
  analyzedText: { en: 'ANALYZED TEXT', ar: 'النص المُحلل' },
  saveToDashboard: { en: 'Save to Dashboard', ar: 'حفظ في لوحة التحكم' },
  saving: { en: 'Saving...', ar: 'جاري الحفظ...' },
  
  // Dashboard
  savedAnalyses: { en: 'Saved Analyses', ar: 'التحليلات المحفوظة' },
  analyzeNewReviews: { en: 'Analyze New Reviews', ar: 'تحليل مراجعات جديدة' },
  viewFullReport: { en: 'View Full Report', ar: 'عرض التقرير الكامل' },
  
  // Other
  pricingPlans: { en: 'Pricing Plans', ar: 'خطط التسعير' },
  termsAndConditions: { en: 'Terms & Conditions', ar: 'الشروط والأحكام' },
  privacyPolicy: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  
  // Technology section
  nlpTechnology: { en: 'NLP Technology', ar: 'تقنية معالجة اللغة الطبيعية' },
  absaTechnology: { en: 'ABSA Technology', ar: 'تقنية تحليل المشاعر القائم على الجوانب' },
  bertTechnology: { en: 'BERT Technology', ar: 'تقنية نموذج BERT' },
  bigDataTechnology: { en: 'Big Data Technology', ar: 'تقنية البيانات الضخمة' },
  
  // Future improvements
  futureImprovements: { en: 'Future Improvements', ar: 'التحسينات المستقبلية' },
  aiModels: { en: 'Advanced AI Models', ar: 'نماذج الذكاء الاصطناعي المتقدمة' },
  enterpriseIntegration: { en: 'Enterprise Integration', ar: 'تكامل المؤسسات' },
  customModels: { en: 'Custom Industry Models', ar: 'نماذج صناعية مخصصة' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Check localStorage or default to English
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('rsa_language');
    return (savedLang as Language) || 'en';
  });

  // Update language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('rsa_language', lang);
    // If we switch to Arabic, change the dir attribute to rtl
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    // Also add a class to the html element for additional styling
    if (lang === 'ar') {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  // Set RTL direction for Arabic on mount
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    // Also add a class to the html element for additional styling
    if (language === 'ar') {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
