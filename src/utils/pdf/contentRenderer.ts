
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { PageData } from './types';
import { addHeader, addPageNumber, addFooter } from './pageSetup';
import { enhanceStyles } from './styleEnhancer';
import { addSectionHeader } from './sectionHeaders';
import { addPageImage } from './imageHandler';

export const renderContent = async (
  pdf: jsPDF,
  pageData: PageData,
  reportElement: HTMLElement,
  totalPages: number
) => {
  try {
    console.log('Starting content rendering process...');
    
    // Create a copy of the element to work with
    const clonedElement = reportElement.cloneNode(true) as HTMLElement;
    
    // Apply styles before capturing
    enhanceStyles(clonedElement);
    
    // Force layout and wait for visualizations
    document.body.appendChild(clonedElement);
    clonedElement.style.position = 'absolute';
    clonedElement.style.left = '-9999px';
    clonedElement.style.width = `${pageData.contentWidth}px`;
    clonedElement.style.backgroundColor = '#ffffff';
    
    // Wait longer for images and charts
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('Capturing content with html2canvas...');
    try {
      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: (doc, ele) => {
          console.log('Clone created for rendering');
          // Additional preprocessing can be done here if needed
        }
      });
      
      console.log(`Canvas captured with dimensions: ${canvas.width}x${canvas.height}`);
      
      // Remove the cloned element
      document.body.removeChild(clonedElement);
      
      const imgData = canvas.toDataURL('image/png');
      
      const imgWidth = pageData.contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Calculate pages needed
      const contentHeight = pageData.maxContentHeight - pageData.margin.top;
      const pagesNeeded = Math.ceil(imgHeight / contentHeight);
      
      console.log(`Content will span ${pagesNeeded} pages`);
      
      // Add content pages
      for (let i = 0; i < pagesNeeded; i++) {
        pdf.addPage();
        pageData.pageNumber++;
        
        addHeader(pdf, pageData, pageData.pageNumber);
        
        // Calculate source and destination dimensions for this page
        const sourceY = i * (contentHeight * canvas.height / imgHeight);
        const sourceHeight = Math.min(contentHeight * canvas.height / imgHeight, canvas.height - sourceY);
        const destHeight = Math.min(contentHeight, imgHeight - i * contentHeight);
        
        addSectionHeader(pdf, pageData);
        
        if (i === 0) {
          // For first page, use normal image adding
          pdf.addImage(
            imgData,
            'PNG',
            pageData.margin.left,
            pageData.margin.top,
            imgWidth,
            destHeight
          );
        } else {
          // For subsequent pages, use the image handler with proper positioning
          addPageImage(pdf, pageData, imgData, imgWidth, destHeight, false);
        }
        
        addFooter(pdf, pageData);
        addPageNumber(pdf, pageData, pageData.pageNumber, totalPages);
        
        console.log(`Added page ${pageData.pageNumber} of content`);
      }
      
      console.log('Content rendering complete');
      return true;
    } catch (canvasError) {
      console.error('Error in html2canvas:', canvasError);
      
      // Clean up the DOM even if there was an error
      if (document.body.contains(clonedElement)) {
        document.body.removeChild(clonedElement);
      }
      
      // Create simplified fallback using direct text rendering
      createFallbackContent(pdf, pageData, reportElement);
      return false;
    }
  } catch (error) {
    console.error('Error rendering content:', error);
    
    // Add error page
    pdf.addPage();
    pdf.setTextColor(255, 0, 0);
    pdf.setFontSize(16);
    pdf.text('Error generating complete report. Please try again.', 
      pdf.internal.pageSize.getWidth() / 2, 100, { align: 'center' });
    
    return false;
  }
};

// Fallback to render just text content when canvas rendering fails
const createFallbackContent = (pdf: jsPDF, pageData: PageData, reportElement: HTMLElement) => {
  try {
    pdf.addPage();
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    
    let yPosition = pageData.margin.top + 20;
    
    pdf.text('Sentiment Analysis Report (Text Only)', pageData.pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;
    
    // Extract important text data
    const headings = reportElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const paragraphs = reportElement.querySelectorAll('p');
    
    // Add headings
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 128); // Dark blue for headings
    headings.forEach(heading => {
      if (yPosition > pageData.pageHeight - pageData.margin.bottom) {
        pdf.addPage();
        yPosition = pageData.margin.top + 10;
      }
      
      pdf.text(heading.textContent || '', pageData.margin.left, yPosition);
      yPosition += 12;
    });
    
    // Add paragraphs
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0); // Black for body text
    paragraphs.forEach(paragraph => {
      if (yPosition > pageData.pageHeight - pageData.margin.bottom) {
        pdf.addPage();
        yPosition = pageData.margin.top + 10;
      }
      
      const text = paragraph.textContent || '';
      const lines = pdf.splitTextToSize(text, pageData.contentWidth);
      
      pdf.text(lines, pageData.margin.left, yPosition);
      yPosition += (lines.length * 5) + 5;
    });
    
    pdf.text('Note: Visual elements could not be rendered. This is a text-only fallback report.', 
      pageData.margin.left, yPosition + 20);
    
    console.log('Created fallback text-only PDF content');
  } catch (fallbackError) {
    console.error('Error creating fallback content:', fallbackError);
  }
};
