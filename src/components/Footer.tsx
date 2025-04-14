
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  Play, 
  Tag,
  FileText,
  Users,
  BookOpen,
  MessageSquare,
  Cookie
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const { t, language } = useLanguage();
  
  const year = new Date().getFullYear();
  
  return (
    <footer className={`bg-blue-950 text-white py-16 ${language === 'ar' ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Product Column */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Technology</span>
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  <span>Demo</span>
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
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
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Blog</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Terms of Service</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Us Column */}
          <div>
            <h3 className="font-semibold text-xl mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                <span className="text-gray-300">info@reviewwhisperai.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                <span className="text-gray-300">+971 50 5350403</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-300">123 AI Street, Tech City, TC 12345</span>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="bg-blue-900 my-8" />
        
        <div className="flex flex-col md:flex-row md:justify-between items-center text-gray-300 text-sm">
          <div className="mb-4 md:mb-0 flex items-center">
            <Link to="/" className="text-xl font-semibold text-white hover:text-gray-200 transition-colors">
              RSA
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-4 md:mb-0">
            <Link 
              to="/privacy" 
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-gray-400 text-sm">
          © {year} RSA. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
