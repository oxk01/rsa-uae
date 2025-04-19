import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Linkedin, 
  Instagram,
  FileText,
  Play,
  Tag,
  Users,
  BookOpen,
  MessageSquare,
  Mail,
  ArrowRight,
  Send,
  Shield,
  BookText,
  LifeBuoy
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const Footer = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const location = useLocation();
  const isBlogPage = location.pathname === '/blog';
  
  const year = new Date().getFullYear();
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail('');
    }
  };
  
  return (
    <footer className={`relative ${language === 'ar' ? 'rtl' : ''}`}>
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-background to-transparent"></div>
      
      <div className="bg-gradient-to-br from-blue-950 to-slate-900 pt-24 pb-8 text-white relative overflow-hidden">
        <div className="absolute top-1/4 -left-24 w-48 h-48 rounded-full bg-blue-700/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-24 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {!isBlogPage && (
            <div className="max-w-3xl mx-auto mb-16 bg-blue-900 p-8 rounded-xl shadow-lg relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-semibold mb-2">Stay Updated</h3>
                  <p className="text-blue-100">Subscribe to our newsletter for the latest updates and insights</p>
                </div>
                <form onSubmit={handleSubscribe} className="flex w-full max-w-sm space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
                  />
                  <Button type="submit" className="bg-white text-blue-900 hover:bg-blue-100 flex items-center">
                    <Send className="h-4 w-4 mr-2" />
                    <span>Subscribe</span>
                  </Button>
                </form>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="flex flex-col items-start">
              <Link to="/" className="flex items-center mb-6">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">RSA</span>
              </Link>
              <p className="text-blue-200 mb-6 max-w-xs">
                We help businesses leverage AI and data analytics to make informed decisions and stay ahead of the competition.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/abdallah-rok-1b0606238" target="_blank" rel="noopener noreferrer" 
                   className="bg-blue-900/30 p-2 rounded-full hover:bg-blue-800/50 transition-colors">
                  <Linkedin className="h-5 w-5 text-blue-200" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                   className="bg-blue-900/30 p-2 rounded-full hover:bg-blue-800/50 transition-colors">
                  <Instagram className="h-5 w-5 text-blue-200" />
                </a>
              </div>
            </div>
            
            <div className="flex flex-col items-start">
              <h3 className="font-semibold text-xl mb-6 text-white relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-12 after:bg-blue-500 after:rounded-full">
                Product
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/about" 
                    className="text-blue-200 hover:text-white transition-colors flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-900/20 rounded-md group-hover:bg-blue-800/40 transition-colors">
                      <FileText className="h-4 w-4" />
                    </div>
                    <span>Technology</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 -ml-1 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/demo" 
                    className="text-blue-200 hover:text-white transition-colors flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-900/20 rounded-md group-hover:bg-blue-800/40 transition-colors">
                      <Play className="h-4 w-4" />
                    </div>
                    <span>Demo</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 -ml-1 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/pricing" 
                    className="text-blue-200 hover:text-white transition-colors flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-900/20 rounded-md group-hover:bg-blue-800/40 transition-colors">
                      <Tag className="h-4 w-4" />
                    </div>
                    <span>Pricing</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 -ml-1 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col items-start">
              <h3 className="font-semibold text-xl mb-6 text-white relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-12 after:bg-blue-500 after:rounded-full">
                Company
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/about" 
                    className="text-blue-200 hover:text-white transition-colors flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-900/20 rounded-md group-hover:bg-blue-800/40 transition-colors">
                      <Users className="h-4 w-4" />
                    </div>
                    <span>About Us</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 -ml-1 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/blog" 
                    className="text-blue-200 hover:text-white transition-colors flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-900/20 rounded-md group-hover:bg-blue-800/40 transition-colors">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <span>Blog</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 -ml-1 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="text-blue-200 hover:text-white transition-colors flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-900/20 rounded-md group-hover:bg-blue-800/40 transition-colors">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <span>Contact</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 -ml-1 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="text-blue-200 hover:text-white transition-colors flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-900/20 rounded-md group-hover:bg-blue-800/40 transition-colors">
                      <Mail className="h-4 w-4" />
                    </div>
                    <span>Contact Sales</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 -ml-1 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col items-start">
              <h3 className="font-semibold text-xl mb-6 text-white relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-12 after:bg-blue-500 after:rounded-full">
                Legal
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/privacy" 
                    className="text-blue-200 hover:text-white transition-colors flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-900/20 rounded-md group-hover:bg-blue-800/40 transition-colors">
                      <FileText className="h-4 w-4" />
                    </div>
                    <span>Privacy Policy</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 -ml-1 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/terms" 
                    className="text-blue-200 hover:text-white transition-colors flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-900/20 rounded-md group-hover:bg-blue-800/40 transition-colors">
                      <FileText className="h-4 w-4" />
                    </div>
                    <span>Terms of Service</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 -ml-1 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        
          <Separator className="bg-blue-900/50 my-8" />
        
          <div className="flex flex-col md:flex-row items-center justify-between text-blue-300 text-sm">
            <div className="mb-4 md:mb-0">
              © {year} <span className="font-semibold text-white">RSA</span>. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <Link 
                to="/privacy" 
                className="hover:text-white transition-colors flex items-center gap-2 group"
              >
                <Shield className="h-4 w-4 text-blue-400 group-hover:text-white transition-colors" />
                Privacy
              </Link>
              <Link 
                to="/terms" 
                className="hover:text-white transition-colors flex items-center gap-2 group"
              >
                <BookText className="h-4 w-4 text-blue-400 group-hover:text-white transition-colors" />
                Terms
              </Link>
              <Link 
                to="/contact" 
                className="hover:text-white transition-colors flex items-center gap-2 group"
              >
                <LifeBuoy className="h-4 w-4 text-blue-400 group-hover:text-white transition-colors" />
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
