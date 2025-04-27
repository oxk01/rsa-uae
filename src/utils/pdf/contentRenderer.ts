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
  // Apply enhanced styles before capturing
  enhanceStyles(reportElement);
  
  // Wait for all charts and visualizations to render
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const canvas = await captureContent(reportElement);
  const imgData = canvas.toDataURL('image/png');
  
  const imgWidth = pageData.contentWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  // Calculate number of pages needed for content
  const contentHeight = pageData.maxContentHeight - pageData.margin.top;
  const pagesNeeded = Math.ceil(imgHeight / contentHeight);
  
  // Add content pages
  for (let i = 0; i < pagesNeeded; i++) {
    pdf.addPage();
    pageData.pageNumber++;
    
    // Add header with section title
    addHeader(pdf, pageData, pageData.pageNumber);
    
    const destHeight = Math.min(contentHeight, imgHeight - (i * contentHeight));
    
    // Add section header based on current page
    addSectionHeader(pdf, pageData);
    
    // Calculate source dimensions for current slice
    const sourceY = (i * contentHeight * canvas.height) / imgHeight;
    const sourceHeight = (destHeight * canvas.height) / imgHeight;
    
    // Add image using the correct parameter signature for jsPDF
    pdf.addImage(
      imgData,                  // imageData
      'PNG',                    // format
      pageData.margin.left,     // x
      pageData.margin.top,      // y
      imgWidth,                 // width
      destHeight,               // height
    );
    
    // Handle image slicing by first drawing the full image and then applying clipping
    if (i > 0) {
      // Save the current graphics state
      pdf.saveGraphicsState();
      
      // Define a clipping region for the current page slice
      pdf.rect(
        pageData.margin.left, 
        pageData.margin.top, 
        imgWidth, 
        destHeight
      );
      pdf.clip();
      
      // Restore the graphics state
      pdf.restoreGraphicsState();
    }
    
    // Add footer with page number
    addFooter(pdf, pageData);
    addPageNumber(pdf, pageData, pageData.pageNumber, totalPages);
  }
};

const enhanceStyles = (el: HTMLElement) => {
  // Update font styles for all text elements
  const textElements = el.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, li');
  textElements.forEach((element: Element) => {
    (element as HTMLElement).style.fontFamily = 'Arial, Helvetica, sans-serif';
    (element as HTMLElement).style.color = pdfStyles.colors.text;
    (element as HTMLElement).style.lineHeight = pdfStyles.spacing.lineHeight.toString();
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
  
  el.querySelectorAll('h2').forEach((element: Element) => {
    (element as HTMLElement).style.color = pdfStyles.colors.primary;
    (element as HTMLElement).style.fontSize = '20px';
    (element as HTMLElement).style.fontWeight = 'bold';
    (element as HTMLElement).style.marginBottom = '15px';
    (element as HTMLElement).style.marginTop = '20px';
  });
  
  el.querySelectorAll('h3').forEach((element: Element) => {
    (element as HTMLElement).style.color = pdfStyles.colors.primary;
    (element as HTMLElement).style.fontSize = '18px';
    (element as HTMLElement).style.fontWeight = 'bold';
    (element as HTMLElement).style.marginBottom = '12px';
    (element as HTMLElement).style.marginTop = '18px';
  });
  
  // Improve visualization styling
  el.querySelectorAll('.recharts-wrapper').forEach((chart: Element) => {
    (chart as HTMLElement).style.margin = '25px auto';
    (chart as HTMLElement).style.height = '400px';
    (chart as HTMLElement).style.width = '100%';
  });
  
  // Enhance card styling
  el.querySelectorAll('.card').forEach((card: Element) => {
    (card as HTMLElement).style.padding = '20px';
    (card as HTMLElement).style.margin = '20px 0';
    (card as HTMLElement).style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    (card as HTMLElement).style.borderRadius = '8px';
    (card as HTMLElement).style.backgroundColor = pdfStyles.colors.background;
    (card as HTMLElement).style.border = `1px solid ${pdfStyles.colors.tableHeader}`;
  });
  
  // Improve list formatting
  el.querySelectorAll('ul, ol').forEach((list: Element) => {
    (list as HTMLElement).style.paddingLeft = '25px';
    (list as HTMLElement).style.marginTop = '12px';
    (list as HTMLElement).style.marginBottom = '12px';
  });
  
  el.querySelectorAll('li').forEach((item: Element) => {
    (item as HTMLElement).style.marginBottom = '8px';
    (item as HTMLElement).style.paddingLeft = '5px';
  });
  
  // Add section separators
  el.querySelectorAll('#sentiment-report > div').forEach((div: Element) => {
    (div as HTMLElement).style.marginBottom = '40px';
    (div as HTMLElement).style.paddingBottom = '20px';
    (div as HTMLElement).style.borderBottom = `1px solid ${pdfStyles.colors.tableHeader}`;
  });
  
  // Enhance tables
  el.querySelectorAll('table').forEach((table: Element) => {
    (table as HTMLElement).style.width = '100%';
    (table as HTMLElement).style.borderCollapse = 'collapse';
    (table as HTMLElement).style.marginTop = '15px';
    (table as HTMLElement).style.marginBottom = '15px';
    (table as HTMLElement).style.border = `1px solid ${pdfStyles.colors.tableHeader}`;
  });
  
  el.querySelectorAll('th').forEach((th: Element) => {
    (th as HTMLElement).style.backgroundColor = pdfStyles.colors.tableHeader;
    (th as HTMLElement).style.color = pdfStyles.colors.primary;
    (th as HTMLElement).style.padding = '12px';
    (th as HTMLElement).style.fontSize = '14px';
    (th as HTMLElement).style.fontWeight = 'bold';
    (th as HTMLElement).style.textAlign = 'left';
    (th as HTMLElement).style.border = `1px solid ${pdfStyles.colors.tableHeader}`;
  });
  
  el.querySelectorAll('td').forEach((td: Element) => {
    (td as HTMLElement).style.padding = '10px';
    (td as HTMLElement).style.fontSize = '12px';
    (td as HTMLElement).style.border = `1px solid ${pdfStyles.colors.tableHeader}`;
  });
  
  // Improve chart text
  el.querySelectorAll('.recharts-text').forEach((text: Element) => {
    (text as HTMLElement).style.fontSize = '12px';
    (text as HTMLElement).style.fontFamily = 'Arial, Helvetica, sans-serif';
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

const captureContent = async (element: HTMLElement): Promise<HTMLCanvasElement> => {
  // Wait for visualizations to render fully
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Create enhanced canvas with high quality
  return html2canvas(element, {
    scale: 2,           // Higher quality
    logging: false,
    useCORS: true,
    allowTaint: true,
    width: element.offsetWidth,
    height: element.offsetHeight,
    windowWidth: element.offsetWidth,
    windowHeight: element.offsetHeight
  });
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
    pdf.setFontSize(pdfStyles.sizes.body);
    pdf.setTextColor(pdfStyles.colors.primary);
    pdf.text(currentSection, pageData.pageWidth / 2, pageData.margin.top / 2, { align: 'center' });
  }
};
