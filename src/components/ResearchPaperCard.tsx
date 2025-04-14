
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ResearchPaperCardProps {
  title: string;
  authors: string;
  publication: string;
  year: string;
  abstract: string;
  imageUrl: string;
  paperUrl: string;
  category?: string;
}

const ResearchPaperCard: React.FC<ResearchPaperCardProps> = ({
  title,
  authors,
  publication,
  year,
  abstract,
  imageUrl,
  paperUrl,
  category
}) => {
  const { currentLanguage, t } = useLanguage();
  const isRtl = currentLanguage === 'ar';
  
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      {category && (
        <div className={`px-6 pt-4 ${isRtl ? 'text-right' : ''}`}>
          <span className="inline-block bg-blue-100 dark:bg-blue-900 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-300">
            {category}
          </span>
        </div>
      )}
      <CardHeader className={`${isRtl ? 'text-right' : ''}`}>
        <CardTitle className="text-lg font-semibold line-clamp-2">{title}</CardTitle>
        <CardDescription>
          <span className="block">{authors}</span>
          <span className="block text-sm text-muted-foreground">
            {publication}, {year}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className={`${isRtl ? 'text-right' : ''} flex-grow`}>
        <p className="text-sm text-muted-foreground line-clamp-4">
          {abstract}
        </p>
      </CardContent>
      <CardFooter className={`pt-2 ${isRtl ? 'justify-start' : 'justify-end'}`}>
        <a href={paperUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm" className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-950">
            <span>{t('readPaper')}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default ResearchPaperCard;
