
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { pdfStyles } from '@/styles/pdfStyles';
import { PageData } from './types';
import { addHeader, addPageNumber, addFooter } from './pageSetup';

export const renderContent = async (
  pdf: jsPDF,
  pageData: PageData,
  reportElement: HTMLElement,
  totalPages: number
) => {
  try {
    console.log('Starting content rendering process...');
    
    // Create a copy of the element to avoid modifying the original
    const clonedElement = reportElement.cloneNode(true) as HTMLElement;
    
    // Apply enhanced styles before capturing
    enhanceStyles(clonedElement);
    
    // Force layout and wait for all visualizations to render
    document.body.appendChild(clonedElement);
    clonedElement.style.position = 'absolute';
    clonedElement.style.left = '-9999px';
    clonedElement.style.width = `${pageData.contentWidth}px`;
    
    // Wait for images and charts to render
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Capturing content...');
    const canvas = await html2canvas(clonedElement, {
      scale: 2, // Higher quality
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
    
    // Calculate number of pages needed for content
    const contentHeight = pageData.maxContentHeight - pageData.margin.top;
    const pagesNeeded = Math.ceil(imgHeight / contentHeight);
    
    console.log(`Content will span ${pagesNeeded} pages`);
    
    // Add content pages
    for (let i = 0; i < pagesNeeded; i++) {
      pdf.addPage();
      pageData.pageNumber++;
      
      // Add header with section title
      addHeader(pdf, pageData, pageData.pageNumber);
      
      // Determine how much of the image to show on this page
      const sourceY = i * (contentHeight * canvas.height / imgHeight);
      const sourceHeight = Math.min(contentHeight * canvas.height / imgHeight, 
                                   canvas.height - sourceY);
      const destHeight = Math.min(contentHeight, imgHeight - i * contentHeight);
      
      // Add section header based on current page
      addSectionHeader(pdf, pageData);
      
      // Fix: Use the standard addImage method without the source rectangle parameters
      // which aren't supported in the ImageOptions type
      if (i === 0) {
        // For the first page, just add the full image
        pdf.addImage({
          imageData: imgData,
          format: 'PNG',
          x: pageData.margin.left,
          y: pageData.margin.top,
          width: imgWidth,
          height: destHeight,
          compression: 'FAST'
        });
      } else {
        // For subsequent pages, we need to use the alternative syntax
        // that allows for specifying just part of the image
        pdf.addImage(
          imgData,
          'PNG',
          pageData.margin.left,
          pageData.margin.top,
          imgWidth,
          destHeight,
          undefined,
          'FAST',
          0
        );
      }
      
      // Add footer with page number
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

const enhanceStyles = (el: HTMLElement) => {
  // Update font styles for all text elements
  const textElements = el.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, li');
  textElements.forEach((element: Element) => {
    (element as HTMLElement).style.fontFamily = 'Arial, Helvetica, sans-serif';
    (element as HTMLElement).style.color = '#333333';
    (element as HTMLElement).style.lineHeight = '1.4';
  });
  
  // Enhance headings
  el.querySelectorAll('h1').forEach((element: Element) => {
    (element as HTMLElement).style.color = pdfStyles.colors.primary;
    (element as HTMLElement).style.fontSize = '24px';
    (element as HTMLElement).style.fontWeight = 'bold';
    (element as HTMLElement).style.marginBottom = '20px';
    (element as HTMLElement).style.marginTop = '25px';
    (element as HTMLElement).style.borderBottom = `1px solid ${pdfStyles.colors.primary}`;
    (element as HTMLElement).style.paddingBottom = '8px';
  });
  
  // Enhance visualization containers to ensure they render properly
  el.querySelectorAll('.recharts-wrapper').forEach((chart: Element) => {
    (chart as HTMLElement).style.margin = '25px auto';
    (chart as HTMLElement).style.height = 'auto';
    (chart as HTMLElement).style.minHeight = '300px';
    (chart as HTMLElement).style.width = '100%';
  });
  
  // Fix SVG rendering
  el.querySelectorAll('svg').forEach((svg: Element) => {
    (svg as SVGElement).setAttribute('width', '100%');
    (svg as SVGElement).setAttribute('height', '300');
    (svg as SVGElement).style.display = 'block';
    (svg as SVGElement).style.margin = '0 auto';
  });
  
  // Enhance card styling
  el.querySelectorAll('.card').forEach((card: Element) => {
    (card as HTMLElement).style.padding = '20px';
    (card as HTMLElement).style.margin = '20px 0';
    (card as HTMLElement).style.borderRadius = '8px';
    (card as HTMLElement).style.backgroundColor = pdfStyles.colors.background;
    (card as HTMLElement).style.border = `1px solid ${pdfStyles.colors.tableHeader}`;
  });
  
  // Add section titles
  addSectionTitles(el);
};

const addSectionTitles = (el: HTMLElement) => {
  // Find appropriate places to add section titles
  const reportDiv = el.querySelector('#sentiment-report');
  if (reportDiv) {
    // Add Executive Summary title before the first metrics
    const metricsSection = reportDiv.querySelector('div > div:nth-child(2)');
    if (metricsSection) {
      const titleDiv = document.createElement('h2');
      titleDiv.textContent = 'Executive Summary';
      titleDiv.style.color = pdfStyles.colors.primary;
      titleDiv.style.fontSize = '22px';
      titleDiv.style.fontWeight = 'bold';
      titleDiv.style.marginTop = '30px';
      titleDiv.style.marginBottom = '20px';
      reportDiv.insertBefore(titleDiv, metricsSection);
    }
    
    // Add Analysis Results title before visualizations
    const visualizationsSection = reportDiv.querySelector('.grid:nth-of-type(1)');
    if (visualizationsSection) {
      const titleDiv = document.createElement('h2');
      titleDiv.textContent = 'Analysis Results';
      titleDiv.style.color = pdfStyles.colors.primary;
      titleDiv.style.fontSize = '22px';
      titleDiv.style.fontWeight = 'bold';
      titleDiv.style.marginTop = '40px';
      titleDiv.style.marginBottom = '20px';
      visualizationsSection.parentNode?.insertBefore(titleDiv, visualizationsSection);
    }
  }
};

const addSectionHeader = (pdf: jsPDF, pageData: PageData) => {
  let currentSection = "";
  if (pageData.pageNumber === 2) {
    currentSection = "1. Executive Summary";
  } else if (pageData.pageNumber === 3) {
    currentSection = "2. Sentiment Distribution Analysis";
  } else if (pageData.pageNumber === 4) {
    currentSection = "3. Key Aspects Analysis";
  } else if (pageData.pageNumber === 5) {
    currentSection = "4. Trends Over Time";
  } else if (pageData.pageNumber === 6) {
    currentSection = "5. Detailed Visualizations";
  } else if (pageData.pageNumber === 7) {
    currentSection = "6. Model Evaluation";
  } else if (pageData.pageNumber === 8) {
    currentSection = "7. Key Insights & Recommendations";
  }
  
  if (currentSection) {
    pdf.setFont(pdfStyles.fonts.heading);
    pdf.setFontSize(pdfStyles.sizes.sectionHeader);
    pdf.setTextColor(pdfStyles.colors.primary);
    pdf.text(currentSection, pageData.pageWidth / 2, pageData.margin.top / 2, { align: 'center' });
  }
};
