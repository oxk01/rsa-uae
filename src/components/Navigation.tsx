
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { 
  LogOut, 
  BarChart3,
  Sun,
  Moon,
  ChevronDown,
  LayoutDashboard,
  PlayCircle,
  Tag,
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from '@/components/ui/navigation-menu';
import { useTheme } from '@/hooks/use-theme';

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSolutionsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Close dropdown when navigating
  useEffect(() => {
    setSolutionsDropdownOpen(false);
  }, [location.pathname]);
  
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 rounded p-1">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <Link to="/" className="text-xl font-semibold text-blue-900 dark:text-blue-300">
              RSA
            </Link>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList className="hidden md:flex space-x-1 justify-center mx-auto">
              {/* Home and About are always visible */}
              <NavigationMenuItem>
                <Link 
                  to="/" 
                  className={`px-4 py-2 text-base font-medium rounded-md transition-colors relative ${
                    location.pathname === '/' 
                      ? 'text-blue-700 dark:text-blue-300 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300'
                  }`}
                >
                  {t('home')}
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link 
                  to="/about" 
                  className={`px-4 py-2 text-base font-medium rounded-md transition-colors relative ${
                    location.pathname === '/about' 
                      ? 'text-blue-700 dark:text-blue-300 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300'
                  }`}
                >
                  {t('about')}
                </Link>
              </NavigationMenuItem>
              
              {/* Only show these menu items when authenticated */}
              {isAuthenticated && (
                <>
                  <NavigationMenuItem>
                    <Link 
                      to="/pricing" 
                      className={`px-4 py-2 text-base font-medium rounded-md transition-colors relative ${
                        location.pathname === '/pricing' 
                          ? 'text-blue-700 dark:text-blue-300 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400' 
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300'
                      }`}
                    >
                      {t('pricing')}
                    </Link>
                  </NavigationMenuItem>
                  
                  {/* Solutions dropdown */}
                  <NavigationMenuItem className="relative" ref={dropdownRef}>
                    <button 
                      className={`px-4 py-2 text-base font-medium rounded-md transition-colors flex items-center ${
                        location.pathname === '/dashboard' || location.pathname === '/demo'
                          ? 'text-blue-700 dark:text-blue-300' 
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300'
                      }`}
                      onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
                    >
                      <span>{t('solutions')}</span>
                      <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${solutionsDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {solutionsDropdownOpen && (
                      <div className="absolute left-0 w-[240px] mt-1 py-2 bg-white rounded-lg shadow-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700 z-30">
                        <Link 
                          to="/dashboard"
                          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                        >
                          <LayoutDashboard className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          <span className="font-medium">{t('dashboard')}</span>
                        </Link>
                        <Link 
                          to="/demo" 
                          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                        >
                          <PlayCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          <span className="font-medium">{t('demo')}</span>
                        </Link>
                      </div>
                    )}
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link 
                      to="/blog" 
                      className={`px-4 py-2 text-base font-medium rounded-md transition-colors relative ${
                        location.pathname === '/blog' 
                          ? 'text-blue-700 dark:text-blue-300 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400' 
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300'
                      }`}
                    >
                      {t('blog')}
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link 
                      to="/contact" 
                      className={`px-4 py-2 text-base font-medium rounded-md transition-colors relative ${
                        location.pathname === '/contact' 
                          ? 'text-blue-700 dark:text-blue-300 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400' 
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300'
                      }`}
                    >
                      {t('contact')}
                    </Link>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-6 items-center space-x-1">
                <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <button
                  onClick={toggleTheme}
                  className={`
                    relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
                    transition-colors duration-200 ease-in-out focus:outline-none
                    ${isDark ? 'bg-blue-600' : 'bg-gray-200'}
                  `}
                >
                  <span className="sr-only">Toggle dark mode</span>
                  <span
                    className={`
                      pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow
                      ring-0 transition duration-200 ease-in-out
                      ${isDark ? 'translate-x-5' : 'translate-x-0'}
                    `}
                  />
                </button>
                <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium hidden md:block text-gray-700 dark:text-gray-300">
                  {user?.name || user?.email}
                </div>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('logout')}
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to="/login">{t('login')}</Link>
                </Button>
                <Button asChild variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Link to="/signup">{t('signup')}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
