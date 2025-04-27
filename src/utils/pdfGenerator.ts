
import { jsPDF } from 'jspdf';
import { PDFGeneratorOptions } from './pdf/types';
import { setupPDFDocument, addPageNumber } from './pdf/pageSetup';
import { addCoverPage } from './pdf/coverPage';
import { renderContent } from './pdf/contentRenderer';
import { pdfStyles } from '@/styles/pdfStyles';  // Add this import

export const generatePDF = async (reportElement: HTMLElement, options: PDFGeneratorOptions) => {
  if (!reportElement) return null;
  
  try {
    // Initialize PDF document and page data
    const { pdf, pageData } = setupPDFDocument();
    
    // Create cover page with table of contents
    addCoverPage(pdf, pageData, {
      title: options.title,
      subtitle: 'Comprehensive Analysis of Customer Feedback',
      date: options.date,
    });
    
    // Calculate total pages (cover page + content pages)
    const contentPages = Math.ceil(reportElement.scrollHeight / (pageData.maxContentHeight - pageData.margin.top));
    const totalPages = contentPages + 1;
    
    // Add page number to cover page
    addPageNumber(pdf, pageData, 1, totalPages);
    
    // Render report content
    await renderContent(pdf, pageData, reportElement, totalPages);
    
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
  
  pdf.addPage();
  pdf.setFontSize(pdfStyles.sizes.body);
  pdf.setTextColor(pdfStyles.colors.text);
  pdf.text("Error generating full report visualization.", pageData.margin.left, yOffset);
  yOffset += 10;
  pdf.text("Please try again or check browser console for errors.", pageData.margin.left, yOffset);
  
  return pdf;
};

