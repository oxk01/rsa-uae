
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
  
  // Add fonts
  pdf.setFont(pdfStyles.fonts.normal);
  pdf.setFillColor(pdfStyles.colors.background);
  
  // Add page numbers and headers/footers
  const addPageNumber = (pageNum: number, totalPages: number) => {
    pdf.setFontSize(pdfStyles.sizes.pageNumber);
    pdf.setTextColor(pdfStyles.colors.subtext);
    pdf.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin.right, pageHeight - (margin.bottom / 3), { align: 'right' });
  };
  
  // Add header to each page
  const addHeader = (pageNum: number) => {
    // Only add header from page 2 onwards
    if (pageNum > 1) {
      pdf.setFont(pdfStyles.fonts.normal);
      pdf.setFontSize(pdfStyles.sizes.caption);
      pdf.setTextColor(pdfStyles.colors.subtext);
      pdf.text('Sentiment Analysis Report', margin.left, margin.top / 2);
      pdf.setDrawColor(pdfStyles.colors.primary);
      pdf.line(margin.left, margin.top - 5, pageWidth - margin.right, margin.top - 5);
    }
  };
  
  let yOffset = margin.top;
  let pageNumber = 1;
  
  // Create Title Page
  pdf.setFont(pdfStyles.fonts.title);
  pdf.setFontSize(pdfStyles.sizes.title);
  pdf.setTextColor(pdfStyles.colors.primary);
  
  // Add logo or branding element if needed
  pdf.text('SENTIMENT ANALYSIS', pageWidth / 2, yOffset + 20, { align: 'center' });
  pdf.text('REPORT', pageWidth / 2, yOffset + 35, { align: 'center' });
  
  yOffset += 60;
  
  // Add subtitle with date
  pdf.setFont(pdfStyles.fonts.normal);
  pdf.setFontSize(pdfStyles.sizes.sectionHeader);
  pdf.setTextColor(pdfStyles.colors.text);
  pdf.text(`Generated on ${options.date}`, pageWidth / 2, yOffset, { align: 'center' });
  
  yOffset += pdfStyles.spacing.headerMargin * 2;
  
  // Add table of contents title
  pdf.setFont(pdfStyles.fonts.heading);
  pdf.setFontSize(pdfStyles.sizes.subHeader);
  pdf.setTextColor(pdfStyles.colors.primary);
  pdf.text("Table of Contents", margin.left, yOffset);
  
  yOffset += pdfStyles.spacing.headerMargin;
  
  // Add table of contents entries
  pdf.setFont(pdfStyles.fonts.normal);
  pdf.setFontSize(pdfStyles.sizes.body);
  pdf.setTextColor(pdfStyles.colors.text);
  
  const tocEntries = [
    "1. Executive Summary",
    "2. Analysis Overview",
    "3. Sentiment Distribution",
    "4. Key Aspects Analysis",
    "5. Trends Over Time",
    "6. Detailed Visualizations",
    "7. Key Insights & Recommendations"
  ];
  
  tocEntries.forEach((entry, index) => {
    pdf.text(entry, margin.left + 5, yOffset + (index * pdfStyles.spacing.listItemSpacing * 2));
  });
  
  // Add footer to first page
  addPageNumber(pageNumber, 1); // Temporary total pages, will update later
  
  try {
    // Prepare and enhance HTML content for better rendering
    const prepareContent = () => {
      // Wait for visualizations to completely render
      return new Promise(resolve => setTimeout(resolve, 1000));
    };
    
    await prepareContent();
    
    // Create a cloned element to modify for PDF rendering
    const clonedElement = reportElement.cloneNode(true) as HTMLElement;
    
    // Apply styles to enhance PDF rendering quality
    const enhanceStyles = (element: HTMLElement) => {
      // Update font styles
      const textElements = element.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, li');
      textElements.forEach((el: Element) => {
        (el as HTMLElement).style.fontFamily = 'Arial, Helvetica, sans-serif';
        (el as HTMLElement).style.color = pdfStyles.colors.text;
      });
      
      // Enhance headings
      element.querySelectorAll('h1, h2, h3').forEach((el: Element) => {
        (el as HTMLElement).style.color = pdfStyles.colors.primary;
        (el as HTMLElement).style.fontWeight = 'bold';
        (el as HTMLElement).style.marginBottom = '15px';
        (el as HTMLElement).style.marginTop = '20px';
      });
      
      // Enhance chart visibility
      element.querySelectorAll('.recharts-wrapper').forEach((chart: Element) => {
        (chart as HTMLElement).style.margin = '20px auto';
        (chart as HTMLElement).style.height = '350px';
        (chart as HTMLElement).style.width = '100%';
      });
      
      // Enhance card visuals
      element.querySelectorAll('.card').forEach((card: Element) => {
        (card as HTMLElement).style.padding = '15px';
        (card as HTMLElement).style.margin = '15px 0';
        (card as HTMLElement).style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        (card as HTMLElement).style.borderRadius = '4px';
      });
      
      // Improve list formatting
      element.querySelectorAll('ul, ol').forEach((list: Element) => {
        (list as HTMLElement).style.paddingLeft = '20px';
        (list as HTMLElement).style.marginTop = '10px';
        (list as HTMLElement).style.marginBottom = '10px';
      });
    };
    
    // Apply enhanced styles to the cloned element
    enhanceStyles(clonedElement);
    
    // Capture the enhanced content as high-quality canvas
    const canvas = await html2canvas(reportElement, {
      scale: 3,  // Higher resolution for better quality
      logging: false,
      useCORS: true,
      allowTaint: true,
      width: reportElement.offsetWidth,
      height: reportElement.offsetHeight,
      onclone: (document) => {
        const clonedReport = document.querySelector('#sentiment-report');
        if (clonedReport) {
          enhanceStyles(clonedReport as HTMLElement);
        }
      }
    });
    
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = contentWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Calculate number of pages needed
    const contentHeight = maxContentHeight - margin.top;
    const pagesNeeded = Math.ceil(imgHeight / contentHeight);
    
    // Add content pages
    for (let i = 0; i < pagesNeeded; i++) {
      if (i > 0) {
        pdf.addPage();
        pageNumber++;
        addHeader(pageNumber);
      }
      
      const sourceY = i * contentHeight * (canvas.height / imgHeight);
      const sourceHeight = Math.min(
        contentHeight * (canvas.height / imgHeight),
        canvas.height - sourceY
      );
      
      const destHeight = Math.min(contentHeight, imgHeight - (i * contentHeight));
      
      if (i === 0) {
        // First content page after title page
        pdf.addPage();
        pageNumber++;
        addHeader(pageNumber);
      }
      
      pdf.addImage({
        imageData: imgData,
        format: 'PNG',
        x: margin.left,
        y: margin.top,
        width: imgWidth,
        height: destHeight,
      });
      
      addPageNumber(pageNumber, pagesNeeded + 1); // +1 for title page
    }
    
    console.log(`Generated enhanced PDF with ${pageNumber} pages`);
    return pdf;
  } catch (error) {
    console.error("Error generating PDF:", error);
    
    // Fallback for error cases
    pdf.addPage();
    pdf.setFontSize(pdfStyles.sizes.body);
    pdf.setTextColor(pdfStyles.colors.text);
    pdf.text("Error generating full report visualization.", margin.left, yOffset);
    yOffset += 10;
    pdf.text("Please try again or check browser console for errors.", margin.left, yOffset);
    
    return pdf;
  }
};
