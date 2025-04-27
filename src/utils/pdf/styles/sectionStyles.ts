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
