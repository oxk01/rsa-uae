
import { jsPDF } from 'jspdf';
import { pdfStyles } from '@/styles/pdfStyles';
import { PageData, PDFHeaderConfig } from './types';

export const addCoverPage = (
  pdf: jsPDF,
  pageData: PageData,
  config: PDFHeaderConfig
) => {
  let yOffset = pageData.margin.top;

  // Add company logo/name at the top
  pdf.setFont(pdfStyles.fonts.normal);
  pdf.setFontSize(12);
  pdf.setTextColor(pdfStyles.colors.subtext);
  pdf.text('Sentiment Analysis Platform', pageData.margin.left, yOffset);
  
  yOffset += 80;

  // Add title
  pdf.setFont(pdfStyles.fonts.title);
  pdf.setFontSize(24); // Larger title for cover page
  pdf.setTextColor(pdfStyles.colors.primary);
  pdf.text('SENTIMENT ANALYSIS', pageData.pageWidth / 2, yOffset, { align: 'center' });
  
  yOffset += 12;
  pdf.setFontSize(20);
  pdf.text('REPORT', pageData.pageWidth / 2, yOffset, { align: 'center' });
  
  // Add horizontal line
  pdf.setLineWidth(0.5);
  pdf.setDrawColor(pdfStyles.colors.primary);
  pdf.line(
    pageData.pageWidth / 2 - 40,
    yOffset + 10,
    pageData.pageWidth / 2 + 40,
    yOffset + 10
  );
  
  yOffset += 40;
  
  // Add report description
  pdf.setFont(pdfStyles.fonts.normal);
  pdf.setFontSize(pdfStyles.sizes.body);
  pdf.setTextColor(pdfStyles.colors.text);
  pdf.text('A comprehensive analysis of customer feedback and sentiment', 
    pageData.pageWidth / 2, yOffset, { align: 'center' });
  
  yOffset += 12;
  
  // Add date
  pdf.setFont(pdfStyles.fonts.normal);
  pdf.setFontSize(pdfStyles.sizes.body);
  pdf.setTextColor(pdfStyles.colors.text);
  pdf.text(`${config.date}`, pageData.pageWidth / 2, yOffset, { align: 'center' });
  
  yOffset += 40;
  
  // Add prepared for section
  pdf.setFont(pdfStyles.fonts.normal);
  pdf.setFontSize(pdfStyles.sizes.body);
  pdf.setTextColor(pdfStyles.colors.subtext);
  pdf.text('Prepared for:', pageData.pageWidth / 2, yOffset, { align: 'center' });
  
  yOffset += 12;
  pdf.setFont(pdfStyles.fonts.bold);
  pdf.setTextColor(pdfStyles.colors.text);
  pdf.text('Organization Name', pageData.pageWidth / 2, yOffset, { align: 'center' });
  
  return addTableOfContents(pdf, pageData, yOffset + pdfStyles.spacing.contentSpacing * 3);
};

const addTableOfContents = (pdf: jsPDF, pageData: PageData, startY: number) => {
  let yOffset = startY;
  
  // Add table of contents title
  pdf.setFont(pdfStyles.fonts.heading);
  pdf.setFontSize(pdfStyles.sizes.sectionHeader);
  pdf.setTextColor(pdfStyles.colors.primary);
  pdf.text("Table of Contents", pageData.pageWidth / 2, yOffset, { align: 'center' });
  
  yOffset += pdfStyles.spacing.headerMargin;
  
  // Add entries
  pdf.setFont(pdfStyles.fonts.normal);
  pdf.setFontSize(pdfStyles.sizes.body);
  pdf.setTextColor(pdfStyles.colors.text);
  
  const tocEntries = [
    { title: "1. Executive Summary", pageNum: 2 },
    { title: "2. Analysis Overview", pageNum: 2 },
    { title: "3. Sentiment Distribution", pageNum: 3 },
    { title: "4. Key Aspects Analysis", pageNum: 4 },
    { title: "5. Trends Over Time", pageNum: 5 },
    { title: "6. Detailed Visualizations", pageNum: 6 },
    { title: "7. Model Evaluation", pageNum: 7 },
    { title: "8. Key Insights & Recommendations", pageNum: 8 }
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
