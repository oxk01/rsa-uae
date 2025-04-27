
import { jsPDF } from 'jspdf';
import { PDFGeneratorOptions } from './pdf/types';
import { setupPDFDocument, addPageNumber } from './pdf/pageSetup';
import { addCoverPage } from './pdf/coverPage';
import { renderContent } from './pdf/contentRenderer';
import { pdfStyles } from '@/styles/pdfStyles';

export const generatePDF = async (reportElement: HTMLElement, options: PDFGeneratorOptions) => {
  if (!reportElement) {
    console.error("No report element provided");
    return null;
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
    
    console.log('Cover page added, capturing content...');
    
    // Pre-processing: remove any elements that shouldn't be in the PDF
    const clonedElement = reportElement.cloneNode(true) as HTMLElement;
    const headerButtons = clonedElement.querySelectorAll('button');
    headerButtons.forEach(button => {
      button.parentNode?.removeChild(button);
    });
    
    // Calculate total pages (cover page + content pages)
    const contentPages = Math.ceil(clonedElement.scrollHeight / (pageData.maxContentHeight - pageData.margin.top));
    const totalPages = contentPages + 1; // Cover page + content pages
    
    console.log(`Estimated ${totalPages} total pages (1 cover page + ${contentPages} content pages)`);
    
    // Add page number to cover page
    addPageNumber(pdf, pageData, 1, totalPages);
    
    // Render report content
    await renderContent(pdf, pageData, clonedElement, totalPages);
    
    console.log(`Generated enhanced PDF with ${totalPages} pages`);
    return pdf;
    
  } catch (error) {
    console.error("Error generating PDF:", error);
    return handleError();
  }
};

const handleError = (): jsPDF => {
  const { pdf, pageData } = setupPDFDocument();
  let yOffset = pageData.margin.top;
  
  pdf.setFontSize(pdfStyles.sizes.sectionHeader); // Changed from heading to sectionHeader
  pdf.setTextColor(255, 0, 0);  // Red color for error
  pdf.text("Error Generating Report", pageData.pageWidth / 2, yOffset, { align: 'center' });
  
  yOffset += 30;
  pdf.setFontSize(pdfStyles.sizes.body);
  pdf.setTextColor(pdfStyles.colors.text);
  pdf.text("Error generating full report visualization.", pageData.margin.left, yOffset);
  yOffset += 10;
  pdf.text("Please try again or check browser console for errors.", pageData.margin.left, yOffset);
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
