
import { jsPDF } from 'jspdf';
import { PageData } from './types';

export const addPageImage = (
  pdf: jsPDF, 
  pageData: PageData,
  imgData: string,
  imgWidth: number,
  destHeight: number,
  isFirstPage: boolean
) => {
  try {
    if (isFirstPage) {
      // For the first page, add the full image
      pdf.addImage({
        imageData: imgData,
        format: 'PNG',
        x: pageData.margin.left,
        y: pageData.margin.top,
        width: imgWidth,
        height: destHeight,
        compression: 'FAST'
      });
    } else {
      // For subsequent pages, use standard addImage method with proper parameters
      pdf.addImage(
        imgData,
        'PNG',
        pageData.margin.left,
        pageData.margin.top,
        imgWidth,
        destHeight
      );
    }
    console.log(`Added image to PDF at x=${pageData.margin.left}, y=${pageData.margin.top}, width=${imgWidth}, height=${destHeight}`);
  } catch (error) {
    console.error('Error adding image to PDF:', error);
    
    // Add error text instead
    pdf.setTextColor(255, 0, 0);
    pdf.setFontSize(12);
    pdf.text('Error displaying image content', 
      pageData.margin.left, 
      pageData.margin.top + 20);
  }
};
