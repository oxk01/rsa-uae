
import React, { useState, useRef } from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SentimentReport from './SentimentReport';

interface GenerateReportButtonProps {
  analysisData: any;
  hasData: boolean;
}

const GenerateReportButton = ({ analysisData, hasData }: GenerateReportButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const { toast } = useToast();
  const reportRef = useRef<HTMLDivElement>(null);

  const handleGenerateReport = () => {
    if (!hasData) {
      toast({
        title: "No data available",
        description: "Please upload and analyze data before generating a report.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowReport(true);
      toast({
        title: "Report Generated",
        description: "Your sentiment analysis report is ready to view.",
      });
    }, 1000);
  };

  return (
    <>
      <Button 
        variant="secondary"
        size="sm"
        onClick={handleGenerateReport}
        disabled={isGenerating || !hasData}
        className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-800 border border-blue-300"
      >
        <FileText className="h-4 w-4" />
        {isGenerating ? "Generating..." : "Generate Report"}
      </Button>
      
      <Dialog open={showReport} onOpenChange={setShowReport}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Sentiment Analysis Report</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              View your comprehensive analysis report
            </DialogDescription>
          </DialogHeader>
          
          <div id="sentiment-report" ref={reportRef}>
            <SentimentReport analysisData={analysisData} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GenerateReportButton;
