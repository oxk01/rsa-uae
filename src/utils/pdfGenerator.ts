
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
  
  try {
    // First make sure all the charts and visualizations are rendered
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Take a screenshot of the entire report instead of processing section by section
    const canvas = await html2canvas(reportElement, {
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
      width: reportElement.offsetWidth,
      height: reportElement.offsetHeight,
      windowWidth: reportElement.scrollWidth,
      windowHeight: reportElement.scrollHeight
    });
    
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = contentWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Calculate number of pages needed
    const pagesNeeded = Math.ceil(imgHeight / maxContentHeight);
    
    // Add all pages
    for (let pageNum = 0; pageNum < pagesNeeded; pageNum++) {
      if (pageNum > 0) {
        pdf.addPage();
        pageNumber++;
        setupPage();
        addPageNumber(pageNumber);
      }
      
      // Calculate the portion of the image to add to this page
      const sourceY = pageNum * maxContentHeight * (canvas.height / imgHeight);
      const sourceHeight = Math.min(
        maxContentHeight * (canvas.height / imgHeight),
        canvas.height - sourceY
      );
      const destHeight = Math.min(maxContentHeight, imgHeight - (pageNum * maxContentHeight));
      
      // Use standard addImage method with proper parameters for clipping
      pdf.addImage({
        imageData: imgData,
        format: 'PNG', 
        x: margin.left,
        y: margin.top,
        width: imgWidth,
        height: destHeight,
        compression: 'FAST',
        rotation: 0
      });
    }
    
    console.log(`Generated PDF with ${pageNumber} pages`);
    return pdf;
  } catch (error) {
    console.error("Error generating PDF:", error);
    
    // Fallback to simplified PDF
    pdf.setFontSize(pdfStyles.sizes.body);
    pdf.text("Error generating full report visualization.", margin.left, yOffset);
    yOffset += 10;
    pdf.text("Please try again or check browser console for errors.", margin.left, yOffset);
    
    return pdf;
  }
};
