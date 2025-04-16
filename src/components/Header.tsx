
import React from 'react';
import { BarChart3, Search, Bell, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 rounded p-1">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-blue-900 dark:text-blue-300">SentimentIQ</h1>
          </div>
          
          <div className="hidden md:flex relative w-96">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-300" />
              <Input 
                type="text" 
                placeholder="Search reviews..." 
                className="pl-10 pr-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 w-full dark:placeholder-gray-300"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Bell className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Settings className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            </button>
            <div className="h-9 w-9 rounded-full bg-teal-500 flex items-center justify-center">
              <span className="text-white font-medium text-sm">JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
