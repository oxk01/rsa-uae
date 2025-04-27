
import { jsPDF } from 'jspdf';
import { PageData } from './types';

export const addPageImage = (
  pdf: jsPDF, 
  pageData: PageData,
  imgData: string,
  imgWidth: number,
  destHeight: number,
  isFirstPage: boolean
) => {
  try {
    // Ensure images display with better quality
    pdf.addImage({
      imageData: imgData,
      format: 'JPEG', 
      x: pageData.margin.left,
      y: pageData.margin.top,
      width: imgWidth,
      height: destHeight,
      // Increase quality for better visualization rendering
      compression: 'NONE',
      alias: `page-image-${new Date().getTime()}` // Add unique alias to avoid caching issues
    });
    
    console.log(`Added image to PDF at x=${pageData.margin.left}, y=${pageData.margin.top}, width=${imgWidth}, height=${destHeight}`);
    return true;
  } catch (error) {
    console.error('Error adding image to PDF:', error);
    
    // Add error text instead
    pdf.setTextColor(255, 0, 0);
    pdf.setFontSize(12);
    pdf.text('Error displaying image content', 
      pageData.margin.left, 
      pageData.margin.top + 20);
    return false;
  }
};

// New function to prepare graphics elements before rendering
export const prepareGraphicsElements = (element: HTMLElement) => {
  // Handle SVG elements - make sure they render correctly in PDFs
  const svgElements = element.querySelectorAll('svg');
  svgElements.forEach((svg: SVGElement) => {
    // Set explicit dimensions on SVG elements
    if (!svg.getAttribute('width') || !svg.getAttribute('height')) {
      const rect = svg.getBoundingClientRect();
      svg.setAttribute('width', Math.max(rect.width, 300).toString());
      svg.setAttribute('height', Math.max(rect.height, 200).toString());
      svg.style.overflow = 'visible'; // Ensure entire SVG is visible
    }
    
    // Set explicit viewBox if missing
    if (!svg.getAttribute('viewBox')) {
      const width = parseInt(svg.getAttribute('width') || '300');
      const height = parseInt(svg.getAttribute('height') || '200');
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }
    
    // Ensure all paths have explicit colors
    const paths = svg.querySelectorAll('path');
    paths.forEach(path => {
      if (!path.getAttribute('fill') && !path.style.fill) {
        path.setAttribute('fill', '#000000');
      }
    });
  });
  
  // Handle canvas elements - ensure they have sufficient dimensions
  const canvasElements = element.querySelectorAll('canvas');
  canvasElements.forEach((canvas: HTMLCanvasElement) => {
    const minWidth = Math.max(canvas.width, 300);
    const minHeight = Math.max(canvas.height, 200);
    
    if (canvas.width < minWidth || canvas.height < minHeight) {
      const context = canvas.getContext('2d');
      if (context) {
        const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        canvas.width = minWidth;
        canvas.height = minHeight;
        context.putImageData(imgData, 0, 0);
      }
    }
  });
  
  // Ensure chart containers have appropriate dimensions
  const chartContainers = element.querySelectorAll('.recharts-wrapper');
  chartContainers.forEach((container: HTMLElement) => {
    container.style.height = '300px';
    container.style.width = '100%';
    container.style.maxWidth = '800px';
    container.style.margin = '0 auto';
  });
  
  return element;
};
