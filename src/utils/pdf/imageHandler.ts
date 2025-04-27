
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
  if (isFirstPage) {
    // For the first page, add the full image
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
    // For subsequent pages, use alternative syntax for partial images
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
};

