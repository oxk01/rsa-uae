
import { jsPDF } from 'jspdf';
import { pdfStyles } from '@/styles/pdfStyles';
import { PageData, PDFHeaderConfig } from './types';

export const addCoverPage = (
  pdf: jsPDF,
  pageData: PageData,
  config: PDFHeaderConfig
) => {
  let yOffset = pageData.margin.top;

  // Add title
  pdf.setFont(pdfStyles.fonts.title);
  pdf.setFontSize(pdfStyles.sizes.title);
  pdf.setTextColor(pdfStyles.colors.primary);
  
  pdf.text('SENTIMENT ANALYSIS', pageData.pageWidth / 2, yOffset + 30, { align: 'center' });
  pdf.text('REPORT', pageData.pageWidth / 2, yOffset + 45, { align: 'center' });
  
  // Add horizontal line
  pdf.setLineWidth(0.5);
  pdf.setDrawColor(pdfStyles.colors.primary);
  pdf.line(
    pageData.pageWidth / 2 - 40,
    yOffset + 55,
    pageData.pageWidth / 2 + 40,
    yOffset + 55
  );
  
  yOffset += 75;
  
  // Add date
  pdf.setFont(pdfStyles.fonts.normal);
  pdf.setFontSize(pdfStyles.sizes.body);
  pdf.setTextColor(pdfStyles.colors.text);
  pdf.text(`Generated on ${config.date}`, pageData.pageWidth / 2, yOffset, { align: 'center' });
  
  return addTableOfContents(pdf, pageData, yOffset + pdfStyles.spacing.contentSpacing * 3);
};

const addTableOfContents = (pdf: jsPDF, pageData: PageData, startY: number) => {
  let yOffset = startY;
  
  // Add table of contents title
  pdf.setFont(pdfStyles.fonts.heading);
  pdf.setFontSize(pdfStyles.sizes.sectionHeader);
  pdf.setTextColor(pdfStyles.colors.primary);
  pdf.text("Table of Contents", pageData.margin.left, yOffset);
  
  yOffset += pdfStyles.spacing.headerMargin;
  
  // Add entries
  pdf.setFont(pdfStyles.fonts.normal);
  pdf.setFontSize(pdfStyles.sizes.body);
  pdf.setTextColor(pdfStyles.colors.text);
  
  const tocEntries = [
    { title: "Executive Summary", pageNum: 2 },
    { title: "Analysis Overview", pageNum: 2 },
    { title: "Sentiment Distribution", pageNum: 3 },
    { title: "Key Aspects Analysis", pageNum: 4 },
    { title: "Trends Over Time", pageNum: 5 },
    { title: "Detailed Visualizations", pageNum: 6 },
    { title: "Model Evaluation", pageNum: 7 },
    { title: "Key Insights & Recommendations", pageNum: 8 }
  ];
  
  tocEntries.forEach((entry, index) => {
    addTOCEntry(pdf, pageData, entry, yOffset + (index * pdfStyles.spacing.listItemSpacing * 2));
  });

  return yOffset;
};

const addTOCEntry = (
  pdf: jsPDF,
  pageData: PageData,
  entry: { title: string; pageNum: number },
  yPosition: number
) => {
  const entryText = entry.title;
  const pageNumText = entry.pageNum.toString();
  const textWidth = pdf.getTextWidth(entryText);
  const pageNumWidth = pdf.getTextWidth(pageNumText);
  const dotsWidth = pageData.contentWidth - textWidth - pageNumWidth - 10;
  const dotCount = Math.floor(dotsWidth / pdf.getTextWidth('.'));
  const dots = '.'.repeat(dotCount);
  
  pdf.text(entryText, pageData.margin.left + 5, yPosition);
  pdf.text(dots, pageData.margin.left + 5 + textWidth, yPosition);
  pdf.text(
    pageNumText,
    pageData.pageWidth - pageData.margin.right - pageNumWidth,
    yPosition
  );
};
