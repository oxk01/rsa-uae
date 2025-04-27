
import React, { useState, useRef } from 'react';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SentimentReport from './SentimentReport';
import { generatePDF } from '@/utils/pdfGenerator';

interface GenerateReportButtonProps {
  analysisData: any;
  hasData: boolean;
}

const GenerateReportButton = ({ analysisData, hasData }: GenerateReportButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
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

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);
      
      const reportElement = reportRef.current;
      if (!reportElement) {
        throw new Error("Report element not found");
      }

      toast({
        title: "Preparing Report",
        description: "Generating PDF, please wait...",
      });
      
      // Wait for visualizations to fully render
      await new Promise(resolve => setTimeout(resolve, 3000));

      console.log("Starting PDF generation...");
      const pdf = await generatePDF(reportElement, {
        title: 'Sentiment Analysis Report',
        date: `Generated on ${new Date().toLocaleDateString()}`
      });

      if (pdf) {
        console.log("PDF generated successfully, saving...");
        pdf.save('sentiment_analysis_report.pdf');
        toast({
          title: "PDF Downloaded",
          description: "Your report has been downloaded successfully.",
        });
      } else {
        throw new Error("Failed to generate PDF");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadCSV = () => {
    try {
      if (!analysisData || !analysisData.fileAnalysis) {
        throw new Error("No data available");
      }
      
      let csvContent = "data:text/csv;charset=utf-8,";
      
      csvContent += "Aspect,Sentiment,Count,Confidence\n";
      
      const aspects = analysisData.fileAnalysis.aspects || [];
      aspects.forEach((aspect: any) => {
        csvContent += `${aspect.aspect || aspect.name || "Unknown"},${aspect.sentiment || "neutral"},${aspect.count || 1},${aspect.confidence || "N/A"}\n`;
      });
      
      if (analysisData.fileAnalysis.reviews && analysisData.fileAnalysis.reviews.length) {
        csvContent += "\nDate,Sentiment,Review Text\n";
        analysisData.fileAnalysis.reviews.forEach((review: any) => {
          const date = review.date || "N/A";
          const sentiment = review.sentiment?.sentiment || "neutral";
          const text = review.reviewText ? `"${review.reviewText.replace(/"/g, '""')}"` : "N/A";
          csvContent += `${date},${sentiment},${text}\n`;
        });
      }
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "sentiment_analysis_report.csv");
      document.body.appendChild(link);
      
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "CSV Downloaded",
        description: "Your report data has been downloaded as CSV.",
      });
    } catch (error) {
      console.error("Error generating CSV:", error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your CSV. Please try again.",
        variant: "destructive"
      });
    }
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
              View and download your comprehensive analysis report
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-end mb-4">
            <Button
              size="sm"
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              {isDownloading ? "Downloading..." : "Download PDF"}
            </Button>
          </div>
          
          <div id="sentiment-report" ref={reportRef}>
            <SentimentReport analysisData={analysisData} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GenerateReportButton;
