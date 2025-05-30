
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar, User, Tag, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ResearchPaperCardProps {
  title: string;
  authors: string;
  publication?: string;
  year?: string; // Optional year
  abstract?: string;
  imageUrl: string;
  paperUrl: string;
  category?: string;
  featured?: boolean;
  date?: string;
}

const ResearchPaperCard: React.FC<ResearchPaperCardProps> = ({
  title,
  authors,
  publication,
  year,
  abstract,
  imageUrl,
  paperUrl,
  category,
  featured,
  date
}) => {
  const { currentLanguage, t } = useLanguage();
  const isRtl = currentLanguage === 'ar';
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  // Default research paper-related fallback images
  const fallbackImages = [
    'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80', // AI/ML visualization
    'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80', // Neural network
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80', // Research code
    'https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80'  // AI/Data visualization
  ];
  
  // Select a random fallback image when needed
  const fallbackImage = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  
  // Standard card for grid layout
  if (!featured) {
    return (
      <Card 
        className={`h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200 dark:border-gray-800 ${isHovered ? 'border-blue-300 dark:border-blue-700' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="h-48 overflow-hidden relative">
          <img 
            src={imageError ? fallbackImage : imageUrl} 
            alt={title} 
            className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-110 brightness-90' : 'scale-100'}`}
            onError={handleImageError}
          />
          {category && (
            <div className="absolute top-3 left-3">
              <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md px-3 py-1 text-xs font-medium shadow-md">
                {category}
              </span>
            </div>
          )}
        </div>
        <div className={`flex-1 flex flex-col ${isRtl ? 'rtl' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">{title}</CardTitle>
          </CardHeader>
          
          {abstract && (
            <CardContent className="pb-2 pt-0 flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {abstract}
              </p>
            </CardContent>
          )}
          
          <CardFooter className="pt-2 flex-col items-start">
            <div className="w-full flex flex-wrap gap-4 mb-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <User className="h-3.5 w-3.5" />
                <span>{authors}</span>
              </div>
              
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="h-3.5 w-3.5" />
                <span>{date || year}</span>
              </div>
            </div>
            
            <a href={paperUrl} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button 
                variant="outline" 
                size="sm" 
                className={`
                  flex items-center justify-between gap-2 w-full 
                  border-gray-200 dark:border-gray-800
                  hover:bg-blue-50 dark:hover:bg-blue-950 
                  hover:text-blue-700 dark:hover:text-blue-400
                  hover:border-blue-300 dark:hover:border-blue-700
                  transition-all duration-300
                  ${isHovered ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-300 dark:border-blue-800' : ''}
                `}
              >
                <span>Read Paper</span>
                <ArrowUpRight className={`h-3.5 w-3.5 transition-transform duration-300 ${isHovered ? 'translate-x-1 -translate-y-1' : ''}`} />
              </Button>
            </a>
          </CardFooter>
        </div>
      </Card>
    );
  }
  
  // Featured card style (horizontal banner)
  return (
    <Card 
      className="w-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-96 w-full rounded-xl overflow-hidden group">
        <img 
          src={imageError ? fallbackImage : imageUrl} 
          alt={title} 
          className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent"></div>
        
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end p-8 text-white z-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md px-4 py-1.5 text-sm font-medium shadow-md">
              Featured
            </span>
            
            {category && (
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white rounded-md px-3 py-1 text-xs">
                <Tag className="h-3.5 w-3.5 inline mr-1.5 opacity-80" />
                {category}
              </span>
            )}
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-white">{title}</h2>
          <p className="mb-6 line-clamp-2 text-gray-100 max-w-3xl">{abstract}</p>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex items-center gap-6 text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 opacity-70" />
                <span>{authors}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 opacity-70" />
                <span>{date || year}</span>
              </div>
            </div>
            
            <a href={paperUrl} target="_blank" rel="noopener noreferrer" className="sm:ml-auto">
              <Button 
                className={`
                  bg-white text-gray-900 hover:bg-blue-50 flex items-center gap-2 
                  transition-all duration-300 shadow-md hover:shadow-lg
                  ${isHovered ? 'scale-105' : 'scale-100'}
                `}
              >
                Read Full Paper
                <ExternalLink className={`h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-0.5 -translate-y-0.5' : ''}`} />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResearchPaperCard;
