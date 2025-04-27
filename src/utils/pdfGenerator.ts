
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
    pdf.setTextColor(pdfStyles.colors.subtext);
    pdf.text(`Page ${pageNum}`, pageWidth - margin.right, pageHeight - (margin.bottom / 2), { align: 'right' });
  };
  
  let yOffset = margin.top;
  let pageNumber = 1;
  
  // Enhanced Title Page
  pdf.setFont(pdfStyles.fonts.bold);
  pdf.setFontSize(pdfStyles.sizes.title);
  pdf.setTextColor(pdfStyles.colors.primary);
  pdf.text(options.title, pageWidth / 2, yOffset, { align: 'center' });
  
  yOffset += pdfStyles.spacing.headerMargin;
  pdf.setFont(pdfStyles.fonts.normal);
  pdf.setFontSize(pdfStyles.sizes.subHeader);
  pdf.setTextColor(pdfStyles.colors.subtext);
  pdf.text(options.date, pageWidth / 2, yOffset, { align: 'center' });
  
  yOffset += pdfStyles.spacing.sectionMargin;
  addPageNumber(pageNumber);
  
  try {
    // Ensure all charts and graphs are fully rendered with enhanced quality
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const canvas = await html2canvas(reportElement, {
      scale: 3,  // Higher resolution for better quality
      logging: false,
      useCORS: true,
      allowTaint: true,
      width: reportElement.offsetWidth,
      height: reportElement.offsetHeight,
      windowWidth: reportElement.scrollWidth,
      windowHeight: reportElement.scrollHeight,
      onclone: (document) => {
        const clonedReport = document.querySelector('#sentiment-report');
        if (clonedReport) {
          // Enhance chart visibility and size
          const charts = clonedReport.querySelectorAll('.recharts-wrapper');
          charts.forEach((chart: Element) => {
            (chart as HTMLElement).style.visibility = 'visible';
            (chart as HTMLElement).style.height = '400px'; // Larger charts
            (chart as HTMLElement).style.width = '100%';
          });
          
          // Improve text elements styling
          const textElements = clonedReport.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
          textElements.forEach((el: Element) => {
            (el as HTMLElement).style.margin = '1.5em 0';
            (el as HTMLElement).style.lineHeight = '1.8';
            (el as HTMLElement).style.color = '#1a1a1a';
          });
          
          // Enhance headings
          clonedReport.querySelectorAll('h1, h2, h3').forEach((el: Element) => {
            (el as HTMLElement).style.fontWeight = 'bold';
            (el as HTMLElement).style.color = '#1a365d';
          });
          
          // Improve table readability
          clonedReport.querySelectorAll('table').forEach((table: Element) => {
            (table as HTMLElement).style.width = '100%';
            (table as HTMLElement).style.borderCollapse = 'collapse';
          });
          
          // Enhance card visuals
          clonedReport.querySelectorAll('.card').forEach((card: Element) => {
            (card as HTMLElement).style.padding = '2em';
            (card as HTMLElement).style.margin = '1.5em 0';
            (card as HTMLElement).style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          });
        }
      }
    });
    
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = contentWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Calculate number of pages needed
    const pagesNeeded = Math.ceil(imgHeight / maxContentHeight);
    
    // Add all pages with enhanced quality
    for (let pageNum = 0; pageNum < pagesNeeded; pageNum++) {
      if (pageNum > 0) {
        pdf.addPage();
        pageNumber++;
        setupPage();
        addPageNumber(pageNumber);
      }
      
      const sourceY = pageNum * maxContentHeight * (canvas.height / imgHeight);
      const sourceHeight = Math.min(
        maxContentHeight * (canvas.height / imgHeight),
        canvas.height - sourceY
      );
      const destHeight = Math.min(maxContentHeight, imgHeight - (pageNum * maxContentHeight));
      
      pdf.addImage({
        imageData: imgData,
        format: 'PNG',
        x: margin.left,
        y: margin.top,
        width: imgWidth,
        height: destHeight,
        compression: 'FAST'
      });
    }
    
    console.log(`Generated enhanced PDF with ${pageNumber} pages`);
    return pdf;
  } catch (error) {
    console.error("Error generating PDF:", error);
    
    // Fallback to simplified PDF with error message
    pdf.setFontSize(pdfStyles.sizes.body);
    pdf.setTextColor(pdfStyles.colors.text);
    pdf.text("Error generating full report visualization.", margin.left, yOffset);
    yOffset += 10;
    pdf.text("Please try again or check browser console for errors.", margin.left, yOffset);
    
    return pdf;
  }
};
