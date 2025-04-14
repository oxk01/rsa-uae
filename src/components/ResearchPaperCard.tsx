
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ResearchPaperCardProps {
  title: string;
  authors: string;
  publication?: string;
  year: string;
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
  
  // Standard card for grid layout
  if (!featured) {
    return (
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="h-48 overflow-hidden relative">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
          {category && (
            <div className="absolute top-3 left-3">
              <span className="inline-block bg-blue-600 text-white rounded-md px-3 py-1 text-xs font-medium">
                {category}
              </span>
            </div>
          )}
        </div>
        <div className={`flex-1 flex flex-col ${isRtl ? 'rtl' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold line-clamp-2">{title}</CardTitle>
          </CardHeader>
          
          {abstract && (
            <CardContent className="pb-2 pt-0 flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {abstract}
              </p>
            </CardContent>
          )}
          
          <CardFooter className="pt-2 flex-col items-start">
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
              <User className="h-3.5 w-3.5" />
              <span>{authors}</span>
            </div>
            
            {date && (
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                <Calendar className="h-3.5 w-3.5" />
                <span>{date}</span>
              </div>
            )}
            
            <a href={paperUrl} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button variant="outline" size="sm" className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-950 w-full">
                <span>{t('readPaper')}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </a>
          </CardFooter>
        </div>
      </Card>
    );
  }
  
  // Featured card style (horizontal banner)
  return (
    <Card className="w-full overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-8">
      <div className="relative h-80 w-full">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end p-6 text-white">
          {category && (
            <div className="mb-3">
              <span className="inline-block bg-blue-600 text-white rounded-md px-3 py-1 text-xs font-medium">
                Featured
              </span>
            </div>
          )}
          <h2 className="text-3xl font-bold mb-3">{title}</h2>
          <p className="mb-4 line-clamp-2 text-gray-100">{abstract}</p>
          
          <div className="flex items-center gap-6 text-sm text-gray-200">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{authors}</span>
            </div>
            
            {date && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{date}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResearchPaperCard;
