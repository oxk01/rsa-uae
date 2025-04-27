
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
    // Simple approach - use the basic image add method without extra parameters that might cause issues
    pdf.addImage({
      imageData: imgData,
      format: 'JPEG', // Use JPEG instead of PNG for better compression
      x: pageData.margin.left,
      y: pageData.margin.top,
      width: imgWidth,
      height: destHeight,
      compression: 'MEDIUM' // Use medium compression for balance of quality/size
    });
    
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
