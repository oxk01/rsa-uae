
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  FileText,
  Play,
  Tag,
  Users,
  BookOpen,
  MessageSquare,
  Mail
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const { t, language } = useLanguage();
  
  const year = new Date().getFullYear();
  
  return (
    <footer className={`bg-blue-950 text-white py-16 ${language === 'ar' ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {/* Product Column */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors flex items-center justify-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Technology</span>
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-gray-300 hover:text-white transition-colors flex items-center justify-center gap-2">
                  <Play className="h-4 w-4" />
                  <span>Demo</span>
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors flex items-center justify-center gap-2">
                  <Tag className="h-4 w-4" />
                  <span>Pricing</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors flex items-center justify-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors flex items-center justify-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Blog</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors flex items-center justify-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Contact Sales</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors flex items-center justify-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors flex items-center justify-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Terms of Service</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="bg-blue-900 my-8" />
        
        <div className="flex flex-col items-center text-center text-gray-300 text-sm">
          <div className="flex items-center mb-4">
            <Link to="/" className="text-xl font-semibold text-white hover:text-gray-200 transition-colors">
              RSA
            </Link>
          </div>
          
          <div className="flex space-x-6 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          
          <div className="mt-4">
            © {year} RSA. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
