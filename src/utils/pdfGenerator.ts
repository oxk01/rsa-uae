
import { jsPDF } from 'jspdf';
import { PDFGeneratorOptions } from './pdf/types';
import { setupPDFDocument, addPageNumber } from './pdf/pageSetup';
import { addCoverPage } from './pdf/coverPage';
import { renderContent } from './pdf/contentRenderer';
import { pdfStyles } from '@/styles/pdfStyles';

export const generatePDF = async (reportElement: HTMLElement, options: PDFGeneratorOptions) => {
  if (!reportElement) {
    console.error("No report element provided");
    return handleError("No report element provided");
  }
  
  try {
    console.log('Beginning PDF generation process...');
    
    // Initialize PDF document and page data
    const { pdf, pageData } = setupPDFDocument();
    
    // Create cover page with table of contents
    addCoverPage(pdf, pageData, {
      title: options.title,
      subtitle: 'A Comprehensive Analysis of Customer Feedback',
      date: options.date,
    });
    
    console.log('Cover page added, preparing content...');
    
    // Pre-processing: remove any elements that shouldn't be in the PDF
    const clonedElement = reportElement.cloneNode(true) as HTMLElement;
    const headerButtons = clonedElement.querySelectorAll('button');
    headerButtons.forEach(button => {
      if (button.parentNode) {
        button.parentNode.removeChild(button);
      }
    });
    
    // Ensure we have the right height measurement
    const contentHeight = clonedElement.getBoundingClientRect().height;
    console.log(`Content height: ${contentHeight}px`);
    
    // Calculate total pages (cover page + content pages)
    const contentPages = Math.ceil(contentHeight / (pageData.maxContentHeight - pageData.margin.top));
    const totalPages = contentPages + 1; // Cover page + content pages
    
    console.log(`Estimated ${totalPages} total pages (1 cover page + ${contentPages} content pages)`);
    
    // Add page number to cover page
    addPageNumber(pdf, pageData, 1, totalPages);
    
    // Render report content - passing the original element, not the clone
    // This ensures we're capturing the fully rendered state
    const contentRendered = await renderContent(pdf, pageData, reportElement, totalPages);
    
    if (!contentRendered) {
      console.error("Content rendering failed");
      return handleError("Failed to render report content");
    }
    
    console.log(`Generated enhanced PDF with ${totalPages} pages`);
    return pdf;
    
  } catch (error) {
    console.error("Error generating PDF:", error);
    return handleError(error instanceof Error ? error.message : "Unknown error");
  }
};

const handleError = (errorMessage: string = "Error generating PDF"): jsPDF => {
  const { pdf, pageData } = setupPDFDocument();
  let yOffset = pageData.margin.top;
  
  pdf.setFontSize(pdfStyles.sizes.sectionHeader);
  pdf.setTextColor(255, 0, 0);  // Red color for error
  pdf.text("Error Generating Report", pageData.pageWidth / 2, yOffset, { align: 'center' });
  
  yOffset += 30;
  pdf.setFontSize(pdfStyles.sizes.body);
  pdf.setTextColor(pdfStyles.colors.text);
  pdf.text("Error generating full report visualization.", pageData.margin.left, yOffset);
  yOffset += 10;
  pdf.text(`Error details: ${errorMessage}`, pageData.margin.left, yOffset);
  yOffset += 20;
  pdf.text("Troubleshooting tips:", pageData.margin.left, yOffset);
  yOffset += 10;
  pdf.text("1. Ensure all visualizations have finished loading", pageData.margin.left, yOffset);
  yOffset += 10;
  pdf.text("2. Try reducing the amount of data in the report", pageData.margin.left, yOffset);
  yOffset += 10;
  pdf.text("3. Check browser console for specific error messages", pageData.margin.left, yOffset);
  
  return pdf;
};
