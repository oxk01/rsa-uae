
import { applyTextElementStyles, applyHeadingStyles } from './styles/elementStyles';
import { applyChartStyles, applySvgStyles } from './styles/chartStyles';
import { applyCardStyles, addSectionTitles } from './styles/sectionStyles';

export const enhanceStyles = (el: HTMLElement) => {
  // Apply text element styles
  const textElements = el.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, li');
  applyTextElementStyles(textElements);
  
  // Apply heading styles
  const headings = el.querySelectorAll('h1');
  applyHeadingStyles(headings);
  
  // Apply chart styles
  const charts = el.querySelectorAll('.recharts-wrapper');
  applyChartStyles(charts);
  
  // Apply SVG styles
  const svgs = el.querySelectorAll('svg');
  applySvgStyles(svgs);
  
  // Apply card styles
  const cards = el.querySelectorAll('.card');
  applyCardStyles(cards);
  
  // Add section titles
  const reportDiv = el.querySelector('#sentiment-report');
  addSectionTitles(reportDiv);
};
