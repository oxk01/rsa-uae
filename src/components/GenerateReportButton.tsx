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
      
      // Define PDF options
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      // Get all sections to process them separately for better page breaks
      const sections = reportElement.querySelectorAll('section');
      let pageNumber = 1;
      
      // Add title to first page
      const titleElement = reportElement.querySelector('#report-header');
      if (titleElement) {
        await addElementToPDF(pdf, titleElement, 15, pageNumber);
      }
      
      // Process each section on its own page
      for (let i = 0; i < sections.length; i++) {
        pageNumber++;
        pdf.addPage();
        
        const section = sections[i];
        await addElementToPDF(pdf, section, 15, pageNumber);
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
  
  // Helper function to add an element to the PDF
  const addElementToPDF = async (pdf: jsPDF, element: Element, yOffset: number, pageNumber: number) => {
    try {
      const canvas = await html2canvas(element as HTMLElement, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 10; // Margin in mm
      const contentWidth = pageWidth - (margin * 2);
      
      // Calculate image dimensions to fit within page width
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add image centered on page with proper margins
      pdf.addImage(imgData, 'PNG', margin, yOffset, imgWidth, imgHeight);
      
      // Add page number
      pdf.setFontSize(10);
      pdf.text(`Page ${pageNumber}`, pageWidth / 2, pdf.internal.pageSize.getHeight() - 10, {
        align: 'center'
      });
      
      return yOffset + imgHeight + 10; // Return the new y-position
    } catch (error) {
      console.error('Error processing element for PDF:', error);
      throw error;
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
