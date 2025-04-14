
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLanguage } from './LanguageContext';

// Define user type
interface User {
  id: string;
  email: string;
  name?: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  checkUserExists: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { language } = useLanguage();

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('rsa_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Function to check if a user exists
  const checkUserExists = async (email: string): Promise<boolean> => {
    // In a real app, this would be an API call to check if the user exists
    // For our mock implementation, we'll check localStorage
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get all registered users from localStorage
      const registeredUsers = localStorage.getItem('rsa_registered_users');
      if (registeredUsers) {
        const users = JSON.parse(registeredUsers) as string[];
        return users.includes(email);
      }
      
      return false;
    } catch (error) {
      console.error('Error checking if user exists:', error);
      return false;
    }
  };

  // Mock login function (replace with real auth)
  const login = async (email: string, password: string) => {
    // Simulate API request
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For testing purposes, allow any password with at least 4 characters
      // In production, you'd verify against a backend
      if (password.length < 4) {
        throw new Error('Invalid credentials');
      }
      
      // Check if user exists
      const exists = await checkUserExists(email);
      if (!exists) {
        throw new Error('User does not exist');
      }
      
      // Create mock user
      const user = {
        id: `user_${Math.random().toString(36).substring(2, 9)}`,
        email,
        name: email.split('@')[0]
      };
      
      // Store in localStorage
      localStorage.setItem('rsa_user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock signup function
  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For testing purposes, allow any password with at least 4 characters
      if (password.length < 4) {
        throw new Error('Password must be at least 4 characters');
      }
      
      // Create mock user
      const user = {
        id: `user_${Math.random().toString(36).substring(2, 9)}`,
        email,
        name
      };
      
      // Store user email in registered users list
      const registeredUsers = localStorage.getItem('rsa_registered_users');
      let users: string[] = [];
      if (registeredUsers) {
        users = JSON.parse(registeredUsers);
      }
      users.push(email);
      localStorage.setItem('rsa_registered_users', JSON.stringify(users));
      
      // Store in localStorage
      localStorage.setItem('rsa_user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      throw new Error('Sign up failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('rsa_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        checkUserExists
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
