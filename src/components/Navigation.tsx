
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 rounded p-1">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <Link to="/" className="text-xl font-semibold text-blue-900">
              RSA
            </Link>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <div className={navigationMenuTriggerStyle()}>
                  <Link to="/">
                    Home
                  </Link>
                </div>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[200px] p-2">
                    <Link to="/dashboard" className="block px-2 py-1 hover:bg-gray-100 rounded-md">
                      Dashboard
                    </Link>
                    <Link to="/demo" className="block px-2 py-1 hover:bg-gray-100 rounded-md">
                      Demo
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <div className={navigationMenuTriggerStyle()}>
                  <Link to="/blog">
                    Blog
                  </Link>
                </div>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <div className={navigationMenuTriggerStyle()}>
                  <Link to="/contact">
                    Contact
                  </Link>
                </div>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button className="rounded-full p-1.5 hover:bg-gray-100">
                <Globe className="h-5 w-5 text-gray-600" />
              </button>
              
              <div className="flex h-6 items-center space-x-1">
                <Sun className="h-4 w-4 text-gray-500" />
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
                <Moon className="h-4 w-4 text-gray-500" />
              </div>
            </div>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium hidden md:block">
                  {user?.name || user?.email}
                </div>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Link to="/signup">Sign Up</Link>
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
