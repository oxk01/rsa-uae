
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { pdfStyles } from '@/styles/pdfStyles';

interface PDFGeneratorOptions {
  title: string;
  date: string;
}

export const generatePDF = async (reportElement: HTMLElement, options: PDFGeneratorOptions) => {
  if (!reportElement) return null;
  
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
  
  const setupPage = () => {
    pdf.setFont(pdfStyles.fonts.normal);
    pdf.setFontSize(pdfStyles.sizes.body);
    pdf.setTextColor(pdfStyles.colors.text);
    pdf.setLineHeightFactor(pdfStyles.spacing.lineHeight);
  };
  
  const addPageNumber = (pageNum: number) => {
    pdf.setFontSize(pdfStyles.sizes.caption);
    pdf.setTextColor(pdfStyles.colors.text);
    pdf.text(`Page ${pageNum}`, pageWidth - margin.right, pageHeight - (margin.bottom / 2), { align: 'right' });
  };
  
  let yOffset = margin.top;
  let pageNumber = 1;
  
  // Title Page
  pdf.setFont(pdfStyles.fonts.bold);
  pdf.setFontSize(pdfStyles.sizes.title);
  pdf.setTextColor(pdfStyles.colors.header);
  pdf.text(options.title, pageWidth / 2, yOffset, { align: 'center' });
  
  yOffset += pdfStyles.spacing.headerMargin;
  pdf.setFont(pdfStyles.fonts.normal);
  pdf.setFontSize(pdfStyles.sizes.body);
  pdf.setTextColor(pdfStyles.colors.text);
  pdf.text(options.date, pageWidth / 2, yOffset, { align: 'center' });
  
  yOffset += pdfStyles.spacing.sectionMargin;
  addPageNumber(pageNumber);
  
  // Process each section
  const sections = reportElement.querySelectorAll('section');
  for (const section of sections) {
    if (yOffset > maxContentHeight) {
      pdf.addPage();
      pageNumber++;
      yOffset = margin.top;
      setupPage();
      addPageNumber(pageNumber);
    }
    
    const title = section.querySelector('h2');
    if (title) {
      pdf.setFont(pdfStyles.fonts.bold);
      pdf.setFontSize(pdfStyles.sizes.sectionHeader);
      pdf.setTextColor(pdfStyles.colors.header);
      pdf.text(title.textContent || '', margin.left, yOffset);
      yOffset += pdfStyles.spacing.headerMargin;
    }
    
    const canvas = await html2canvas(section, {
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
      ignoreElements: (element) => {
        return element.tagName.toLowerCase() === 'h2' ||
               element.classList.contains('print-hide');
      }
    });
    
    let imgWidth = contentWidth;
    let imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    if (yOffset + imgHeight > maxContentHeight) {
      pdf.addPage();
      pageNumber++;
      yOffset = margin.top;
      setupPage();
      addPageNumber(pageNumber);
    }
    
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      margin.left,
      yOffset,
      imgWidth,
      imgHeight,
      undefined,
      'FAST'
    );
    
    yOffset += imgHeight + pdfStyles.spacing.sectionMargin + pdfStyles.spacing.contentSpacing;
  }
  
  return pdf;
};
