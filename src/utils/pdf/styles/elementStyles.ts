
import { pdfStyles } from '@/styles/pdfStyles';

export const applyTextElementStyles = (elements: NodeListOf<Element>) => {
  elements.forEach((element: Element) => {
    (element as HTMLElement).style.fontFamily = 'Arial, Helvetica, sans-serif';
    (element as HTMLElement).style.color = '#333333';
    (element as HTMLElement).style.lineHeight = '1.4';
  });
};

export const applyHeadingStyles = (headings: NodeListOf<Element>) => {
  headings.forEach((element: Element) => {
    (element as HTMLElement).style.color = pdfStyles.colors.primary;
    (element as HTMLElement).style.fontSize = '24px';
    (element as HTMLElement).style.fontWeight = 'bold';
    (element as HTMLElement).style.marginBottom = '20px';
    (element as HTMLElement).style.marginTop = '25px';
    (element as HTMLElement).style.borderBottom = `1px solid ${pdfStyles.colors.primary}`;
    (element as HTMLElement).style.paddingBottom = '8px';
  });
};
