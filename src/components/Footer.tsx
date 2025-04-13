
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, language } = useLanguage();
  
  const year = new Date().getFullYear();
  
  return (
    <footer className={`bg-gray-100 py-8 border-t border-gray-200 ${language === 'ar' ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">RSA</h3>
            <p className="text-gray-600">
              Review Sentiment Analysis - Understand your customers' feedback with AI-powered sentiment analysis.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('solutions')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/demo" className="text-gray-600 hover:text-blue-600 transition-colors">
                  {t('demo')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                  {t('dashboard')}
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
                  {t('pricingPlans')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('company')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
                  {t('termsAndConditions')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
                  {t('privacyPolicy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          © {year} RSA. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
