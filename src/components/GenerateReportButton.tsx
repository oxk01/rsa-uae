
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Loader2, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface GenerateReportButtonProps {
  hasData: boolean;
  onGenerate?: () => void;
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const GenerateReportButton: React.FC<GenerateReportButtonProps> = ({ 
  hasData = false,
  onGenerate,
  variant = "default",
  size = "default",
  className = ""
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleGenerateReport = async () => {
    if (!hasData) {
      toast({
        title: t('noDataAvailable'),
        description: t('analyzeReviews'),
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // In a real implementation, this would generate the actual report
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing
      
      if (onGenerate) {
        onGenerate();
      }
      
      // Mock report generation - in a real app, this would create and download a real PDF/Excel file
      const dummyData = new Blob(['Sentiment Analysis Report'], { type: 'text/plain' });
      const url = URL.createObjectURL(dummyData);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sentiment-analysis-report.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: t('reportGenerated'),
        description: t('reportDownloaded'),
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating your report.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button 
      onClick={handleGenerateReport}
      disabled={isGenerating}
      variant={variant}
      size={size}
      className={`gap-2 transition-all duration-300 hover:shadow-md ${className}`}
    >
      {isGenerating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <FileText className="h-4 w-4" />
      )}
      {t('generateDetailedReport')}
      {!isGenerating && <Download className="h-3 w-3 ml-1 opacity-70" />}
    </Button>
  );
};

export default GenerateReportButton;
