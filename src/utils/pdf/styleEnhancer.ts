
import { pdfStyles } from '@/styles/pdfStyles';

export const enhanceStyles = (el: HTMLElement) => {
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
  
  // Enhance visualization containers
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
  
  addSectionTitles(el);
};

const addSectionTitles = (el: HTMLElement) => {
  const reportDiv = el.querySelector('#sentiment-report');
  if (reportDiv) {
    // Add Executive Summary title
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
    
    // Add Analysis Results title
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

