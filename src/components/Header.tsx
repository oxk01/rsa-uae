
import React from 'react';
import { BarChart3, Search, Bell, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-7 w-7 text-brand-blue" />
            <h1 className="text-xl font-semibold text-brand-blue">SentimentIQ</h1>
          </div>
          
          <div className="hidden md:flex relative w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search reviews..." 
              className="pl-8 pr-4 py-2 rounded-md border border-gray-200"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-1.5 rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-1.5 rounded-full hover:bg-gray-100">
              <Settings className="h-5 w-5 text-gray-500" />
            </button>
            <div className="h-8 w-8 rounded-full bg-brand-teal flex items-center justify-center">
              <span className="text-white font-medium text-sm">JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
