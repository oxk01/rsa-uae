
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { 
  LogOut, 
  BarChart3,
  Sun,
  Moon,
  Globe,
  ChevronDown,
} from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useTheme } from '@/hooks/use-theme';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  
  const handleLanguageChange = (lang: 'en' | 'ar') => {
    setLanguage(lang);
  };
  
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
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
            <NavigationMenuList>
              {/* Home and About are always visible */}
              <NavigationMenuItem>
                <div className={navigationMenuTriggerStyle()}>
                  <Link to="/">
                    {t('home')}
                  </Link>
                </div>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <div className={navigationMenuTriggerStyle()}>
                  <Link to="/about">
                    {t('about')}
                  </Link>
                </div>
              </NavigationMenuItem>
              
              {/* Only show the following menu items when authenticated */}
              {isAuthenticated && (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>{t('solutions')}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[200px] p-2">
                        <Link to="/dashboard" className="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                          {t('dashboard')}
                        </Link>
                        <Link to="/demo" className="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                          {t('demo')}
                        </Link>
                        <Link to="/pricing" className="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                          {t('pricing')}
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <div className={navigationMenuTriggerStyle()}>
                      <Link to="/blog">
                        {t('blog')}
                      </Link>
                    </div>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <div className={navigationMenuTriggerStyle()}>
                      <Link to="/contact">
                        {t('contact')}
                      </Link>
                    </div>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    onClick={() => handleLanguageChange('en')}
                    className={language === 'en' ? 'bg-gray-100 dark:bg-gray-800' : ''}
                  >
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleLanguageChange('ar')}
                    className={language === 'ar' ? 'bg-gray-100 dark:bg-gray-800' : ''}
                  >
                    العربية
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
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
