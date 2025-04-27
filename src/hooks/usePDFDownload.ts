
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generatePDF } from '@/utils/pdfGenerator';

interface UsePDFDownloadOptions {
  title: string;
  date: string;
}

export const usePDFDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const downloadPDF = async (reportElement: HTMLElement, options: UsePDFDownloadOptions) => {
    try {
      setIsDownloading(true);
      
      if (!reportElement) {
        throw new Error("Report element not found");
      }

      toast({
        title: "Preparing Report",
        description: "Generating PDF, please wait...",
      });
      
      // Wait longer for visualizations to render completely
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Ensure all SVGs and canvas elements are fully rendered
      const svgs = reportElement.querySelectorAll('svg');
      const canvases = reportElement.querySelectorAll('canvas');
      
      if (svgs.length === 0 && canvases.length === 0) {
        console.warn('No SVG or canvas elements found. Visualizations might not be rendered properly.');
      } else {
        console.log(`Found ${svgs.length} SVG and ${canvases.length} canvas elements`);
      }

      const pdf = await generatePDF(reportElement, {
        title: options.title,
        date: options.date
      });

      if (pdf) {
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

  return {
    isDownloading,
    downloadPDF
  };
};
