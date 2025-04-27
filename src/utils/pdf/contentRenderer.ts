
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
    
    // Create a copy of the element
    const clonedElement = reportElement.cloneNode(true) as HTMLElement;
    
    // Apply styles before capturing
    enhanceStyles(clonedElement);
    
    // Force layout and wait for visualizations
    document.body.appendChild(clonedElement);
    clonedElement.style.position = 'absolute';
    clonedElement.style.left = '-9999px';
    clonedElement.style.width = `${pageData.contentWidth}px`;
    
    // Wait for images and charts
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Capturing content...');
    const canvas = await html2canvas(clonedElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff'
    });
    
    // Remove the cloned element
    document.body.removeChild(clonedElement);
    
    console.log(`Canvas captured with dimensions: ${canvas.width}x${canvas.height}`);
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
      
      const sourceY = i * (contentHeight * canvas.height / imgHeight);
      const sourceHeight = Math.min(contentHeight * canvas.height / imgHeight, canvas.height - sourceY);
      const destHeight = Math.min(contentHeight, imgHeight - i * contentHeight);
      
      addSectionHeader(pdf, pageData);
      
      addPageImage(pdf, pageData, imgData, imgWidth, destHeight, i === 0);
      
      addFooter(pdf, pageData);
      addPageNumber(pdf, pageData, pageData.pageNumber, totalPages);
      
      console.log(`Added page ${pageData.pageNumber} of content`);
    }
    
    console.log('Content rendering complete');
    return true;
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

