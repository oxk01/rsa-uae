
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const location = useLocation();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in or create an account to access this page.",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, isLoading, toast]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-blue-600 dark:text-blue-400 animate-spin mb-3" />
          <div className="text-lg font-medium text-gray-700 dark:text-gray-200">Loading...</div>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    // Display a more informative page instead of immediately redirecting
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white dark:bg-gray-900 px-4">
        <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <ShieldAlert className="h-16 w-16 text-amber-500 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Authentication Required</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            This page is only accessible to authenticated users. Please log in or create an account to view this content.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="default" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
              <Link to="/signup" state={{ from: location }}>Create Account</Link>
            </Button>
            <Button asChild variant="outline" className="border-gray-300 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
              <Link to="/login" state={{ from: location }}>Already have an account? Log In</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Apply RTL class for Arabic
  const rtlClass = language === 'ar' ? 'rtl' : '';
  
  return <div className={`${rtlClass}`}>{children}</div>;
};

export default ProtectedRoute;
