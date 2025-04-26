
import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SentimentReport from './SentimentReport';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { pdfStyles } from '@/styles/pdfStyles';

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
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = {
        top: 25,
        bottom: 25,
        left: 25,
        right: 25
      };
      const contentWidth = pageWidth - (margin.left + margin.right);
      
      pdf.setProperties({
        title: 'Sentiment Analysis Report',
        subject: 'Analysis Results',
        creator: 'Sentiment Analysis Tool',
        author: 'Report Generator'
      });
      
      let yOffset = margin.top;
      let pageNumber = 1;

      const setupPage = () => {
        pdf.setFont(pdfStyles.fonts.normal);
        pdf.setFontSize(pdfStyles.sizes.body);
        pdf.setTextColor(pdfStyles.colors.text);
      };
      
      const addPageNumber = (pageNum: number) => {
        pdf.setFontSize(pdfStyles.sizes.caption);
        pdf.setTextColor(pdfStyles.colors.subtext);
        pdf.text(`Page ${pageNum}`, pageWidth - margin.right, pageHeight - (margin.bottom / 2), { align: 'right' });
      };

      pdf.setFont(pdfStyles.fonts.bold);
      pdf.setFontSize(pdfStyles.sizes.title);
      pdf.setTextColor(pdfStyles.colors.primary);
      pdf.text('Sentiment Analysis Report', pageWidth / 2, yOffset, { align: 'center' });
      
      yOffset += pdfStyles.spacing.headerMargin;
      pdf.setFont(pdfStyles.fonts.normal);
      pdf.setFontSize(pdfStyles.sizes.body);
      pdf.setTextColor(pdfStyles.colors.subtext);
      const dateText = `Generated on ${new Date().toLocaleDateString()}`;
      pdf.text(dateText, pageWidth / 2, yOffset, { align: 'center' });
      yOffset += pdfStyles.spacing.sectionMargin;
      
      addPageNumber(pageNumber);
      
      const sections = reportElement.querySelectorAll('section');
      for (const section of sections) {
        if (yOffset > pageHeight - margin.bottom - 60) {
          pdf.addPage();
          pageNumber++;
          yOffset = margin.top;
          setupPage();
          addPageNumber(pageNumber);
        }
        
        const title = section.querySelector('h2');
        if (title) {
          pdf.setFont(pdfStyles.fonts.bold);
          pdf.setFontSize(pdfStyles.sizes.sectionHeader);
          pdf.setTextColor(pdfStyles.colors.primary);
          pdf.text(title.textContent || '', margin.left, yOffset);
          yOffset += pdfStyles.spacing.headerMargin;
        }
        
        const canvas = await html2canvas(section, {
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true,
          ignoreElements: (element) => {
            return element.tagName.toLowerCase() === 'h2' ||
                   element.classList.contains('print-hide');
          }
        });
        
        let imgWidth = contentWidth;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        if (yOffset + imgHeight > pageHeight - margin.bottom) {
          const availableHeight = pageHeight - margin.bottom - yOffset;
          
          if (availableHeight < imgHeight * 0.3) {
            pdf.addPage();
            pageNumber++;
            yOffset = margin.top;
            setupPage();
            addPageNumber(pageNumber);
          } else {
            // Define scaleFactor based on available height
            const scaleFactor = availableHeight / imgHeight;
            imgWidth *= scaleFactor;
            imgHeight = availableHeight;
          }
        }
        
        pdf.addImage(
          canvas.toDataURL('image/png'),
          'PNG',
          margin.left,
          yOffset,
          imgWidth,
          imgHeight,
          undefined,
          'FAST'
        );
        
        yOffset += imgHeight + pdfStyles.spacing.sectionMargin;
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
