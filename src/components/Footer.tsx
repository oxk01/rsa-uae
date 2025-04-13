
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const { t, language } = useLanguage();
  
  const year = new Date().getFullYear();
  
  return (
    <footer className={`bg-blue-950 text-white py-16 ${language === 'ar' ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-semibold text-xl mb-4">RSA</h3>
            <p className="text-gray-300 mb-4">
              Advanced sentiment analysis for customer reviews using AI and Big Data.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-xl mb-4">{t('Quick Links')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-xl mb-4">{t('technology')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  BERT
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  ABSA
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  Big Data
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  AI
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-xl mb-4">{t('contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="text-gray-300">+971 50 5350403</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="text-gray-300">E4485834@live.tees.ac.uk</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="text-gray-300">Dubai, United Arab Emirates</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-blue-900 flex flex-col md:flex-row md:justify-between items-center text-gray-300 text-sm">
          <div className="mb-4 md:mb-0">
            <Link to="/terms" className="hover:text-white mr-4">
              {t('termsAndConditions')}
            </Link>
            <Link to="/privacy" className="hover:text-white">
              {t('privacyPolicy')}
            </Link>
          </div>
          <div>
            © {year} RSA. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
