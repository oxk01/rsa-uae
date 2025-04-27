
import { pdfStyles } from '@/styles/pdfStyles';

export const applyCardStyles = (cards: NodeListOf<Element>) => {
  cards.forEach((card: Element) => {
    (card as HTMLElement).style.padding = '20px';
    (card as HTMLElement).style.margin = '20px 0';
    (card as HTMLElement).style.borderRadius = '8px';
    (card as HTMLElement).style.backgroundColor = pdfStyles.colors.background;
    (card as HTMLElement).style.border = `1px solid ${pdfStyles.colors.tableHeader}`;
  });
};

export const addSectionTitles = (reportDiv: Element | null) => {
  if (!reportDiv) return;

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
};
