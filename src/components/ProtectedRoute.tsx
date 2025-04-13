
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

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
        description: "Please log in or sign up to access this page.",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, isLoading, toast]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-3" />
          <div className="text-lg font-medium text-gray-700">Loading...</div>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated and store the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Apply RTL class for Arabic
  const rtlClass = language === 'ar' ? 'rtl' : '';
  
  return <div className={rtlClass}>{children}</div>;
};

export default ProtectedRoute;
