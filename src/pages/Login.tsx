
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { LogIn, LockOpen, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const { login, checkUserExists } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination if the user was redirected here
  const from = location.state?.from?.pathname || '/';
  const wasRedirected = location.state?.from !== undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setUserNotFound(false);
    
    try {
      // First check if the user exists
      const exists = await checkUserExists(email);
      
      if (!exists) {
        setUserNotFound(true);
        setIsLoading(false);
        return;
      }
      
      await login(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back to RSA! You now have full access to all features.",
      });
      // Navigate to the page they were trying to access, or home by default
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to RSA
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Or{' '}
            <Link to="/signup" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
              create an account
            </Link>
          </p>
        </div>
        
        {wasRedirected && (
          <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
            <LockOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="dark:text-white">Authentication required</AlertTitle>
            <AlertDescription className="dark:text-gray-300">
              Log in or create an account to access all features and pages of RSA.
            </AlertDescription>
          </Alert>
        )}
        
        {userNotFound && (
          <Alert variant="destructive" className="dark:bg-red-900/30 dark:border-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Account not found</AlertTitle>
            <AlertDescription>
              This email is not registered. Please{' '}
              <Link to="/signup" state={{ email }} className="font-medium underline dark:text-white">
                create an account
              </Link>{' '}
              first.
            </AlertDescription>
          </Alert>
        )}
        
        <form className="mt-8 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-xl border border-gray-200 dark:border-gray-700" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 px-3 py-2 bg-white dark:bg-gray-700 border shadow-sm border-slate-300 dark:border-gray-600 placeholder-slate-400 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 rounded-md focus:ring-1 dark:text-white"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 px-3 py-2 bg-white dark:bg-gray-700 border shadow-sm border-slate-300 dark:border-gray-600 placeholder-slate-400 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-blue-500 rounded-md focus:ring-1 dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
            >
              <LogIn className="mr-2 h-4 w-4" />
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
