
import { jsPDF } from 'jspdf';
import { pdfStyles } from '@/styles/pdfStyles';
import { PageData } from './types';

export const setupPDFDocument = (): { pdf: jsPDF; pageData: PageData } => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = pdfStyles.spacing.pageMargin;
  const contentWidth = pageWidth - (margin.left + margin.right);
  const maxContentHeight = pageHeight * pdfStyles.layout.maxContentHeight;

  return {
    pdf,
    pageData: {
      pageNumber: 1,
      pageWidth,
      pageHeight,
      margin,
      contentWidth,
      maxContentHeight,
    },
  };
};

export const addPageNumber = (pdf: jsPDF, pageData: PageData, currentPage: number, totalPages: number) => {
  pdf.setFontSize(pdfStyles.sizes.pageNumber);
  pdf.setTextColor(pdfStyles.colors.subtext);
  pdf.text(
    `Page ${currentPage} of ${totalPages}`,
    pageData.pageWidth - pageData.margin.right,
    pageData.pageHeight - (pageData.margin.bottom / 3),
    { align: 'right' }
  );
};

export const addHeader = (pdf: jsPDF, pageData: PageData, pageNumber: number) => {
  if (pageNumber > 1) {
    pdf.setFont(pdfStyles.fonts.normal);
    pdf.setFontSize(pdfStyles.sizes.caption);
    pdf.setTextColor(pdfStyles.colors.subtext);
    pdf.text('Sentiment Analysis Report', pageData.margin.left, pageData.margin.top / 2);
    pdf.setDrawColor(pdfStyles.colors.primary);
    pdf.line(
      pageData.margin.left,
      pageData.margin.top - 5,
      pageData.pageWidth - pageData.margin.right,
      pageData.margin.top - 5
    );
  }
};
