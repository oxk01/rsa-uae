
import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SentimentReport from './SentimentReport';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface GenerateReportButtonProps {
  analysisData: any;
  hasData: boolean;
}

const GenerateReportButton = ({ analysisData, hasData }: GenerateReportButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const { toast } = useToast();

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
    
    // Simulate report generation time
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
    toast({
      title: "Preparing PDF",
      description: "Please wait while we generate your PDF...",
    });
    
    try {
      const reportElement = document.getElementById('sentiment-report');
      if (!reportElement) return;
      
      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save('sentiment_analysis_report.pdf');
      
      toast({
        title: "PDF Downloaded",
        description: "Your report has been downloaded successfully.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDownloadCSV = () => {
    try {
      if (!analysisData || !analysisData.fileAnalysis) {
        throw new Error("No data available");
      }
      
      // Prepare CSV content
      let csvContent = "data:text/csv;charset=utf-8,";
      
      // Headers
      csvContent += "Aspect,Sentiment,Count,Confidence\n";
      
      // Add aspect data
      const aspects = analysisData.fileAnalysis.aspects || [];
      aspects.forEach((aspect: any) => {
        csvContent += `${aspect.aspect || aspect.name || "Unknown"},${aspect.sentiment || "neutral"},${aspect.count || 1},${aspect.confidence || "N/A"}\n`;
      });
      
      // Add review data if available
      if (analysisData.fileAnalysis.reviews && analysisData.fileAnalysis.reviews.length) {
        csvContent += "\nDate,Sentiment,Review Text\n";
        analysisData.fileAnalysis.reviews.forEach((review: any) => {
          const date = review.date || "N/A";
          const sentiment = review.sentiment?.sentiment || "neutral";
          // Escape quotes in the text
          const text = review.reviewText ? `"${review.reviewText.replace(/"/g, '""')}"` : "N/A";
          csvContent += `${date},${sentiment},${text}\n`;
        });
      }
      
      // Create download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "sentiment_analysis_report.csv");
      document.body.appendChild(link);
      
      // Trigger download
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
          </DialogHeader>
          
          <div id="sentiment-report">
            <SentimentReport analysisData={analysisData} />
          </div>
          
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDownloadCSV}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download CSV
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={handleDownloadPDF}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GenerateReportButton;
