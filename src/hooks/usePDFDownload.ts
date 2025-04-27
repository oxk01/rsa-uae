
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
      
      // Additional pre-processing for chart elements
      const svgs = reportElement.querySelectorAll('svg');
      const canvases = reportElement.querySelectorAll('canvas');
      
      // Force explicit dimensions on all SVG elements
      svgs.forEach((svg: SVGElement) => {
        if (!svg.getAttribute('width')) {
          const rect = svg.getBoundingClientRect();
          svg.setAttribute('width', Math.max(rect.width, 300).toString());
          svg.setAttribute('height', Math.max(rect.height, 200).toString());
        }
      });
      
      // Check for visualizations
      if (svgs.length === 0 && canvases.length === 0) {
        console.warn('No SVG or canvas elements found. Visualizations might not be rendered properly.');
      } else {
        console.log(`Found ${svgs.length} SVG and ${canvases.length} canvas elements`);
      }
      
      // Wait longer for visualizations to render completely - 5 seconds
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Multiple attempts for reliability
      let pdf = null;
      let attempts = 0;
      const maxAttempts = 2;
      
      while (!pdf && attempts < maxAttempts) {
        attempts++;
        console.log(`PDF generation attempt ${attempts}/${maxAttempts}`);
        
        try {
          pdf = await generatePDF(reportElement, {
            title: options.title,
            date: options.date
          });
          
          if (!pdf) {
            throw new Error("PDF generation returned null");
          }
        } catch (e) {
          console.error(`Attempt ${attempts} failed:`, e);
          if (attempts >= maxAttempts) throw e;
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      if (pdf) {
        pdf.save('sentiment_analysis_report.pdf');
        toast({
          title: "PDF Downloaded",
          description: "Your report has been downloaded successfully.",
        });
      } else {
        throw new Error("Failed to generate PDF after multiple attempts");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your PDF. Please try again with less data or a smaller report.",
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
