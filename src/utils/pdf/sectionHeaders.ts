
import { jsPDF } from 'jspdf';
import { PageData } from './types';
import { pdfStyles } from '@/styles/pdfStyles';

export const addSectionHeader = (pdf: jsPDF, pageData: PageData) => {
  let currentSection = "";
  if (pageData.pageNumber === 2) {
    currentSection = "1. Executive Summary";
  } else if (pageData.pageNumber === 3) {
    currentSection = "2. Sentiment Distribution Analysis";
  } else if (pageData.pageNumber === 4) {
    currentSection = "3. Key Aspects Analysis";
  } else if (pageData.pageNumber === 5) {
    currentSection = "4. Trends Over Time";
  } else if (pageData.pageNumber === 6) {
    currentSection = "5. Detailed Visualizations";
  } else if (pageData.pageNumber === 7) {
    currentSection = "6. Model Evaluation";
  } else if (pageData.pageNumber === 8) {
    currentSection = "7. Key Insights & Recommendations";
  }
  
  if (currentSection) {
    pdf.setFont(pdfStyles.fonts.heading);
    pdf.setFontSize(pdfStyles.sizes.sectionHeader);
    pdf.setTextColor(pdfStyles.colors.primary);
    pdf.text(currentSection, pageData.pageWidth / 2, pageData.margin.top / 2, { align: 'center' });
  }
};

