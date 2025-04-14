
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GenerateReportButtonProps {
  hasData: boolean;
  onGenerate?: () => void;
}

const GenerateReportButton: React.FC<GenerateReportButtonProps> = ({ 
  hasData = false,
  onGenerate 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateReport = async () => {
    if (!hasData) {
      toast({
        title: "No data available",
        description: "Please analyze some reviews in the demo section first.",
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
        title: "Report Generated",
        description: "Your detailed report has been downloaded.",
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
      className="gap-2"
    >
      {isGenerating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <FileText className="h-4 w-4" />
      )}
      Generate Detailed Report
    </Button>
  );
};

export default GenerateReportButton;
