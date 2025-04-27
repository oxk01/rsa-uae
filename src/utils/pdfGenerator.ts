
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { pdfStyles } from '@/styles/pdfStyles';

interface PDFGeneratorOptions {
  title: string;
  date: string;
}

export const generatePDF = async (reportElement: HTMLElement, options: PDFGeneratorOptions) => {
  if (!reportElement) return null;
  
  // Create PDF document with professional settings
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
  
  // Register fonts
  pdf.setFont(pdfStyles.fonts.normal);
  pdf.setFillColor(pdfStyles.colors.background);
  
  // Set up page numbering function
  let totalPages = 0;
  const addPageNumber = (pageNum: number) => {
    pdf.setFontSize(pdfStyles.sizes.pageNumber);
    pdf.setTextColor(pdfStyles.colors.subtext);
    pdf.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin.right, pageHeight - (margin.bottom / 3), { align: 'right' });
  };
  
  // Add header to each page function
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
  
  // TITLE PAGE
  // ----------
  pdf.setFont(pdfStyles.fonts.title);
  pdf.setFontSize(pdfStyles.sizes.title);
  pdf.setTextColor(pdfStyles.colors.primary);
  
  // Add title with professional spacing
  pdf.text('SENTIMENT ANALYSIS', pageWidth / 2, yOffset + 30, { align: 'center' });
  pdf.text('REPORT', pageWidth / 2, yOffset + 45, { align: 'center' });
  
  // Add horizontal line
  pdf.setLineWidth(0.5);
  pdf.setDrawColor(pdfStyles.colors.primary);
  pdf.line(pageWidth / 2 - 40, yOffset + 55, pageWidth / 2 + 40, yOffset + 55);
  
  yOffset += 75;
  
  // Add date with correct formatting
  pdf.setFont(pdfStyles.fonts.normal);
  pdf.setFontSize(pdfStyles.sizes.body);
  pdf.setTextColor(pdfStyles.colors.text);
  pdf.text(`Generated on ${options.date}`, pageWidth / 2, yOffset, { align: 'center' });
  
  yOffset += pdfStyles.spacing.contentSpacing * 3;
  
  // Add subtitle
  pdf.setFont(pdfStyles.fonts.subheading);
  pdf.setFontSize(pdfStyles.sizes.subHeader);
  pdf.setTextColor(pdfStyles.colors.primary);
  pdf.text("Comprehensive Analysis of Customer Feedback", pageWidth / 2, yOffset, { align: 'center' });
  
  yOffset += pdfStyles.spacing.headerMargin * 3;
  
  // Add table of contents title
  pdf.setFont(pdfStyles.fonts.heading);
  pdf.setFontSize(pdfStyles.sizes.sectionHeader);
  pdf.setTextColor(pdfStyles.colors.primary);
  pdf.text("Table of Contents", margin.left, yOffset);
  
  yOffset += pdfStyles.spacing.headerMargin;
  
  // Add table of contents with page numbers
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
    // Draw dots between title and page number
    const entryText = entry.title;
    const pageNumText = entry.pageNum.toString();
    const textWidth = pdf.getTextWidth(entryText);
    const pageNumWidth = pdf.getTextWidth(pageNumText);
    const dotsWidth = contentWidth - textWidth - pageNumWidth - 10;
    const dotCount = Math.floor(dotsWidth / pdf.getTextWidth('.'));
    const dots = '.'.repeat(dotCount);
    
    // Draw entry with dots and page number
    pdf.text(entryText, margin.left + 5, yOffset + (index * pdfStyles.spacing.listItemSpacing * 2));
    pdf.text(dots, margin.left + 5 + textWidth, yOffset + (index * pdfStyles.spacing.listItemSpacing * 2));
    pdf.text(pageNumText, pageWidth - margin.right - pageNumWidth, yOffset + (index * pdfStyles.spacing.listItemSpacing * 2));
  });
  
  // Add footer note
  yOffset = pageHeight - margin.bottom - 20;
  pdf.setFont(pdfStyles.fonts.normal);
  pdf.setFontSize(pdfStyles.sizes.caption);
  pdf.setTextColor(pdfStyles.colors.subtext);
  pdf.text("This report presents a comprehensive analysis of sentiment data collected from customer feedback.", 
    pageWidth / 2, yOffset, { align: 'center', maxWidth: contentWidth });
  
  yOffset += 10;
  pdf.text("The analysis uses advanced natural language processing to identify key themes and sentiment patterns.", 
    pageWidth / 2, yOffset, { align: 'center', maxWidth: contentWidth });
  
  try {
    // Prepare and enhance HTML content for better rendering
    const prepareContent = () => {
      // Wait for visualizations to completely render
      return new Promise(resolve => setTimeout(resolve, 1500));
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
        (el as HTMLElement).style.lineHeight = pdfStyles.spacing.lineHeight.toString();
      });
      
      // Enhance headings
      element.querySelectorAll('h1').forEach((el: Element) => {
        (el as HTMLElement).style.color = pdfStyles.colors.primary;
        (el as HTMLElement).style.fontSize = '24px';
        (el as HTMLElement).style.fontWeight = 'bold';
        (el as HTMLElement).style.marginBottom = '20px';
        (el as HTMLElement).style.marginTop = '25px';
        (el as HTMLElement).style.borderBottom = `1px solid ${pdfStyles.colors.primary}`;
        (el as HTMLElement).style.paddingBottom = '8px';
      });
      
      element.querySelectorAll('h2').forEach((el: Element) => {
        (el as HTMLElement).style.color = pdfStyles.colors.primary;
        (el as HTMLElement).style.fontSize = '20px';
        (el as HTMLElement).style.fontWeight = 'bold';
        (el as HTMLElement).style.marginBottom = '15px';
        (el as HTMLElement).style.marginTop = '20px';
      });
      
      element.querySelectorAll('h3').forEach((el: Element) => {
        (el as HTMLElement).style.color = pdfStyles.colors.primary;
        (el as HTMLElement).style.fontSize = '18px';
        (el as HTMLElement).style.fontWeight = 'bold';
        (el as HTMLElement).style.marginBottom = '12px';
        (el as HTMLElement).style.marginTop = '18px';
      });
      
      // Enhance chart visibility
      element.querySelectorAll('.recharts-wrapper').forEach((chart: Element) => {
        (chart as HTMLElement).style.margin = '25px auto';
        (chart as HTMLElement).style.height = '400px';
        (chart as HTMLElement).style.width = '100%';
      });
      
      // Enhance card visuals
      element.querySelectorAll('.card').forEach((card: Element) => {
        (card as HTMLElement).style.padding = '20px';
        (card as HTMLElement).style.margin = '20px 0';
        (card as HTMLElement).style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        (card as HTMLElement).style.borderRadius = '8px';
        (card as HTMLElement).style.backgroundColor = pdfStyles.colors.background;
        (card as HTMLElement).style.border = `1px solid ${pdfStyles.colors.tableHeader}`;
      });
      
      // Improve list formatting
      element.querySelectorAll('ul, ol').forEach((list: Element) => {
        (list as HTMLElement).style.paddingLeft = '25px';
        (list as HTMLElement).style.marginTop = '12px';
        (list as HTMLElement).style.marginBottom = '12px';
      });
      
      element.querySelectorAll('li').forEach((item: Element) => {
        (item as HTMLElement).style.marginBottom = '8px';
        (item as HTMLElement).style.paddingLeft = '5px';
      });
      
      // Enhance tables
      element.querySelectorAll('table').forEach((table: Element) => {
        (table as HTMLElement).style.width = '100%';
        (table as HTMLElement).style.borderCollapse = 'collapse';
        (table as HTMLElement).style.marginTop = '15px';
        (table as HTMLElement).style.marginBottom = '15px';
        (table as HTMLElement).style.border = `1px solid ${pdfStyles.colors.tableHeader}`;
      });
      
      element.querySelectorAll('th').forEach((th: Element) => {
        (th as HTMLElement).style.backgroundColor = pdfStyles.colors.tableHeader;
        (th as HTMLElement).style.color = pdfStyles.colors.primary;
        (th as HTMLElement).style.padding = '12px';
        (th as HTMLElement).style.fontSize = '14px';
        (th as HTMLElement).style.fontWeight = 'bold';
        (th as HTMLElement).style.textAlign = 'left';
        (th as HTMLElement).style.border = `1px solid ${pdfStyles.colors.tableHeader}`;
      });
      
      element.querySelectorAll('td').forEach((td: Element) => {
        (td as HTMLElement).style.padding = '10px';
        (td as HTMLElement).style.fontSize = '12px';
        (td as HTMLElement).style.border = `1px solid ${pdfStyles.colors.tableHeader}`;
      });
      
      // Fix chart text sizes
      element.querySelectorAll('.recharts-text').forEach((text: Element) => {
        (text as HTMLElement).style.fontSize = '12px';
        (text as HTMLElement).style.fontFamily = 'Arial, Helvetica, sans-serif';
      });
      
      // Fix container for report sections
      element.querySelectorAll('#sentiment-report > div').forEach((div: Element) => {
        (div as HTMLElement).style.marginBottom = '30px';
      });
    };
    
    // Apply enhanced styles to the cloned element
    enhanceStyles(clonedElement);
    
    // Capture the enhanced content as high-quality canvas
    const canvas = await html2canvas(reportElement, {
      scale: 4,  // Higher resolution for better quality
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
    totalPages = pagesNeeded + 1; // Including title page
    
    // Add content pages
    for (let i = 0; i < pagesNeeded; i++) {
      // Add new page
      pdf.addPage();
      pageNumber++;
      addHeader(pageNumber);
      
      const sourceY = i * contentHeight * (canvas.height / imgHeight);
      const sourceHeight = Math.min(
        contentHeight * (canvas.height / imgHeight),
        canvas.height - sourceY
      );
      
      const destHeight = Math.min(contentHeight, imgHeight - (i * contentHeight));
      
      // Add section headers based on page number
      let currentSection = "";
      if (pageNumber === 2) {
        currentSection = "Executive Summary & Analysis Overview";
      } else if (pageNumber === 3) {
        currentSection = "Sentiment Distribution Analysis";
      } else if (pageNumber === 4) {
        currentSection = "Key Aspects Analysis";
      } else if (pageNumber === 5) {
        currentSection = "Trends Over Time";
      } else if (pageNumber === 6) {
        currentSection = "Detailed Visualizations";
      } else if (pageNumber === 7) {
        currentSection = "Model Evaluation";
      } else if (pageNumber === 8) {
        currentSection = "Key Insights & Recommendations";
      }
      
      if (currentSection) {
        pdf.setFont(pdfStyles.fonts.heading);
        pdf.setFontSize(pdfStyles.sizes.body);
        pdf.setTextColor(pdfStyles.colors.primary);
        pdf.text(currentSection, pageWidth / 2, margin.top / 2, { align: 'center' });
      }
      
      // Add image slice for current page
      pdf.addImage({
        imageData: imgData,
        format: 'PNG',
        x: margin.left,
        y: margin.top,
        width: imgWidth,
        height: destHeight,
        srcX: 0,
        srcY: sourceY,
        srcWidth: canvas.width,
        srcHeight: sourceHeight
      });
      
      // Add page number
      addPageNumber(pageNumber);
    }
    
    // Go back and add page numbers to title page
    pdf.setPage(1);
    addPageNumber(1);
    
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
